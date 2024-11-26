<template>
    <div class="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12">
      <h1 class="text-4xl font-bold mb-6">Detalles de la Persona</h1>
  
      <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <div v-if="persona">
          <p><strong>Nombre:</strong> {{ persona.nombre }}</p>
          <p><strong>Número de Documento:</strong> {{ persona.numero_documento }}</p>
          <p><strong>Tipo de Documento:</strong> {{ persona.tipo_documento }}</p>
          <p><strong>Teléfono:</strong> {{ persona.telefono }}</p>
          <p><strong>Género:</strong> {{ persona.genero }}</p>
          <p><strong>Estrato:</strong> {{ persona.estrato }}</p>
          <p><strong>Barrio:</strong> {{ persona.barrio }}</p>
          <p><strong>Localidad:</strong> {{ persona.localidad }}</p>
          <p><strong>Escolaridad:</strong> {{ persona.escolaridad }}</p>
          <p><strong>Disponibilidad:</strong> {{ persona.disponibilidad }}</p>
        </div>
        <div v-else>
          <p>Cargando datos...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    name: 'PersonaDetalle',
    setup() {
      const route = useRoute();
      const persona = ref(null);
      const documento = route.query.documento as string;
  
      // Función para obtener los detalles de la persona
      const fetchPersonDetails = async () => {
        if (documento) {
          try {
            // Llamada al backend para obtener la persona con el documento
            const response = await fetch(`/api/personas/${documento}`);
            if (response.ok) {
              persona.value = await response.json();
            } else {
              console.error('Error al obtener los datos de la persona');
            }
          } catch (error) {
            console.error('Error en la consulta a la API:', error);
          }
        }
      };
  
      onMounted(() => {
        fetchPersonDetails();
      });
  
      return { persona };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  