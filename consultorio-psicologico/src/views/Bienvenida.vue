<template>
  <div class="min-h-screen bg-gray">
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto"> 
        <!-- Title Section -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">
            Bienvenido al Sistema de Gestión del Consultorio Psicológico
          </h2>
          <p class="text-gray-600">
            Seleccione una opción del menu para comenzar
          </p>
        </div>

        <!-- Search Section (Arriba) -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold mb-4 text-center">
            Buscar Persona por Cédula
          </h3>
          <div class="flex gap-2 max-w-2xl mx-auto">
            <input
              v-model="numeroDocumento"
              type="text"
              placeholder="Ingrese el número de cédula"
              class="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-950"
            />
            <button
              @click="buscarPersona"
              class="px-6 py-2 bg-teal-900 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>

        <!-- Button Grid Container (Con cuadro) -->
        <div class="p-8 border-2 border-blue-950 rounded-md">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button
              @click="goTo('AgregarPaciente')"
              class="p-4 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
            >
              Agregar Paciente
            </button>
            <button
              @click="goTo('AgregarPersonal')"
              class="p-4 bg-teal-900 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Agregar Personal
            </button>
            <button
              @click="goTo('Calendario')"
              class="p-4 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
            >
              Calendario
            </button>
            <button
              @click="goTo('HistorialClinico')"
              class="p-4 bg-teal-900 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Historial Clínico
            </button>
            <button
              @click="goTo('ListadoPacientes')"
              class="p-4 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
            >
              Listado de Pacientes
            </button>
            <button
              @click="goTo('VerHistorialClinico')"
              class="p-4 bg-teal-900 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Ver Historial Clínico
            </button>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Bienvenida',
  setup() {
    const router = useRouter();
    const numeroDocumento = ref('');

    // Función para redirigir a diferentes vistas
    const goTo = (viewName: string) => {
      router.push({ name: viewName });
    };

    // Función para buscar persona
    const buscarPersona = () => {
      if (numeroDocumento.value.trim() === '') {
        alert('Por favor, ingrese un número de cédula.');
        return;
      }
      router.push({ name: 'VerPersona', params: { cedula: numeroDocumento.value } });
    };

    return { goTo, numeroDocumento, buscarPersona };
  },
});
</script>

<style scoped>
/* Estilos opcionales */
</style>
