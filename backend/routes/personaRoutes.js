// personaRoutes.js
const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// Middleware para validar que numeroDocumento es un número válido
const validateNumeroDocumento = (req, res, next) => {
  const { numeroDocumento } = req.params;
  if (isNaN(numeroDocumento)) {
    return res.status(400).json({ error: 'El número de documento debe ser un número válido.' });
  }
  next();
};

// Ruta para obtener una persona por número de documento
router.get('/:numeroDocumento', validateNumeroDocumento, personaController.getPersonaByCedula);

// Ruta para actualizar los datos de una persona
router.put('/:numeroDocumento', validateNumeroDocumento, personaController.updatePersona);

// Ruta para obtener el historial clínico de una persona
router.get('/:numeroDocumento/historial', validateNumeroDocumento, personaController.getHistorialClinicoByCedula);

module.exports = router;
