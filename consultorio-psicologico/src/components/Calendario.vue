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
      <div class="flex gap-4 items-center">
        <span class="text-sm text-gray-500">Citas cargadas: {{ citas.length }}</span>
        <button @click="today" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Hoy</button>
      </div>
    </div>

    <div class="flex-1 overflow-hidden border border-gray-200 rounded-lg">
      <!-- Cabecera de días -->
      <div class="grid grid-cols-8 border-b">
        <div class="border-r p-2 bg-gray-50"></div>
        <div v-for="day in weekDays" :key="day.date" class="p-2 text-center border-r bg-gray-50">
          <div class="font-medium">{{ day.dayName }}</div>
          <div class="text-2xl font-bold" :class="{ 'text-blue-600': day.isToday }">
            {{ day.dayNumber }}
          </div>
        </div>
      </div>

      <!-- Grid de horas y citas -->
      <div class="overflow-y-auto h-[calc(100%-4rem)]">
        <div class="grid grid-cols-8 relative">
          <!-- Columna de horas -->
          <div class="border-r">
            <div v-for="hour in hours" :key="hour" class="h-20 border-b p-2 text-sm text-gray-500">
              {{ formatHour(hour) }}
            </div>
          </div>

          <!-- Columnas de días con citas -->
          <template v-for="(day, dayIndex) in weekDays" :key="day.date">
            <div class="border-r">
              <!-- Celdas de horas -->
              <div v-for="hour in hours" :key="`${day.date}-${hour}`" class="h-20 border-b relative">
                <!-- Citas para esta hora y día -->
                <template v-for="cita in getCitasForHourAndDay(hour, day.date)" :key="cita.id_cita">
                  <div class="absolute inset-x-0 mx-1 rounded overflow-hidden" :style="getEventStyle(cita)">
                    <div class="bg-blue-100 border-l-4 border-blue-600 p-2 h-full overflow-hidden shadow-sm">
                      <div class="font-medium text-sm">Hora: {{ cita.hora }}</div>
                      <div class="text-sm truncate">Paciente: {{ cita.pacienteId }}</div>
                      <div class="text-sm truncate">Profesional: {{ cita.personalId }}</div>
                      <div class="text-xs text-gray-600 truncate">Consultorio: {{ cita.consultorioId }}</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { Cita } from '../types';
import { getCitas } from '../services/api';

export default defineComponent({
  name: 'CalendarioSemanal',
  setup() {
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

    const getEventStyle = (cita: Cita) => {
      const [hours, minutes] = cita.hora.split(':').map(Number);
      const topPercentage = (minutes / 60) * 100;
      const heightPercentage = 83;
      return {
        top: `${topPercentage}%`,
        height: `${heightPercentage}%`,
      };
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
        console.log('Citas cargadas:', citas.value);
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

    return {
      weekDays,
      hours,
      formatMonthYear,
      nextWeek,
      prevWeek,
      today,
      formatHour,
      getCitasForHourAndDay,
      getEventStyle,
      citas,
      loading,
      error,
    };
  },
});
</script>
