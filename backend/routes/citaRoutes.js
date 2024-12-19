const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Middleware para validar datos de entrada
const validarDatosCita = (req, res, next) => {
  const { fecha, hora, lugar, pacienteId, personalId, consultorioId } = req.body;

  // Para la creación de citas, todos los campos son obligatorios
  if (req.method === 'POST') {
    if (!fecha || !hora || !lugar || !pacienteId || !personalId || !consultorioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  } else if (req.method === 'PUT') {
    // Para la edición, solo validamos los campos proporcionados (no todos son obligatorios)
    if (fecha && !hora && !lugar && !pacienteId && !personalId && !consultorioId) {
      return res.status(400).json({ error: 'Se deben enviar al menos un campo a editar' });
    }
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
