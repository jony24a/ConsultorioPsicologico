const express = require('express');
const { obtenerPracticantes, crearPracticante } = require('../controllers/practicanteController');
const router = express.Router();

router.get('/', obtenerPracticantes);
router.post('/', crearPracticante);

module.exports = router;
