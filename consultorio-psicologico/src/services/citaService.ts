import api from './api'

export const obtenerCitas = async () => {
  const response = await api.get('/citas')
  return response.data
}

export const agregarCita = async (cita: any) => {
  const response = await api.post('/citas', cita)
  return response.data
}