import api from './api'


// Definir la interfaz para el tipo Cita
export interface Cita {
  id_cita?: number // Opcional al crear
  fecha: string
  hora: string
  pacienteId: number
  descripcion?: string
}

// Obtener todas las citas
export const obtenerCitas = async (): Promise<Cita[]> => {
  try {
    const response = await api.get('/api/citas') // Ruta ajustada al prefijo del backend
    return response.data
  } catch (error) {
    console.error('Error al obtener las citas:', error)
    throw error // Propagar el error para manejarlo donde se llama
  }
}

// Agregar una nueva cita
export const agregarCita = async (cita: Cita): Promise<Cita> => {
  try {
    const response = await api.post('/api/citas', cita);
    return response.data;
  } catch (error: any) {
    console.error('Error al agregar la cita:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar una cita existente
export const editarCita = async (id_cita: number, cita: Cita): Promise<Cita> => {
  try {
    const response = await api.put(`/api/citas/${id_cita}`, cita)
    return response.data
  } catch (error) {
    console.error(`Error al actualizar la cita con ID ${id_cita}:`, error)
    throw error
  }
}

// Eliminar una cita
export const eliminarCita = async (id_cita: number): Promise<void> => {
  try {
    await api.delete(`/api/citas/${id_cita}`)
  } catch (error) {
    console.error(`Error al eliminar la cita con ID ${id_cita}:`, error)
    throw error
  }
}
