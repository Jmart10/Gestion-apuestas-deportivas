const Bet = require('../models/bet');

exports.getAllBetsForAllUsers = async (req, res) => {
  try {
    const bets = await Bet.find().sort({ createdAt: -1 });
    res.status(200).json(bets);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener todas las apuestas' });
  }
};

exports.getAllBets = async (req, res) => {
  try {
    const { userId } = req.query;
    const bets = await Bet.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(bets);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener apuestas' });
  }
};

exports.createBet = async (req, res) => {
  try {
    const bet = new Bet(req.body);
    await bet.save();
    
    const betObj = bet.toObject();
    betObj.id = betObj._id;
    delete betObj._id;

    res.status(201).json(betObj);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear apuesta', error });
  }
};

exports.updateBet = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Bet.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Apuesta no encontrada' });
    }

    const updatedObj = updated.toObject();
    updatedObj.id = updatedObj._id;
    delete updatedObj._id;

    res.json(updatedObj);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar apuesta', error });
  }
};

exports.deleteBet = async (req, res) => {
  try {
    await Bet.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar apuesta' });
  }
};
