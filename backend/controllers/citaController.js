const prisma = require('../config/database');

async function obtenerCita(req, res) {
    try {
        const cita = await prisma.cita.findMany();
        res.json(cita);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la cita'});
    }
}

async function crearCita(req, res) {
    const { id_cita, fecha, hora, lugar, numero_documento_paciente, numero_documento_profesional, numero_documento_practicante } = req.body;

    try {
        const cita = await prisma.cita.create({
            data: {
                id_cita,                      
                fecha,                        
                hora,                         
                lugar,                       
                numero_documento_paciente,    
                numero_documento_profesional, 
                numero_documento_practicante
            }
        });
        res.status(201).json(cita);
    } catch(error) {
        res.status(500).json({error: 'Errir al crear la cita'})
    }
}

module.exports = {obtenerCita, crearCita};