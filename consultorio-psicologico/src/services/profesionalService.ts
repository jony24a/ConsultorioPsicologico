import api from './api'

export const obtenerProfesionales = async () => {
  const response = await api.get('/profesionales')
  return response.data
}

export const agregarProfesional = async (profesional: any) => {
  const response = await api.post('/profesionales', profesional)
  return response.data
}