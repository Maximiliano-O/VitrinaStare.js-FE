<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ColoredButton from '../components/buttons/ColoredButton.vue'
import FormInput from '../components/FormInput.vue'

const route = useRoute()
const router = useRouter()
const userID = route.params.userID
const currentUserID = localStorage.getItem('userID')

const username = ref('')
const email = ref('')
const password = ref('')
const imageUrl = ref('')
const githubUrl = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const fetchUserData = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/users/${userID}`)
    username.value = data.result.username || ''
    email.value = data.result.email || ''
    imageUrl.value = data.result.imageURL || ''
    githubUrl.value = data.result.urlGithubProfile || ''
  } catch (err) {
    console.error('Error fetching user data:', err)
  }
}

const updateUser = async () => {
  errorMessage.value = ''
  if (!username.value || !email.value) {
    errorMessage.value = 'Los campos requeridos no pueden estar vacíos.'
    return
  }

  const payload = {
    username: username.value,
    email: email.value,
    imageURL: imageUrl.value,
    ...(password.value ? { password: password.value } : {}), // Only include password if changed
  }

  try {
    isSubmitting.value = true
    await axios.put(`${import.meta.env.VITE_APP_EXPRESS_URL}/users/${userID}`, payload)
    router.push({ path: `/user/${userID}` })
  } catch (err) {
    console.error('Error updating user:', err)
    errorMessage.value = 'Hubo un problema al actualizar el perfil.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (currentUserID !== userID) {
    router.back();
  } else {
    fetchUserData()
  }
})
</script>

<template>
  <div class="view-content">
    <!-- Left panel -->
    <div class="color-side">
      <div class="color-title">{{ $t('userEdit.title') }}</div>
      <div class="color-body">{{ $t('userEdit.description') }}</div>
    </div>

    <!-- Form panel -->
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repositories' }">
          {{ $t('common.actions.back') }}
        </ColoredButton>
      </div>
      <div class="form-title">
        {{ $t('userEdit.form.title') }}
      </div>
      <div class="form-body">
        <FormInput 
          type="text" 
          v-model="username" 
          :placeholder="$t('userForm.fields.name.placeholder')"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('userForm.fields.name.label') }}
        </FormInput>
        <FormInput 
          type="email" 
          v-model="email" 
          :placeholder="$t('userForm.fields.name.placeholder')"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('userForm.fields.name.label') }}
        </FormInput>
        <FormInput 
          type="password" 
          v-model="password" 
          :placeholder="$t('userEdit.form.fields.newPassword.placeholder')"
        >
          {{ $t('userEdit.form.fields.newPassword.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="imageUrl" 
          :placeholder="$t('userForm.fields.image.placeholder')"
        >
          {{ $t('userForm.fields.image.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="githubUrl" 
          :placeholder="$t('userForm.fields.url.placeholder')" 
          disabled
        >
          {{ $t('userForm.fields.url.label') }}
        </FormInput>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <ColoredButton 
          class="wide-button" 
          variant="night" 
          :disabled="isSubmitting"
          @click="updateUser"
        >
          {{ isSubmitting ? $t('userEdit.actions.updating') : $t('userEdit.actions.update') }}
        </ColoredButton>
      </div>
    </div>
  </div>
</template>

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

.error {
  color: red;
  font-size: 14px;
}

</style>