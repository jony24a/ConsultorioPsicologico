<template>
<<<<<<< HEAD
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8 uppercase">Agregar Paciente</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-6">
            <label for="tipo_documento" class="block mb-2 text-sm font-medium text-gray-900">Tipo de Documento:</label>
            <input v-model="paciente.tipo_documento" id="tipo_documento" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="numero_documento" class="block mb-2 text-sm font-medium text-gray-900">Número de Documento:</label>
            <input v-model.number="paciente.numero_documento" id="numero_documento" type="number" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
            <input v-model="paciente.nombre" id="nombre" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="genero" class="block mb-2 text-sm font-medium text-gray-900">Género:</label>
            <input v-model="paciente.genero" id="genero" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="estrato" class="block mb-2 text-sm font-medium text-gray-900">Estrato:</label>
            <input v-model="paciente.estrato" id="estrato" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="barrio" class="block mb-2 text-sm font-medium text-gray-900">Barrio:</label>
            <input v-model="paciente.barrio" id="barrio" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="localidad" class="block mb-2 text-sm font-medium text-gray-900">Localidad:</label>
            <input v-model="paciente.localidad" id="localidad" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label for="escolaridad" class="block mb-2 text-sm font-medium text-gray-900">Escolaridad:</label>
            <input v-model="paciente.escolaridad" id="escolaridad" required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900">Seleccione quién estará a cargo:</label>
            <select v-model="encargado" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
              <option value="practicante">Practicante</option>
              <option value="profesional">Profesional</option>
            </select>
          </div>
          <div v-if="encargado === 'practicante'" class="mb-6">
            <label for="numero_documento_practicante" class="block mb-2 text-sm font-medium text-gray-900">ID Practicante:</label>
            <input v-model.number="paciente.numero_documento_practicante" id="numero_documento_practicante" type="number"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <div v-if="encargado === 'profesional'" class="mb-6">
            <label for="numero_documento_profesional" class="block mb-2 text-sm font-medium text-gray-900">ID Profesional:</label>
            <input v-model.number="paciente.numero_documento_profesional" id="numero_documento_profesional" type="number"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <button type="submit" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline">Agregar Paciente</button>
        </form>
      </div>
    </div>
=======
  <div>
    <h2>Agregar Paciente</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="tipo_documento">Tipo de Documento:</label>
        <input v-model="paciente.tipo_documento" id="tipo_documento" required />
      </div>
      <div>
        <label for="numero_documento">Número de Documento:</label>
        <input v-model.number="paciente.numero_documento" id="numero_documento" type="number" required />
      </div>
      <div>
        <label for="nombre">Nombre:</label>
        <input v-model="paciente.nombre" id="nombre" required />
      </div>
      <div>
        <label for="genero">Género:</label>
        <input v-model="paciente.genero" id="genero" required />
      </div>
      <div>
        <label for="estrato">Estrato:</label>
        <input v-model="paciente.estrato" id="estrato" required />
      </div>
      <div>
        <label for="barrio">Barrio:</label>
        <input v-model="paciente.barrio" id="barrio" required />
      </div>
      <div>
        <label for="localidad">Localidad:</label>
        <input v-model="paciente.localidad" id="localidad" required />
      </div>
      <div>
        <label for="escolaridad">Escolaridad:</label>
        <input v-model="paciente.escolaridad" id="escolaridad" required />
      </div>
      <div>
        <label>Seleccione quién estará a cargo:</label>
        <select v-model="encargado">
          <option value="practicante">Practicante</option>
          <option value="profesional">Profesional</option>
        </select>
      </div>
      <div v-if="encargado === 'practicante'">
        <label for="numero_documento_practicante">ID Practicante:</label>
        <input v-model.number="paciente.numero_documento_practicante" id="numero_documento_practicante" type="number" />
      </div>
      <div v-if="encargado === 'profesional'">
        <label for="numero_documento_profesional">ID Profesional:</label>
        <input v-model.number="paciente.numero_documento_profesional" id="numero_documento_profesional" type="number" />
      </div>
      <button type="submit">Agregar Paciente</button>
    </form>
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Paciente } from '../types';
import { createPaciente } from '../services/api';

export default defineComponent({
  name: 'AgregarPaciente',
  setup() {
    const paciente = ref<Paciente>({
      numero_documento: 0,
      tipo_documento: '',
      nombre: '',
      genero: '',
      estrato: '',
      barrio: '',
      localidad: '',
      escolaridad: '',
    });
    const encargado = ref('');

    const submitForm = async () => {
      try {
        await createPaciente(paciente.value);
        alert('Paciente agregado exitosamente');
        // Reset form
        paciente.value = {
          numero_documento: 0,
          tipo_documento: '',
          nombre: '',
          genero: '',
          estrato: '',
          barrio: '',
          localidad: '',
          escolaridad: '',
        };
        encargado.value = '';
      } catch (error) {
        console.error('Error al agregar paciente:', error);
        alert('Error al agregar paciente');
      }
    };

    return {
      paciente,
      encargado,
      submitForm,
    };
  },
});
</script>