const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Middleware para validar datos de entrada
const validarDatosCita = (req, res, next) => {
  const { fecha, hora, lugar, pacienteId, personalId, consultorioId } = req.body;

  if (!fecha || !hora || !lugar || !pacienteId || !personalId || !consultorioId) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  next();
};

// Middleware para logging
const logRequest = (req, res, next) => {
  console.log(`${req.method} - ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};


router.post(
  '/', 
  logRequest, 
  validarDatosCita, 
  citaController.crearCita
);

router.get(
  '/', 
  logRequest, 
  citaController.obtenerCitas
);

router.put(
  '/:id_cita', 
  logRequest, 
  validarDatosCita, 
  citaController.editarCita
);

router.delete(
  '/:id_cita', 
  logRequest, 
  citaController.eliminarCita
);

module.exports = router;
