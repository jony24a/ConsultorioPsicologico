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

// Obtener un historial clínico por el número de documento del paciente
const obtenerHistorialClinicoPorDocumento = async (req, res) => {
  const { numero_documento } = req.params; // Usamos el numero_documento en lugar de id
  try {
    const historial = await prisma.historialClinico.findMany({
      where: {
        pacienteId: parseInt(numero_documento), // Filtramos por pacienteId que es numero_documento
      },
      include: {
        Paciente: true,
        Cita: true,
      }
    });
    if (historial.length === 0) {
      return res.status(404).json({ error: "Historial clínico no encontrado para este paciente" });
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
        pacienteId: parseInt(pacienteId), // Aseguramos que pacienteId es numero_documento
        citaId: parseInt(citaId),
      },
    });
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el historial clínico" });
  }
};

// Actualizar un historial clínico por el número de documento del paciente
const actualizarHistorialClinico = async (req, res) => {
  const { numero_documento } = req.params; // Usamos numero_documento
  const { motivo_consulta, remitido, diagnostico, tratamiento, estado_proceso } = req.body;
  try {
    const historialActualizado = await prisma.historialClinico.updateMany({
      where: { pacienteId: parseInt(numero_documento) },
      data: { motivo_consulta, remitido, diagnostico, tratamiento, estado_proceso },
    });
    if (historialActualizado.count === 0) {
      return res.status(404).json({ error: "Historial clínico no encontrado para este paciente" });
    }
    res.json(historialActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el historial clínico" });
  }
};

// Eliminar un historial clínico por el número de documento del paciente
const eliminarHistorialClinico = async (req, res) => {
  const { numero_documento } = req.params; // Usamos numero_documento
  try {
    const historialEliminado = await prisma.historialClinico.deleteMany({
      where: { pacienteId: parseInt(numero_documento) },
    });
    if (historialEliminado.count === 0) {
      return res.status(404).json({ error: "Historial clínico no encontrado para este paciente" });
    }
    res.json({ message: "Historial clínico eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el historial clínico" });
  }
};

module.exports = {
  obtenerHistorialesClinicos,
  obtenerHistorialClinicoPorDocumento,
  crearHistorialClinico,
  actualizarHistorialClinico,
  eliminarHistorialClinico,
};
