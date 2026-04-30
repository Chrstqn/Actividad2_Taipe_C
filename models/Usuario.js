const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const esquemaUsuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

esquemaUsuario.pre('save', async function() {
    if (!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Usuario', esquemaUsuario);