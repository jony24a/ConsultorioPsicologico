import axios from "axios";
import { Paciente } from "../types";

const API_URL = "http://localhost:3000/api/pacientes";

export const agregarPaciente = async (paciente: Paciente) => {
  try {
    const response = await axios.post(API_URL, paciente);
    return response.data;
  } catch (error) {
    console.error("Error al agregar paciente:", error);
    throw error;
  }
};
