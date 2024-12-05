const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener persona por número de documento
const getPersonaByCedula = async (req, res) => {
  const { numeroDocumento } = req.params;

  if (isNaN(numeroDocumento)) {
    return res.status(400).json({ error: 'El número de documento debe ser un número válido.' });
  }

  try {
    const documento = parseInt(numeroDocumento);

    const paciente = await prisma.paciente.findUnique({ where: { numero_documento: documento } });
    const personal = !paciente && await prisma.personal.findUnique({ where: { numero_documento: documento } });

    const persona = paciente || personal;

    if (persona) {
      // Si la persona es un paciente, también buscamos su historial clínico
      const tipo = paciente ? 'paciente' : 'personal';
      
      // Si es un paciente, buscamos su historial clínico
      let historialClinico = [];
      if (paciente) {
        historialClinico = await prisma.historialClinico.findMany({
          where: { pacienteId: paciente.id }
        });
      }

      return res.status(200).json({
        tipo,
        data: persona,
        historialClinico: historialClinico.length > 0 ? historialClinico : [] // Si no tiene historial, no lo incluimos
      });
    } else {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la persona:', error);
    return res.status(500).json({ error: 'Error interno', details: error.message });
  }
};

// Actualizar persona por número de documento
const updatePersona = async (req, res) => {
  const { numeroDocumento } = req.params;
  const updatedData = req.body;

  if (isNaN(numeroDocumento)) {
    return res.status(400).json({ error: 'El número de documento debe ser un número válido.' });
  }

  try {
    const documento = parseInt(numeroDocumento);

    const paciente = await prisma.paciente.findUnique({ where: { numero_documento: documento } });
    const personal = !paciente && await prisma.personal.findUnique({ where: { numero_documento: documento } });

    if (paciente) {
      await prisma.paciente.update({ where: { numero_documento: documento }, data: updatedData });
    } else if (personal) {
      await prisma.personal.update({ where: { numero_documento: documento }, data: updatedData });
    } else {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    return res.status(200).json({ message: 'Persona actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la persona:', error);
    return res.status(500).json({ error: 'Error interno', details: error.message });
  }
};

// Obtener historial clínico por número de documento
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

    if (paciente) {
      const historial = paciente.HistorialClinico;

      if (historial && historial.length > 0) {
        return res.status(200).json({ historialClinico: historial });
      } else {
        return res.status(404).json({ error: 'El paciente no tiene historial clínico registrado.' });
      }
    } else {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
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
