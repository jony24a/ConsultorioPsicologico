import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AgregarProfesional from './components/AgregarProfesional';
import AgregarPracticante from './components/AgregarPracticante';
import AgregarPaciente from './components/AgregarPaciente';
import Bienvenida from './components/Bienvenida';
import Calendar from './components/Calendar';

const App = () => {
    return (
        <Router>
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Bienvenida />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/agregar-profesional" element={<AgregarProfesional />} />
                    <Route path="/agregar-practicante" element={<AgregarPracticante />} />
                    <Route path="/agregar-paciente" element={<AgregarPaciente />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
