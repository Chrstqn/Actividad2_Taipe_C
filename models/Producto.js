const mongoose = require('mongoose');

const esquemaProducto = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'], 
        trim: true 
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'], 
        min: [0, 'El precio no puede ser negativo'] 
    },
    descripcion: { 
        type: String, 
        required: [true, 'La descripción es obligatoria'] 
    },
    imagen: { 
        type: String, 
        default: 'sin-foto.png' 
    }
}, { 
    timestamps: true
});

module.exports = mongoose.model('Producto', esquemaProducto);