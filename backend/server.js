// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Importar dependencias y rutas
const express = require('express');
const cors = require('cors');

// Importar rutas
const personalRoutes = require('./routes/personalRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes'); // Opcional
const citaRoutes = require('./routes/citaRoutes');         // Opcional
const historialClinicoRoutes = require('./routes/historialClinicoRoutes'); // Opcional

// Crear una instancia de la aplicación express
const app = express();

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para manejar datos JSON en las solicitudes
app.use(express.json());

// Definir las rutas de la API
app.use('/api/personal', personalRoutes);  // Maneja las rutas relacionadas con personal
app.use('/api/pacientes', pacienteRoutes); // Maneja las rutas relacionadas con pacientes
app.use('/api/citas', citaRoutes);         // Maneja las rutas relacionadas con citas
app.use('/api/historial-clinico', historialClinicoRoutes); // Maneja las rutas relacionadas con historial clínico

// Configuración del puerto (puede venir desde el archivo .env o usar 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
