const express = require('express');
const { createPersonal, getAllPersonal, getPersonalById, updatePersonal, deletePersonal } = require('../controllers/personalController');
const router = express.Router(); 

// Rutas para manejar el personal
router.get('/', getAllPersonal);            // Obtener todos los registros de personal
router.get('/:id', getPersonalById);        // Obtener un registro de personal por ID
router.post('/', createPersonal);           // Crear un nuevo registro de personal
router.put('/:id', updatePersonal);        // Actualizar un registro de personal
router.delete('/:id', deletePersonal);     // Eliminar un registro de personal

module.exports = router;
