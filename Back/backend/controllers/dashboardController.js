const usuario = require('../models/users.js');
const Bet = require('../models/bet.js');

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await usuario.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userBets = await Bet.find({ userId });

    const betsPlaced = userBets.length;

    const betsFollowed = userBets.filter(b => b.followedBy && b.followedBy.includes(userId)).length;

    // Apuestas creadas
    const betsCreated = user.betsCreated || 0;

    // Calcular tasa de aciertos
    const wonBets = userBets.filter(b => b.status === 'ganada').length;
    const hitRate = betsPlaced > 0 ? (wonBets / betsPlaced) * 100 : 0;

    // Últimas 5 apuestas
    const recentBets = userBets
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(bet => ({
        title: `${bet.matches[0].homeTeam} Vs ${bet.matches[0].awayTeam}`,
        date: bet.createdAt,
        result: bet.status,
        amount: bet.matches[0].forecast.odds
      }));

    // TODO: calcular correctamente los cambios (por ahora estático)
    const stats = {
      userName: user.name || 'Usuario',
      betsPlaced,
      betsChange: 12.5, // reemplazar con lógica si tienes histórico
      betsFollowed,
      followedChange: -3.2, // reemplazar si aplica
      betsCreated,
      createdChange: 25,
      hitRate: hitRate.toFixed(2),
      hitRateChange: 4.2,
      recentBets
    };

    res.status(200).json({
      message: 'Estadísticas cargadas correctamente',
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al cargar las estadísticas',
      error: error.message
    });
  }
};

exports.getPerformanceData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29);

    const bets = await Bet.find({
      userId,
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Agrupar apuestas por día
    const dailyStats = Array(30).fill(null).map((_, i) => {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const label = date.toISOString().slice(0, 10); // YYYY-MM-DD
      return { date: label, total: 0, won: 0 };
    });

    bets.forEach(bet => {
      const betDate = new Date(bet.createdAt).toISOString().slice(0, 10);
      const stat = dailyStats.find(d => d.date === betDate);
      if (stat) {
        stat.total += 1;
        if (bet.status === 'ganada') stat.won += 1;
      }
    });

    // Calcular porcentaje de acierto diario
    const performanceData = dailyStats.map(day =>
      day.total > 0 ? Math.round((day.won / day.total) * 100) : 0
    );

  const labels = dailyStats.map(day => {
  const dateParts = day.date.split('-');
  const formatted = new Date(day.date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short'
    });
    return formatted; // ej: "26 jun"
  });

  res.status(200).json({
    message: 'Desempeño cargado correctamente',
    data: {
      performance: performanceData,
      labels
    }
  });

  } catch (error) {
    res.status(500).json({
      message: 'Error al cargar el desempeño',
      error: error.message
    });
  }
};
