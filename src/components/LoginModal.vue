<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ColoredButton from './buttons/ColoredButton.vue'
import FormInput from './FormInput.vue'
import { useRouter } from "vue-router";
import { setUser } from '@/store/globalState.js';
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

import { useI18n } from 'vue-i18n';

import { useToast } from "vue-toastification";

const router = useRouter();
const { t, locale } = useI18n();
const toast = useToast();

const emit = defineEmits(['close']);

function emitClose() {
  emit('close')
};

const input_email = ref('');
const input_password = ref('');
const showError = ref(false);

async function logIn() {
  showError.value = false;

  try {
    const email = input_email.value;
    const password = input_password.value;

    const response = await axios.post(
      `${import.meta.env.VITE_APP_EXPRESS_URL}/login`,
      { email, password }
    );

    const user = response.data.result;

    if (user) {
      setUser(user);
      emit('close');
      toast.success(t("notifications.auth.loginSuccess"));
      router.replace(router.currentRoute.value.fullPath);
    } else {
      showError.value = true;
    }
  } catch (error) {
    console.error(error);
    showError.value = true;
  }
}


const loginButtonDisabled = ref(false);

async function logInWithGithub() {
  loginButtonDisabled.value = true;

  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const response = await fetch(
      `${import.meta.env.VITE_APP_EXPRESS_URL}/users/email/${user.email}`
    );

    const data = await response.json();

    if (data === null) {
      alert("No se encuentra el email");
    } else {
      localStorage.setItem("user", data.username);
      localStorage.setItem("userID", data._id);
      localStorage.setItem("guest", 'false');

      toast.success(t("notifications.auth.loginSuccess"));

      emit('close');
      router.replace(router.currentRoute.value.fullPath);
    }

  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('Inicio cancelado. Intenta nuevamente.');
    } else {
      console.error(error);
    }
  } finally {
    loginButtonDisabled.value = false;
  }
}

</script>


<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <button class="close-button" @click="emitClose">×</button>
      <div class="title">
        {{ $t('login.title') }}
      </div>
      <FormInput 
        type="text" 
        v-model="input_email" 
        :placeholder="$t('common.form.email.placeholder')"
        :error-message="$t('common.form.errors.emptyRequired')"
        name="email"
        autocomplete="email"
        required
      >
        {{ $t('common.form.email.label') }}
      </FormInput>
      <FormInput 
        type="password" 
        v-model="input_password" 
        :placeholder="$t('common.form.password.placeholder')"
        :error-message="$t('common.form.errors.emptyRequired')"
        required
      >
        {{ $t('common.form.password.label') }}
      </FormInput>
      <div class="button-pair">
        <ColoredButton variant="black" @click="emitClose">{{ $t('common.actions.back') }}</ColoredButton>
        <ColoredButton variant="wine" @click="logIn">{{ $t('login.actions.submit') }}</ColoredButton>
      </div>
        <ColoredButton variant="night" @click="logInWithGithub">{{ $t('login.actions.github') }}</ColoredButton>
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