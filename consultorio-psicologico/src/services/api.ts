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

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error.response || error.message);
    return Promise.reject(error);
  }
);

// ** Endpoints para Pacientes **
export const createPaciente = (paciente: Paciente) => api.post('/pacientes', paciente);
export const getPacientes = () => api.get<Paciente[]>('/pacientes');
export const updatePaciente = (numeroDocumento: string, paciente: Paciente) =>
  api.put(`/pacientes/${numeroDocumento}`, paciente);

// ** Endpoints para Personal **
export const getPersonal = () => api.get<Personal[]>('/personal');
export const createPersonal = (personal: Personal) => api.post<Personal>('/personal', personal);
export const updatePersonal = (numeroDocumento: string, personal: Personal) =>
  api.put(`/personal/${numeroDocumento}`, personal);

// ** Endpoint para actualizar Persona (Paciente o Personal) **
export const updatePersona = (numeroDocumento: string, persona: Paciente | Personal) => {
  if ('tipo_documento' in persona && 'telefono' in persona) {
    // Es un Paciente si tiene 'telefono' y 'tipo_documento'
    console.log('Actualizando Paciente:', persona);
    return updatePaciente(numeroDocumento, persona as Paciente);
  } else if ('es_profesional' in persona) {
    // Es Personal si tiene 'es_profesional'
    console.log('Actualizando Personal:', persona);
    return updatePersonal(numeroDocumento, persona as Personal);
  } else {
    console.error('Tipo de persona no reconocido para actualización:', persona);
    throw new Error('Tipo de persona no reconocido para actualización');
  }
};

// ** Endpoint para obtener una persona y su historial clínico por número de documento **
export const getPersonaByCedula = (numeroDocumento: string) =>
  api.get<{
    tipo: 'paciente' | 'personal';
    data: Paciente | Personal;
    historialClinico?: any[]; // Solo estará presente si es un paciente
  }>(`/persona/${numeroDocumento}`);

// ** Endpoints para Citas **
export const getCitas = () => api.get<Cita[]>('/citas');
export const createCita = (cita: Cita) => api.post<Cita>('/citas', cita);

export default api;
