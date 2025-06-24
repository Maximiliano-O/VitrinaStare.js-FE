<script setup>
import ColoredButton from '../components/buttons/ColoredButton.vue';
import FormInput from '../components/FormInput.vue';
</script>

<template>
  <div class="view-content">
    <div class="color-side">
      <div class="color-title">
        Actualizar Repositorio
      </div>
      <div class="color-body">
        No puedes cambiar la URL del repositorio
      </div>
    </div>
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repos' }">Volver</ColoredButton>
      </div>
      <div class="form-title">
        Edición de Repositorio
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
        >
          URL Imagen
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