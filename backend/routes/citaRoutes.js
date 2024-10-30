const express = require('express');
const { obtenerCita, crearCita } = require('../controllers/citaController');
const router = express.Router(); 

// Rutas para citas
router.get('/', obtenerCita);
router.post('/', crearCita);

module.exports = router;
