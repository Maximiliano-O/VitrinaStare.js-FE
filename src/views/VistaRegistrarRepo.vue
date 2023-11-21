<template>

<div v-if="isGuest==='false'">
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>{{ $t('registerRepo') }}</h1>
      </div>
      <div class="col-2">
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
          >{{ $t('repoBack') }}
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
                name="repository.repositoryName"
                v-model="repository.title"
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
                name="repository.repositoryDesc"
                v-model="repository.repositoryName"
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
                name="repository.repositoryDesc"
                v-model="repository.repositoryDesc"
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
                name="repository.repositoryName"
                v-model="repository.repositoryDoc"
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
                name="repository.license"
                v-model="repository.license"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('urlRepo') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryUrl"
                v-model="repository.repositoryUrl"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
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
                name="repository.repositoryName"
                v-model="repository.imageURL"
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
                name="repository.repositoryName"
                v-model="repository.tags"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          ㅤ


          <div class="col-3">
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
        {{ $t('postRepo') }}
          
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
  data() {
    return {
       isGuest: localStorage.getItem('guest'),

      currentUserGithub:'',
      repository: {

        contributorID: localStorage.getItem('userID'),

        author: localStorage.getItem('user'),
        title: '',
        type: 'public',
        imageURL:'',
        tags:[],
        repositoryName: '',
        repositoryDesc: '',
        repositoryDoc: '',
        license: '',
        repositoryUrl: '',
        
      },
    };
  },
  methods: {

    async register() {


      if (
    this.repository.repositoryName === '' || 
    this.repository.repositoryUrl === '' || 
    this.repository.title === '' || 
    this.repository.repositoryDesc === '') {
    alert('Some required fields are empty.');
    return;
     } 


     let checkRepo = await this.checkGitHub();

     if(checkRepo.exists) {
      
      this.repository.tags = this.repository.tags.split(',');
      try {
   
        
               const response = await fetch(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2`, {
         method: 'POST',
         body: JSON.stringify(this.repository),
         headers: {
           'Content-Type': 'application/json',
         },
         
       });
       this.$router.push('/');
       

       if (!response.ok) {
        
      throw new Error(`HTTP error! status: ${response.status}`);
      
    }
       
      } catch (error) {
        console.error('Error registering repository:', error);
        
      }
    }

    else {
      alert('Github Repo Link not detected in your Github account.');
      }
  },
    
    async fetchData() {
        try {
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/usersV2/urlGithubProfile/${this.repository.contributorID}`;
          const response = await this.axios.get(url);
          this.currentUserGithub = response.data.urlGithubProfile;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },


    async checkGitHub() {
        try {
          const encodedRepoUrl = encodeURIComponent(this.repository.repositoryUrl);
      
          const encodedUserUrl = encodeURIComponent(this.currentUserGithub);

          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/checkRepoExistsAndMatchesUser/${encodedUserUrl}/${encodedRepoUrl}`;

          const response = await this.axios.get(url);
          return response.data; 
          
        } catch (err) {
          console.log('Error fetching data:', err);
        }
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
