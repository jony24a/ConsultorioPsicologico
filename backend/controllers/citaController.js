const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función reutilizable para verificar si una cita existe
const encontrarCita = async (id_cita) => {
  return await prisma.cita.findUnique({
    where: { id_cita: parseInt(id_cita) },
  });
};

// Crear una cita
const crearCita = async (req, res) => {
  try {
    const { fecha, hora, lugar, pacienteId, personalId, consultorioId } = req.body;

    if (!fecha || !hora || !lugar || !pacienteId || !personalId || !consultorioId) {
      return res.status(400).json({ error: 'Faltan datos para crear la cita' });
    }

    const nuevaCita = await prisma.cita.create({
      data: {
        fecha: new Date(fecha),
        hora: new Date(`1970-01-01T${hora}Z`),
        lugar,
        pacienteId,
        personalId,
        consultorioId,
      },
    });

    return res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Obtener todas las citas
const obtenerCitas = async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        Paciente: { select: { numero_documento: true, nombre: true, telefono: true } },
        Personal: { select: { numero_documento: true, nombre: true, turno: true } },
        Consultorio: { select: { nombre: true, estado: true } },
      },
    });

    return res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

// Editar una cita
const editarCita = async (req, res) => {
  try {
    const { id_cita } = req.params; // Cambiado a params
    const { fecha, hora, lugar, pacienteId, personalId, consultorioId } = req.body;

    const citaExistente = await encontrarCita(id_cita);

    if (!citaExistente) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    const citaActualizada = await prisma.cita.update({
      where: { id_cita: parseInt(id_cita) },
      data: {
        fecha: fecha ? new Date(fecha) : citaExistente.fecha,
        hora: hora ? new Date(`1970-01-01T${hora}Z`) : citaExistente.hora,
        lugar: lugar || citaExistente.lugar,
        pacienteId: pacienteId || citaExistente.pacienteId,
        personalId: personalId || citaExistente.personalId,
        consultorioId: consultorioId || citaExistente.consultorioId,
      },
    });

    return res.status(200).json(citaActualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al editar la cita' });
  }
};

// Eliminar una cita
const eliminarCita = async (req, res) => {
  try {
    const { id_cita } = req.params; // Cambiado a params

    const citaExistente = await encontrarCita(id_cita);

    if (!citaExistente) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    await prisma.cita.delete({
      where: { id_cita: parseInt(id_cita) },
    });

    return res.status(200).json({ message: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};

module.exports = { crearCita, obtenerCitas, editarCita, eliminarCita };
