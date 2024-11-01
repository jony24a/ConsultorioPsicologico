<template>
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