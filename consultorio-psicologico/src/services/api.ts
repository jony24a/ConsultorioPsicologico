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

// Endpoint para actualizar Paciente
export const updatePaciente = (numeroDocumento: string, paciente: Paciente) =>
  api.put(`/pacientes/${numeroDocumento}`, paciente);

// Endpoints para Personal
export const getPersonal = () => api.get<Personal[]>('/personal');
export const createPersonal = (personal: Personal) => api.post<Personal>('/personal', personal);

// Endpoint para actualizar Personal
export const updatePersonal = (numeroDocumento: string, personal: Personal) =>
  api.put(`/personal/${numeroDocumento}`, personal);

// Nuevo Endpoint para actualizar Persona (Paciente o Personal)
export const updatePersona = (numeroDocumento: string, persona: Paciente | Personal) => {
  // Verificar las propiedades del objeto antes de realizar la actualización
  console.log('persona:', persona); // Esto nos ayudará a verificar el objeto que estamos recibiendo

  if ('telefono' in persona) {
    // Si tiene 'telefono', es un Paciente
    console.log('Actualizando Paciente:', persona); // Verificar si es Paciente
    return updatePaciente(numeroDocumento, persona as Paciente);
  } else if ('es_profesional' in persona) {
    // Si tiene 'es_profesional', es Personal
    console.log('Actualizando Personal:', persona); // Verificar si es Personal
    return updatePersonal(numeroDocumento, persona as Personal);
  } else {
    // Si no tiene propiedades específicas, lanzar un error o manejar el caso
    throw new Error('Tipo de persona no reconocido');
  }
};

// Endpoints para obtener la persona por cédula
export const getPersonaByCedula = (numeroDocumento: string) =>
  api.get<{ tipo: 'paciente' | 'personal'; data: Paciente | Personal }>(`/persona/${numeroDocumento}`);

// Endpoints para Citas
export const getCitas = () => api.get<Cita[]>('/citas');
export const createCita = (cita: Cita) => api.post<Cita>('/citas', cita);

export default api;
