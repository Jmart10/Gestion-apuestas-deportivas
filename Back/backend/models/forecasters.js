const mongoose = require('mongoose');

const forecasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  telegramChannel: { type: String },
  sports: { type: [String], default: [] },
  isPremium: { type: Boolean, default: false },
  status: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Forecaster', forecasterSchema);
