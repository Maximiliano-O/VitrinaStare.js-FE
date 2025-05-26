<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ColoredButton from './buttons/ColoredButton.vue';
import CustomSelect from './CustomSelect.vue';
</script>

<template>
  <!-- Setup barra de navegación --->
  <nav id="navbar" v-if="!$route.meta.hideNavbar">
    <div class="navbar-header">
      <img src="../assets/Stare.js-Only-Eye-Logo.png" width="85" height="55" />
      StArE.js
    </div>
    <div class='button-container'>
      <CustomSelect 
        v-model="chosen" 
        :options="myOptions" 
        start-icon="md-translate" 
        default-text="Español"
      />
      <ColoredButton variant="transparent" :to="{ name: 'repos' }">Repositorios</ColoredButton>
      <ColoredButton variant="transparent">¿Qué es StArE.js?</ColoredButton>
      <ColoredButton variant="wine">Iniciar Sesión</ColoredButton>
      <ColoredButton variant="night">Regístrate</ColoredButton>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};

import { ref } from 'vue'

const chosen = ref(null)

const myOptions = [
  { label: 'Español', value: 'Español' },
  { label: 'Inglés', value: 'Inglés' }
]
</script>

<style scoped>
#navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px 5px 300px;
  min-width: 100%;
  max-height: 75px;
  -webkit-box-shadow: 0px 4px 4px 1.5px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 4px 1.5px rgba(0,0,0,0.35);
  background: #40702F;
  color: #fff;
  transition: all 0.3s;
}

#navbar .navbar-header {
  align-items: center;
  /* background: #9bb2eb; */
  font-family: 'Poppins-SemiBold', sans-serif;
  font-size: 32px;
}

#navbar .button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 20px;
  /* background: #772eab; */
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 20px;
}
</style>