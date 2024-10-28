const express = require('express');
const { obtenerCita, crearCita } = require('../controllers/citaController');
const router = express.Router(); 

router.get('/', obtenerCita);
router.post('/', crearCita);

module.exports = router; 