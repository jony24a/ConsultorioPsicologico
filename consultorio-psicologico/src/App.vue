<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-lg">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900"><router-link to="/">Consultorio Psicológico</router-link></h1>
        <div>
          <router-link to="/agregar-paciente" class="text-gray-600 hover:text-green-500 mx-2">Agregar
            Paciente</router-link> |
          <router-link to="/agregar-practicante" class="text-gray-600 hover:text-green-500 mx-2">Agregar
            Practicante</router-link> |
          <router-link to="/agregar-profesional" class="text-gray-600 hover:text-green-500 mx-2">Agregar
            Profesional</router-link> |
          <router-link to="/calendario" class="text-gray-600 hover:text-green-500 mx-2">Calendario</router-link>
        </div>
      </nav>
    </header>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<<<<<<< HEAD
=======

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
>>>>>>> 365e395c2f79193004d3bb41c9a6d1b80a512d65
