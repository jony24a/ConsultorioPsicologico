const express = require('express');
const router = express.Router();
const historialClinicoController = require('../controllers/historialClinicoController');

// Rutas para el historial clínico
router.get('/', historialClinicoController.obtenerHistorialesClinicos);
router.get('/:id', historialClinicoController.obtenerHistorialClinicoPorId);
router.post('/', historialClinicoController.crearHistorialClinico);
router.put('/:id', historialClinicoController.actualizarHistorialClinico);
router.delete('/:id', historialClinicoController.eliminarHistorialClinico);

module.exports = router;
