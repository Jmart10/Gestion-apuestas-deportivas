const Forecaster = require('../models/forecasters');

exports.createForecaster = async (req, res) => {
  try {
    const forecaster = new Forecaster(req.body);
    await forecaster.save();
    res.status(201).json(forecaster);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pronosticador', error: err.message });
  }
};

exports.getAllForecasters = async (req, res) => {
  try {
    const forecasters = await Forecaster.find().sort({ createdAt: -1 });
    res.status(200).json(forecasters);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pronosticadores', error: err.message });
  }
};

exports.updateForecaster = async (req, res) => {
  try {
    const updated = await Forecaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Pronosticador no encontrado' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar pronosticador', error: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const forecaster = await Forecaster.findById(req.params.id);
    if (!forecaster) return res.status(404).json({ message: 'Pronosticador no encontrado' });

    forecaster.status = forecaster.status === 'activo' ? 'inactivo' : 'activo';
    await forecaster.save();

    res.status(200).json(forecaster);
  } catch (err) {
    res.status(500).json({ message: 'Error al cambiar estado', error: err.message });
  }
};
