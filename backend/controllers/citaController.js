const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para crear una nueva cita
const crearCita = async (req, res) => {
  try {
    const { fecha, hora, lugar, pacienteId, personalId, consultorioId } = req.body;

    // Verificar si los datos necesarios están presentes
    if (!fecha || !hora || !lugar || !pacienteId || !personalId || !consultorioId) {
      return res.status(400).json({ error: 'Faltan datos para crear la cita' });
    }

    // Verificar que los IDs sean válidos
    if (isNaN(pacienteId) || isNaN(personalId) || isNaN(consultorioId)) {
      return res.status(400).json({ error: 'IDs inválidos' });
    }

    // Convertir la fecha y la hora en formato adecuado
    const fechaCita = new Date(fecha);  // Asegúrate de que la fecha esté en formato adecuado (YYYY-MM-DD)
    const horaCita = new Date(`1970-01-01T${hora}Z`);  // Convierte la hora en formato ISO (HH:MM:SS)

    // Crear la cita usando Prisma
    const nuevaCita = await prisma.cita.create({
      data: {
        fecha: fechaCita,
        hora: horaCita,
        lugar,
        pacienteId,
        personalId,
        consultorioId,
      },
    });

    // Devolver la cita creada
    return res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Función para obtener todas las citas
const obtenerCitas = async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        Paciente: {
          select: { // Selecciona solo los campos necesarios para evitar sobrecargar la respuesta
            numero_documento: true,
            nombre: true,
            telefono: true,
          }
        },
        Personal: {
          select: { 
            numero_documento: true,
            nombre: true,
            turno: true,
          }
        },
        Consultorio: true, // Si solo necesitas el nombre o algunos campos específicos, puedes usar `select`
      },
    });

    return res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

// Función para editar una cita
const editarCita = async (req, res) => {
  try {
    const { id_cita } = req.body;
    const { fecha, hora, lugar, pacienteId, personalId, consultorioId } = req.body;

    // Verificar si la cita existe
    const citaExistente = await prisma.cita.findUnique({
      where: { id_cita: parseInt(id_cita) }, // Buscar por el ID de la cita
    });

    if (!citaExistente) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    // Convertir la fecha y la hora en formato adecuado (si se proporcionan nuevos valores)
    const nuevaFecha = fecha ? new Date(fecha) : citaExistente.fecha;
    const nuevaHora = hora ? new Date(`1970-01-01T${hora}Z`) : citaExistente.hora;

    // Actualizar la cita con los nuevos datos
    const citaActualizada = await prisma.cita.update({
      where: { id_cita: parseInt(id_cita) },
      data: {
        fecha: nuevaFecha,
        hora: nuevaHora,
        lugar: lugar || citaExistente.lugar,
        pacienteId: pacienteId || citaExistente.pacienteId,
        personalId: personalId || citaExistente.personalId,
        consultorioId: consultorioId || citaExistente.consultorioId,
      },
    });

    // Devolver la cita actualizada
    return res.status(200).json(citaActualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al editar la cita' });
  }
};

// Función para eliminar una cita
const eliminarCita = async (req, res) => {
  try {
    const { id_cita } = req.body;

    // Verificar si la cita existe
    const citaExistente = await prisma.cita.findUnique({
      where: { id_cita: parseInt(id_cita) },
    });

    if (!citaExistente) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    // Eliminar la cita
    await prisma.cita.delete({
      where: { id_cita: parseInt(id_cita) },
    });

    // Devolver respuesta de éxito
    return res.status(200).json({ message: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar la cita' });
  }
};

module.exports = { crearCita, obtenerCitas, editarCita, eliminarCita };
