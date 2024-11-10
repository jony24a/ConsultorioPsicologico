// controllers/personalController.js
const { PrismaClient } = require('@prisma/client'); // Usar require en lugar de import
const prisma = new PrismaClient();

// Crear un nuevo miembro del personal
const createPersonal = async (req, res) => {
  const { numero_documento, tipo_documento, nombre, genero, estrato, barrio, localidad, es_profesional } = req.body;
  try {
    const personal = await prisma.personal.create({
      data: {
        numero_documento,
        tipo_documento,
        nombre,
        genero,
        estrato,
        barrio,
        localidad,
        es_profesional,
      },
    });
    res.status(201).json(personal);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el miembro del personal." });
  }
};

// Obtener todos los miembros del personal
const getAllPersonal = async (req, res) => {
  try {
    const personal = await prisma.personal.findMany();
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el personal." });
  }
};

// Obtener un miembro del personal por ID
const getPersonalById = async (req, res) => {
  const { id } = req.params;
  try {
    const personal = await prisma.personal.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el miembro del personal." });
  }
};

// Actualizar un miembro del personal
const updatePersonal = async (req, res) => {
  const { id } = req.params;
  const { numero_documento, tipo_documento, nombre, genero, estrato, barrio, localidad, es_profesional } = req.body;
  try {
    const personal = await prisma.personal.update({
      where: { id: parseInt(id) },
      data: {
        numero_documento,
        tipo_documento,
        nombre,
        genero,
        estrato,
        barrio,
        localidad,
        es_profesional,
      },
    });
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el miembro del personal." });
  }
};

// Eliminar un miembro del personal
const deletePersonal = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.personal.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el miembro del personal." });
  }
};

// Exportar todas las funciones del controlador
module.exports = {
  createPersonal,
  getAllPersonal,
  getPersonalById,
  updatePersonal,
  deletePersonal,
};
