<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-7xl w-full mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8 uppercase text-gray-800">Listado de Datos</h2>
      
      <!-- Lista de Pacientes -->
      <div class="mb-10">
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">Pacientes</h3>
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

      <!-- Lista de Personal -->
      <div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">Personal</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-200">
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Número de Documento</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Tipo de Documento</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Nombre</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Género</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Estrato</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Barrio</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Localidad</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Turno</th>
                <th class="px-4 py-2 border border-gray-300 text-gray-700">Profesional</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="persona in personal" 
                :key="persona.numero_documento" 
                class="hover:bg-gray-100"
              >
                <td class="px-4 py-2 border border-gray-300">{{ persona.numero_documento }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.tipo_documento }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.nombre }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.genero }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.estrato }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.barrio }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.localidad }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.turno }}</td>
                <td class="px-4 py-2 border border-gray-300">{{ persona.es_profesional ? 'Sí' : 'No' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Botón para Volver al Menú Principal -->
      <div class="mt-8 text-center">
        <button 
          @click="goToBienvenida"
          class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
        >
          Volver al Menú Principal
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getPacientes, getPersonal } from '../services/api'; // Suponiendo que tienes este endpoint
import { Paciente, Personal } from '../types';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ListadoPacientes',
  setup() {
    const pacientes = ref<Paciente[]>([]);
    const personal = ref<Personal[]>([]);
    const router = useRouter();

    // Obtener pacientes y personal al montar el componente
    onMounted(async () => {
      try {
        const [pacientesResponse, personalResponse] = await Promise.all([
          getPacientes(),
          getPersonal(),
        ]);
        pacientes.value = pacientesResponse.data;
        personal.value = personalResponse.data;
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    });

    // Función para redirigir al menú principal
    const goToBienvenida = () => {
      router.push({ name: 'Bienvenida' });
    };

    return {
      pacientes,
      personal,
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

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
