<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12">
    <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6">Información de la Persona</h1>
      <div v-if="persona">
        <p><strong>Tipo:</strong> {{ tipo }}</p>
        <form @submit.prevent="handleUpdatePersona">
          <div v-for="(value, key) in persona" :key="key" class="mb-4">
            <label :for="key" class="block font-semibold">{{ formatKey(key) }}</label>
            <!-- Excluye el campo numero_documento de la edición -->
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
      </div>
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
    const error = ref<string | null>(null);

    // Formatear claves
    const formatKey = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    // Obtener información desde el backend
    onMounted(async () => {
      const cedula = route.params.cedula?.toString() ?? '';
      try {
        const response = await getPersonaByCedula(cedula);
        persona.value = response.data.data;
        tipo.value = response.data.tipo === 'personal' ? 'Personal' : 'Paciente';
      } catch (err) {
        console.error('Error al buscar persona:', err);
        error.value = 'No se encontró información para esta cédula.';
      }
    });

    // Función para actualizar los datos de la persona
    const handleUpdatePersona = async () => {
      const cedula = route.params.cedula?.toString() ?? '';
      if (!persona.value) {
        alert('Datos de la persona no cargados correctamente.');
        return;
      }
      try {
        await updatePersona(cedula, persona.value);
        alert('Persona actualizada con éxito.');
        router.push('/'); // Cambia la ruta según sea necesario
      } catch (err) {
        console.error('Error al actualizar persona:', err);
        alert('Hubo un error al actualizar la persona.');
      }
    };

    return { persona, tipo, formatKey, error, handleUpdatePersona };
  },
});
</script>

<style scoped>
/* Estilos opcionales */
</style>
