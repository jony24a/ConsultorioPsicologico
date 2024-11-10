// controllers/citaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para crear una nueva cita
const crearCita = async (req, res) => {
  try {
    const { fecha, hora, lugar, pacienteId, personalId } = req.body;

    // Verificar si los datos necesarios están presentes
    if (!fecha || !hora || !lugar || !pacienteId || !personalId) {
      return res.status(400).json({ error: 'Faltan datos para crear la cita' });
    }

    // Crear la cita usando Prisma
    const nuevaCita = await prisma.cita.create({
      data: {
        fecha: new Date(fecha),
        hora: new Date(`1970-01-01T${hora}Z`), // Asegúrate de que la hora esté en formato ISO
        lugar,
        pacienteId,
        personalId,
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
        Paciente: true,  // Incluir los detalles del paciente
        Personal: true,   // Incluir los detalles del personal
      },
    });

    return res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

module.exports = { crearCita, obtenerCitas };

