<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold mb-4">Calendario de Citas</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 border-b text-left text-gray-600">Fecha</th>
            <th class="py-2 px-4 border-b text-left text-gray-600">Hora</th>
            <th class="py-2 px-4 border-b text-left text-gray-600">Lugar</th>
            <th class="py-2 px-4 border-b text-left text-gray-600">Paciente</th>
            <th class="py-2 px-4 border-b text-left text-gray-600">Profesional/Practicante</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citas" :key="cita.id_cita" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ formatDate(cita.fecha) }}</td>
            <td class="py-2 px-4 border-b">{{ cita.hora }}</td>
            <td class="py-2 px-4 border-b">{{ cita.lugar }}</td>
            <td class="py-2 px-4 border-b">{{ cita.numero_documento_paciente }}</td>
            <td class="py-2 px-4 border-b">
              {{ cita.numero_documento_profesional || cita.numero_documento_practicante }}
              ({{ cita.numero_documento_profesional ? 'Profesional' : 'Practicante' }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
