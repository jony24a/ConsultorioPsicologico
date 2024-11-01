<template>
  <div id="app">
    <nav>
      <router-link to="/">Bienvenida</router-link> |
      <router-link to="/agregar-paciente">Agregar Paciente</router-link> |
      <router-link to="/agregar-practicante">Agregar Practicante</router-link> |
      <router-link to="/agregar-profesional">Agregar Profesional</router-link> |
      <router-link to="/calendario">Calendario</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

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