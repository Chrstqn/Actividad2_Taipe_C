const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares: Preparación para recibir datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Para archivos CSS e imágenes

// Configuración de la base de datos
const URL_DB = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mi_inventario';

mongoose.connect(URL_DB)
    .then(() => console.log('✅ Conexión a la base de datos exitosa'))
    .catch(error => console.error('❌ Error al conectar a la base de datos:', error));

// Ruta inicial de prueba
app.get('/', (req, res) => {
    res.send('El servidor de MiInventarioExpress está activo 🚀');
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor funcionando en: http://localhost:${PUERTO}`);
});