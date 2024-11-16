<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="container mx-auto p-4">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
          <h2 class="text-3x1 font-bold text-center uppercase mb-8">
            Crear Historial Clínico
          </h2>
          <form @submit.prevent="crearHistorialClinicoHandler">
        <!-- Campos del formulario -->
          <div class="mb-6">
            <label for="motivo_consulta" class="block text-sm font-medium text-gray-900">Motivo de Consulta</label>
            <input
              v-model="motivo_consulta"
              id="motivo_consulta"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="remitido" class="block text-sm font-medium text-gray-700">Remitido</label>
            <input
              v-model="remitido"
              id="remitido"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="diagnostico" class="block text-sm font-medium text-gray-700">Diagnóstico</label>
            <textarea
              v-model="diagnostico"
              id="diagnostico"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            ></textarea>
          </div>
  
          <div class="mb-4">
            <label for="tratamiento" class="block text-sm font-medium text-gray-700">Tratamiento</label>
            <textarea
              v-model="tratamiento"
              id="tratamiento"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            ></textarea>
          </div>
  
          <div class="mb-4">
            <label for="estado_proceso" class="block text-sm font-medium text-gray-700">Estado de Proceso</label>
            <input
              v-model="estado_proceso"
              id="estado_proceso"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="pacienteId" class="block text-sm font-medium text-gray-700">Paciente (Número de Documento)</label>
            <input
              v-model="pacienteId"
              id="pacienteId"
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="citaId" class="block text-sm font-medium text-gray-700">Cita ID</label>
            <input
              v-model="citaId"
              id="citaId"
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required
            />
          </div>
  
          <button
            type="submit"
            class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Crear Historial Clínico
          </button>
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { crearHistorialClinico } from '../services/HistorialClinicoService'; // Importamos el servicio
  
  export default defineComponent({
    name: 'CrearHistorialClinico',
    setup() {
      const motivo_consulta = ref('');
      const remitido = ref('');
      const diagnostico = ref('');
      const tratamiento = ref('');
      const estado_proceso = ref('');
      const pacienteId = ref<number | null>(null);
      const citaId = ref<number | null>(null);
  
      // Función que maneja el envío del formulario
      const crearHistorialClinicoHandler = async () => {
        try {
          await crearHistorialClinico(
            motivo_consulta.value,
            remitido.value,
            diagnostico.value,
            tratamiento.value,
            estado_proceso.value,
            pacienteId.value!,
            citaId.value!
          );
  
          // Limpiar el formulario después de enviarlo
          motivo_consulta.value = '';
          remitido.value = '';
          diagnostico.value = '';
          tratamiento.value = '';
          estado_proceso.value = '';
          pacienteId.value = null;
          citaId.value = null;
  
          alert('Historial clínico creado con éxito');
        } catch (error) {
          console.error('Error al crear el historial clínico', error);
          alert('Hubo un error al crear el historial clínico');
        }
      };
  
      return {
        motivo_consulta,
        remitido,
        diagnostico,
        tratamiento,
        estado_proceso,
        pacienteId,
        citaId,
        crearHistorialClinicoHandler,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos opcionales para mejorar la apariencia */
  form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  