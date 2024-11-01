export interface Paciente {
  numero_documento: number;
  tipo_documento: string;
  nombre: string;
  genero: string;
  estrato: string;
  barrio: string;
  localidad: string;
  escolaridad: string;
  numero_documento_practicante?: number;
  numero_documento_profesional?: number;
}

export interface Practicante {
  numero_documento: number;
  tipo_documento: string;
  nombre: string;
  genero: string;
  estrato: string;
  barrio: string;
  localidad: string;
  periodo: string;
  jornada: string;
  ano_matricula: number;
}

export interface Profesional {
  numero_documento: number;
  tipo_documento: string;
  nombre: string;
  genero: string;
  estrato: string;
  barrio: string;
  localidad: string;
}

export interface Cita {
  fecha: string;
  hora: string;
  lugar: string;
  numero_documento_paciente: number;
  numero_documento_profesional?: number;
  numero_documento_practicante?: number;
}