const mongoose = require('mongoose');
//const bcrypt = require('bcrypt'); //Esta variable es para encriptar la contraseña
const { Schema } = mongoose; //Esta variable es para crear el esquema de la base de datos
const usuarioSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: [50, 'El correo no puede superar los 50 caracteres'],
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingrese un correo válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        maxLength: [20, 'La contraseña no puede superar los 20 caracteres']
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
 });
 module.exports = mongoose.model('Usuario', usuarioSchema);