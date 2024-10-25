import React from 'react';
import { Link } from 'react-router-dom';

const Bienvenida = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl mb-4">Bienvenido al Consultorio Psicológico</h1>
            <p className="mb-4">Selecciona una opción para continuar:</p>
            <Link to="/agregar-profesional" className="block mb-2 bg-blue-500 text-white p-2 text-center">Agregar Profesional</Link>
            <Link to="/agregar-practicante" className="block mb-2 bg-blue-500 text-white p-2 text-center">Agregar Practicante</Link>
            <Link to="/agregar-paciente" className="block mb-2 bg-blue-500 text-white p-2 text-center">Agregar Paciente</Link>
            <Link to="/calendar" className="block mb-2 bg-blue-500 text-white p-2 text-center">Ver Calendario</Link>
        </div>
    );
};

export default Bienvenida;
