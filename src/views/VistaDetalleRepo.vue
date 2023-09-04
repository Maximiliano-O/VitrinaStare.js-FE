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

        <div class="col-2">
          <button
          type="submit"
          class="btn btn-primary text-white"
          data-bs-toggle="modal"
          data-bs-target="#modal-eliminacion"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Ver Releases
        </button>

        <button
          v-if="isguest==='false'"
          type="submit"
          class="btn btn-primary text-white"
          data-bs-toggle="modal"
          data-bs-target="#modal-rating"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Dar Rating
        </button>


        

          
        </div>
      </div>
      <div class="jumbotron d-flex align-items-center" style="height: auto;">
      <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p style="font-size: 18px; margin-top: 2%"><strong>Título: </strong> {{repo.title}} </p>
        <p style="font-size: 18px; margin-top: 2%"><strong>Autor: </strong> {{repo.author}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>Tags: </strong> {{repo.tags}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>Rating: </strong> {{repo.totalRating}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>ID autor: </strong> {{repo.contributorID}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>ID actual: </strong> {{id}}</p>
        

        <p style="font-size: 18px; margin-top: 2%"><strong>Ultima versión aprobada: </strong> null</p>
         

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

    
    <form @submit.prevent="addComment">
      <div v-if="isguest==='false'" class="mb-3">
        <label for="comment" class="form-label">Escribe un comentario:</label>
        <textarea class="form-control" id="comment" v-model="newCommentText" rows="3"></textarea>
      </div>
      <button v-if="isguest==='false'" type="submit"  class="btn btn-primary text-white">Enviar</button>
    </form>
    
    <div v-for="comment in allComments" :key="comment" class="mt-4">
      <div class="fw-bold">{{ comment.username }}</div>
      <div>{{ comment.body }}</div>
    </div>
  </div>

  <div
        class="modal fade"
        id="modal-eliminacion"
        tabindex="-1"
        aria-labelledby="modal-eliminacion-label"
        aria-hidden="true"
      >
      >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-12 text-center">
                <h1>Releases</h1>
                ㅤ

                <div class="table-responsive" style="margin-bottom: 1.5%">
                  <table class="table">
                    <thead>
                      <tr class="table-primary text-white">
                        <th scope="col" style="color: white">Versión</th>
                        
                        
                        <th scope="col" style="color: white">¿Verificada?</th>
                        <th scope="col" style="color: white">Verificar</th>
                        <th scope="col" style="color: white">Run</th>
                        <th scope="col" style="color: white">Fecha</th>
                      </tr>
                    </thead>
                    <tbody style="background-color: white">
                      <tr class="table-default" v-for="item in allReleases" v-bind:key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.verified }}</td>
                        

                        <td>
                          <button
                            class="btn btn-primary text-white"
                            style="font-weight: bold; font-size: 14px"
                            @click="verify(item._id)"
                          >
                            Verify
                          </button>
                        </td>

                        <td>
                          <button
                            class="btn btn-primary text-white"
                            style="font-weight: bold; font-size: 14px"
                            @click="run(item._id)"
                          >
                            Run
                          </button>
                        </td>

                        <td>{{ item.created_at }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row">
                <div class="col-12 text-center">
                  <div class="row">
                    <div class="col-6 text-end">
                      <button
                        type="button"
                        class="btn btn-secondary text-white"
                        data-bs-dismiss="modal"
                        style="
                          font-weight: bold;
                          --bs-btn-padding-y: 0.45rem;
                          --bs-btn-padding-x: 0.8rem;
                          --bs-btn-font-size: 1.15rem;
                        "
                      >
                        Regresar
                      </button>
                    </div>
                  
                    <div class="col-6 text-end"  v-if="repo.contributorID === comment.authorID">
                      <button
                       
                        type="button"
                        class="btn btn-primary text-white"
                        data-bs-dismiss="modal"
                        @click="newRelease(repositoryID)"
                        style="
                          font-weight: bold;
                          --bs-btn-padding-y: 0.45rem;
                          --bs-btn-padding-x: 0.8rem;
                          --bs-btn-font-size: 1.15rem;
                        "
                      >
                        Añadir Release
                      </button>
                    </div>
                    <div class="col-6 text-start">
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
           
    
  
    <div
        class="modal fade"
        id="modal-rating"
        tabindex="-1"
        aria-labelledby="modal-rating-label"
        aria-hidden="true"
      >
      >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-12 text-center">
                <h1>Rating</h1>
                ㅤ

                ㅤ
    <!-- <StarRating v-model="repo.totalRating" @update:rating="updateRating" />   -->
    <star-rating
  :max-stars="5"
  :value="currentRating"
  @update:rating="currentRating = $event"
></star-rating>

<p>Selected rating: {{ currentRating }}</p>
                
                ㅤ
              </div>
              ㅤ
              <div class="row">
                <div class="col-12 text-center">
                  <div class="row">
                    <div class="col-6 text-end">
                      ㅤ
                      <button
                        type="button"
                        class="btn btn-secondary text-white"
                        data-bs-dismiss="modal"
                        style="
                          font-weight: bold;
                          --bs-btn-padding-y: 0.45rem;
                          --bs-btn-padding-x: 0.8rem;
                          --bs-btn-font-size: 1.15rem;
                        "
                      >
                        Regresar
                      </button>
                    </div>
                  
                    <div class="col-6 text-end" >
                      <button
                       
                        type="button"
                        class="btn btn-primary text-white"
                        data-bs-dismiss="modal"
                        @click="addRating(currentRating)"
                        style="
                          font-weight: bold;
                          --bs-btn-padding-y: 0.45rem;
                          --bs-btn-padding-x: 0.8rem;
                          --bs-btn-font-size: 1.15rem;
                        "
                      >
                        Enviar Rating
                      </button>
                    </div>
                    <div class="col-6 text-start">
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
    
 
</div>


  </template>
  
  <script>


import StarRating from '@/components/StarRating.vue';

  export default {
    components: {
      StarRating
    },
    props: ['repositoryID'],
    data() {
      return {
        isguest: localStorage.getItem("guest"),
        currentRating: 3,
     
        repo: {},
        newCommentText:'',
        allComments: [],
        allReleases:[],
        comment: {
        authorID: localStorage.getItem('userID'),
        repositoryID: '',
        repoName: '',
        username: '',
        usernameImageURL: '',
        body: '',
      },

      };
    },

    created() {
    this.userData = localStorage.getItem('user');
    this.comment.username=this.userData
    this.id =localStorage.getItem('userID');
    this.comment.authorID=this.id
  },
    methods: {

      async addRating(rating) {
          try {
            //const url = `http://localhost:9000/api/repoV2/addRating/${this.repositoryID}`;

            const url = `http://localhost:9000/api/repoV2/${this.repositoryID}/ratings`;
            const response = await this.axios.post(url, {
              rating: rating,
              userId: localStorage.getItem('userID') // assuming this.id is the user's id
            });
            if (response.data.success) {
              this.repo.totalRating = response.data.totalRating;
              this.fetchData();
            }
          } catch (err) {
            console.log('Error adding rating:', err);
          }
        },


      async deleteRating() {
          try {
           //const url = `http://localhost:9000/api/rating`;

           const url = `http://localhost:9000/api/repoV2/${this.repositoryID}/ratings`;
            const response = await this.axios.delete(url, {
              data: {
                userID: localStorage.getItem('userID') // Assuming the user ID is stored in local storage
              }
            });
            if (response.status === 200) {
              this.fetchData(); // Refresh the repo data after deleting the rating
            }
          } catch (err) {
            console.log('Error deleting rating:', err);
          }
},


      async fetchData() {
        try {
          //const url = `http://localhost:9000/api/repositories/${this.repositoryID}`;
          const url = `http://localhost:9000/api/repoV2/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.repo = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

      async fetchAllComments() {
        try {
         
          //const url = `http://localhost:9000/api/comments/repository/${this.repositoryID}`;
          const url = `http://localhost:9000/api/comments/repository/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.allComments = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

      async fetchReleases() {
        try {
         
          const url = `http://localhost:9000/api/release/repository/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.allReleases = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

     
      // Aquí puedes agregar el código para guardar el comentario en tu base de datos o API.
      // Por ahora, solo agregaremos el comentario al array de comentarios localmente.

      async addComment() {
        //const username =localStorage.getItem('user');
        //this.comment.username=JSON.parse(username).name
        //const id =localStorage.getItem('userID');
        //this.comment.authorID=JSON.parse(id).name

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

    },
      

   
    newRelease(repositoryID) {
      this.$router.push({ path: `/repos/${repositoryID}/newRelease` })
    },

    verify(releaseID) {
      this.$router.push({ path: `/verificacion/${releaseID}` })
    },

    run(releaseID) {
      this.$router.push({ path: `/ejemplo/${releaseID}` })
    },

    },
    mounted() {
      this.fetchData();
      this.fetchAllComments();
      this.fetchReleases();
      
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

  .item img {
      width: 100%;
      max-width: 50%;
      height: auto;
      display: block;
      margin-bottom: 1rem;
    }
  </style>