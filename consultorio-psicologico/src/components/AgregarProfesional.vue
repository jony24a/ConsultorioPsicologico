<template>
  <div>
    <h2>Agregar Profesional</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="tipo_documento">Tipo de Documento:</label>
        <input v-model="profesional.tipo_documento" id="tipo_documento" required />
      </div>
      <div>
        <label for="numero_documento">Número de Documento:</label>
        <input v-model.number="profesional.numero_documento" id="numero_documento" type="number" required />
      </div>
      <div>
        <label for="nombre">Nombre:</label>
        <input v-model="profesional.nombre" id="nombre" required />
      </div>
      <div>
        <label for="genero">Género:</label>
        <input v-model="profesional.genero" id="genero" required />
      </div>
      <div>
        <label for="estrato">Estrato:</label>
        <input v-model="profesional.estrato" id="estrato" required />
      </div>
      <div>
        <label for="barrio">Barrio:</label>
        <input v-model="profesional.barrio" id="barrio" required />
      </div>
      <div>
        <label for="localidad">Localidad:</label>
        <input v-model="profesional.localidad" id="localidad" required />
      </div>
      <button type="submit">Agregar Profesional</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Profesional } from '../types';
import { createProfesional } from '../services/api';

export default defineComponent({
  name: 'AgregarProfesional',
  setup() {
    const profesional = ref<Profesional>({
      numero_documento: 0,
      tipo_documento: '',
      nombre: '',
      genero: '',
      estrato: '',
      barrio: '',
      localidad: '',
    });

    const submitForm = async () => {
      try {
        await createProfesional(profesional.value);
        alert('Profesional agregado exitosamente');
        // Reset form
        profesional.value = {
          numero_documento: 0,
          tipo_documento: '',
          nombre: '',
          genero: '',
          estrato: '',
          barrio: '',
          localidad: '',
        };
      } catch (error) {
        console.error('Error al agregar profesional:', error);
        alert('Error al agregar profesional');
      }
    };

    return {
      profesional,
      submitForm,
    };
  },
});
</script>