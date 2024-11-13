// controllers/pacienteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo paciente
const createPaciente = async (req, res) => {
  const { numero_documento, tipo_documento, nombre, telefono, genero, estrato, barrio, localidad, escolaridad, disponibilidad } = req.body;

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

// Obtener un paciente por numero_documento
const getPacienteByNumeroDocumento = async (req, res) => {
  const { numero_documento } = req.params;

  try {
    const paciente = await prisma.paciente.findUnique({
      where: { numero_documento: parseInt(numero_documento) },
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
  const { numero_documento } = req.params;
  const { tipo_documento, nombre, telefono, genero, estrato, barrio, localidad, escolaridad, disponibilidad } = req.body;

  try {
    const paciente = await prisma.paciente.update({
      where: { numero_documento: parseInt(numero_documento) },
      data: {
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
  const { numero_documento } = req.params;

  try {
    const paciente = await prisma.paciente.delete({
      where: { numero_documento: parseInt(numero_documento) },
    });

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
  getPacienteByNumeroDocumento,
  updatePaciente,
  deletePaciente,
};
