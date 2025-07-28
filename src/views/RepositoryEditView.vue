<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ColoredButton from '../components/buttons/ColoredButton.vue'
import FormInput from '../components/FormInput.vue'

const props = defineProps({
  repositoryID: { type: String, required: true }
})

const router = useRouter()

const repo = ref({})
const currentUserID = ref(localStorage.getItem('userID'))

// When fetching, if tags are array, convert to string for input
const fetchData = async () => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/repository/${props.repositoryID}`;
    const response = await axios.get(url);
    const data = response.data.result;
    // Convert tags array to comma-separated string for input
    if (Array.isArray(data.tags)) {
      data.tags = data.tags.join(',');
    }
    repo.value = data;
  } catch (err) {
    console.error('Error fetching repository data:', err);
  }
}

// Before saving, convert tags string to array
const register = async () => {
  if (!repo.value.repositoryName || !repo.value.title || !repo.value.repositoryDesc) {
    alert('Algunos campos requeridos están vacíos.');
    return;
  }

  try {
    // Convert tags string to array before sending, but do NOT mutate repo.value.tags!
    const tagsArray = repo.value.tags
      ? repo.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    // Prepare the data to send, cloning repo.value but replacing tags with tagsArray
    const payload = { ...repo.value, tags: tagsArray };

    const response = await fetch(
      `${import.meta.env.VITE_APP_EXPRESS_URL}/repository/${props.repositoryID}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    goToRepo(props.repositoryID);
  } catch (error) {
    console.error('Error updating repository:', error);
    alert('Ocurrió un error al actualizar el repositorio.');
  }
}

// Navigate to repo view
const goToRepo = (id) => {
  router.push({ name: 'repositoryDetails', params: { repositoryID: id } });
}

onMounted(fetchData)
</script>

<template>
  <div class="view-content">
    <div class="color-side">
      <div class="color-title">Actualizar Repositorio</div>
      <div class="color-body">No puedes cambiar la URL del repositorio</div>
    </div>

    <div class="form-side">
      <div class="button-container">
        <ColoredButton class="button" :to="{ name: 'repositories' }">Volver</ColoredButton>
      </div>

      <div class="form-title">Edición de Repositorio</div>
      <div class="form-body">
        <FormInput v-model="repo.repositoryName" type="text" placeholder="Nombre del Repositorio" error-message="Campo requerido">
          Nombre del Repositorio*
        </FormInput>
        <FormInput v-model="repo.repositoryDesc" type="text" placeholder="Descripción..." error-message="Campo requerido">
          Descripción*
        </FormInput>
        <FormInput v-model="repo.repositoryDoc" type="text" placeholder="Documentación del Repositorio">
          Documentación del Repositorio
        </FormInput>
        <FormInput v-model="repo.license" type="text" placeholder="Licencia">
          Licencia
        </FormInput>
        <FormInput v-model="repo.repositoryUrl" type="text" placeholder="URL del Repositorio" disabled>
          URL del Repositorio*
        </FormInput>
        <FormInput v-model="repo.imageURL" type="text" placeholder="URL Imagen">
          URL Imagen
        </FormInput>
        <FormInput v-model="repo.tags" type="text" placeholder="Etiquetas (separadas por coma)" error-message="Campo requerido">
          Etiquetas*
        </FormInput>

        <ColoredButton class="wide-button" variant="night" @click="register">
          Guardar Cambios
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

</style>