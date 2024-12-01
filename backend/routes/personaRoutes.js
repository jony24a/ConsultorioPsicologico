// routes/personaRoutes.js
const express = require('express');
const router = express.Router();
const { getPersonaByCedula } = require('../controllers/personaController');

// Ruta para obtener una persona por número de documento
router.get('/:numeroDocumento', getPersonaByCedula);

// Ruta para actualizar los datos de una persona
router.put('/:numeroDocumento', personaController.updatePersona);

module.exports = router;
