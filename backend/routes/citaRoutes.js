// routes/citaRoutes.js
const express = require('express');
const { crearCita, obtenerCitas } = require('../controllers/citaController');
const router = express.Router();

// Ruta para crear una nueva cita (POST)
router.post('/', crearCita);

// Ruta para obtener todas las citas (GET)
router.get('/', obtenerCitas);

module.exports = router;
