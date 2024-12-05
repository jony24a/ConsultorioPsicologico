import axios from 'axios';
import { Paciente, Personal, Cita, HistorialClinico } from '../types';

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
// Crea un nuevo paciente
export const createPaciente = (paciente: Paciente) => api.post('/pacientes', paciente);
// Obtiene todos los pacientes
export const getPacientes = () => api.get<Paciente[]>('/pacientes');
// Actualiza un paciente por número de documento
export const updatePaciente = (numeroDocumento: string, paciente: Paciente) =>
  api.put(`/pacientes/${numeroDocumento}`, paciente);

// ** Endpoints para Personal (Profesionales y Practicantes)**
// Obtiene todos los profesionales o practicantes
export const getPersonal = () => api.get<Personal[]>('/personal');
// Crea un nuevo profesional o practicante
export const createPersonal = (personal: Personal) => api.post<Personal>('/personal', personal);
// Actualiza un profesional o practicante por número de documento
export const updatePersonal = (numeroDocumento: string, personal: Personal) =>
  api.put(`/personal/${numeroDocumento}`, personal);

// ** Endpoint para obtener una persona por cédula (paciente o personal) **
export const getPersonaByCedula = (numeroDocumento: string) =>
  api.get<{
    tipo: 'paciente' | 'personal';
    data: Paciente | Personal;
    historialClinico?: HistorialClinico[];  // Historial clínico solo si es paciente
  }>(`/persona/${numeroDocumento}`).then((response) => {
    // Si es paciente, devuelve su historial clínico en un formato esperado
    if (response.data.tipo === 'paciente' && response.data.historialClinico) {
      response.data.historialClinico = response.data.historialClinico.length > 0 ? response.data.historialClinico : [];
    }
    return response;
  });

// ** Endpoint para obtener el historial clínico por cédula (solo pacientes) **
export const getHistorialClinico = (numeroDocumento: string) =>
  api.get<HistorialClinico[]>(`/persona/${numeroDocumento}/historial`).then((response) => {
    return response.data.length > 0 ? response.data : [];  // Devuelve un array vacío si no hay historial
  });

// ** Endpoint para actualizar una persona (paciente o personal) **
export const updatePersona = (numeroDocumento: string, persona: Paciente | Personal) => {
  if ('tipo_documento' in persona && 'telefono' in persona) {
    // Si la persona tiene 'tipo_documento' y 'telefono', es un Paciente
    console.log('Actualizando Paciente:', persona);
    return updatePaciente(numeroDocumento, persona as Paciente);
  } else if ('es_profesional' in persona) {
    // Si la persona tiene 'es_profesional', es Personal
    console.log('Actualizando Personal:', persona);
    return updatePersonal(numeroDocumento, persona as Personal);
  } else {
    console.error('Tipo de persona no reconocido para actualización:', persona);
    throw new Error('Tipo de persona no reconocido para actualización');
  }
};

// ** Endpoints para Citas **
// Obtiene todas las citas
export const getCitas = () => api.get<Cita[]>('/citas');
// Crea una nueva cita
export const createCita = (cita: Cita) => api.post<Cita>('/citas', cita);

export default api;
