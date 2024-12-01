// server.js

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importar las rutas
const personalRoutes = require('./routes/personalRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');
const historialClinicoRoutes = require('./routes/historialClinicoRoutes');
const personaRoutes = require('./routes/personaRoutes'); // Nueva ruta para consultar por cédula

const app = express();

app.use(cors());
app.use(express.json());

// Usar las rutas con el prefijo adecuado
app.use('/api/personal', personalRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/historial-clinico', historialClinicoRoutes);
 
// Registra las rutas de persona sin prefijo '/api' ya que está incluido en personaRoutes.js
app.use('/api/persona', personaRoutes); // La ruta se define aquí

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
