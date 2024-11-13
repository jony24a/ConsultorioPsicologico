// routes/personalRoutes.js
const express = require('express');
const { createPersonal, getAllPersonal, getPersonalById, updatePersonal, deletePersonal } = require('../controllers/personalController');
const router = express.Router();

// Rutas para manejar el personal
router.get('/', getAllPersonal);                    // Obtener todos los registros de personal
router.get('/:numero_documento', getPersonalById);  // Obtener un registro de personal por numero_documento
router.post('/', createPersonal);                   // Crear un nuevo registro de personal
router.put('/:numero_documento', updatePersonal);   // Actualizar un registro de personal
router.delete('/:numero_documento', deletePersonal); // Eliminar un registro de personal

module.exports = router;
