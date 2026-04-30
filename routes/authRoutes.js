const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

router.get('/registro', (req, res) => {
    res.render('registro');
});

//Para procesar el registro
router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const nuevoUsuario = new Usuario({ nombre, correo, password });
        await nuevoUsuario.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send("Error al registrar usuario: " + error.message);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

//Para procesar el Login
router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo });

        if (usuario && await bcrypt.compare(password, usuario.password)) {
            req.session.usuarioId = usuario._id;
            req.session.nombre = usuario.nombre;
            return res.redirect('/');
        }

        res.render('login', { error: "Correo o contraseña incorrectos" });
    } catch (error) {
        res.render('login', { error: "Ocurrió un error en el servidor" });
    }
});

//Para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;