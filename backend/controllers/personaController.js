const { PrismaClient } = require('@prisma/client'); // Importa el cliente de Prisma
const prisma = new PrismaClient(); // Crea una instancia del cliente de Prisma

// Controlador para obtener una persona por número de documento
const getPersonaByCedula = async (req, res) => {
  const { numeroDocumento } = req.params;

  if (isNaN(numeroDocumento)) {
    return res.status(400).json({ error: 'El número de documento debe ser un número válido.' });
  }

  try {
    const documento = parseInt(numeroDocumento);

    // Buscar en Paciente y Personal
    const paciente = await prisma.paciente.findUnique({ where: { numero_documento: documento } });
    const personal = !paciente && await prisma.personal.findUnique({ where: { numero_documento: documento } });

    const persona = paciente || personal;

    if (persona) {
      const tipo = paciente ? 'paciente' : 'personal';
      return res.status(200).json({
        tipo,
        data: persona,
      });
    } else {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la persona:', error);
    return res.status(500).json({ error: 'Error interno', details: error.message });
  }
};

// Controlador para actualizar una persona por número de documento
const updatePersona = async (req, res) => {
  const { numeroDocumento } = req.params;
  const updatedData = req.body;

  if (isNaN(numeroDocumento)) {
    return res.status(400).json({ error: 'El número de documento debe ser un número válido.' });
  }

  try {
    const documento = parseInt(numeroDocumento);

    // Buscar en Paciente y Personal
    const paciente = await prisma.paciente.findUnique({ where: { numero_documento: documento } });
    const personal = !paciente && await prisma.personal.findUnique({ where: { numero_documento: documento } });

    if (paciente) {
      await prisma.paciente.update({
        where: { numero_documento: documento },
        data: updatedData,
      });
    } else if (personal) {
      await prisma.personal.update({
        where: { numero_documento: documento },
        data: updatedData,
      });
    } else {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    return res.status(200).json({ message: 'Persona actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la persona:', error);
    return res.status(500).json({ error: 'Error interno', details: error.message });
  }
};

// Controlador para obtener el historial clínico de una persona por número de documento
const getHistorialClinicoByCedula = async (req, res) => {
  const { numeroDocumento } = req.params;

  if (isNaN(numeroDocumento)) {
    return res.status(400).json({ error: 'El número de documento debe ser un número válido.' });
  }

  try {
    const documento = parseInt(numeroDocumento);

    const paciente = await prisma.paciente.findUnique({
      where: { numero_documento: documento },
      include: { HistorialClinico: true },
    });

    if (paciente && paciente.HistorialClinico.length > 0) {
      return res.status(200).json({
        message: 'Historial clínico obtenido con éxito',
        historialClinico: paciente.HistorialClinico,
      });
    } else {
      return res.status(404).json({ error: 'Paciente no encontrado o no tiene historial clínico' });
    }
  } catch (error) {
    console.error('Error al obtener el historial clínico:', error);
    return res.status(500).json({ error: 'Error interno', details: error.message });
  }
};

module.exports = {
  getPersonaByCedula,
  updatePersona,
  getHistorialClinicoByCedula,
};
