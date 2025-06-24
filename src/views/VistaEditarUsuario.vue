<script setup>
import ColoredButton from '../components/buttons/ColoredButton.vue';
import FormInput from '../components/FormInput.vue';
</script>

<template>
  <div class="view-content">
    <div class="color-side">
      <div class="color-title">
        Actualizar Perfil
      </div>
      <div class="color-body">
        No puedes cambiar la URL de tú usuario de Github
      </div>
    </div>
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repos' }">Volver</ColoredButton>
      </div>
      <div class="form-title">
        Edición de Perfil
      </div>
      <div class="form-body">
        <FormInput
          type="text" 
          placeholder="Nombre de Usuario"
          error-message="Campo requerido, no puede estar vacío"
        >
          Nombre de Usuario*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="Correo"
          error-message="Campo requerido, no puede estar vacío"
        >
          Correo*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="Contraseña"
          error-message="Campo requerido, no puede estar vacío"
        >
          Contraseña*
        </FormInput>
        <FormInput
          type="text" 
          placeholder="URL de Imagen de Perfil"
        >
          URL de Imagen de Perfil
        </FormInput>
        <FormInput
          type="text" 
          placeholder="URL de Usuario de Github"
          error-message="Campo requerido, no puede estar vacío"
        >
          URL de Usuario de Github*
        </FormInput>
        <ColoredButton 
          class="wide-button" 
          variant="night" 
          @click="register()"
        >
          Actualizar
        </ColoredButton>
      </div>
    </div>
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