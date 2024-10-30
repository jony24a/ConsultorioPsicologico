require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); <-- Eliminado, ya que podemos usar express.json()
const practicanteRoutes = require('./routes/practicanteRoutes'); // lo crearemos más adelante
const profesionalRoutes = require('./routes/profesionalRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Simplificado en lugar de bodyParser.json()

// Rutas
app.use('/api/practicantes', practicanteRoutes);
app.use('/api/profesionales', profesionalRoutes); // Cambié a plural para consistencia
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);// Cambié a plural para consistencia

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
