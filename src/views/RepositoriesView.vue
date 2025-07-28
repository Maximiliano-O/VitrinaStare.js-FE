<script setup>
import { ref, computed, onMounted } from 'vue';
import RepositoryCard from '../components/RepositoryCard.vue';
import CustomSelect from '../components/CustomSelect.vue';
import CustomSearch from '../components/CustomSearch.vue';
import ColoredButton from '../components/buttons/ColoredButton.vue';
import Multiselect from '@vueform/multiselect';
import '../assets/multiselect.css';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import axios from 'axios';

const { t } = useI18n();
const router = useRouter();

// Reactive state variables
const sortByRating = ref('');
const isGuest = ref(localStorage.getItem('guest') === 'true');
const repositories = ref([]);
const tags = ref([]);
const currentTags = ref([]);
const searchString = ref('');

// Select options with translation
const myOptions = [
  { label: t('defaultOrder'), value: '' },
  { label: t('ascendingRating'), value: 'asc' },
  { label: t('descendingRating'), value: 'desc' }
];

// Computed filtered repositories based on tags, search, and sort
const filteredRepositories = computed(() => {
  let repos = repositories.value;

  // Filter by tags
  if (currentTags.value.length > 0) {
    repos = repos.filter(repo =>
      currentTags.value.every(tag => repo.tags.includes(tag))
    );
  }

  // Filter by search string
  if (searchString.value) {
    repos = repos.filter(repo =>
      repo.title.toLowerCase().includes(searchString.value.toLowerCase())
    );
  }

  // Sort repositories
  if (sortByRating.value === 'asc') {
    repos = repos.slice().sort((a, b) => a.totalRating - b.totalRating);
  } else if (sortByRating.value === 'desc') {
    repos = repos.slice().sort((a, b) => b.totalRating - a.totalRating);
  }

  return repos;
})

// Methods for fetching data and navigation
async function fetchAllRepositories() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/repository`);
    repositories.value = response.data.result;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllTags() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/unique-tags`)
    tags.value = response.data.result;
  } catch (error) {
    console.error(error);
  }
}

function goToDetails(repositoryID) {
  router.push({ path: `/repository/${repositoryID}` });
}

// Fetch data on mount
onMounted(() => {
  fetchAllRepositories();
  fetchAllTags();
});

</script>

<template>
  <div class="overflow-auto" style="max-height: 100%">
    <div class="container-fluid">
      <div class="row">
        <div class="title">
          <h1>{{ t('repositoriesView') }}</h1>
          <ColoredButton 
            v-if="!isGuest" 
            variant="night"
            :to="{ name: 'repositoryCreate' }"
          >
            {{ t('createRepository') }}
          </ColoredButton>
        </div>
      </div>
      <div class="overflow-auto" style="max-height: 100%">
        <div class="container-fluid">
          <div style="display: flex; justify-content: center;">
            <div class="input-group">
              <div>
                <CustomSelect 
                  v-model="sortByRating" 
                  :options="myOptions" 
                  :default-text="t('defaultOrder')"
                />
              </div>
              <CustomSearch
                type="text" 
                v-model="searchString" 
                :placeholder="t('searchRepositories')" 
              />
              <Multiselect class="multi-size"
                v-model="currentTags"
                mode="tags"
                :placeholder="t('typeAndSelectTags')"
                :options="tags"
                searchable
              />
            </div>
          </div>
          <div class="repo-container">
            <RepositoryCard 
              v-for="repo in filteredRepositories" 
              :key="repo.repositoryID"
              :repository="repo"
              @click="goToDetails(repo._id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Poppins-Bold';
  src: url('@/assets/fonts/Poppins/Poppins-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins';
  src: url('@/assets/fonts/Poppins/Poppins-Regular.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.title {
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 32px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}
.container-fluid {
    position: relative;
}

.input-group  {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 10px 20px;
  width: auto;
}

.search {
  width: 500px;
}

/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}

input{
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color: #000;
  background-color: #ffffff;
  border: 1px solid #818181;
  border-radius: 6px;
  padding: 0px 12px;
  transition: border-color 0.3s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input::placeholder {
  color: #898985;
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
