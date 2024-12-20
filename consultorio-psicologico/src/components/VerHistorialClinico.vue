<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-7xl w-full mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8 uppercase text-gray-800">Listado de Historiales Clínicos</h2>
        
        <!-- Tabla de Historiales Clínicos -->
        <div class="mb-10">
          <div class="overflow-x-auto">
            <table class="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">ID</th>
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">Motivo Consulta</th>
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">Remitido</th>
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">Diagnóstico</th>
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">Tratamiento</th>
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">Estado del Proceso</th>
                  <th class="px-4 py-2 border border-gray-300 text-gray-700">Paciente ID</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="historial in historiales" 
                  :key="historial.id" 
                  class="hover:bg-gray-100"
                >
                  <td class="px-4 py-2 border border-gray-300">{{ historial.id }}</td>
                  <td class="px-4 py-2 border border-gray-300">{{ historial.motivo_consulta }}</td>
                  <td class="px-4 py-2 border border-gray-300">{{ historial.remitido }}</td>
                  <td class="px-4 py-2 border border-gray-300">{{ historial.diagnostico }}</td>
                  <td class="px-4 py-2 border border-gray-300">{{ historial.tratamiento }}</td>
                  <td class="px-4 py-2 border border-gray-300">{{ historial.estado_proceso }}</td>
                  <td class="px-4 py-2 border border-gray-300">{{ historial.pacienteId }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="mt-8 text-center">
          <button
            @click="goToBienvenida"
            class="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline"
          >
            Volver al Menu Principal
          </button>  
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { obtenerHistorialesClinicos } from '../services/HistorialClinicoService';
  
  export default defineComponent({
    name: 'VerHistorialClinico',
    setup() {
      const historiales = ref([]);
      const router = useRouter();
  
      // Función para obtener los historiales clínicos del backend
      const cargarHistorialesClinicos = async () => {
        try {
          const datos = await obtenerHistorialesClinicos();
          historiales.value = datos;
        } catch (error) {
          console.error('Error al cargar los historiales clínicos', error);
          alert('Hubo un error al cargar los historiales clínicos');
        }
      };

      const goToBienvenida = () => {
        router.push({ name: 'Bienvenida' });
      };
  
      onMounted(cargarHistorialesClinicos);
  
      return {
        historiales,
        goToBienvenida,
      };
    },
  });
  </script>
  
  <style scoped>
  th, td {
    text-align: left;
    white-space: nowrap;
  }
  
  th {
    background-color: #f3f4f6;
    color: #333;
    padding: 12px;
  }
  
  td {
    padding: 12px;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9fafb;
  }
  
  .table-auto {
    border-collapse: collapse;
    width: 100%;
  }
  
  .hover\:bg-gray-100:hover {
    background-color: #f1f5f9;
  }
  </style>
  