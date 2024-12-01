const { PrismaClient } = require('@prisma/client'); // Importa el cliente de Prisma
const prisma = new PrismaClient(); // Crea una instancia del cliente de Prisma

// Controlador para obtener una persona por número de documento
const getPersonaByCedula = async (req, res) => {
  const { numeroDocumento } = req.params;

  try {
    // Buscar primero en Paciente
    let persona = await prisma.paciente.findUnique({
      where: {
        numero_documento: parseInt(numeroDocumento),
      },
    });

    // Si no la encuentra en Paciente, busca en Personal
    if (!persona) {
      persona = await prisma.personal.findUnique({
        where: {
          numero_documento: parseInt(numeroDocumento),
        },
      });
    }

    // Si la persona fue encontrada, se devuelve
    if (persona) {
      // Verificar si es un paciente basándonos en la propiedad 'telefono'
      const tipo = persona.telefono ? 'paciente' : 'personal';
      return res.status(200).json({
        tipo,
        data: persona,
      });
    } else {
      return res.status(404).json({
        error: 'Persona no encontrada',
      });
    }
  } catch (error) {
    console.error('Error al obtener la persona:', error);
    return res.status(500).json({
      error: 'Error al obtener la persona',
      details: error.message, // Incluye el mensaje de error para depuración
    });
  }
};

// Controlador para actualizar una persona por número de documento
const updatePersona = async (req, res) => {
  const { numeroDocumento } = req.params;
  const updatedData = req.body;

  try {
    // Primero intentamos encontrar la persona en la tabla Paciente
    let persona = await prisma.paciente.findUnique({
      where: { numero_documento: parseInt(numeroDocumento) },
    });

    // Si no se encuentra en Paciente, buscar en Personal
    if (!persona) {
      persona = await prisma.personal.findUnique({
        where: { numero_documento: parseInt(numeroDocumento) },
      });
    }

    // Si la persona existe, la actualizamos
    if (persona) {
      // Verificar si es paciente o personal
      if (persona.telefono) {
        // Es un paciente
        await prisma.paciente.update({
          where: { numero_documento: parseInt(numeroDocumento) },
          data: updatedData, // Actualiza los datos de paciente
        });
      } else {
        // Es personal
        await prisma.personal.update({
          where: { numero_documento: parseInt(numeroDocumento) },
          data: updatedData, // Actualiza los datos de personal
        });
      }

      return res.status(200).json({
        message: 'Persona actualizada con éxito',
      });
    } else {
      return res.status(404).json({
        error: 'Persona no encontrada',
      });
    }
  } catch (error) {
    console.error('Error al actualizar la persona:', error);
    return res.status(500).json({
      error: 'Error al actualizar la persona',
      details: error.message, // Incluye el mensaje de error para depuración
    });
  }
};

module.exports = { getPersonaByCedula, updatePersona };
