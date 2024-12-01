const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController'); // Importa correctamente el controlador

// Ruta para obtener una persona por número de documento
router.get('/:numeroDocumento', personaController.getPersonaByCedula);

// Ruta para actualizar los datos de una persona
router.put('/:numeroDocumento', personaController.updatePersona);

module.exports = router;
