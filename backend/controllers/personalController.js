// controllers/personalController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo miembro del personal
const createPersonal = async (req, res) => {
  const { numero_documento, tipo_documento, nombre, genero, estrato, barrio, localidad, es_profesional, turno } = req.body;
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
        turno,
      },
    });
    res.status(201).json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el miembro del personal." });
  }
};

// Obtener todos los miembros del personal
const getAllPersonal = async (req, res) => {
  try {
    const personal = await prisma.personal.findMany();
    res.json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el personal." });
  }
};

// Obtener un miembro del personal por ID (numero_documento)
const getPersonalById = async (req, res) => {
  const { numero_documento } = req.params;
  try {
    const personal = await prisma.personal.findUnique({
      where: { numero_documento: parseInt(numero_documento) },
    });
    res.json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el miembro del personal." });
  }
};

// Actualizar un miembro del personal
const updatePersonal = async (req, res) => {
  const { numero_documento } = req.params;
  const { tipo_documento, nombre, genero, estrato, barrio, localidad, es_profesional, turno } = req.body;
  try {
    const personal = await prisma.personal.update({
      where: { numero_documento: parseInt(numero_documento) },
      data: {
        tipo_documento,
        nombre,
        genero,
        estrato,
        barrio,
        localidad,
        es_profesional,
        turno,
      },
    });
    res.json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el miembro del personal." });
  }
};

// Eliminar un miembro del personal
const deletePersonal = async (req, res) => {
  const { numero_documento } = req.params;
  try {
    await prisma.personal.delete({
      where: { numero_documento: parseInt(numero_documento) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el miembro del personal." });
  }
};

module.exports = {
  createPersonal,
  getAllPersonal,
  getPersonalById,
  updatePersonal,
  deletePersonal,
};
