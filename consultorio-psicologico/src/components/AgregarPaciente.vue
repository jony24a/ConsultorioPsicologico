<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8 uppercase">Agregar Paciente</h2>
        <form @submit.prevent="submitForm">
          <!-- Número de Documento -->
          <div class="mb-6">
            <label for="numero_documento" class="block mb-2 text-sm font-medium text-gray-900">Número de Documento:</label>
            <input
              v-model="paciente.numero_documento"
              id="numero_documento"
              type="number"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Tipo de Documento -->
          <div class="mb-6">
            <label for="tipo_documento" class="block mb-2 text-sm font-medium text-gray-900">Tipo de Documento:</label>
            <select
              v-model="paciente.tipo_documento"
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
          <!-- Nombre -->
          <div class="mb-6">
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
            <input
              v-model="paciente.nombre"
              id="nombre"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Teléfono -->
          <div class="mb-6">
            <label for="telefono" class="block mb-2 text-sm font-medium text-gray-900">Teléfono:</label>
            <input
              v-model="paciente.telefono"
              id="telefono"
              type="number"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Género -->
          <div class="mb-6">
            <label for="genero" class="block mb-2 text-sm font-medium text-gray-900">Género:</label>
            <select
              v-model="paciente.genero"
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
          <div v-if="paciente.genero === 'Otro'" class="mb-6">
            <label for="genero_especifico" class="block mb-2 text-sm font-medium text-gray-900">Especifique el género:</label>
            <select
              v-model="paciente.genero_especifico"
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
              v-model="paciente.estrato"
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
            <input
              v-model="paciente.barrio"
              id="barrio"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Localidad -->
          <div class="mb-6">
            <label for="localidad" class="block mb-2 text-sm font-medium text-gray-900">Localidad:</label>
            <input
              v-model="paciente.localidad"
              id="localidad"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Escolaridad -->
          <div class="mb-6">
            <label for="escolaridad" class="block mb-2 text-sm font-medium text-gray-900">Escolaridad:</label>
            <input
              v-model="paciente.escolaridad"
              id="escolaridad"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Disponibilidad -->
          <div class="mb-6">
            <label for="disponibilidad" class="block mb-2 text-sm font-medium text-gray-900">Disponibilidad:</label>
            <input
              v-model="paciente.disponibilidad"
              id="disponibilidad"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <!-- Botón de envío -->
          <button
            type="submit"
            class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Agregar Paciente
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createPaciente } from '../services/api';

export default defineComponent({
  name: 'AgregarPaciente',
  setup() {
    const paciente = ref({
      numero_documento: 0,
      tipo_documento: '',
      nombre: '',
      telefono: '',
      genero: '',
      genero_especifico: '',
      estrato: '',
      barrio: '',
      localidad: '',
      escolaridad: '',
      disponibilidad: '',
    });

    const tiposGenero = [
      'No binario',
      'Agénero',
      'Demiboy',
      'Demigirl',
      'Género fluido',
      'Bigénero',
      'Pangénero',
      'Transgénero',
      'Transexual',
      'Andrógino',
      'Intergénero',
      'Género neutro',
      'Poligénero',
      'Otro'
    ];

    const submitForm = async () => {
      try {
        const response = await createPaciente(paciente.value);
        if (response.status === 201) {
          alert('Paciente agregado exitosamente');
          paciente.value = {
            numero_documento: 0,
            tipo_documento: '',
            nombre: '',
            telefono: '',
            genero: '',
            genero_especifico: '',
            estrato: '',
            barrio: '',
            localidad: '',
            escolaridad: '',
            disponibilidad: '',
          };
        }
      } catch (error) {
        console.error('Error al agregar paciente:', error);
        alert('Error al agregar paciente');
      }
    };

    return {
      paciente,
      submitForm,
      tiposGenero,
    };
  },
});
</script>

