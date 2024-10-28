const prisma = require('../config/database');

async function obtenerPaciente(req, res) {
    try {
        const paciente = await prisma.paciente.findMany();
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pacientes'});
    }
}

async function  crearPaciente(req, res) {
    const { numero_documento, tipo_documento, nombre, genero, estrato, barrio, localidad, escolaridad, numero_documento_practicante, numero_documento_profesional } = req.body; 

    try {
        const paciente = await prisma.paciente.create({
            data: {
                numero_documento,
                tipo_documento,
                nombre,
                genero,
                estrato,
                barrio,
                localidad,
                escolaridad,
                numero_documento_practicante,
                numero_documento_profesional
            }
        });
        res.status(201).json(paciente);
    } catch(error) {
        res.status(500).json({error: 'Error al crear el paciente'});
    }
}

module.exports = { obtenerPaciente, crearPaciente };