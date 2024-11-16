import axios from 'axios';

const API_URL = 'http://localhost:3000/api/historial-clinico';

// Función para crear un historial clínico
export const crearHistorialClinico = async (
  motivo_consulta: string,
  remitido: string,
  diagnostico: string,
  tratamiento: string,
  estado_proceso: string,
  pacienteId: number,
  citaId: number
) => {
  try {
    const response = await axios.post(API_URL, {
      motivo_consulta,
      remitido,
      diagnostico,
      tratamiento,
      estado_proceso,
      pacienteId,
      citaId,
    });

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    throw new Error('Error al crear el historial clínico');
  }
};
