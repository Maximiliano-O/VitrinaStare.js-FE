<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-7">
          <h1 v-if="userID === current_id">Mi Perfil</h1>
          <h1 v-else> Detalle del Usuario</h1>
        </div>
        <div class="col-3">
          <a
            type="button"
            class="btn btn-primary text-white"
            href="/contribuidores"
            style="
              margin-left: 15%;
              font-weight: bold;
              --bs-btn-padding-y: 0.45rem;
              --bs-btn-padding-x: 0.8rem;
              --bs-btn-font-size: 1.15rem;
            "
            >Regresar a la vista de Usuarios
          </a>
        </div>
      </div>
      <div class="jumbotron d-flex align-items-center" style="height: 80vh;">
      <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p style="font-size: 18px; margin-top: 2%"><strong>Email: </strong> {{user.email}}</p>

        <div>
    <p v-if="userID === current_id">{{current_user}}</p>
  </div>

        

     

    

    </div>



    </div>
  </div>

      <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
      <div class="overflow-auto" style="max-height: 90vh">
  <div class="container-fluid">
    <Multiselect
      key="multiselect-key"
      v-model="currentTags"
      mode="tags"
      placeholder="Type and select tags"
      :options="tags"
      :searchable="true"
    />
    <div class="grid-container">
      <div class="item" v-for="repo in repositories" :key="repo.repositoryID">
        <div>{{ repo.title }}</div>
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


      
    </div>



    ㅤ



  </template>
  
  <script>
  export default {
    props: ['userID'],
    data() {
      return {
        user: {},
        repositories: [],
        current_id: localStorage.getItem('userID'),
        current_user: localStorage.getItem('user')
      };
    },
    methods: {
      async fetchData() {
        try {
          const url = `http://localhost:9000/api/users/${this.userID}`;
          const response = await this.axios.get(url);
          this.user = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

    async fetchAllRepositories() {
      try {
        const response = await this.axios.get("http://localhost:9000/api/repositories");
        this.repositories = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    },
    mounted() {
      this.fetchData();
      this.fetchAllRepositories();
      
    },
  };
  
  </script>
  
  <style>
  /* Color de fondo de la vista */
  body {
    background-color: #ebeef3;
  }
  
  /* Personalización del select */
  select {
    background-color: #ffffff;
    width: 100%;
    font-size: 18px;
    border-radius: 4px;
  }
  
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