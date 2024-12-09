const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// Middleware para validar que el número de documento es válido
const validateNumeroDocumento = (req, res, next) => {
  const { numeroDocumento } = req.params;

  if (!numeroDocumento || isNaN(numeroDocumento)) {
    return res.status(400).json({
      error: 'El número de documento debe ser un número válido y no puede estar vacío.',
    });
  }

  req.numeroDocumento = parseInt(numeroDocumento, 10); // Aseguramos que sea un número entero
  next();
};

// Ruta para obtener una persona por número de documento
router.get('/:numeroDocumento', validateNumeroDocumento, async (req, res, next) => {
  try {
    await personaController.getPersonaByCedula(req, res);
  } catch (error) {
    console.error('Error en GET /:numeroDocumento:', error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
});

// Ruta para actualizar los datos de una persona
router.put('/:numeroDocumento', validateNumeroDocumento, async (req, res, next) => {
  try {
    await personaController.updatePersona(req, res);
  } catch (error) {
    console.error('Error en PUT /:numeroDocumento:', error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
});

// Ruta para obtener el historial clínico de una persona
router.get('/:numeroDocumento/historial', validateNumeroDocumento, async (req, res, next) => {
  try {
    await personaController.getHistorialClinicoByCedula(req, res);
  } catch (error) {
    console.error('Error en GET /:numeroDocumento/historial:', error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
});

module.exports = router;
