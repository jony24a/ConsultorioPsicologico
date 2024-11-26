import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Bienvenida from './views/Bienvenida.vue';
import AgregarPaciente from './components/AgregarPaciente.vue';
import AgregarPersonal from './components/AgregarPersonal.vue';
import Calendario from './components/Calendario.vue';
import HistorialClinico from './components/HistorialClinico.vue';
import VerHistorialClinico from './components/VerHistorialClinico.vue';
import ListadoPacientes from './components/ListadoPacientes.vue';
import PersonaDetalle from './components/PersonaDetalle.vue'; // Importar la nueva vista

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
    path: '/persona-detalle', // Nueva ruta para los detalles de la persona
    name: 'PersonaDetalle',
    component: PersonaDetalle,
    props: (route) => ({ documento: route.query.documento }), // Pasa el número de documento como prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
