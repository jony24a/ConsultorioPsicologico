import axios from 'axios';
import { Paciente, Personal, Cita } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Endpoints para Pacientes
export const createPaciente = (paciente: Paciente) => api.post('/pacientes', paciente);
export const getPacientes = () => api.get<Paciente[]>('/pacientes');

// Nuevo Endpoint para actualizar Paciente
export const updatePaciente = (numeroDocumento: string, paciente: Paciente) => 
  api.put(`/pacientes/${numeroDocumento}`, paciente);

// Endpoints para Personal
export const getPersonal = () => api.get<Personal[]>('/personal');
export const createPersonal = (personal: Personal) => api.post<Personal>('/personal', personal);

// Nuevo Endpoint para actualizar Personal
export const updatePersonal = (numeroDocumento: string, personal: Personal) => 
  api.put(`/personal/${numeroDocumento}`, personal);

// Endpoints para Citas
export const getCitas = () => api.get<Cita[]>('/citas');
export const createCita = (cita: Cita) => api.post<Cita>('/citas', cita);

export default api;
