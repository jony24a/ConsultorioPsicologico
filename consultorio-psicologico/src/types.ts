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
  fecha: string;
  hora: string;
  lugar: string;
  numero_documento_paciente: number;
  numero_documento_profesional?: number;
  numero_documento_practicante?: number;
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



