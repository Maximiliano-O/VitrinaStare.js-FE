

<template>
  <form @submit.prevent="onSubmit()" class="contact-form">
    <div class="sidebar-header">
        <img src="@/assets/logo_empresa.png" width="200" height="200" />
    </div>

    <label for="name">Correo:</label>
    <input v-model="name" id="name">
    <label for="address">Contraseña:</label>
    <input v-model="address" id="address">
    

    ㅤ
    
    


          <div>
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/"
          style="
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Iniciar Sesión
        </a>
      </div>
  </form>
  

</template>

<script setup>
import { ref } from 'vue'

const name = ref('')

</script>


<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    width: 30%;
    border: 1px solid lightgrey;
    padding: 20px;
    border-radius: 8px;
    background: #bbcee3;
   
  }
  .contact-form label {
    margin-top: 10px;
  }
  .contact-form .button {
    margin-top: 20px;
  }
  body {
  background-color: #ebeef3;
  
}
form {
  text-align: center;
  margin: 0 auto; 
  width: 500px;
}

</style>