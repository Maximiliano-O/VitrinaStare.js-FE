<script setup>
import ColoredButton from '../components/buttons/ColoredButton.vue';
import FormInput from '../components/FormInput.vue';
</script>

<template>
  <div class="view-content">
    <div class="color-side">
      <div class="color-title">
        Crea un nuevo repositorio
      </div>
      <div class="color-body">
        Recuerda que para crear un nuevo repositorio en la plataforma, 
        tú proyecto debe seguir la plantilla para visualizaciones de StArE.js
      </div>
    </div>
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repos' }">Volver</ColoredButton>
      </div>
      <div class="form-title">
        Datos del Nuevo Repositorio
      </div>
      <div class="form-body">
        <FormInput
          type="text" 
          placeholder="Nombre del Repositorio"
          error-message="Campo requerido, no puede estar vacío"
        >
          Nombre del Repositorio*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="Descripción..."
          error-message="Campo requerido, no puede estar vacío"
        >
          Descripción*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="Documentación del Repositorio"
        >
          Documentación del Repositorio
        </FormInput>
        <FormInput
          type="text" 
          placeholder="Licencia"
        >
          Licencia
        </FormInput>
        <FormInput
          type="text" 
          placeholder="URL del Repositorio"
          error-message="Campo requerido, no puede estar vacío"
        >
          URL del Repositorio*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="URL Imagen"
          error-message="Campo requerido, no puede estar vacío"
        >
          URL Imagen*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="Etiquetas"
          error-message="Campo requerido, no puede estar vacío"
        >
          Etiquetas*
        </FormInput>
        <ColoredButton 
          class="wide-button" 
          variant="night" 
          @click="register()"
        >
          Crear
        </ColoredButton>
      </div>
    </div>
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
   
        
               const response = await fetch(`${import.meta.env.VITE_APP_EXPRESS_URL}/repoV2`, {
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
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/usersV2/urlGithubProfile/${this.repository.contributorID}`;
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

          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/checkRepoExistsAndMatchesUser/${encodedUserUrl}/${encodedRepoUrl}`;

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

<style scoped>
.view-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.color-side {
  padding: 70px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  background: #382F70;
  color: #ffffff;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.color-title {
  font-family: 'Poppins-Bold';
  font-size: 96px;
}

.color-body {
  padding: 0px 25px;
  font-family: 'Poppins-SemiBold';
  font-size: 28px;
}

.form-side {
  display: flex;
  flex-direction: column;
  padding: 20px 150px;
  gap: 10px;
  background: #fff;
  color: #000;
  width: 50%;
  height: 100%;
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: end;
  width: 100%;
}

.button {
  width: 200px;
}

.form-title {
  font-family: 'Poppins-Bold';
  font-size: 36px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wide-button {
  width: 100%;
}

</style>