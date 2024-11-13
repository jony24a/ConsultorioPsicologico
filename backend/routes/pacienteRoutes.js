// routes/pacienteRoutes.js
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Crear un nuevo paciente
router.post('/', pacienteController.createPaciente);

// Obtener todos los pacientes
router.get('/', pacienteController.getAllPacientes);

// Obtener un paciente por numero_documento
router.get('/:numero_documento', pacienteController.getPacienteByNumeroDocumento);

// Actualizar un paciente
router.put('/:numero_documento', pacienteController.updatePaciente);

// Eliminar un paciente
router.delete('/:numero_documento', pacienteController.deletePaciente);

module.exports = router;
