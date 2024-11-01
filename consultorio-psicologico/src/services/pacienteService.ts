import api from './api'

export const obtenerPacientes = async () => {
  const response = await api.get('/pacientes')
  return response.data
}

export const agregarPaciente = async (paciente: any) => {
  const response = await api.post('/pacientes', paciente)
  return response.data
}