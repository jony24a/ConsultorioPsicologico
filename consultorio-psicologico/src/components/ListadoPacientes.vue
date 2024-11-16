<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-7xl w-full mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8 uppercase text-gray-800">Listado de Pacientes</h2>
        
        <!-- Lista de pacientes -->
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-200">
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Número de Documento</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Tipo de Documento</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Nombre</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Teléfono</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Género</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Estrato</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Barrio</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Localidad</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Escolaridad</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Disponibilidad</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="paciente in pacientes" 
                :key="paciente.numero_documento" 
                class="hover:bg-gray-100"
              >
                <td class="px-4 py-2 border border-gray-300">{{ paciente.numero_documento }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.tipo_documento }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.nombre }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.telefono }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.genero }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.estrato }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.barrio }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.localidad }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.escolaridad }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ paciente.disponibilidad }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getPacientes } from '../services/api';
  import { Paciente } from '../types';
  
  export default defineComponent({
    name: 'ListadoPacientes',
    setup() {
      const pacientes = ref<Paciente[]>([]);
  
      // Obtener pacientes al montar el componente
      onMounted(async () => {
        try {
          const response = await getPacientes();
          pacientes.value = response.data;
        } catch (error) {
          console.error('Error al obtener pacientes:', error);
        }
      });
  
      return {
        pacientes,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos adicionales para mejorar la apariencia */
  th, td {
    text-align: left;
    white-space: nowrap;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  