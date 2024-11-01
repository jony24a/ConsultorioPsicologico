import axios from 'axios';
import { Paciente, Practicante, Profesional, Cita } from '../types';

const API_URL = 'http://localhost:3000/api'; // Adjust this to your API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPacientes = () => api.get<Paciente[]>('/pacientes');
export const createPaciente = (paciente: Paciente) => api.post<Paciente>('/pacientes', paciente);

export const getPracticantes = () => api.get<Practicante[]>('/practicantes');
export const createPracticante = (practicante: Practicante) => api.post<Practicante>('/practicantes', practicante);

export const getProfesionales = () => api.get<Profesional[]>('/profesionales');
export const createProfesional = (profesional: Profesional) => api.post<Profesional>('/profesionales', profesional);

export const getCitas = () => api.get<Cita[]>('/citas');
export const createCita = (cita: Cita) => api.post<Cita>('/citas', cita);

// No me la toque
export default api;