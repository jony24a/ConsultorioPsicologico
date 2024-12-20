<template>
  <div class="p-6 h-screen flex flex-col">
    <!-- Header del calendario -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex gap-4 items-center">
        <h2 class="text-2xl font-bold">Calendario de Citas</h2>
        <div class="flex gap-2">
          <button @click="prevWeek" class="p-2 hover:bg-gray-100 rounded-full">
            <!-- Icono de la semana anterior -->
          </button>
          <button @click="nextWeek" class="p-2 hover:bg-gray-100 rounded-full">
            <!-- Icono de la semana siguiente -->
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
                      <div class="text-sm truncate">Paciente : {{ cita.pacienteId }}</div>  
                      <div class="text-sm truncate">Profesional:  {{ cita.personalId }}</div>
                      <div class="text-xs text-gray-600 truncate">Consultorio: {{ cita.consultorioId }}</div>
                      <div class="flex gap-2 mt-2">
                        <button @click="openEditModal(cita)" class="text-blue-500 hover:text-blue-700">Editar</button>
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

    <!-- Modal de Edición de Cita -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Editar Cita</h3>
        <form @submit.prevent="updateCita">
          <div class="mb-4">
            <label for="fecha" class="block text-sm font-medium">Fecha</label>
            <input id="fecha" v-model="selectedCita.fecha" type="date" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label for="hora" class="block text-sm font-medium">Hora</label>
            <input id="hora" v-model="selectedCita.hora" type="time" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label for="pacienteId" class="block text-sm font-medium">Paciente</label>
            <input id="pacienteId" v-model="selectedCita.pacienteId" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label for="personalId" class="block text-sm font-medium">Profesional</label>
            <input id="personalId" v-model="selectedCita.personalId" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label for="consultorioId" class="block text-sm font-medium">Consultorio</label>
            <input id="consultorioId" v-model="selectedCita.consultorioId" class="w-full p-2 border rounded" required />
          </div>
          <div class="flex justify-end gap-4">
            <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">Cancelar</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Botón para volver a la vista Bienvenida -->
    <div class="mt-4">
      <button @click="goToBienvenida" class="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900">
        Menu Principal
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Cita } from '../types';
import { getCitas, deleteCita, updateCita as updateCitaAPI } from '../services/api'; 

export default defineComponent({
  name: 'CalendarioSemanal',
  setup() {
    const router = useRouter();
    const citas = ref<Cita[]>([]);
    const currentDate = ref(new Date());
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const isEditModalOpen = ref(false);
    const selectedCita = ref<Cita | null>(null);

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

    // Abrir el modal de edición
    const openEditModal = (cita: Cita) => {
      selectedCita.value = { ...cita }; // Copiar los datos de la cita seleccionada
      isEditModalOpen.value = true;
    };

    // Cerrar el modal de edición
    const closeEditModal = () => {
      isEditModalOpen.value = false;
      selectedCita.value = null;
    };

    // Actualizar la cita
    const updateCita = async () => {
      if (selectedCita.value && selectedCita.value.id_cita) {
        try {
          // Pasar el id_cita y el objeto cita por separado
          await updateCitaAPI(selectedCita.value.id_cita, selectedCita.value);
          
          // Actualizar la cita en la lista local
          const index = citas.value.findIndex(c => c.id_cita === selectedCita.value?.id_cita);
          if (index !== -1) {
            citas.value[index] = { ...selectedCita.value };
          }
          closeEditModal();
          // Opcional: recargar todas las citas para asegurar sincronización
          await fetchCitas();
        } catch (err) {
          console.error('Error al actualizar cita:', err);
          error.value = 'No se pudo actualizar la cita';
        }
      } else {
        error.value = 'La cita seleccionada no tiene un ID válido';
      }
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
      openEditModal,
      closeEditModal,
      updateCita,
      deleteCitaFromAPI,
      isEditModalOpen,
      selectedCita,
    };
  },
});
</script>
