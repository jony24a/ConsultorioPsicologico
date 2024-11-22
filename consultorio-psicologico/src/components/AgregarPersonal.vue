<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center uppercase mb-8">
          Agregar Personal
        </h2>
        <form @submit.prevent="submitForm">
          <!-- Tipo de Documento -->
          <div class="mb-6">
            <label for="tipo_documento" class="block mb-2 text-sm font-medium text-gray-900">Tipo de Documento:</label>
            <select
              v-model="personal.tipo_documento"
              id="tipo_documento"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="CC">Cédula de Ciudadanía (CC)</option>
              <option value="TI">Tarjeta de Identidad (TI)</option>
              <option value="Extranjero">Extranjero</option>
            </select>
          </div>
          <!-- Número de Documento -->
          <div class="mb-6">
            <label for="numero_documento" class="block mb-2 text-sm font-medium text-gray-900">Número de Documento:</label>
            <input v-model.number="personal.numero_documento" id="numero_documento" type="number" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <!-- Nombre -->
          <div class="mb-6">
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
            <input v-model="personal.nombre" id="nombre" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <!-- Género -->
          <div class="mb-6">
            <label for="genero" class="block mb-2 text-sm font-medium text-gray-900">Género:</label>
            <select
              v-model="personal.genero"
              id="genero"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <!-- Género Específico -->
          <div v-if="personal.genero === 'Otro'" class="mb-6">
            <label for="genero_especifico" class="block mb-2 text-sm font-medium text-gray-900">Especifique el género:</label>
            <select
              v-model="personal.genero_especifico"
              id="genero_especifico"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            >
              <option value="" disabled>Seleccione una opción</option>
              <option v-for="tipo in tiposGenero" :key="tipo" :value="tipo">{{ tipo }}</option>
            </select>
          </div>
          <!-- Estrato -->
          <div class="mb-6">
            <label for="estrato" class="block mb-2 text-sm font-medium text-gray-900">Estrato:</label>
            <select
              v-model="personal.estrato"
              id="estrato"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <!-- Barrio -->
          <div class="mb-6">
            <label for="barrio" class="block mb-2 text-sm font-medium text-gray-900">Barrio:</label>
            <input v-model="personal.barrio" id="barrio" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <!-- Localidad -->
          <div class="mb-6">
            <label for="localidad" class="block mb-2 text-sm font-medium text-gray-900">Localidad:</label>
            <input v-model="personal.localidad" id="localidad" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <!-- Es Profesional -->
          <div class="mb-6">
            <label for="es_profesional" class="block mb-2 text-sm font-medium text-gray-900">¿Es Profesional?</label>
            <input v-model="personal.es_profesional" id="es_profesional" type="checkbox"
              class="focus:ring-green-500 focus:border-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" />
          </div>
          <!-- Turno -->
          <div class="mb-6">
            <label for="turno" class="block mb-2 text-sm font-medium text-gray-900">Turno:</label>
            <input v-model="personal.turno" id="turno" required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
          </div>
          <!-- Botón de Envío -->
          <button type="submit" class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline">Agregar Personal</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Personal } from '../types';
import { agregarPersonal } from '../services/personalService';

export default defineComponent({
  name: 'AgregarPersonal',
  setup() {
    const personal = ref<Personal>({
      numero_documento: 0,
      tipo_documento: '',
      nombre: '',
      genero: '',
      genero_especifico: '',
      estrato: '',
      barrio: '',
      localidad: '',
      es_profesional: false,
      turno: '',
    });

    const tiposGenero = ['No Binario', 'Transgénero', 'Agénero', 'Otro'];

    const submitForm = async () => {
      try {
        if (!personal.value.turno) {
          alert('El turno es obligatorio.');
          return;
        }
        await agregarPersonal(personal.value);
        alert('Personal agregado exitosamente');
        personal.value = {
          numero_documento: 0,
          tipo_documento: '',
          nombre: '',
          genero: '',
          genero_especifico: '',
          estrato: '',
          barrio: '',
          localidad: '',
          es_profesional: false,
          turno: '',
        };
      } catch (error) {
        console.error('Error al agregar personal:', error);
        alert('Error al agregar personal');
      }
    };

    return {
      personal,
      tiposGenero,
      submitForm,
    };
  },
});
</script>
