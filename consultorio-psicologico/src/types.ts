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

// Adaptación del esquema de Prisma para el personal
// types.ts
// types.ts
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


