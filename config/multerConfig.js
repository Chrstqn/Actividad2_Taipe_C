const multer = require('multer');
const path = require('path');

// Configuración de dónde y cómo se guardan los archivos
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const filtroArchivos = (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|gif/;
    const extensionValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimeValido = tiposPermitidos.test(file.mimetype);

    if (extensionValida && mimeValido) {
        return cb(null, true);
    }
    cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png, gif)'));
};

const upload = multer({
    storage: almacenamiento,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: filtroArchivos
});

module.exports = upload;