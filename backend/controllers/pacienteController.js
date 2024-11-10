// controllers/pacienteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo paciente
const createPaciente = async (req, res) => {
  const { numero_documento, tipo_documento, nombre, telefono, genero, estrato, barrio, localidad, escolaridad, disponibilidad } = req.body;

  // Validación de campos obligatorios
  if (!numero_documento || !tipo_documento || !nombre || !telefono || !genero || !estrato || !barrio || !localidad || !escolaridad || !disponibilidad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    const paciente = await prisma.paciente.create({
      data: {
        numero_documento,
        tipo_documento,
        nombre,
        telefono,
        genero,
        estrato,
        barrio,
        localidad,
        escolaridad,
        disponibilidad,
      },
    });
    res.status(201).json(paciente);
  } catch (error) {
    console.error("Error al crear paciente:", error);
    res.status(500).json({ error: "Error al crear el paciente." });
  }
};

// Obtener todos los pacientes
const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany();
    res.json(pacientes);
  } catch (error) {
    console.error("Error al obtener los pacientes:", error);
    res.status(500).json({ error: "Error al obtener los pacientes." });
  }
};

// Obtener un paciente por ID
const getPacienteById = async (req, res) => {
  const { id } = req.params;

  // Asegurarse de que el ID sea un número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido." });
  }

  try {
    const paciente = await prisma.paciente.findUnique({
      where: { id: parseInt(id) },
    });

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    res.json(paciente);
  } catch (error) {
    console.error("Error al obtener el paciente:", error);
    res.status(500).json({ error: "Error al obtener el paciente." });
  }
};

// Actualizar un paciente
const updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { numero_documento, tipo_documento, nombre, telefono, genero, estrato, barrio, localidad, escolaridad, disponibilidad } = req.body;

  // Asegurarse de que el ID sea un número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido." });
  }

  try {
    const paciente = await prisma.paciente.update({
      where: { id: parseInt(id) },
      data: {
        numero_documento,
        tipo_documento,
        nombre,
        telefono,
        genero,
        estrato,
        barrio,
        localidad,
        escolaridad,
        disponibilidad,
      },
    });
    res.json(paciente);
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    res.status(500).json({ error: "Error al actualizar el paciente." });
  }
};

// Eliminar un paciente
const deletePaciente = async (req, res) => {
  const { id } = req.params;

  // Asegurarse de que el ID sea un número válido
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido." });
  }

  try {
    const paciente = await prisma.paciente.delete({
      where: { id: parseInt(id) },
    });

    // Si el paciente no existe, respondemos con 404
    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    res.status(500).json({ error: "Error al eliminar el paciente." });
  }
};

// Exportar todas las funciones del controlador
module.exports = {
  createPaciente,
  getAllPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente,
};
