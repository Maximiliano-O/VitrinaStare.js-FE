<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-8">
        <h1>Vista Contribuidores</h1>
      </div>

      <div class="col-2">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/registrarse"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Registrarse
        </a>
        
      </div>
    </div>





    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div class="container-fluid">
        <!-- SEGUNDA FILA: REVISAR OPERACIÓN POR CÓDIGO -->

        <!-- TERCERA FILA: CAMPO DE BÚSQUEDA DE OPERACIÓN Y BOTÓN BUSCAR -->
        ㅤ
        <!-- CUARTA FILA: SUBTÍTULO IMPORTACIONES Y BOTÓN DE EXPORTACIÓN -->
        ㅤ
        <!-- QUINTA FILA: TABLA DE IMPORTACIONES -->
        <div class="row">
          <table class="table">
            <thead>
              <tr class="table-primary text-white">
                <th scope="col">#</th>
                <th scope="col">Nombre de Usuario</th>
                <th scope="col">Correo</th>
                 
              </tr>
            </thead>
            <tbody>
          <tr v-for="item in users" v-bind:key="item.userID">
            <td>{{ item.userID }}</td>
            <td>{{ item.contrInfo.username }}</td>
            <td>{{ item.email }}</td>
          

          </tr>
        </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "Users",
  data() {
    return {
      users: [],

    };
  },
  async mounted() {
    try {
      const response_cli = await axios.get('http://localhost:9000/api/users')
      this.users = response_cli.data
    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<style>
/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}

/* Ajustes a la barra de búsqueda por id op */
/* Con estos ajustes se crea el input para número sin tener las flechas del costado */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
  /* ajustes de tamaño */
  margin-top: 1%;
  margin-bottom: 3.5%;
  padding-left: 0.8%;
  font-size: 20px;
  width: 40%;
}
</style>
