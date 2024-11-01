<template>
<<<<<<< HEAD
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center uppercase mb-8">Agregar Profesional</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-6">
            <label for="tipo_documento" class="block mb-2 text-sm font-medium text-gray-900">Tipo de Documento:</label>
            <input v-model="profesional.tipo_documento" id="tipo_documento" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="numero_documento" class="block mb-2 text-sm font-medium text-gray-900">Número de Documento:</label>
            <input v-model.number="profesional.numero_documento" id="numero_documento" type="number" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
            <input v-model="profesional.nombre" id="nombre" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="genero" class="block mb-2 text-sm font-medium text-gray-900">Género:</label>
            <input v-model="profesional.genero" id="genero" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="estrato" class="block mb-2 text-sm font-medium text-gray-900">Estrato:</label>
            <input v-model="profesional.estrato" id="estrato" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="barrio" class="block mb-2 text-sm font-medium text-gray-900">Barrio:</label>
            <input v-model="profesional.barrio" id="barrio" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="localidad" class="block mb-2 text-sm font-medium text-gray-900">Localidad:</label>
            <input v-model="profesional.localidad" id="localidad" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <button type="submit" class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline">Agregar Profesional</button>
        </form>
      </div>
    </div>
=======
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
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
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
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
