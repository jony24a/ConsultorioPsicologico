<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center uppercase mb-8">Agregar Paciente</h2>
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Número de Documento -->
            <div>
              <label for="numero_documento" class="block mb-2 text-sm font-medium text-gray-900">Número de Documento:</label>
              <input
                v-model="paciente.numero_documento"
                id="numero_documento"
                type="number"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>

            <!-- Tipo de Documento -->
            <div>
              <label for="tipo_documento" class="block mb-2 text-sm font-medium text-gray-900">Tipo de Documento:</label>
              <select
                v-model="paciente.tipo_documento"
                id="tipo_documento"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="Extranjero">Extranjero</option>
              </select>
            </div>

            <!-- Nombre -->
            <div>
              <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">Nombre Completo:</label>
              <input
                v-model="paciente.nombre"
                id="nombre"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label for="telefono" class="block mb-2 text-sm font-medium text-gray-900">Teléfono:</label>
              <input
                v-model="paciente.telefono"
                id="telefono"
                type="text"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>

            <!-- Género -->
            <div>
              <label for="genero" class="block mb-2 text-sm font-medium text-gray-900">Género:</label>
              <select
                v-model="paciente.genero"
                id="genero"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <!-- Género Específico -->
            <div v-if="paciente.genero === 'Otro'">
              <label for="genero_especifico" class="block mb-2 text-sm font-medium text-gray-900">Especifique el género:</label>
              <select
                v-model="paciente.genero_especifico"
                id="genero_especifico"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              >
                <option value="" disabled>Seleccione una opción</option>
                <option v-for="tipo in tiposGenero" :key="tipo" :value="tipo">{{ tipo }}</option>
              </select>
            </div>

            <!-- Estrato -->
            <div>
              <label for="estrato" class="block mb-2 text-sm font-medium text-gray-900">Estrato:</label>
              <select
                v-model="paciente.estrato"
                id="estrato"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
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
            <div>
              <label for="barrio" class="block mb-2 text-sm font-medium text-gray-900">Barrio:</label>
              <input
                v-model="paciente.barrio"
                id="barrio"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>

            <!-- Localidad -->
            <div>
              <label for="localidad" class="block mb-2 text-sm font-medium text-gray-900">Localidad:</label>
              <input
                v-model="paciente.localidad"
                id="localidad"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>

            <!-- Escolaridad -->
            <div>
              <label for="escolaridad" class="block mb-2 text-sm font-medium text-gray-900">Escolaridad:</label>
              <input
                v-model="paciente.escolaridad"
                id="escolaridad"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>

            <!-- Disponibilidad -->
            <div>
              <label for="disponibilidad" class="block mb-2 text-sm font-medium text-gray-900">Disponibilidad:</label>
              <input
                v-model="paciente.disponibilidad"
                id="disponibilidad"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
              />
            </div>
          </div>

          <!-- Botón de envío -->
          <button
            type="submit"
            class="w-full mt-6 px-4 py-2 bg-teal-900 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:shadow-outline"
          >
            Agregar Paciente
          </button>
        </form>

        <!-- Botones adicionales -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button
            @click="goToListado"
            class="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline"
          >
            Ver Listado de Pacientes
          </button>
          <button
            @click="goToBienvenida"
            class="w-full px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:shadow-outline"
          >
            Menú Principal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
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

    const router = useRouter();

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
        console.error(error);
        alert('Hubo un error al agregar el paciente');
      }
    };

    const goToListado = () => {
      router.push({ name: 'ListadoPacientes' });
    };

    const goToBienvenida = () => {
      router.push({ name: 'Bienvenida'})
    }


    return { paciente, tiposGenero, submitForm, goToListado, goToBienvenida,  };
  },
});
</script>

