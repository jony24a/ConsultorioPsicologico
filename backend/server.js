require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const practicanteRoutes = require('./routes/practicanteRoutes'); // lo crearemos más adelante
const profesionalRoutes = require('./routes/profesionalRoutes');
const { profesional } = require('./config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/practicantes', practicanteRoutes);
app.use('/api/profesional', profesionalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
