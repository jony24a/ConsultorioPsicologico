<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-lg">
      <nav class="container mx-auto p-4 flex justify-between items-center relative">
        <!-- Logo -->
        <h1 class="text-2xl font-bold text-blue-950">
          <router-link to="/">Consultorio Psicológico</router-link>
        </h1>

        <!-- Botón de menú hamburguesa -->
        <button 
          @click="toggleMenu" 
          class="text-teal-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <!-- Enlaces de navegación (Dropdown) -->
        <div 
          :class="['absolute top-full right-4 bg-white shadow-lg rounded-lg w-64 py-4 transition-transform duration-300', menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none']"
        >
          <router-link 
            to="/agregar-paciente" 
            class="block px-4 py-2 text-teal-900 hover:text-teal-700 hover:bg-gray-100"
          >
            Agregar Paciente
          </router-link>
          <router-link 
            to="/agregar-personal" 
            class="block px-4 py-2 text-blue-950 hover:text-blue-900 hover:bg-gray-100"
          >
            Agregar Personal
          </router-link>
          <router-link 
            to="/historial-clinico" 
            class="block px-4 py-2 text-teal-900 hover:text-teal-700 hover:bg-gray-100"
          >
            Historial Clínico
          </router-link>
          <router-link 
            to="/calendario" 
            class="block px-4 py-2 text-blue-950 hover:text-blue-900 hover:bg-gray-100"
          >
            Calendario
          </router-link>
          <router-link 
            to="/listado-pacientes" 
            class="block px-4 py-2 text-teal-900 hover:text-teal-700 hover:bg-gray-100"
          >
            Listado
          </router-link>
          <router-link 
            to="/ver-historiales" 
            class="block px-4 py-2 text-blue-950 hover:text-blue-900 hover:bg-gray-100"
          >
            Ver Historiales Clínicos
          </router-link>
        </div>
      </nav>
    </header>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const menuOpen = ref(false);

    function toggleMenu() {
      menuOpen.value = !menuOpen.value;
    }

    return { menuOpen, toggleMenu };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #134e4a;
}
</style>
