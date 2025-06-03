<template>
  <div class="overflow-auto" style="max-height: 95vh">

  <div class="container-fluid">
   
      <div class="row">
        <div class="col-7">
          <h1 v-if="userID === current_id">{{ $t('myProfile') }}</h1>
          <h1 v-else> {{ $t('userDetails') }}</h1>
        </div>
        <div class="col-5" style="display: flex; justify-content: space-between;">
  <a
    type="button"
    class="btn btn-secondary text-white"
    href="/contribuidores"
    style="margin-left: 15%; font-weight: bold; --bs-btn-padding-y: 0.45rem; --bs-btn-padding-x: 0.8rem; --bs-btn-font-size: 1.15rem;"
    >{{ $t('returnUserList') }}
  </a>

  <div class="col-5" v-if="userID === current_id" style="margin-left: auto;">
    <a
      type="button"
      class="btn btn-primary text-white"
      @click="goToEdit(userID)"
      style="background-color: #6251b7c3; margin-left: 15%; font-weight: bold; --bs-btn-padding-y: 0.45rem; --bs-btn-padding-x: 0.8rem; --bs-btn-font-size: 1.15rem;"
      >{{ $t('editProfile') }}
    </a>
  </div>
</div>

<h2>{{ user.username }}</h2>
ㅤ
<div class="jumbotron" style="height: 80vh">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col">
            <p style="font-size: 18px; margin-top: 2%">
              <strong>{{ $t('email') }} </strong> {{ user.email }}
            </p>
          </div>
          <div class="col">
            <p style="font-size: 18px; margin-top: 2%">
              <strong>{{ $t('urlGitHub') }}: </strong> {{ user.urlGithubProfile }}
            </p>
          </div>
        </div>
        <!--
        <div class="row">
          <div class="col">
            <p style="font-size: 18px; margin-top: 2%">
              <strong>Descripcion: </strong> {{ user.description }}
            </p>
          </div>
        </div>
         -->
      </div>
    </div>
  </div>

  ㅤ
  <h4>{{ $t('publications') }}</h4>
  ㅤ
  <div class="overflow-auto" style="max-height: 100vh">

<div class="grid-container" style="display: grid;">
  <div class="item" v-for="repo in repositories" :key="repo.repositoryID" @click="goToRepo(repo._id)">

    <div class="flex-container">
    <div style="font-weight: bold; font-size: 18px">{{ repo.title }}</div>
    <p style="font-size: 24px; margin-top: 2%; text-align: right;"> <strong> {{repo.totalRating}} ★ </strong></p>
  </div>
    ㅤ
  <img :src="repo.imageURL" :alt="`Image ${index + 1}`">
  <div>{{ $t('author') }}: {{ repo.author }}</div>
  <div>{{ $t('tags') }}: {{ repo.tags }}</div>    
 
  <div>{{ $t('verified') }}: {{ repo.verified }}</div>         
    
  <!--
  <button
            class="btn btn-primary text-white"
            style="font-weight: bold"
            @click="goToRepo(repo._id)"
          >
          {{ $t('select') }}
          </button>

 -->

</div>
</div>
</div>
</div>
    </div>
  </div>
    ㅤ
  </div>

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
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/usersV2/${this.userID}`;
          const response = await this.axios.get(url);
          this.user = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

    async fetchUserRepositories() {
      try {
        const response = await this.axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/contributor/${this.userID}`);
        this.repositories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    
    goToRepo(repositoryID) {
      this.$router.push({ path: `/repos/${repositoryID}` })
    },

    goToEdit(userID) {
      this.$router.push({ path: `/contribuidores/${userID}/edit` })
    },
    },



    mounted() {
      this.fetchData();
      this.fetchUserRepositories();
      
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