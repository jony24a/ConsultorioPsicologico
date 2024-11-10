require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');
const personalRoutes = require('./routes/personalRoutes'); // Importar las rutas de Personal

const app = express();

// Middleware para habilitar CORS (compartición de recursos entre dominios)
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Definición de las rutas
app.use('/api/pacientes', pacienteRoutes);   // Rutas para pacientes
app.use('/api/citas', citaRoutes);           // Rutas para citas
app.use('/api/personal', personalRoutes);    // Rutas para personal

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
