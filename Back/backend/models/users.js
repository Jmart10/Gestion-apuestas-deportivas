const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede superar los 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: [50, 'El correo no puede superar los 50 caracteres'],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingrese un correo válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    maxlength: [90, 'La contraseña no puede superar los 20 caracteres']
  },
  rol: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: ''
  },
  betsCreated: {
    type: Number,
    default: 0,
    min: 0
  },
  lastPayment: {
    date: {
      type: Date
    },
    amount: {
      type: Number,
      min: 0
    }
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
