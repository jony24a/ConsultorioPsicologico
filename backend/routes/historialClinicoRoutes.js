const express = require('express');
const router = express.Router();
const historialClinicoController = require('../controllers/historialClinicoController');

// Rutas para el historial clínico
router.get('/', historialClinicoController.obtenerHistorialesClinicos);

// Ruta modificada para obtener historial clínico por numero_documento
router.get('/paciente/:numero_documento', historialClinicoController.obtenerHistorialClinicoPorDocumento);

// Crear un historial clínico
router.post('/', historialClinicoController.crearHistorialClinico);

// Actualizar historial clínico por numero_documento
router.put('/paciente/:numero_documento', historialClinicoController.actualizarHistorialClinico);

// Eliminar historial clínico por numero_documento
router.delete('/paciente/:numero_documento', historialClinicoController.eliminarHistorialClinico);

module.exports = router;
