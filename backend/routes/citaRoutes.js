const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Crear una nueva cita
router.post('/', citaController.crearCita);

// Obtener todas las citas
router.get('/', citaController.obtenerCitas);

// Editar una cita existente
router.put('/:id_cita', citaController.editarCita);

// Eliminar una cita
router.delete('/:id_cita', citaController.eliminarCita);

module.exports = router;
