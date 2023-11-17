<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>Registrar Versión del Repositorio</h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-secondary text-white"
          href="/"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >Regresar al repositorio
        </a>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          v-on:click="addRelease"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Registrar Release
        </button>
      </div>
    </div>

      
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">


   
        <form @submit="addRelease" method="post" id="form_crearCliente">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
     

          </div>
 
 
          <div class="row m-3">
            <h3>Datos nueva release:</h3>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Nombre Release:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">Campo Obligatorio</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="name"
                v-model="name"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
                required
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Descripción Release:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="description"
                v-model="description"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">CodeSandbox URL:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">Campo Obligatorio</p>
            </div>
            <div class="col-10">
              <input
              type="email"
                name="codesandbox_URL"
                v-model="codesandbox_URL"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

 

  
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';


export default {
  props: ['repositoryID'],
  data() {
    return {
      name: '',
      description: '',
      codesandbox_URL: '',
    };
  },
  methods: {
   // async addRelease() {
   //   try {
   //     const response = await registerUser(this.user);
   //     console.log('User registered:', response);
   //     //this.$router.push({name: 'contribuidores'})
   //     this.$router.push({ path: `/repos/${repositoryID}` })
   //     // Redirect to login or dashboard page
   //   } catch (error) {
   //     console.error('Error registering user:', error);
   //   }
   // },


    async addRelease() {
      try {
        const response = await axios.post('http://localhost:9000/api/release', {
          repositoryID:this.repositoryID,
          name: this.name,
          description: this.description,
          codesandbox_URL: this.codesandbox_URL

       
        });
        console.log(response.data); // Handle the response as needed
        this.requestValidation()
        this.$router.push({ path: `/repos/${this.repositoryID}` })
      } catch (error) {
        console.error(error);
      }
    },

    async requestValidation() {
      try {
        const url = 'http://localhost:9000/api/send-emails';
        const data = {
          emails: ["mitchell.vera@usach.cl"],
          repositoryLink: "https://github.com/example/repo",
        };

        const response = await axios.post(url, data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  }
};
</script>

<style>
/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}

/* Personalización del select */
select {
  background-color: #ffffff;
  width: 100%;
  font-size: 18px;
  border-radius: 4px;
}

/* Con estos ajustes se crea el input para número sin tener las flechas del costado */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
