<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12">
    <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6">Información de la Persona</h1>
      
      <!-- Mostrar la información de la persona -->
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
          <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Actualizar Persona
          </button>
        </form>
        
        <!-- Historial clínico -->
        <div v-if="tipo === 'Paciente'" class="mt-6">
          <h2 class="text-xl font-bold mb-4">Historial Clínico</h2>
          <ul v-if="historialClinico.length > 0" class="space-y-4">
            <li
              v-for="(registro, index) in historialClinico"
              :key="index"
              class="p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <p><strong>Fecha:</strong> {{ registro.fecha }}</p>
              <p><strong>Descripción:</strong> {{ registro.descripcion }}</p>
              <p><strong>Diagnóstico:</strong> {{ registro.diagnostico }}</p>
            </li>
          </ul>
          <p v-else class="text-gray-500">Este paciente no tiene historial clínico registrado.</p>
        </div>
      </div>
      
      <!-- Mensajes de error o carga -->
      <div v-else-if="error" class="text-red-500 font-semibold">
        {{ error }}
      </div>
      <div v-else>
        <p class="text-gray-500">Cargando información...</p>
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
    const historialClinico = ref<any[]>([]);
    const error = ref<string | null>(null);

    const formatKey = (key: string) =>
      key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    onMounted(async () => {
      const cedula = route.params.cedula?.toString() ?? '';
      try {
        const response = await getPersonaByCedula(cedula);
        persona.value = response.data.data;
        tipo.value = response.data.tipo === 'personal' ? 'Personal' : 'Paciente';
        if (tipo.value === 'Paciente') {
          historialClinico.value = response.data.historialClinico || [];
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
