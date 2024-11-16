<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Crear Historial Clínico</h2>
      
      <form @submit.prevent="crearHistorialClinicoHandler">
        <!-- Campos del formulario -->
        <div class="mb-4">
          <label for="motivo_consulta" class="block text-sm font-medium text-gray-700">Motivo de Consulta</label>
          <input
            v-model="motivo_consulta"
            id="motivo_consulta"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="remitido" class="block text-sm font-medium text-gray-700">Remitido</label>
          <input
            v-model="remitido"
            id="remitido"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="diagnostico" class="block text-sm font-medium text-gray-700">Diagnóstico</label>
          <textarea
            v-model="diagnostico"
            id="diagnostico"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
  
        <div class="mb-4">
          <label for="tratamiento" class="block text-sm font-medium text-gray-700">Tratamiento</label>
          <textarea
            v-model="tratamiento"
            id="tratamiento"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
  
        <div class="mb-4">
          <label for="estado_proceso" class="block text-sm font-medium text-gray-700">Estado de Proceso</label>
          <input
            v-model="estado_proceso"
            id="estado_proceso"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="pacienteId" class="block text-sm font-medium text-gray-700">Paciente (Número de Documento)</label>
          <input
            v-model="pacienteId"
            id="pacienteId"
            type="number"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="citaId" class="block text-sm font-medium text-gray-700">Cita ID</label>
          <input
            v-model="citaId"
            id="citaId"
            type="number"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Crear Historial Clínico
        </button>
      </form>
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
  