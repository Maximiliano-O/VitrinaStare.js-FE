<script setup>
import ColoredButton from '../components/buttons/ColoredButton.vue';
import FormInput from '../components/FormInput.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import logo from '/src/assets/Stare.js-Only-Eye-Logo.png';
import { useI18n } from 'vue-i18n';

import { useToast } from "vue-toastification";

const toast = useToast();

const { t } = useI18n()

// Helper function remains the same
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/users`, userData);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Local state
const isGuest = ref(localStorage.getItem('guest'));
const user = ref({
  email: '',
  password: '',
  username: '',
  imageURL: '',
  urlGithubProfile: ''
});

// Router instance
const router = useRouter();

// Main register function
const register = async () => {
  if (
    user.value.email === '' ||
    user.value.password === '' ||
    user.value.username === '' ||
    user.value.urlGithubProfile === ''
  ) {
    alert('Some required fields are empty.');
    return;
  }

  const checkUser = await checkGitHubUserExists();

  if (checkUser?.exists) {
    try {
      const response = await registerUser(user.value);
      console.log('User registered:', response);
      toast.success(t("notifications.auth.signupSuccess"));
      router.push({ name: 'repositories' });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  } else {
    alert('Github Account does not exist.');
  }
};

// GitHub existence checker
const checkGitHubUserExists = async () => {
  try {
    const encodedUrl = encodeURIComponent(user.value.urlGithubProfile);
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/checkUserExists?userUrl=${encodedUrl}`;
    const response = await axios.get(url);
    return response.data.result;
  } catch (err) {
    console.log('Error fetching data:', err);
  }
};
</script>

<template>
  <div class="view-content">
    <div class="color-side">
      <div class="title">
        <img :src="logo" alt="StArE.js logo">
        <span>
          StArE.js
        </span>
      </div>
    </div>
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repositories' }">
          {{ $t('common.actions.back') }}
        </ColoredButton>
      </div>
      <div class="form-title">
        {{ $t('userSignup.form.title') }}
      </div>
      <div class="form-body">
        <FormInput
          type="text" 
          :placeholder="$t('userForm.fields.name.placeholder')"
          v-model="user.username"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('userForm.fields.name.label') }}
        </FormInput>
        <FormInput
          type="email" 
          :placeholder="$t('common.form.email.placeholder')"
          v-model="user.email"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
          name="email"
          autocomplete="email"
        >
          {{ $t('common.form.email.label') }}
        </FormInput>
        <FormInput
          type="password" 
          :placeholder="$t('common.form.password.placeholder')"
          v-model="user.password"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('common.form.password.label') }}
        </FormInput>
        <FormInput
          type="text" 
          :placeholder="$t('userForm.fields.image.placeholder')"
          v-model="user.imageURL"
        >
          {{ $t('userForm.fields.image.label') }}
        </FormInput>
        <FormInput
          type="text" 
          :placeholder="$t('userForm.fields.url.label')"
          v-model="user.urlGithubProfile"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('userForm.fields.url.label') }}
        </FormInput>
        <ColoredButton 
          class="wide-button" 
          variant="night" 
          @click="register()"
        >
          {{ $t('userSignup.form.actions.save') }}
        </ColoredButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-content {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
}

.color-side {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #40702F;
  color: #ffffff;
  width: 50%;
}

.title {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: 'Poppins-Bold';
  font-size: 96px;
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
