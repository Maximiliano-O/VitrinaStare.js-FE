<template>



<div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>Verificación Release</h1>
        
      </div>
      <div class="col-3">
        <button
      type="submit"
      class="btn btn-primary text-white"
      data-bs-toggle="modal"
      data-bs-target="#modal-confirmacion"
      style="
        font-weight: bold;
        --bs-btn-padding-y: 0.4rem;
        --bs-btn-padding-x: 0.8rem;
        --bs-btn-font-size: 1.15rem;
      "
    >
      Aprobar Release
    </button>
      </div>
      <div class="col-2">
        <button
      type="submit"
      class="btn btn-danger text-white"
      data-bs-toggle="modal"
      data-bs-target="#modal-eliminacion"
      style="
        font-weight: bold;
        --bs-btn-padding-y: 0.4rem;
        --bs-btn-padding-x: 0.8rem;
        --bs-btn-font-size: 1.15rem;
      "
    >
      Rechazar Release
    </button>
      </div>
    </div>
  </div>
  ㅤ
<div class="col-8">
        <h1> </h1>
</div>
     <div class="overflow-auto" style="max-height: 100vh">
    <div style="width: 100%;">
      <GitHubCodeSandbox owner="StArE-js" repo="stare.js-client" subdir="examples/client-only/public" :url="release.codesandbox_URL" />
    </div>
    ㅤ
  




</div>

      <!-- Modal rechazo -->
      <div
        class="modal fade"
        id="modal-eliminacion"
        tabindex="-1"
        aria-labelledby="modal-eliminacion-label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row m-3">
                  <div class="col-4">
                    <img src="/src/assets/warning.svg" width="75" height="75" />
                  </div>
                  <div class="col-8 text-center">
                    <p style="font-weight: bold; font-size: 1.15rem; margin-top: 5%">
                      ¿Está seguro de rechazar esta publicación?
                    </p>
                  </div>
                </div>
                <div class="row">
                  <p style="font-size: medium">Observaciones:</p>
                </div>
                <div class="row">
                  <textarea
                    tabindex="-1"
                    name="motivoEliminacion"
                    rows="3"
                    v-model="comentarioRechazo"
                  ></textarea>
                </div>

                <div class="row m-3 text-center">
                  <div class="col-5">
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

                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-danger text-white"
                      data-bs-dismiss="modal"
                      @click="postRechazo"
                      style="
                        font-weight: bold;
                        --bs-btn-padding-y: 0.45rem;
                        --bs-btn-padding-x: 0.8rem;
                        --bs-btn-font-size: 1.15rem;
                      "
                    >
                      Confirmar Rechazo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


            <!-- Modal confirmación  -->
            <div
        class="modal fade"
        id="modal-confirmacion"
        tabindex="-1"
        aria-labelledby="modal-confirmacion-label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row m-3">
                  <div class="col-4">
                    <img src="/src/assets/warning.svg" width="75" height="75" />
                  </div>
                  <div class="col-8 text-center">
                    <p style="font-weight: bold; font-size: 1.15rem; margin-top: 5%">
                      ¿Está seguro de aprobar esta publicación?
                    </p>
                  </div>
                </div>

                <div class="row">
                  <p style="font-size: medium">Observaciones:</p>
                </div>
                <div class="row">
                  <textarea
                    tabindex="-1"
                    name="motivoEliminacion"
                    rows="3"
                    v-model="comentarioApruebo"
                  ></textarea>
                </div>

                <div class="row m-3 text-center">
                  <div class="col-5">
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

                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-primary text-white"
                      data-bs-dismiss="modal"
                      @click="postApruebo"
                      style="
                        font-weight: bold;
                        --bs-btn-padding-y: 0.45rem;
                        --bs-btn-padding-x: 0.8rem;
                        --bs-btn-font-size: 1.15rem;
                      "
                    >
                      Confirmar Aprobación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  </template>
  
  <script>
  import GitHubCodeSandbox from "@/components/GitSB.vue";
  
  export default {
    props: ['releaseID'],
    components: {
      GitHubCodeSandbox,
    },

    data() {
    return {
      
      release: {},
      reviewerID: '',
      isReviewed: false,
      isSafe: false,
      additionalComments: '',
      reviewDate: null,
      comentarioRechazo: '',
      comentarioApruebo: ''
    };
  },

  created() {
    
    
    this.reviewerID =localStorage.getItem('userID');
   
  },

   methods: {



    async fetchData() {
      try {
        
        const url = `http://localhost:9000/api/release/${this.releaseID}`;
        const response = await this.axios.get(url);
        this.release = response.data;
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    },

    async postApruebo() {
      try {
        //const response = await this.axios.post('http://localhost:9000/api/status', {
          const response = await this.axios.post(`http://localhost:9000/api/release/${this.releaseID}/status`, {
          releaseID: this.releaseID,
          reviewerID: this.reviewerID,
          isReviewed: true,
          isSafe: true,
          additionalComments: this.comentarioApruebo,
          
        });
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error(error);
      }
    },

    async postRechazo() {
      try {
        //const response = await this.axios.post('http://localhost:9000/api/status', {
          const response = await this.axios.post(`http://localhost:9000/api/release/${this.releaseID}/status`, {
          releaseID: this.releaseID,
          reviewerID: this.reviewerID,
          isReviewed: true,
          isSafe: false,
          additionalComments: this.comentarioRechazo,
       
        });
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error(error);
      }
    }
  },

  mounted() {
      this.fetchData();
      
    }
}
;
  </script>

<style>

.comments-section {
    font-family: Arial, sans-serif;
  }
  
  .comment {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .comment-author {
    font-weight: bold;
  }
  
  .comment-body {
    margin-top: 0.5rem;
  }
  
  .comment-replies {
    margin-left: 2rem;
    margin-top: 1rem;
  }
</style>