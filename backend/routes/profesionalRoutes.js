const express = require('express');
const { obtenerProfesional, crearProfesional } = require('../controllers/profesionalController');
const router = express.Router();  // Usa express.Router() para definir las rutas

// Define las rutas para obtener y crear profesionales
router.get('/', obtenerProfesional);
router.post('/', crearProfesional);

module.exports = router;  // Exporta el router
