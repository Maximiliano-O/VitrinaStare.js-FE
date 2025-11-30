<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

import RepositoryCard from '../components/RepositoryCard.vue'
import UserIcon from '../components/UserIcon.vue'
import ColoredButton from '../components/buttons/ColoredButton.vue'

// Props
const props = defineProps({
  userID: String
})

// Composables
const router = useRouter()
const { t } = useI18n()

// Reactive state
const user = ref({})
const repositories = ref([])

const currentUserID = localStorage.getItem('userID');
const profileUserID = props.userID;

// Fetch user data
async function fetchData() {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/users/${props.userID}`
    const response = await axios.get(url)
    user.value = response.data.result;
  } catch (err) {
    console.error('Error fetching user data:', err)
  }
}

// Fetch user's repositories
async function fetchUserRepositories() {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/repository/user/${props.userID}`
    const response = await axios.get(url)
    repositories.value = response.data.result;
  } catch (err) {
    console.error('Error fetching repositories:', err)
  }
}

// Navigation functions
function goToRepo(repositoryID) {
  router.push({ path: `/repository/${repositoryID}` })
}

function goToEdit(userID) {
  router.push({ path: `/user/${userID}/edit` })
}

// Watch for userID changes and refetch data accordingly
watch(() => props.userID, () => {
  fetchData()
  fetchUserRepositories()
})

// Initial data fetch
onMounted(() => {
  fetchData()
  fetchUserRepositories()
})
</script>


<template>
  <div class="profile-header">
    <!-- Avatar -->
    <UserIcon
      class="avatar-large"
      iconName="fa-regular-user-circle"
      :imageUrl="user.imageURL"
    />

    <!-- User info -->
    <div class="user-info">
      
      <div class="title-container">
        <div class="username">{{ user.username }}</div>
        <!-- GitHub button -->
        <ColoredButton
          is="button"
          class="icon-button"
          variant="black"
          style="transform: scale(0.75); transform-origin: left center;"
          iconName="bi-github"
          :to="user.urlGithubProfile"
        />
      </div>
      <div class="email">{{ user.email }}</div>
    </div>

    <!-- Edit button -->
    <div
      class="actions"
      v-if="currentUserID === profileUserID"
    >
      <ColoredButton variant="night" @click="goToEdit(userID)">
        {{ $t('userProfile.actions.editProfile') }}
      </ColoredButton>
    </div>
  </div>

  <!-- Repo publication -->
  <div class="sub-title">
    {{ $t('userProfile.publications') }}
  </div>
  <div class="repo-container">
    <RepositoryCard 
      v-for="repo in repositories" 
      :key="repo.repositoryID"
      :repository="repo"
      @click="goToRepo(repo._id)"
    />
  </div>

</template>

  
<style scoped>
.profile-header {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  gap: 25px;
  width: 100%;
  color: #000;
}

.avatar-large :deep(img),
.avatar-large :deep(svg) {
  width: 120px !important;
  height: 120px !important;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-grow: 1;
}

.username {
  font-size: 32px;
  font-family: 'Poppins-Bold';
}

.email {
  font-size: 20px;
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
}

.title-container {
  display: flex;
  gap: 15px;
  align-items: center;
}

.sub-title {
  align-items: center;
  font-family: 'Poppins-SemiBold', sans-serif;
  font-size: 28px;
  padding-left: 15px;
}

.repo-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  justify-items: center;
  column-gap: auto;
  row-gap: 30px;
  margin: 20px 0px;
}


</style>