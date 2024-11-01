<template>
<<<<<<< HEAD
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center uppercase mb-8">Agregar Practicante</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-6">
            <label for="tipo_documento" class="block mb-2 text-sm font-medium text-gray-900">Tipo de Documento:</label>
            <input v-model="practicante.tipo_documento" id="tipo_documento" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="numero_documento" class="block mb-2 text-sm font-medium text-gray-900">Número de Documento:</label>
            <input v-model.number="practicante.numero_documento" id="numero_documento" type="number" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
            <input v-model="practicante.nombre" id="nombre" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="genero" class="block mb-2 text-sm font-medium text-gray-900">Género:</label>
            <input v-model="practicante.genero" id="genero" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="estrato" class="block mb-2 text-sm font-medium text-gray-900">Estrato:</label>
            <input v-model="practicante.estrato" id="estrato" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="barrio" class="block mb-2 text-sm font-medium text-gray-900">Barrio:</label>
            <input v-model="practicante.barrio" id="barrio" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="localidad" class="block mb-2 text-sm font-medium text-gray-900">Localidad:</label>
            <input v-model="practicante.localidad" id="localidad" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="periodo" class="block mb-2 text-sm font-medium text-gray-900">Periodo:</label>
            <input v-model="practicante.periodo" id="periodo" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="jornada" class="block mb-2 text-sm font-medium text-gray-900">Jornada:</label>
            <input v-model="practicante.jornada" id="jornada" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="ano_matricula" class="block mb-2 text-sm font-medium text-gray-900">Año de Matrícula:</label>
            <input v-model.number="practicante.ano_matricula" id="ano_matricula" type="number" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <button type="submit" class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline">Agregar Practicante</button>
        </form>
      </div>
    </div>
=======
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
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
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
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
