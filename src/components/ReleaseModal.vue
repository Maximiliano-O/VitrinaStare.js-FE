<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ColoredButton from './buttons/ColoredButton.vue'
import FormInput from './FormInput.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  repositoryID: String,
})
const emit = defineEmits(['close'])

const version = ref('')
const description = ref('')
const sandboxUrl = ref('')
const showError = ref(false)
const errorMessage = ref('')
const fetchedUsers = ref([])
const fetchedEmails = ref([])
const repo = ref({})
const userID = localStorage.getItem('userID')
const router = useRouter()

function emitClose() {
  emit('close')
}

// Fetch repository info to check contributor ownership
const fetchRepo = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/repository/${props.repositoryID}`)
  repo.value = data.result;
}

// Fetch random users for review assignment
// For now admin exclusive, this is for user managed verification
// const fetchRandomUsers = async (n) => {
//   const { data } = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/users/random/${userID}/${n}`)
//   fetchedUsers.value = data.result;
//   fetchedEmails.value = data.result.map(user => user.email)
// }

const ADMIN_EMAIL = "vitrina.stare@gmail.com";

const fetchAdminUser = async () => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/users/email/${ADMIN_EMAIL}`;
    const { data } = await axios.get(url);
    fetchedUsers.value = [data.result];
    fetchedEmails.value = [data.result.email];
  } catch (err) {
    console.warn("Admin user not found, skipping reviewer assignment.");
    fetchedUsers.value = [];
    fetchedEmails.value = [];
  }
};

// Main add release flow
const addRelease = async () => {
  if (!version.value || !sandboxUrl.value) {
    showError.value = true
    errorMessage.value = 'Los campos requeridos no pueden estar vacíos.'
    return
  }

  try {
    // Create new release
    const { data } = await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/release`, {
      repositoryID: props.repositoryID,
      name: version.value,
      description: description.value,
      codesandbox_URL: sandboxUrl.value,
    })

    const newRelease = data.result;

    emitClose() // Close modal

    // Fetch admin user
    await fetchAdminUser();

    // Assign admin as reviewer if available
    if (fetchedUsers.value.length > 0) {
      await Promise.all(
        fetchedUsers.value.map(user =>
          axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/release/${newRelease._id}/status`, {
            releaseID: newRelease._id,
            reviewerID: user._id,
            isReviewed: false,
            isSafe: false,
            additionalComments: '',
          })
        )
      )
    }

    // // Assign reviewers
    // To use when verification is made by users again
    // await Promise.all(
    //   fetchedUsers.value.map(user =>
    //     axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/release/${newRelease._id}/status`, {
    //       releaseID: newRelease._id,
    //       reviewerID: user._id,
    //       isReviewed: false,
    //       isSafe: false,
    //       additionalComments: '',
    //     })
    //   )
    // )

    // Send review request emails
    await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/send-emails`, {
      emails: fetchedEmails.value,
      repositoryLink: `${window.location.origin}/verification/${newRelease._id}`,
    })

    router.push({ name: 'detalleRepo', params: { repositoryID: props.repositoryID } })
  } catch (err) {
    console.error('Error creating release:', err)
    showError.value = true
    errorMessage.value = 'Hubo un problema al registrar la versión.'
  }
}

onMounted(async () => {
  await fetchRepo()
  // await fetchRandomUsers(Number(import.meta.env.VITE_USERS_THAT_VERIFY_AMMOUNT))
  // This is to have community participation in verification for now it will be
  // admin exclusive
})
</script>

<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <button class="close-button" @click="emitClose">×</button>
      <div v-if="repo.userID === userID">
        <div class="title">Datos de la Nueva Versión</div>

        <FormInput 
          type="text" 
          v-model="version" 
          placeholder="Versión"
          error-message="No puede estar vacío"
        >Versión*</FormInput>

        <FormInput 
          type="text" 
          v-model="description" 
          placeholder="Descripción..."
        >Descripción</FormInput>

        <FormInput 
          type="text" 
          v-model="sandboxUrl" 
          placeholder="CodeSandbox URL"
          error-message="No puede estar vacío"
        >CodeSandbox URL*</FormInput>

        <p v-if="showError" class="error">{{ errorMessage }}</p>

        <div class="button-pair">
          <ColoredButton variant="black" @click="emitClose">Volver</ColoredButton>
          <ColoredButton variant="night" @click="addRelease">Añadir Versión</ColoredButton>
        </div>
      </div>

      <div v-else class="error-message">
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para añadir versiones a este repositorio.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Poppins-Bold";
  font-size: 32px;
  margin-bottom: 10px;
}

.error {
  color: red;
  font-size: 14px;
}

.error-message {
  text-align: center;
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