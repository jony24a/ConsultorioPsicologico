import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Bienvenida from './views/Bienvenida.vue';
import AgregarPaciente from './components/AgregarPaciente.vue';
import AgregarPersonal from './components/AgregarPersonal.vue';
import Calendario from './components/Calendario.vue';
import HistorialClinico from './components/HistorialClinico.vue';
import VerHistorialClinico from './components/VerHistorialClinico.vue'; // Importa el componente de Ver Historial Clínico
import ListadoPacientes from './components/ListadoPacientes.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Bienvenida',
    component: Bienvenida,
  },
  {
    path: '/agregar-paciente',
    name: 'AgregarPaciente',
    component: AgregarPaciente,
  },
  {
    path: '/agregar-personal',
    name: 'AgregarPersonal',
    component: AgregarPersonal,
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: Calendario,
  },
  {
    path: '/historial-clinico',
    name: 'HistorialClinico',
    component: HistorialClinico,
  },
  {
    path: '/ver-historiales', // Nueva ruta para Ver Historiales Clínicos
    name: 'VerHistorialClinico',
    component: VerHistorialClinico,
  },
  {
    path: '/listado-pacientes',
    name: 'ListadoPacientes',
    component: ListadoPacientes,
  },
  {
    path: '/ver-persona/:cedula',
    name: 'VerPersona',
    component: () => import('./components/VerPersona.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
