<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12">
    <h1 class="text-4xl font-bold mb-6">Bienvenido al Sistema de Gestión del Consultorio Psicológico</h1>
    <p class="text-xl mb-8">Seleccione una opción del menú para comenzar.</p>

    <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <!-- Formulario de botones en columna -->
      <div class="space-y-4">
        <button
          @click="goTo('AgregarPaciente')"
          class="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline text-xl"
        >
          Agregar Paciente
        </button>
        <button
          @click="goTo('AgregarPersonal')"
          class="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline text-xl"
        >
          Agregar Personal
        </button>
        <button
          @click="goTo('Calendario')"
          class="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:shadow-outline text-xl"
        >
          Calendario
        </button>
        <button
          @click="goTo('HistorialClinico')"
          class="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:shadow-outline text-xl"
        >
          Historial Clínico
        </button>
        <button
          @click="goTo('ListadoPacientes')"
          class="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:shadow-outline text-xl"
        >
          Listado de Pacientes
        </button>
        <button
          @click="goTo('VerHistorialClinico')"
          class="w-full px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:shadow-outline text-xl"
        >
          Ver Historial Clínico
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Bienvenida',
  setup() {
    const router = useRouter();

    // Función para redirigir a diferentes vistas
    const goTo = (viewName: string) => {
      router.push({ name: viewName });
    };

    return { goTo };
  },
});
</script>

<style scoped>
/* Estilos opcionales */
</style>
