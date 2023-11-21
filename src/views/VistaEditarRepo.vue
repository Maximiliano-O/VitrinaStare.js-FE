<template>

<div v-if="repo.contributorID===currentUserID">
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>{{ $t('updateRepo') }} </h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-secondary text-white"
          @click="goToRepo(repositoryID)"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >{{ $t('repoBackSingle') }}
        </a>
      </div>



    </div>
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">
        <form @submit.prevent="register" method="post" id="form_crearCliente">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
     

          </div>
 
 
          <div class="row m-3">
            <h3>{{ $t('repositoryDetails') }}</h3>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('title') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.title"
                v-model="repo.title"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>

          </div>

          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('repoName') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.repositoryDesc"
                v-model="repo.repositoryName"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('description') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.repositoryDesc"
                v-model="repo.repositoryDesc"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('repoDoc') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.repositoryName"
                v-model="repo.repositoryDoc"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('License') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.license"
                v-model="repo.license"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('urlRepo') }}:  ㅤ {{repo.repositoryUrl}}</p>
            
            </div>
   
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('urlRepoImage') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.repositoryName"
                v-model="repo.imageURL"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('newTags') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repo.repositoryName"
                v-model="repo.tags"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          ㅤ

          <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
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

axios.defaults.timeout = 5000;




export default {
  name: 'VistaRegistrarRepo',

  props: ['repositoryID'],
  data() {
    return {

      repo:{},
      currentUserID: localStorage.getItem('userID')

    };
  },
  methods: {

    async register() {


      if (
        this.repo.repositoryName === '' || 
        this.repo.title === '' || 
        this.repo.repositoryDesc === '') {
        alert('Some required fields are empty.');
        return;
     } 
  

        this.repo.tags = this.repo.tags.split(',');
      try {
        //const response = await registerRepository(this.repository);
        //console.log('Repository registered:', response);
        // Redirect to the dashboard or another page
               const response = await fetch(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/${this.repositoryID}`, {
         method: 'PUT',
         body: JSON.stringify(this.repo),
         headers: {
           'Content-Type': 'application/json',
         },
         
       });

       this.goToRepo(this.repositoryID);
       //this.$router.push('/');
       //alert('Faltan campos obligatorios')

       if (!response.ok) {
        alert('Faltan campos obligatorios3');
      throw new Error(`HTTP error! status: ${response.status}`);
      
    }
       
      } catch (error) {
        console.error('Error registering repository:', error);
        alert('Faltan campos obligatorios2');
      }
    },


    async fetchData() {
        try {
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/${this.repositoryID}`;
          const response = await axios.get(url);
          this.repo = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },


      goToRepo(repositoryID) {
      this.$router.push({ path: `/repos/${repositoryID}` })
    },


  
  },

  mounted() {
      this.fetchData();
      
      

      
    },
  
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
