<template>
  <div class="overflow-auto" style="max-height: 96vh">
    <div class="container-fluid">
      <div class="overflow-auto" style="max-height: 80vh">
      <div class="row">
        <div class="col-7">
          <h1>{{ $t('repositoryDetails') }}</h1>
        </div>
        
        <div class="col-1">
                <div v-if="repo.contributorID === comment.authorID">

        <button
        
                class="btn btn-primary text-white"
                style="
          background-color: #6251b7c3;
            
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
                @click="goToEdit(repo._id)"
              >
              {{ $t('edit') }}
              </button>

            </div>
          </div>
        <div class="col-2">
          <a
            type="button"
            class="btn btn-secondary text-white"
            href="/"
            style="
              margin-left: 15%;
              font-weight: bold;
              --bs-btn-padding-y: 0.45rem;
              --bs-btn-padding-x: 0.8rem;
              --bs-btn-font-size: 1.15rem;
            "
            >{{ $t('repoBack') }}
          </a>
          
          ㅤ
          
        </div>

        <div class="col-2">
   
          <p style="font-size: 30px; margin-top: 2%">Rating: <strong> {{repo.totalRating}} ★ </strong></p>

        </div>
      </div>
      <div class="jumbotron d-flex align-items-center" style="height: auto;">
      <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p style="font-size: 18px; margin-top: 2%"><strong>Título: </strong> {{repo.title}} </p>
        <p style="font-size: 18px; margin-top: 2%"><strong>{{ $t('author') }}: </strong> {{repo.author}}</p>
        <p style="font-size: 18px; margin-top: 2%"><strong>{{ $t('tags') }}: </strong> {{repo.tags}}</p>

        <p v-if="latestVerName!=''" style="font-size: 18px; margin-top: 2%"><strong>{{ $t('verified') }}: </strong> Si</p>

        <p v-else style="font-size: 18px; margin-top: 2%">
          <strong>{{ $t('lastVerifiedVersion') }}:</strong>  No
        </p>

        <p v-if="latestVerName!=''" style="font-size: 18px; margin-top: 2%">
          <strong>{{ $t('lastVerifiedVersion') }}: </strong> {{latestVerName}} {{latestVerDate}}
        </p>
        <p v-else style="font-size: 18px; margin-top: 2%">
          <strong>{{ $t('lastVerifiedVersion') }}:</strong>  {{ $t('none') }}
        </p>
        <button
          type="submit"
          class="btn btn-primary text-white"
          data-bs-toggle="modal"
          data-bs-target="#modal-eliminacion"
          style="
          background-color: #6251b7c3;
            
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
        {{ $t('browseRelease') }}
        </button>

        <button
          v-if="isguest==='false'"
          type="submit"
          class="btn btn-primary text-white"
          data-bs-toggle="modal"
          data-bs-target="#modal-rating"
          style="
          background-color: #6251b7c3;
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
        {{ $t('rateRepo') }}
        </button>

      </div>

      <div class="col-md-6">
        <img :src="repo.imageURL" :alt="`Image ${index + 1}`">


    </div>

    </div>
  </div>
  </div>
      
    </div>

    ㅤ
  <div class="container-fluid">
    <h2>{{ $t('comments') }}</h2>

    
    <form @submit.prevent="addComment">
      <div v-if="isguest==='false'" class="mb-3">
        <label for="comment" class="form-label">{{ $t('writeComment') }}:</label>
        <textarea class="form-control" id="comment" v-model="newCommentText" rows="3"></textarea>
      </div>
      <button v-if="isguest==='false'" type="submit"  class="btn btn-primary text-white"          
      
      style="
          background-color: #6251b7c3;
            
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
           >{{ $t('postComment') }}</button>
    </form>
    ㅤ
    <div v-for="comment in allComments" :key="comment" class="mt-4">
  <span class="fw-bold" mr-3>{{ comment.username }}  </span>
  ㅤ
  <span>   {{ comment.date }}</span>
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
                      <tr class="custom-row">
                        <th scope="col" >{{ $t('version') }}</th>
                        
                        
                        <th scope="col" >{{ $t('verified?') }}</th>
                        <th scope="col" >{{ $t('verify') }}</th>
                        <th scope="col" >{{ $t('run') }}</th>
                        <th scope="col" >{{ $t('date') }}</th>
                      </tr>
                    </thead>
                    <tbody style="background-color: white">
                      <tr class="table-default" v-for="item in allReleases" v-bind:key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.verified }}</td>
                        

                        <td>


                          <a
                            type="button"
                            class="btn btn-primary text-white"
                            :href="'/verificacion/' + item._id"
                            style="font-weight: bold; font-size: 14px; background-color: #6251b7c3;"
                            >{{ $t('verify') }}
                          </a>
      
                        </td>

                        <td>
                          <a
                          type="button"
                            class="btn btn-primary text-white"
                            style="font-weight: bold; font-size: 14px ; background-color: #6251b7c3;"
                            :href="'/sandbox/' + item._id"
                          >
                          {{ $t('run') }}
                        </a>
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
                      {{ $t('return') }}
                      </button>
                    </div>
                  
                    <div class="col-6 text-end"  v-if="repo.contributorID === comment.authorID">
                      <button
                       
                        type="button"
                        class="btn btn-primary text-white"
                        data-bs-dismiss="modal"
                        @click="newRelease(repositoryID)"
                        style="
                        background-color: #6251b7c3;
                          font-weight: bold;
                          --bs-btn-padding-y: 0.45rem;
                          --bs-btn-padding-x: 0.8rem;
                          --bs-btn-font-size: 1.15rem;
                        "
                      >
                      {{ $t('addRelease') }}
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

                <p>{{ $t('selectedRating') }}: {{ currentRating }}</p>
                
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
                      {{ $t('return') }}
                      </button>
                    </div>
                  
                    <div class="col-6 text-end" >
                      <button
                       
                        type="button"
                        class="btn btn-primary text-white"
                        data-bs-dismiss="modal"
                        @click="addRating(currentRating)"
                        style="
                        background-color: #6251b7c3;
                          font-weight: bold;
                          --bs-btn-padding-y: 0.45rem;
                          --bs-btn-padding-x: 0.8rem;
                          --bs-btn-font-size: 1.15rem;
                        "
                      >
                      {{ $t('confirmRating') }}
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
        latestVerName: '',
        latestVerDate: '',
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
            

            const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/${this.repositoryID}/ratings`;
            const response = await this.axios.post(url, {
              rating: rating,
              userId: localStorage.getItem('userID') 
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
           

           const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/${this.repositoryID}/ratings`;
            const response = await this.axios.delete(url, {
              data: {
                userID: localStorage.getItem('userID') 
              }
            });
            if (response.status === 200) {
              this.fetchData(); 
            }
          } catch (err) {
            console.log('Error deleting rating:', err);
          }
},


      async fetchData() {
        try {
          
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.repo = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

      async fetchAllComments() {
        try {
         
         
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/comments/repository/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.allComments = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },

      async fetchReleases() {
        try {
         
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/repository/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.allReleases = response.data;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },
      
      async latestVerifiedRelease() {
        try {
         
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/latest/${this.repositoryID}`;
          const response = await this.axios.get(url);
          this.latestVerName = response.data.name;
          this.latestVerDate = response.data.created_at;
        } catch (err) {
          console.log('Error fetching data:', err);
        }
      },
      

     

      async addComment() {


        this.comment.repositoryID=this.repo._id
        this.comment.repoName=this.repo.title
        this.comment.body=this.newCommentText


        
      try {
        const response = await this.axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/comments`, this.comment);
        this.newCommentText = '';
        this.fetchAllComments();
        return response.data;
        // Redirect to login or dashboard page
      } catch (error) {
        console.error('Error registering user:', error);
      }

      this.newCommentText=''

    },
      

    goToEdit(repositoryID) {
      this.$router.push({ path: `/repos/${repositoryID}/edit` })
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
      this.fetchReleases()
      this.latestVerifiedRelease();
      
    },
  };
  
  </script>
  
  <style>

.col-md-6 img {
    width: 600px;   
    height: 400px;   
    object-fit: cover; /* This will ensure the aspect ratio of the image is maintained */
}
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

    .custom-row {
     background-color: #b9a3de5e; /* Change this to your preferred color */
     border: 2px solid #313131a5;
     
   }
  </style>