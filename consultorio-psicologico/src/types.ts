import { NumericLiteral } from "typescript";

export interface Paciente {
  numero_documento: number;
  tipo_documento: string;
  nombre: string;
  telefono: string;
  genero: string;
  estrato: string;
  barrio: string;
  localidad: string;
  escolaridad: string;
  disponibilidad: string;
}

export interface Cita {
  id_cita: number;
  fecha: string;
  hora: string;
  lugar: string;
  pacienteId: number;
  personalId: number;
  consultorioId: number;
}

export interface Personal {
  numero_documento: number;
  tipo_documento: string;
  nombre: string;
  genero: string;
  estrato: string;
  barrio: string;
  localidad: string;
  es_profesional: boolean;
  turno: string;  // Este campo ahora es obligatorio siempre
}

export interface HistorialClinico {
  motivo_consulta: string;
  remitido: string;
  diagnostico: string;
  tratamiento: string;
  estado_proceso: string;
}



