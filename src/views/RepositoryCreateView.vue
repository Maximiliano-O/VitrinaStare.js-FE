<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ColoredButton from '../components/buttons/ColoredButton.vue';
import FormInput from '../components/FormInput.vue';
import { useI18n } from 'vue-i18n';

import { useToast } from "vue-toastification";

const { t } = useI18n()
const toast = useToast();

const router = useRouter();
const userID = localStorage.getItem('userID');
const username = localStorage.getItem('user');
const currentUserGithub = ref('');

const title = ref('');
const repoName = ref('');
const description = ref('');
const documentation = ref('');
const license = ref('');
const repoUrl = ref('');
const imageUrl = ref('');
const tags = ref('');

const errorMessage = ref('');
const isSubmitting = ref(false);

const fetchGitHubProfile = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/users/${userID}/urlGithubProfile`);
    currentUserGithub.value = data.result;
  } catch (err) { 
    console.error('Error fetching GitHub profile:', err);
  }
}

const checkGitHubOwnership = async () => {
  try {
    const encodedRepoUrl = encodeURIComponent(repoUrl.value);
    const encodedUserUrl = encodeURIComponent(currentUserGithub.value);
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/checkRepoExistsAndMatchesUser?userUrl=${encodedUserUrl}&repoUrl=${encodedRepoUrl}`
    const response = await axios.get(url);
    console.log('Github repo endpoint response: ', response.data.result)
    return response.data.result.success;
  } catch (err) {
    console.error('Error verifying GitHub repo ownership:', err)
    return false;
  }
}

const registerRepository = async () => {
  errorMessage.value = ''
  if (!title.value || !description.value || !repoUrl.value || !imageUrl.value || !tags.value) {
    errorMessage.value = 'Todos los campos marcados con * son obligatorios.';
    return;
  }

  isSubmitting.value = true
  const isOwner = await checkGitHubOwnership()
  if (!isOwner) {
    errorMessage.value = 'El enlace del repositorio no corresponde a tu cuenta de GitHub.';
    isSubmitting.value = false;
    return;
  }

  try {
    const payload = {
      userID: userID,
      author: username,
      title: title.value,
      repositoryName: repoName.value,
      repositoryDesc: description.value,
      repositoryDoc: documentation.value,
      license: license.value,
      repositoryUrl: repoUrl.value,
      imageURL: imageUrl.value,
      type: 'public',
      tags: tags.value.split(',').map(tag => tag.trim()),
    }

    await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/repository`, payload)
    toast.success(t("notifications.repository.created"));
    router.push({ name: 'repositories' })
  } catch (err) {
    console.error('Error registering repository:', err)
    errorMessage.value = 'Hubo un problema al registrar el repositorio.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(fetchGitHubProfile)
</script>

<template>
  <div class="view-content">
    <!-- Left color panel -->
    <div class="color-side">
      <div class="color-title">{{ $t('repositoryCreate.title') }}</div>
      <div class="color-body">
        {{ $t('repositoryCreate.description') }}
      </div>
    </div>

    <!-- Form panel -->
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repositories' }">{{ $t('common.actions.back') }}</ColoredButton>
      </div>
      <div class="form-title">{{ $t('repositoryCreate.form.title') }}</div>
      <div class="form-body">
        <FormInput 
          type="text" 
          v-model="title" 
          :placeholder="$t('repositoryForm.fields.title.placeholder')" 
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('repositoryForm.fields.title.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="description" 
          :placeholder="$t('repositoryForm.fields.description.placeholder')" 
          :error-message="$t('common.form.errors.emptyRequired')"
          required
          multiline
        >
          {{ $t('repositoryForm.fields.description.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="documentation" 
          :placeholder="$t('repositoryForm.fields.documentation.placeholder')"
        >
          {{ $t('repositoryForm.fields.documentation.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="license" 
          :placeholder="$t('repositoryForm.fields.license.placeholder')" 
        >
          {{ $t('repositoryForm.fields.license.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="repoUrl" 
          :placeholder="$t('repositoryForm.fields.url.placeholder')" 
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('repositoryForm.fields.url.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="imageUrl" 
          :placeholder="$t('repositoryForm.fields.image.placeholder')"
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('repositoryForm.fields.image.label') }}
        </FormInput>
        <FormInput 
          type="text" 
          v-model="tags" 
          :placeholder="$t('repositoryForm.fields.tags.placeholder')" 
          :error-message="$t('common.form.errors.emptyRequired')"
          required
        >
          {{ $t('repositoryForm.fields.tags.label') }}
        </FormInput>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <ColoredButton 
          class="wide-button" 
          variant="night" 
          :disabled="isSubmitting"
          @click="registerRepository"
        >
          {{ isSubmitting ? 'Creando...' : $t('repositoryCreate.form.actions.save') }}
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
}

.color-side {
  padding: 70px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  background: #382F70;
  color: #ffffff;
  width: 50%;
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
  margin-bottom: 20px;
}

.error {
  color: red;
  font-size: 14px;
}

</style>