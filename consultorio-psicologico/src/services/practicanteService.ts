import api from './api'

export const obtenerPracticantes = async () => {
  const response = await api.get('/practicantes')
  return response.data
}

export const agregarPracticante = async (practicante: any) => {
  const response = await api.post('/practicantes', practicante)
  return response.data
}