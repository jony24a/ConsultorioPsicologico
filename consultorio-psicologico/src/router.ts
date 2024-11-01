import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Bienvenida from './views/Bienvenida.vue'
import AgregarPaciente from './components/AgregarPaciente.vue'
import AgregarPracticante from './components/AgregarPracticante.vue'
import AgregarProfesional from './components/AgregarProfesional.vue'
import Calendario from './components/Calendario.vue'

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
    path: '/agregar-practicante',
    name: 'AgregarPracticante',
    component: AgregarPracticante
  },
  {
    path: '/agregar-profesional',
    name: 'AgregarProfesional',
    component: AgregarProfesional
  },
  {
    path: '/calendario',
    name: 'Calendario',
    component: Calendario
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router