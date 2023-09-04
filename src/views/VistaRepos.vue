<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-8">
        <h1>Vista Repositorios</h1>
      </div>

      <div v-if="isguest==='false'" class="col-2">
        <a
          
          type="button"
          class="btn btn-primary text-white"
          href="/repos/registrarRepositorio"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Registrar Repositorio
        </a>
        
      </div>

      
      <div  class="col-2">

        
      </div>
      
    </div>
    
    ㅤ


    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">

  <div class="container-fluid">

    <input type="text" v-model="searchString" placeholder="Buscar Repositorios..." />

    <Multiselect
      
      v-model="currentTags"
      mode="tags"
      placeholder="Type and select tags"
      :options="tags"
      :searchable="true"
    />

    <select v-model="sortByRating">
    <option value="">Order Predeterminado</option>
    <option value="asc">Rating Ascendiente</option>
    <option value="desc">Rating Descendiente</option>
    </select>
    
    <div class="grid-container">
      <div class="item" v-for="repo in filteredRepositories" :key="repo.repositoryID">
        <div style="font-weight: bold;">{{ repo.title }}</div>
      <img :src="repo.imageURL" :alt="`Image ${index + 1}`">
      <div>Autor: {{ repo.author }}</div>
      <div>Tags: {{ repo.tags }}</div>    
      <div>Rating: {{ repo.totalRating }}</div>          
        
      
      <button
                class="btn btn-primary text-white"
                style="font-weight: bold"
                @click="goToDetails(repo._id)"
              >
                Ver Repo
              </button>

     
    </div>
      <!-- Add more grid items here -->
    </div>
  </div>
</div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';

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



 /* filteredRepositories() {
    if (this.currentTags.length === 0) {
      return this.repositories;
    }

    return this.repositories.filter(repository => {
      return this.currentTags.every(tag => repository.tags.includes(tag));
    });
  },

*/

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
        
        //const response = await this.axios.get("http://localhost:9000/api/repositories");
        const response = await this.axios.get("http://localhost:9000/api/repoV2");
        this.repositories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllTags() {
      try {
        const responsetag = await this.axios.get("http://localhost:9000/api/unique-tags");
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

<style>
/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}

/* Ajustes a la barra de búsqueda por id op */
/* Con estos ajustes se crea el input para número sin tener las flechas del costado */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
  /* ajustes de tamaño */
  margin-top: 1%;
  margin-bottom: 3.5%;
  padding-left: 0.8%;
  font-size: 20px;
  width: 40%;
}

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .item {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    .item img {
      width: 100%;
      height: auto;
      display: block;
      margin-bottom: 1rem;
    }

</style>
