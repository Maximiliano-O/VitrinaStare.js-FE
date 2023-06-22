<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <!-- Setup barra de navegación --->
    <nav id="sidebar" v-if="!$route.meta.hideNavbar">
      <div class="sidebar-header">
        <img src="./assets/logo_empresa.png" width="200" height="200" />
      </div>
      <ul class="list-unstyled components">
        <!-- La clase navbar-icon setea los filtros para cambiar el ícono .svg a blanco -->
        <!-- Las propiedades aplicadas en style para la img de abajo son para centrar el ícono -->
        <img
          class="navbar-icon"
          style="display: block; margin-left: auto; margin-right: auto; width: 50%"
          src="./assets/user-avatar.svg"
          width="75"
          height="65"
        />
        <!-- Acá se ingresa el nombre del usuario que inició sesión -->
        <p class="navbar-username">{{ username }}</p>
        <li>
          <RouterLink to="/">
            <p>Repositorios</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contribuciones">
            <p>Contribuciones</p>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/contribuidores">
            <p>Usuarios</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/reportes">
            <p>Opciones</p>
          </RouterLink>
        </li>

        <li>
          
          <!-- El div hace que el contenido de esta sección quede fija en la base de la pantalla -->
          <div style="position: fixed; bottom: 0; width: 215px">
            <img
              class="navbar-icon"
              style="display: block; margin-left: auto; margin-right: auto; width: 50%"
              src="./assets/exit-outline.svg"
              width="30"
              height="25"
            />
            <!-- Hasta que se defina la metodología para cerrar sesión, se regresa a la raiz -->
            <a href="/">
              <p @click="logOff">Cerrar sesión</p>
            </a>
          </div>
        </li>
      </ul>
    </nav>
    <!-- En este segmento es donde se localiza el contenido a cargar de las diferenres vistas-->
    <div id="content">
      <RouterView />
    </div>
  </div>
</template>

<script>

import state from '@/store/globalState';

export default {
  computed: {
    username() {
      return state.user && state.user.name ? state.user.name : 'Invitado';
    },
  },


  methods: {
     logOff() {
       state.user = null;
       state.guest = true;
       localStorage.removeItem("user");
       localStorage.removeItem("userID");
       this.$router.push('/');
     },
   },
};
</script>


<style>
.wrapper {
  display: flex;
  width: 100%;
  max-height: 100vh;
  height: 100%;
  max-height: 100vh;
  align-items: stretch;
  overflow-y: hidden;
  overflow-x: hidden;
}

#sidebar {
  min-width: 215px;
  max-width: 215px;
  max-height: 100vh;
  background: #6596cc;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  background: #6596cc;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 93%;
}

#sidebar ul.components {
  padding: 10% 0;
}

#sidebar ul li {
  padding: 1.75%;
}

#sidebar ul li p {
  text-align: center;
  background: #6596cc;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

#sidebar ul li a:link {
  text-decoration: none;
}

#sidebar ul li a:visited {
  text-decoration: none;
}

#sidebar ul li a:hover {
  text-decoration: none;
}

#sidebar ul li a:active {
  text-decoration: none;
}

#sidebar ul p.navbar-username {
  text-align: center;
  background: #6596cc;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 10%;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  min-width: 100vh;
  transition: all 0.3s;
}

.navbar-icon {
  filter: invert(100%) sepia(13%) saturate(0%) hue-rotate(335deg) brightness(109%) contrast(102%);
}
</style>
