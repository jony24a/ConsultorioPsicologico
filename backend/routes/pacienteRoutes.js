const express = require('express');
const { obtenerPaciente, crearPaciente } = require('../controllers/pacienteController');
const router = express.Router(); // Cambiar a Router()

router.get('/', obtenerPaciente);
router.post('/', crearPaciente);

module.exports = router;
