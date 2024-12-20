<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12">
    <div class="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg flex">
      <!-- Información de la persona -->
      <div class="w-1/2 pr-4 border-r border-gray-300">
        <h1 class="text-2xl font-bold mb-6">Información de la Persona</h1>

        <div v-if="persona">
          <p><strong>Tipo:</strong> {{ tipo }}</p>
          <form @submit.prevent="handleUpdatePersona">
            <div v-for="(value, key) in persona" :key="key" class="mb-4">
              <label :for="key" class="block font-semibold">{{ formatKey(key) }}</label>
              <input
                v-if="key !== 'numero_documento'"
                :id="key"
                v-model="persona[key]"
                type="text"
                class="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
              <p v-else><strong>{{ formatKey(key) }}:</strong> {{ value }}</p>
            </div>
            <button type="submit" class="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline">
              Actualizar Persona
            </button>
          </form>
        </div>

        <div v-else-if="error" class="text-red-500 font-semibold">
          {{ error }}
        </div>
        <div v-else>
          <p class="text-gray-500">Cargando información...</p>
        </div>
      </div>

      <!-- Historial clínico -->
      <div class="w-1/2 pl-4">
        <h2 class="text-2xl font-bold mb-6">Historial Clínico</h2>
        <div v-if="tipo === 'Paciente'">
          <ul v-if="historialClinico.length > 0" class="space-y-4">
            <li
              v-for="(registro, index) in historialClinico"
              :key="index"
              class="p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <p><strong>Motivo de Consulta:</strong> {{ registro.motivo_consulta }}</p>
              <p><strong>Remitido:</strong> {{ registro.remitido }}</p>
              <p><strong>Diagnóstico:</strong> {{ registro.diagnostico }}</p>
              <p><strong>Tratamiento:</strong> {{ registro.tratamiento }}</p>
              <p><strong>Estado del proceso:</strong> {{ registro.estado_proceso }}</p>
            </li>
          </ul>
          <p v-else class="text-gray-500">Este paciente no tiene historial clínico registrado.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPersonaByCedula, updatePersona } from '../services/api';

export default defineComponent({
  name: 'VerPersona',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const persona = ref<Record<string, any> | null>(null);
    const tipo = ref<string | null>(null);
    const historialClinico = ref<any[]>([]); // Inicializa como un arreglo vacío
    const error = ref<string | null>(null);

    const formatKey = (key: string) =>
      key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    onMounted(async () => {
      const cedula = route.params.cedula?.toString() ?? '';
      try {
        const response = await getPersonaByCedula(cedula);
        if (response.data && response.data.data) {
          persona.value = response.data.data;
          tipo.value = response.data.tipo === 'personal' ? 'Personal' : 'Paciente';

          if (tipo.value === 'Paciente') {
            historialClinico.value = response.data.historialClinico || [];
          }
        } else {
          throw new Error('Datos no encontrados');
        }
      } catch (err) {
        console.error('Error al buscar persona:', err);
        error.value = 'No se encontró información para esta cédula.';
      }
    });

    const handleUpdatePersona = async () => {
      if (!persona.value) {
        alert('Datos de la persona no cargados correctamente.');
        return;
      }
      const cedula = route.params.cedula?.toString() ?? '';
      try {
        await updatePersona(cedula, persona.value);
        alert('Persona actualizada con éxito.');
        router.push('/'); // Cambiar la ruta según sea necesario
      } catch (err) {
        console.error('Error al actualizar persona:', err);
        alert('Hubo un error al actualizar la persona.');
      }
    };

    return { persona, tipo, formatKey, historialClinico, error, handleUpdatePersona };
  },
});
</script>

<style scoped>
/* Estilos opcionales */
</style>
