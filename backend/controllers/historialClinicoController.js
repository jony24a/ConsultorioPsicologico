const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los historiales clínicos
const obtenerHistorialesClinicos = async (req, res) => {
  try {
    const historiales = await prisma.historialClinico.findMany({
      include: {
        Paciente: true,
        Cita: true,
      }
    });
    res.json(historiales);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los historiales clínicos" });
  }
};

// Obtener un historial clínico por ID
const obtenerHistorialClinicoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const historial = await prisma.historialClinico.findUnique({
      where: { id: parseInt(id) },
      include: {
        Paciente: true,
        Cita: true,
      }
    });
    if (!historial) {
      return res.status(404).json({ error: "Historial clínico no encontrado" });
    }
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial clínico" });
  }
};

// Crear un nuevo historial clínico
const crearHistorialClinico = async (req, res) => {
  const { motivo_consulta, remitido, diagnostico, tratamiento, estado_proceso, pacienteId, citaId } = req.body;
  try {
    const nuevoHistorial = await prisma.historialClinico.create({
      data: {
        motivo_consulta,
        remitido,
        diagnostico,
        tratamiento,
        estado_proceso,
        pacienteId,
        citaId,
      },
    });
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el historial clínico" });
  }
};

// Actualizar un historial clínico por ID
const actualizarHistorialClinico = async (req, res) => {
  const { id } = req.params;
  const { motivo_consulta, remitido, diagnostico, tratamiento, estado_proceso } = req.body;
  try {
    const historialActualizado = await prisma.historialClinico.update({
      where: { id: parseInt(id) },
      data: { motivo_consulta, remitido, diagnostico, tratamiento, estado_proceso },
    });
    res.json(historialActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el historial clínico" });
  }
};

// Eliminar un historial clínico por ID
const eliminarHistorialClinico = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.historialClinico.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Historial clínico eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el historial clínico" });
  }
};

module.exports = {
  obtenerHistorialesClinicos,
  obtenerHistorialClinicoPorId,
  crearHistorialClinico,
  actualizarHistorialClinico,
  eliminarHistorialClinico,
};
