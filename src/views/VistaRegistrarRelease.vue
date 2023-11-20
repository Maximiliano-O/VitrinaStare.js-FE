<template>

<div v-if="repo.contributorID === userID">
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>{{ $t('registerReleaseTitle') }}</h1>
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



          >{{ $t('repoBack') }}
        </a>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          v-on:click="addRelease"
          style="
          background-color: #6251b7c3;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
        {{ $t('registerRelease') }}
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
            <h3>{{ $t('releaseData') }}:</h3>
          </div>
          ㅤ
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('registerRelease') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
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
              <p style="font-size: 18px; margin-top: 2%">{{ $t('releaseDescription') }}</p>
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
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
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
<!--
          <ul>
            <p style="font-size: 18px; margin-top: 2%">Elements:</p>
          <li v-for="(element, index) in fetchedUsers" :key="index">{{ element }}</li>
        </ul>
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


export default {
  props: ['repositoryID'],
  data() {
    return {
      name: '',
      description: '',
      codesandbox_URL: '',
      fetchedUsers: [],
      fetchedEmails:[],
      userID: localStorage.getItem('userID'),
      repo:{}
    };
  },



  methods: {
 

    async addRelease() {



      if (
    this.name === '' || 
    this.codesandbox_URL === '') {

    alert('Some required fields are empty.');
    return;

     } 

      try {
        const response = await axios.post('http://localhost:9000/api/release', {
          repositoryID:this.repositoryID,
          name: this.name,
          description: this.description,
          codesandbox_URL: this.codesandbox_URL

       
        });
        console.log(response.data); 
        //this.requestValidation()

        const newReleaseID = response.data._id; 


        this.postSelectedUsers(newReleaseID);
        

        this.requestValidation(newReleaseID);


        this.$router.push({ path: `/repos/${this.repositoryID}` })
      } catch (error) {
        console.error(error);
      }
    },


    async fetchRandomUsers(n) {
    try {
      const url = `http://localhost:9000/api/usersV2/random/${this.userID}/${n}`;
      const response = await this.axios.get(url);
      this.fetchedUsers = response.data;
      this.fetchedEmails = this.fetchedUsers.map(user => user.email);
    } catch (err) {
      console.log('Error fetching random users:', err);
    }
  },


  async postSelectedUsers(releaseId) {
  try {
    for (let user of this.fetchedUsers) {
      const response = await this.axios.post(`http://localhost:9000/api/release/${releaseId}/status`, {
        releaseID: releaseId,
        reviewerID: user._id, 
        isReviewed: false,
        isSafe: false,
        additionalComments: '',
      });
      console.log(response.data); 
    }
  } catch (error) {
    console.error(error);
  }
},

    async requestValidation(releaseId) {
      try {
        const url = 'http://localhost:9000/api/send-emails';
        const data = {
          emails: this.fetchedEmails,
          repositoryLink: `http://localhost:5173/verificacion/${releaseId}`,
          
        };

        const response = await axios.post(url, data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    },

    async fetchData() {
        try {
          //const url = `http://localhost:9000/api/repositories/${this.repositoryID}`;
          const url = `http://localhost:9000/api/repoV2/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.repo = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      }
  },

  mounted() {
      this.fetchData();
      this.fetchRandomUsers(2);
      
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
