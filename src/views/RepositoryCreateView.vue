<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ColoredButton from '../components/buttons/ColoredButton.vue';
import FormInput from '../components/FormInput.vue';

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
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_EXPRESS_URL}/checkRepoExistsAndMatchesUser/${encodedUserUrl}/${encodedRepoUrl}`
    )
    return data.result.success;
  } catch (err) {
    console.error('Error verifying GitHub repo ownership:', err)
    return false;
  }
}

const registerRepository = async () => {
  errorMessage.value = ''
  if (!repoName.value || !title.value || !description.value || !repoUrl.value || !imageUrl.value || !tags.value) {
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
      repositoryName: repoName.value,
      title: title.value,
      repositoryDesc: description.value,
      repositoryDoc: documentation.value,
      license: license.value,
      repositoryUrl: repoUrl.value,
      imageURL: imageUrl.value,
      type: 'public',
      tags: tags.value.split(',').map(tag => tag.trim()),
    }

    await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/repository`, payload)
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
      <div class="color-title">Crea un nuevo repositorio</div>
      <div class="color-body">
        Recuerda que para crear un nuevo repositorio en la plataforma, 
        tu proyecto debe seguir la plantilla para visualizaciones de StArE.js.
      </div>
    </div>

    <!-- Form panel -->
    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repositories' }">Volver</ColoredButton>
      </div>
      <div class="form-title">Datos del Nuevo Repositorio</div>
      <div class="form-body">
        <FormInput type="text" v-model="repoName" placeholder="Nombre del Repositorio" error-message="Campo requerido">
          Nombre del Repositorio*
        </FormInput>
        <FormInput type="text" v-model="title" placeholder="Título" error-message="Campo requerido">
          Título*
        </FormInput>
        <FormInput type="text" v-model="description" placeholder="Descripción..." error-message="Campo requerido">
          Descripción*
        </FormInput>
        <FormInput type="text" v-model="documentation" placeholder="Documentación del Repositorio">
          Documentación del Repositorio
        </FormInput>
        <FormInput type="text" v-model="license" placeholder="Licencia">
          Licencia
        </FormInput>
        <FormInput type="text" v-model="repoUrl" placeholder="URL del Repositorio" error-message="Campo requerido">
          URL del Repositorio*
        </FormInput>
        <FormInput type="text" v-model="imageUrl" placeholder="URL Imagen" error-message="Campo requerido">
          URL Imagen*
        </FormInput>
        <FormInput type="text" v-model="tags" placeholder="Etiquetas (separadas por coma)" error-message="Campo requerido">
          Etiquetas*
        </FormInput>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <ColoredButton 
          class="wide-button" 
          variant="night" 
          :disabled="isSubmitting"
          @click="registerRepository"
        >
          {{ isSubmitting ? 'Creando...' : 'Crear' }}
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