import axios from 'axios';

const API_URL = 'http://localhost:3000/api/historial-clinico';

// **Función para crear un historial clínico**
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

// **Función para obtener todos los historiales clínicos**
export const obtenerHistorialesClinicos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve la lista de historiales clínicos
  } catch (error) {
    throw new Error('Error al obtener los historiales clínicos');
  }
};

// **Función para obtener un historial clínico por su ID**
export const obtenerHistorialClinicoPorId = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Devuelve el historial clínico específico
  } catch (error) {
    throw new Error('Error al obtener el historial clínico');
  }
};

// **Función para actualizar un historial clínico**
export const actualizarHistorialClinico = async (
  id: number,
  motivo_consulta: string,
  remitido: string,
  diagnostico: string,
  tratamiento: string,
  estado_proceso: string
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      motivo_consulta,
      remitido,
      diagnostico,
      tratamiento,
      estado_proceso,
    });
    return response.data; // Devuelve el historial clínico actualizado
  } catch (error) {
    throw new Error('Error al actualizar el historial clínico');
  }
};

// **Función para eliminar un historial clínico**
export const eliminarHistorialClinico = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Devuelve la confirmación de eliminación
  } catch (error) {
    throw new Error('Error al eliminar el historial clínico');
  }
};
