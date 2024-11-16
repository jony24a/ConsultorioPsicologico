import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Bienvenida from './views/Bienvenida.vue';
import AgregarPaciente from './components/AgregarPaciente.vue';
import AgregarPersonal from './components/AgregarPersonal.vue';
import Calendario from './components/Calendario.vue';
import HistorialClinico from './components/HistorialClinico.vue'; // Importa el componente de Historial Clínico
import ListadoPacientes from './components/ListadoPacientes.vue'; // Nueva importación para listado de pacientes

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Bienvenida',
    component: Bienvenida
  },
  {
    path: '/agregar-paciente',
    name: 'AgregarPaciente',
    component: AgregarPaciente
  },
  {
    path: '/agregar-personal',
    name: 'AgregarPersonal',
    component: AgregarPersonal
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: Calendario
  },
  {
    path: '/historial-clinico',  // Nueva ruta para Historial Clínico
    name: 'HistorialClinico',
    component: HistorialClinico  // Asocia el componente HistorialClinico
  },
  {
    path: '/listado-pacientes',  // Nueva ruta para Listado de Pacientes
    name: 'ListadoPacientes',
    component: ListadoPacientes  // Asocia el componente ListadoPacientes
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
