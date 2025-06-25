const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  date: Date,
  league: String,

  history: {
    lastMatches: [
      {
        teams: String,
        result: String,
        date: Date
      }
    ],
    h2h: {
      homeWins: Number,
      awayWins: Number,
      draws: Number
    }
  },
  forecast: {
    type: { type: String },
    selection: String,
    odds: Number
  }
});

const betSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matches: [matchSchema],
  forecaster: {
    id: String,
    name: String,
    avatar: String,
    stats: {
      successRate: Number,
      last10: [Number],
      yield: Number
    }
  },
  price: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bet', betSchema);
