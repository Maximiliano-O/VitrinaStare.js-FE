<template>

<div v-if="user._id===currentUserID">
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1> {{ $t('update') }}</h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-secondary text-white"
          @click="goToUser(userID)"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >{{ $t('userBack') }}
        </a>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          v-on:click="register"
          style="
          background-color: #6251b7c3;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
        {{ $t('update') }}
        </button>
      </div>
    </div>


    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">


   
        <form @submit="enviarCliente" method="post" id="form_crearCliente">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
     

          </div>
 
 
          <div class="row m-3">
            <h3>{{ $t('userInfo') }}</h3>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('username') }}: {{ user.username }}</p>
              <!--
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
                data-testid="username"
                type="text"
                name="user.username"
                v-model="user.username"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
              -->
            </div>
          </div>


          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('email') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
              data-testid="email"
              type="email"
                name="user.email"
                v-model="user.email"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

 

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('urlImage') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
              data-testid="imageURL"
                type="text"
                name="user.imageURL"
                v-model="user.imageURL"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>
<!--
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('description') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
              data-testid="imageURL"
                type="text"
                name="user.description"
                v-model="user.description"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>
 -->
     



 

  
        </form>
      </div>
    </div>
  </div>
</div>

<div v-else>
    
    <h2>{{ $t('accessDenied') }}</h2>
  
    <p style="font-size: 18px; margin-top: 2%">{{ $t('accessDeniedMessage') }}</p>

  
    </div>

</template>

<script>
import axios from 'axios';

const registerUser = async (userData, userID) => {
  try {
    
    const response = await axios.put(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/usersV2/${userID}`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  props: ['userID'],
  data() {
    return {
      user:{},
      currentUserID: localStorage.getItem('userID')

    };
  },
  methods: {
    async register() {

      if (
    this.user.email === '') {
    alert('Some required fields are empty.');
    return;


     } 
      try {
        const response = await registerUser(this.user, this.userID);
        console.log('User registered:', response);
  
        this.goToUser(this.userID);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },


    async fetchData() {
        try {
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/usersV2/${this.userID}`;
          const response = await this.axios.get(url);
          this.user = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

      goToUser(userID) {
      this.$router.push({ path: `/contribuidores/${userID}` })
    },



      
    },

    mounted() {
      this.fetchData();

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
