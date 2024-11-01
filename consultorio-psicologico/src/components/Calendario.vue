<template>
  <div>
    <h2>Calendario de Citas</h2>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Lugar</th>
          <th>Paciente</th>
          <th>Profesional/Practicante</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cita in citas" :key="cita.id_cita">
          <td>{{   formatDate(cita.fecha) }}</td>
          <td>{{ cita.hora }}</td>
          <td>{{ cita.lugar }}</td>
          <td>{{ cita.numero_documento_paciente }}</td>
          <td>
            {{ cita.numero_documento_profesional || cita.numero_documento_practicante }}
            ({{ cita.numero_documento_profesional ? 'Profesional' : 'Practicante' }})
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Cita } from '../types';
import { getCitas } from '../services/api';

export default defineComponent({
  name: 'Calendario',
  setup() {
    const citas = ref<Cita[]>([]);

    const fetchCitas = async () => {
      try {
        const response = await getCitas();
        citas.value = response.data;
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    onMounted(fetchCitas);

    return {
      citas,
      formatDate,
    };
  },
});
</script>