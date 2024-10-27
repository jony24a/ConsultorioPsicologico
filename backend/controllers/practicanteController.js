const prisma = require('../config/database'); // Crearemos este archivo más adelante

// Obtener todos los practicantes
async function obtenerPracticantes(req, res) {
  try {
    const practicantes = await prisma.practicante.findMany();
    res.json(practicantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los practicantes' });
  }
}

// Crear un nuevo practicante
async function crearPracticante(req, res) {
  const { numero_documento, tipo_documento, nombre, genero, estrato, barrio, localidad, periodo, jornada, ano_matricula } = req.body;

  try {
    const practicante = await prisma.practicante.create({
      data: {
        numero_documento,
        tipo_documento,
        nombre,
        genero,
        estrato,
        barrio,
        localidad,
        periodo,
        jornada,
        ano_matricula
      }
    });
    res.status(201).json(practicante);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el practicante' });
  }
}

module.exports = { obtenerPracticantes, crearPracticante };
