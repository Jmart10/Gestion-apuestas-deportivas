const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usuario = require('./backend/models/users.js');
const userRoutes = require('./backend/routes/userRoutes.js');

const betRoutes = require('./backend/routes/betRoutes.js');

const dashboardRoutes = require('./backend/routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Desde el back' });
});

// Rutas
app.use('/api', userRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/', dashboardRoutes);

const dbURI = process.env.MONGODB_URI;
console.log('Conectando a la base de datos:', dbURI);

mongoose
.connect(dbURI)
.then(() => 
    console.log('Conectado a la base de datos')
)
.catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
