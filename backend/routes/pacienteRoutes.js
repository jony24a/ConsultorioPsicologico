// routes/pacienteRoutes.js
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Crear un nuevo paciente
router.post('/', pacienteController.createPaciente);

// Obtener todos los pacientes
router.get('/', pacienteController.getAllPacientes);

// Obtener un paciente por ID
router.get('/:id', pacienteController.getPacienteById);

// Actualizar un paciente
router.put('/:id', pacienteController.updatePaciente);

// Eliminar un paciente
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
