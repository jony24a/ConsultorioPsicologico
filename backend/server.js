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

// Middleware global
app.use(cors());
app.use(express.json());

// Middleware para registrar las solicitudes en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// Usar las rutas con el prefijo adecuado
app.use('/api/personal', personalRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/historial-clinico', historialClinicoRoutes);
app.use('/api/persona', personaRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en el servidor.`,
  });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error inesperado:', err);
  res.status(err.status || 500).json({
    error: 'Error interno del servidor',
    details: err.message || 'Algo salió mal en el servidor.',
  });
});

// Configurar el puerto
const PORT = parseInt(process.env.PORT, 10) || 3000;
if (isNaN(PORT)) {
  console.error(
    'El valor del puerto no es válido. Configura correctamente la variable PORT en tu archivo .env.'
  );
  process.exit(1);
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV || 'producción'}.`
  );
});

// Manejo de excepciones no capturadas
process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});

// Manejo de promesas rechazadas
process.on('unhandledRejection', (reason) => {
  console.error('Promesa rechazada sin manejar:', reason);
});
