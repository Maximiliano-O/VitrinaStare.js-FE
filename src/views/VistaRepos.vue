<script setup>
import RepositoryCard from '../components/RepositoryCard.vue';
import CustomSelect from '../components/CustomSelect.vue';
import CustomSearch from '../components/CustomSearch.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const myOptions = [
  { label: t('defaultOrder'), value: '' },
  { label: t('ascendingRating'), value: 'asc' },
  { label: t('descendingRating'), value: 'desc' }
]
</script>

<template>
  <div class="overflow-auto" style="max-height: 100%">
    <div class="container-fluid">
      <div class="row">
        <div class="title">
          <h1>{{ $t('repositoriesView') }}</h1>
        </div>
        <div  class="col-2">
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
                  default-text="t('defaultOrder')"
                />
              </div>
              <CustomSearch
                type="text" 
                v-model="searchString" 
                :placeholder="$t('searchRepositories')" 
              />
              <Multiselect class="multi-size"
                v-model="currentTags"
                mode="tags"
                :placeholder="$t('typeAndSelectTags')"
                :options="tags"
                :searchable="true"
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

<script>
import Multiselect from '@vueform/multiselect'
import '../assets/multiselect.css';

export default {
  components: { Multiselect },
  name: "Repositories",
  data() {
    return {
      sortByRating: '',
      isguest: localStorage.getItem("guest"),
      repositories: [],
      tags: [],
      currentTags: [],
      searchString: ''
    };
  },

  computed: {

    filteredRepositories() {
    let repos = this.repositories;

    // filter by tags
    if (this.currentTags.length > 0) {
      repos = repos.filter(repository => {
        return this.currentTags.every(tag => repository.tags.includes(tag));
      });
    }

    // filter by search string
    if (this.searchString) {
      repos = repos.filter(repo => {
        return repo.title.toLowerCase().includes(this.searchString.toLowerCase());
      });
    }

    // sort the repositories
    if (this.sortByRating === 'asc') { // sort ascending
      repos.sort((a, b) => a.totalRating - b.totalRating);
    } else if (this.sortByRating === 'desc') { // sort descending
      repos.sort((a, b) => b.totalRating - a.totalRating);
    }

    return repos;
  },

  sortedRepositories() {
    let repos = this.filteredRepositories.slice() // create a copy
    if (this.sortByRating === 'asc') { // sort ascending
      repos.sort((a,b) => a.totalRating - b.totalRating)
    } else if (this.sortByRating === 'desc') { // sort descending
      repos.sort((a, b) => b.totalRating - a.totalRating)
    }
    return repos // return (sorted) copy
  },
},
  methods: {
    async fetchAllRepositories() {
      try {
        
       

        const response = await this.axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2`);
        this.repositories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllTags() {
      try {
        const responsetag = await this.axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/unique-tags`);
        this.tags = responsetag.data;
      } catch (error) {
        console.log(error);
      }
    },

    
    goToDetails(repositoryID) {
      this.$router.push({ path: `/repos/${repositoryID}` })
    },
  },
  created() {
    this.fetchAllRepositories();
    this.fetchAllTags();
  },
};
</script>

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
