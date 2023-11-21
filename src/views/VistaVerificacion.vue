<template>
<div v-if="allowed==='true'">

  <div v-if="status.isReviewed===false">
<div class="overflow-auto" style="max-height: 96vh">

<div class="container-fluid">
   
    <div class="row">
      <div class="col-7">
        <h1>{{ $t('verifyRelease') }}</h1>
        
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
    {{ $t('approveRelease') }}
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
    {{ $t('rejectRelease') }}
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
                      {{ $t('verifyReject') }}
                    </p>
                  </div>
                </div>
                <div class="row">
                  <p style="font-size: medium">{{ $t('Observations') }}:</p>
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
                    {{ $t('return') }}
                    </button>
                  </div>

                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-danger text-white"
                      data-bs-dismiss="modal"
                      @click="rechazo"
                      style="
                        font-weight: bold;
                        --bs-btn-padding-y: 0.45rem;
                        --bs-btn-padding-x: 0.8rem;
                        --bs-btn-font-size: 1.15rem;
                      "
                    >
                    {{ $t('confirmReject') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
{{ reviewerIDs }}
{{ userID }}
{{ allowed }}
-->

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
                      {{ $t('verifyApprove') }}
                    </p>
                  </div>
                </div>

                <div class="row">
                  <p style="font-size: medium">{{ $t('Observations') }}:</p>
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
                    {{ $t('return') }}
                    </button>
                  </div>

                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-primary text-white"
                      data-bs-dismiss="modal"
                      @click="apruebo"
                      style="
                        font-weight: bold;
                        --bs-btn-padding-y: 0.45rem;
                        --bs-btn-padding-x: 0.8rem;
                        --bs-btn-font-size: 1.15rem;
                      "
                    >
                    {{ $t('confirmApprove') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    
    <h2>{{ $t('alreadyVerified') }}</h2>
  
    
  
    </div>

</div>
  <div v-else>
    
    <h2>{{ $t('accessDenied') }}</h2>
  
    <p style="font-size: 18px; margin-top: 2%">{{ $t('accessDeniedMessage') }}</p>
  
   
  
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
      status:{},
      reviewerID: '',
      isReviewed: false,
      isSafe: false,
      additionalComments: '',
      reviewDate: null,
      comentarioRechazo: '',
      comentarioApruebo: '',
      userID: localStorage.getItem('userID'),
      statusID:'',
      reviewerIDs:[],
      allowed:''
    };
  },

  created() {
    
    
    this.reviewerID =localStorage.getItem('userID');
   
  },

   methods: {



    async fetchRelease() {
      try {
        
        const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/${this.releaseID}`;
        const response = await this.axios.get(url);
        this.release = response.data;
        this.reviewerIDs = this.release.statuses.map(status => status.reviewerID);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    },

    async fetchStatus() {
      try {
        
        const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/${this.releaseID}/${this.userID}/status`;
        const response = await this.axios.get(url);
        this.statusID = response.data.statusId;
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    },

    async apruebo() {
      try {
        
          const response = await this.axios.put(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/${this.releaseID}/status/${this.statusID}`, {

          isReviewed: true,
          isSafe: true,
          additionalComments: this.comentarioApruebo,
          
        });
        console.log(response.data); 
        checkRepoVerified();
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },

    async rechazo() {
      try {
     
          const response = await this.axios.put(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/${this.releaseID}/status/${this.statusID}`, {

          isReviewed: true,
          isSafe: false,
          additionalComments: this.comentarioRechazo,
       
        });
        console.log(response.data); 
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },


    async checkRepoVerified(){
      try {
        
        const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/verify`;
        const response = await this.axios.post(url);
        
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    },


    checkIfAllowed(){
      if (this.reviewerIDs.includes(this.userID)) {

        this.allowed='true'
        console.log('The reviewerID is in the array');
        } else {
          this.allowed='false'
        console.log('The reviewerID is not in the array');
        }
    }
  },

 async mounted() {
      await this.fetchRelease();
      this.fetchStatus();
      this.checkIfAllowed();
      
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