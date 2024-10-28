const prisma = require('../config/database');

async function obtenerProfesional(req, res) {
    try{
        const profesional = await prisma.profesional.findMany();
        res.json(profesional);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtyener los profesionales'});
    }
}

async function crearProfesional(req, res) {
    const {numero_documento, tipo_documento, nombre, genero, estrato, barrio, localidad} = req.body;

    try {
        const profesional = await prisma.profesional.create({
            data: {
                numero_documento,
                tipo_documento,
                nombre,
                genero,
                estrato,
                barrio,
                localidad
            }
        });
        res.status(201).json(profesional);
    }   catch (error){
        res.status(500).json({ error: 'Error al crear el practicante'});
    }
}

module.exports = {obtenerProfesional, crearProfesional};
