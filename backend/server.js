require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');  // Asegúrate de que esta ruta esté bien importada
const personalRoutes = require('./routes/personalRoutes');

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Rutas
app.use('/api/pacientes', pacienteRoutes);  // Rutas para pacientes
app.use('/api/citas', citaRoutes);          // Rutas para citas
app.use('/api/personal', personalRoutes);   // Rutas para personal

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
