<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12">
      <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-6">Información de la Persona</h1>
        <div v-if="persona">
          <p><strong>Tipo:</strong> {{ tipo }}</p>
          <form @submit.prevent="updatePersona">
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
  import { getPersonaByCedula, updatePersona } from '../services/api'; // Importar funciones de la API
  
  export default defineComponent({
    name: 'VerPersona',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const persona = ref<any | null>(null);
      const tipo = ref<string | null>(null);
      const error = ref<string | null>(null);
  
      // Función para formatear claves (opcional)
      const formatKey = (key: string) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      };
  
      // Obtener la información desde el backend
      onMounted(async () => {
        const cedula = route.params.cedula?.toString() ?? ''; // Convierte a string o usa cadena vacía si es undefined
  
        try {
          const response = await getPersonaByCedula(cedula);
          persona.value = response.data.data; // Asume que los datos están en response.data.data
          tipo.value = response.data.tipo === 'personal' ? 'Personal' : 'Paciente';
        } catch (err) {
          console.error('Error al buscar persona:', err);
          error.value = 'No se encontró información para esta cédula.';
        }
      });
  
      // Función para actualizar la persona
      const updatePersona = async () => {
        const cedula = route.params.cedula?.toString() ?? ''; // Obtener cédula de la URL
        try {
          await updatePersona(cedula, persona.value); // Llamada a la API para actualizar los datos
          alert('Persona actualizada con éxito');
          router.push('/'); // Redirigir después de la actualización (puedes ajustar esta ruta)
        } catch (err) {
          console.error('Error al actualizar persona:', err);
          alert('Hubo un error al actualizar la persona');
        }
      };
  
      return { persona, tipo, formatKey, error, updatePersona };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  