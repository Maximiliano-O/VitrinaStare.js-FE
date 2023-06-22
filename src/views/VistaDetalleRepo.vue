<template>
    <div class="container-fluid">
      <div class="overflow-auto" style="max-height: 80vh">
      <div class="row">
        <div class="col-7">
          <h1>Detalle del Repo</h1>
        </div>
        <div class="col-3">
          <a
            type="button"
            class="btn btn-primary text-white"
            href="/"
            style="
              margin-left: 15%;
              font-weight: bold;
              --bs-btn-padding-y: 0.45rem;
              --bs-btn-padding-x: 0.8rem;
              --bs-btn-font-size: 1.15rem;
            "
            >Regresar a la vista de Repositorios
          </a>
        </div>
      </div>
      <div class="jumbotron d-flex align-items-center" style="height: auto;">
      <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p style="font-size: 18px; margin-top: 2%"><strong>Título: </strong> {{repo.title}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>Autor: </strong> {{repo.author}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>Tags: </strong> {{repo.tags}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>Rating: </strong> {{repo.totalRating}}</p>
        

      </div>

      <div class="col-md-6">
        <img :src="repo.imageURL" :alt="`Image ${index + 1}`">


    </div>

    </div>
  </div>
  </div>
  
      
    </div>

  <div class="container-fluid">
    <h2>Comentarios</h2>
    <div>{{ comment.authorID }}</div>
    <div>{{ comment.repositoryID }}</div>
    <div>{{ comment.repoName }}</div>
    <div>{{ comment.username }}</div>
    <div>{{ comment.body }}</div>
    
    <form @submit.prevent="addComment">
      <div class="mb-3">
        <label for="comment" class="form-label">Escribe un comentario:</label>
        <textarea class="form-control" id="comment" v-model="newCommentText" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
    
    <div v-for="comment in allComments" :key="comment" class="mt-4">
      <div class="fw-bold">{{ comment.username }}</div>
      <div>{{ comment.body }}</div>
    </div>
  </div>
  </div>


  </template>
  
  <script>




  export default {
    props: ['repositoryID'],
    data() {
      return {
        repo: {},
        newCommentText:'',
        allComments: [],
        comment: {
        authorID: '',
        repositoryID: '',
        repoName: '',
        username: '',
        usernameImageURL: '',
        body: ''
      },
      };
    },
    methods: {
      async fetchData() {
        try {
          const url = `http://localhost:9000/api/repositories/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.repo = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

      async fetchAllComments() {
        try {
         
          const url = `http://localhost:9000/api/comments/repository/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.allComments = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

     
      // Aquí puedes agregar el código para guardar el comentario en tu base de datos o API.
      // Por ahora, solo agregaremos el comentario al array de comentarios localmente.

      async addComment() {
        const username =localStorage.getItem('user');
        this.comment.username=JSON.parse(username).name
        const id =localStorage.getItem('userID');
        this.comment.authorID=JSON.parse(id).name

        this.comment.repositoryID=this.repo._id
        this.comment.repoName=this.repo.title
        this.comment.body=this.newCommentText


        
      try {
        const response = await this.axios.post(`http://localhost:9000/api/comments`, this.comment);
        this.newCommentText = '';
        this.fetchAllComments();
        return response.data;
        // Redirect to login or dashboard page
      } catch (error) {
        console.error('Error registering user:', error);
      }

      this.newCommentText=''

    }
      

      





    
    },
    mounted() {
      this.fetchData();
      this.fetchAllComments();
      
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
  }
  </style>