<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center uppercase mb-8">
          Crear Historial Clínico
        </h2>
        <form @submit.prevent="crearHistorialClinicoHandler">
          <!-- Contenedor con diseño de cuadrícula -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Campos del formulario -->
            <div>
              <label for="motivo_consulta" class="block text-sm font-medium text-gray-900">
                Motivo de Consulta
              </label>
              <input
                v-model="motivo_consulta"
                id="motivo_consulta"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label for="remitido" class="block text-sm font-medium text-gray-900">
                Remitido
              </label>
              <input
                v-model="remitido"
                id="remitido"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              />
            </div>

            <div class="md:col-span-2">
              <label for="diagnostico" class="block text-sm font-medium text-gray-900">
                Diagnóstico
              </label>
              <textarea
                v-model="diagnostico"
                id="diagnostico"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label for="tratamiento" class="block text-sm font-medium text-gray-900">
                Tratamiento
              </label>
              <textarea
                v-model="tratamiento"
                id="tratamiento"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              ></textarea>
            </div>

            <div>
              <label for="estado_proceso" class="block text-sm font-medium text-gray-900">
                Estado de Proceso
              </label>
              <input
                v-model="estado_proceso"
                id="estado_proceso"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label for="pacienteId" class="block text-sm font-medium text-gray-900">
                Paciente (Número de Documento)
              </label>
              <input
                v-model="pacienteId"
                id="pacienteId"
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label for="citaId" class="block text-sm font-medium text-gray-900">
                Cita ID
              </label>
              <input
                v-model="citaId"
                id="citaId"
                type="number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full mt-6 px-4 py-2 bg-teal-900 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:shadow-outline"
          >
            Crear Historial Clínico
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button
            @click="goToVerHistorial"
            class="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline"
          >
            Ver Historial Clínico
          </button>
          <button 
            @click="goToBienvenida"
            class="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline"
          >
            Menu Principal
          </button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
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

    const router = useRouter();

    const goToVerHistorial = () => {
      router.push({ name: 'VerHistorialClinico' })
    }

    const goToBienvenida = () => {
      router.push({ name: 'Bienvenida' })
    }

    return {
      motivo_consulta,
      remitido,
      diagnostico,
      tratamiento,
      estado_proceso,
      pacienteId,
      citaId,
      crearHistorialClinicoHandler,
      goToVerHistorial,
      goToBienvenida
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

</style>
