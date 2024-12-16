import api from './api';

// Definir la interfaz para el tipo Cita
export interface Cita {
  id_cita?: number; // Opcional al crear
  fecha: string;
  hora: string;
  pacienteId: number;
  personalId?: number; // Si aplica
  descripcion?: string;
}

// Obtener todas las citas
export const obtenerCitas = async (): Promise<Cita[]> => {
  try {
    const response = await api.get('/citas');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener las citas:', error.response?.data || error.message);
    throw new Error('No se pudieron obtener las citas. Inténtalo de nuevo más tarde.');
  }
};

// Agregar una nueva cita
export const agregarCita = async (cita: Cita): Promise<Cita> => {
  try {
    const response = await api.post('/citas', cita);
    return response.data;
  } catch (error: any) {
    console.error('Error al agregar la cita:', error.response?.data || error.message);
    throw new Error('No se pudo agregar la cita. Revisa los datos e inténtalo nuevamente.');
  }
};

// Actualizar una cita existente
export const editarCita = async (id_cita: number, cita: Cita): Promise<Cita> => {
  try {
    const response = await api.put(`/citas/${id_cita}`, cita);
    return response.data;
  } catch (error: any) {
    console.error(`Error al actualizar la cita con ID ${id_cita}:`, error.response?.data || error.message);
    throw new Error(`No se pudo actualizar la cita con ID ${id_cita}.`);
  }
};

// Eliminar una cita
export const eliminarCita = async (id_cita: number): Promise<void> => {
  try {
    await api.delete(`/citas/${id_cita}`);
  } catch (error: any) {
    console.error(`Error al eliminar la cita con ID ${id_cita}:`, error.response?.data || error.message);
    throw new Error(`No se pudo eliminar la cita con ID ${id_cita}.`);
  }
};
