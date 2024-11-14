import axios from 'axios';
import { Personal } from '../types';

const API_URL = 'http://localhost:3000/api/personal'; // Asegúrate de que esta URL coincida con tu backend

// Función para agregar un nuevo personal (practicante o profesional)
export const agregarPersonal = async (personal: Personal) => {
  try {
    const response = await axios.post(API_URL, personal);
    return response.data;
  } catch (error) {
    console.error('Error al agregar personal:', error);
    throw error;
  }
};
