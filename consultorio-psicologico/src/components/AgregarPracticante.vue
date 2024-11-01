<template>
  <div>
    <h2>Agregar Practicante</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="tipo_documento">Tipo de Documento:</label>
        <input v-model="practicante.tipo_documento" id="tipo_documento" required />
      </div>
      <div>
        <label for="numero_documento">Número de Documento:</label>
        <input v-model.number="practicante.numero_documento" id="numero_documento" type="number" required />
      </div>
      <div>
        <label for="nombre">Nombre:</label>
        <input v-model="practicante.nombre" id="nombre" required />
      </div>
      <div>
        <label for="genero">Género:</label>
        <input v-model="practicante.genero" id="genero" required />
      </div>
      <div>
        <label for="estrato">Estrato:</label>
        <input v-model="practicante.estrato" id="estrato" required />
      </div>
      <div>
        <label for="barrio">Barrio:</label>
        <input v-model="practicante.barrio" id="barrio" required />
      </div>
      <div>
        <label for="localidad">Localidad:</label>
        <input v-model="practicante.localidad" id="localidad" required />
      </div>
      <div>
        <label for="periodo">Periodo:</label>
        <input v-model="practicante.periodo" id="periodo" required />
      </div>
      <div>
        <label for="jornada">Jornada:</label>
        <input v-model="practicante.jornada" id="jornada" required />
      </div>
      <div>
        <label for="ano_matricula">Año de Matrícula:</label>
        <input v-model.number="practicante.ano_matricula" id="ano_matricula" type="number" required />
      </div>
      <button type="submit">Agregar Practicante</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Practicante } from '../types';
import { createPracticante } from '../services/api';

export default defineComponent({
  name: 'AgregarPracticante',
  setup() {
    const practicante = ref<Practicante>({
      numero_documento: 0,
      tipo_documento: '',
      nombre: '',
      genero: '',
      estrato: '',
      barrio: '',
      localidad: '',
      periodo: '',
      jornada: '',
      ano_matricula: 0,
    });

    const submitForm = async () => {
      try {
        await createPracticante(practicante.value);
        alert('Practicante agregado exitosamente');
        // Reset form
        practicante.value = {
          numero_documento: 0,
          tipo_documento: '',
          nombre: '',
          genero: '',
          estrato: '',
          barrio: '',
          localidad: '',
          periodo: '',
          jornada: '',
          ano_matricula: 0,
        };
      } catch (error) {
        console.error('Error al agregar practicante:', error);
        alert('Error al agregar practicante');
      }
    };

    return {
      practicante,
      submitForm,
    };
  },
});
</script>