const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const upload = require('../config/multerConfig');

router.get('/', async (req, res) => {
    const productos = await Producto.find().lean();
    res.render('home', { productos });
});

router.get('/nuevo', (req, res) => {
    res.render('formularioProducto');
});

router.post('/guardar', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body;

        if (!nombre || precio <= 0) {
            return res.render('formularioProducto', { 
                error: 'El nombre es obligatorio y el precio debe ser mayor a 0' 
            });
        }
        
        const nuevoProducto = new Producto({
            nombre,
            precio,
            descripcion,
            imagen: req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png'
        });

        await nuevoProducto.save();

        const io = req.app.get('socketio');
        if (io) {
            io.emit('nuevoProducto', { nombre: nuevoProducto.nombre });
        }

        console.log('✅ Producto guardado y notificado vía Socket');
        res.redirect('/');
    } catch (error) {
        console.error('❌ Error al guardar:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/eliminar/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar:', error);
        res.status(500).send('Error al eliminar el producto');
    }
});

router.get('/editar/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).lean();
        res.render('formularioEditar', { producto });
    } catch (error) {
        res.redirect('/');
    }
});

router.post('/actualizar/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body;
        
        if (!nombre || precio <= 0) return res.status(400).send('Datos inválidos');

        const updateData = { nombre, precio, descripcion };

        if (req.file) {
            updateData.imagen = `/uploads/${req.file.filename}`;
        }

        await Producto.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
});

module.exports = router;