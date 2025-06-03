<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ColoredButton from './buttons/ColoredButton.vue'
import FormInput from './FormInput.vue'
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}

const input_email = ref('')
const input_password = ref('')
const showError = ref(false)

function logIn() {
  const email = input_email.value
  const password = input_password.value

  axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/login`, { email, password })
    .then(response => {
      const { loggedIn, user } = response.data
      if (loggedIn) {
        localStorage.setItem("user", user.username)
        localStorage.setItem("guest", 'false')
        localStorage.setItem("userID", user._id)
        window.location.href = '/'
      } else {
        showError.value = true
      }
    })
    .catch(error => {
      console.error(error)
      showError.value = true
    })
}

const loginButtonDisabled = ref(false)

function logInWithGithub() {
  loginButtonDisabled.value = true
  const provider = new GithubAuthProvider()

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user

      fetch(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/usersV2/email/${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data === null) {
            alert('Este correo no existe en la base de datos')
          } else {
            localStorage.setItem("user", data.username)
            localStorage.setItem("userID", data._id)
            localStorage.setItem("guest", 'false')
            window.location.href = '/'
          }
        })
        .catch(error => console.error('Error:', error))
    })
    .catch((error) => {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Inicio cancelado. Intenta nuevamente.')
      }
    })
    .finally(() => {
      loginButtonDisabled.value = false
    })
}
</script>


<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <button class="close-button" @click="emitClose">×</button>
      <div class="title">
        Iniciar Sesión
      </div>
      <FormInput 
        type="text" 
        v-model="input_email" 
        placeholder="Correo"
        error-message="No puede estar vacío"
      >
        Correo*
      </FormInput>
      <FormInput 
        type="password" 
        v-model="input_password" 
        placeholder="Contraseña"
        error-message="No puede estar vacío" 
      >
        Contraseña*
      </FormInput>
      <div class="button-pair">
        <ColoredButton variant="black" @click="emitClose">Volver</ColoredButton>
        <ColoredButton variant="wine" @click="logIn">Iniciar Sesión</ColoredButton>
      </div>
        <ColoredButton variant="night" @click="logInWithGithub">Iniciar Sesión con Github</ColoredButton>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Poppins-Bold";
  font-size: 36px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  display: flex;
  gap: 10px;
  width: 550px;
  height: auto;
  color: #000;
  background: white;
  padding: 20px;
  position: relative;
}

.button-pair {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.base-button {
  width: 100%;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>