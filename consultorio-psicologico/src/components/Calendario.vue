<template>
  <div class="p-6 h-screen flex flex-col">
    <!-- Header del calendario -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex gap-4 items-center">
        <h2 class="text-2xl font-bold">Calendario de Citas</h2>
        <div class="flex gap-2">
          <button @click="prevWeek" class="p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg> 
          </button>
          <button @click="nextWeek" class="p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <span class="text-lg">{{ formatMonthYear }}</span>
      </div>
      <button @click="today" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Hoy</button>
    </div>

    <div class="flex-1 overflow-hidden border border-gray-200 rounded-lg">
      <div class="grid grid-cols-8 border-b">
        <div class="border-r p-2 bg-gray-50"></div>
        <div v-for="day in weekDays" :key="day.date" class="p-2 text-center border-r bg-gray-50">
          <div class="font-medium">{{ day.dayName }}</div>
          <div class="text-2xl font-bold" :class="{ 'text-blue-600': day.isToday }">{{ day.dayNumber }}</div>
        </div>
      </div>

      <div class="overflow-y-auto h-[calc(100%-4rem)]">
        <div class="grid grid-cols-8 relative">
          <div class="border-r">
            <div v-for="hour in hours" :key="hour" class="h-auto min-h-[80px] p-2 border-b text-sm text-gray-500">
              {{ formatHour(hour) }}
            </div>
          </div>

          <!-- Columnas de días con citas -->
          <template v-for="(day) in weekDays" :key="day.date">
            <div class="border-r">
              <div v-for="hour in hours" :key="`${day.date}-${hour}`" class="h-auto min-h-[80px] border-b">
                <div class="flex flex-col gap-1 p-1 overflow-y-auto max-h-full">
                  <template v-for="cita in getCitasForHourAndDay(hour, day.date)" :key="cita.id_cita">
                    <div class="bg-blue-100 border-l-4 border-blue-600 rounded p-2 shadow-sm">
                      <div class="font-medium text-sm">Hora: {{ cita.hora }}</div>
                      <div class="text-sm truncate">Paciente: {{ cita.pacienteId }}</div>
                      <div class="text-sm truncate">Profesional:  {{ cita.personalId }}</div>
                      <div class="text-xs text-gray-600 truncate">Consultorio: {{ cita.consultorioId }}</div>
                      <div class="flex gap-2 mt-2">
                        <button @click="editCita(cita)" class="text-blue-500 hover:text-blue-700">Editar</button>
                        <button @click="deleteCitaFromAPI(cita.id_cita)" class="text-red-500 hover:text-red-700">Eliminar</button>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Botón para volver a la vista Bienvenida -->
    <div class="mt-4">
      <button @click="goToBienvenida" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Menu Principal
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Cita } from '../types';
import { getCitas, deleteCita } from '../services/api';

export default defineComponent({
  name: 'CalendarioSemanal',
  setup() {
    const router = useRouter();
    const citas = ref<Cita[]>([]);
    const currentDate = ref(new Date());
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const weekDays = computed(() => {
      const days = [];
      const start = getStartOfWeek(currentDate.value);
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        const formattedDate = formatDate(date);
        days.push({
          date: formattedDate,
          dayName: date.toLocaleDateString('es', { weekday: 'short' }),
          dayNumber: date.getDate(),
          isToday: isSameDay(date, new Date()),
        });
      }
      return days;
    });

    const formatMonthYear = computed(() => {
      return currentDate.value.toLocaleDateString('es', { month: 'long', year: 'numeric' });
    });

    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    const nextWeek = () => {
      const newDate = new Date(currentDate.value);
      newDate.setDate(newDate.getDate() + 7);
      currentDate.value = newDate;
    };

    const prevWeek = () => {
      const newDate = new Date(currentDate.value);
      newDate.setDate(newDate.getDate() - 7);
      currentDate.value = newDate;
    };

    const today = () => {
      currentDate.value = new Date();
    };

    const getStartOfWeek = (date: Date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    };

    const isSameDay = (date1: Date, date2: Date) => {
      return formatDate(date1) === formatDate(date2);
    };

    const formatHour = (hour: number) => {
      return `${hour.toString().padStart(2, '0')}:00`;
    };

    const getCitasForHourAndDay = (hour: number, date: string) => {
      return citas.value.filter(cita => {
        const citaHour = parseInt(cita.hora.split(':')[0]);
        return cita.fecha === date && citaHour === hour;
      });
    };

    const fetchCitas = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await getCitas();
        citas.value = response.data.map(cita => ({
          ...cita,
          fecha: cita.fecha.split('T')[0],
          hora: new Date(cita.hora).toISOString().split('T')[1].slice(0, 5),
        }));
      } catch (err) {
        console.error('Error al obtener citas:', err);
        error.value = 'Error al cargar las citas';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCitas();
    });

    watch(weekDays, () => {
      fetchCitas();
    });

    const goToBienvenida = () => {
      router.push({ name: 'Bienvenida' });
    };

    // Editar cita
    const editCita = (cita: Cita) => {
      router.push({ name: 'EditarCita', params: { citaId: cita.id_cita } });
    };

    // Eliminar cita
    const deleteCitaFromAPI = async (id: number) => {
      if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        try {
          await deleteCita(id); // Llamada al servicio para eliminar la cita
          citas.value = citas.value.filter(cita => cita.id_cita !== id); // Actualizar lista de citas
        } catch (err) {
          console.error('Error al eliminar cita:', err);
          error.value = 'No se pudo eliminar la cita';
        }
      }
    };

    return {
      citas,
      currentDate,
      weekDays,
      hours,
      loading,
      error,
      formatMonthYear,
      nextWeek,
      prevWeek,
      today,
      formatHour,
      getCitasForHourAndDay,
      goToBienvenida,
      editCita,
      deleteCitaFromAPI,
    };
  },
});
</script>

<style scoped>
</style>
