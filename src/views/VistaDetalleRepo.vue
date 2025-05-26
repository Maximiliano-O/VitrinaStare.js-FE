<script setup>
import ColoredButton from '../components/buttons/ColoredButton.vue';
import Tag from '../components/Tag.vue';
import { BiTagsFill } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";
import { OhVueIcon } from "oh-vue-icons";
addIcons(BiTagsFill);
</script>

<template>
  <div class="overflow-hidden" style="max-height: 100%">
    <div class="header">
      <div class="title">
        {{repo.title}}
      </div>
      <div class="col-1">
        <!-- <div v-if="repo.contributorID === comment.authorID">
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
        </div> -->
      </div>
      <ColoredButton :to="{ name: 'repos' }">{{ $t('repoBack') }}</ColoredButton>
    </div>
    <div class="info">
      <div class="info-bold">
        {{repo.author}}
      </div>
      <span class="divider"></span>
      <div>
        19-05-2025
      </div>
      <span class="divider"></span>
      <div>
        {{repo.totalRating}} ★
      </div>
    </div>
    <div class="tags">
      <span class="icon">
        <OhVueIcon name="bi-tags-fill" />
      </span>
      <span v-for="(tag, index) in repo.tags" :key="index">
        <Tag>{{ tag }}</Tag>
      </span>
    </div>
    <div class="link-github">
      <div class="bold">
        Link del Respositorio en Github: 
      </div>
      {{ repo.repositoryUrl }}
    </div>
    <div style="display: flex; justify-content: center;">
      <div class="repo-container">
      <!-- <div class="col-md-6">
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
        </div> -->
        <div class="image-container">  
          <img class="repo-image" :src="repo.imageURL" :alt="`Image ${index + 1}`">
        </div>
        <div class="release-container">
          <div class="release-header">
            Versiones
          </div>
          <div class="release-row" v-for="item in allReleases" v-bind:key="item.id">
            <div>
              {{ item.name }}
            </div>
            <div>
              {{ item.verified }}
            </div>
            <ColoredButton 
              :to="{name: 'sandbox', 
              params: { releaseID: item._id } }"
            >
              Demo
            </ColoredButton>
          </div>
        </div>
    </div>
    </div>
    
        
  </div>
  <div class="comment-container">
    <div class="comment-header">
      {{ $t('comments') }}
    </div>
  </div>
  <!-- <div class="container-fluid">
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
  </div> -->
      <div
        class="modal fade"
        id="modal-eliminacion"
        tabindex="-1"
        aria-labelledby="modal-eliminacion-label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-body">
              <div class="container-fluid">
                <div class="col-12 text-center">
                  <h1>Releases</h1>
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
                              :href="`/sandbox/${item._id}`"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
           
      <!-- Rating modal -->
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
    this.$router.push({ path: `/ejemplo/${repositoryID}/${releaseID}` })
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
  
<style scoped>
.header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100%;
  max-height: 75px;
  color: #000;
}

.title {
  align-items: center;
  /* background: #9bb2eb; */
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 32px;
}

.divider {
  padding: 0px;
  display: inline-block;
  width: 2px;
  height: 45px;
  background-color: #000;
  color: #000;
}

.info-bold {
  font-family: 'Poppins-Bold';
}

.info {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 100%;
  max-height: 65px;
  color: #000;
  font-family: 'Poppins';
  font-size: 24px;
}

.icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.tags {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 100%;
  max-height: 54px;
  color: #000;
}

.bold {
  font-family: 'Poppins-Bold';
}

.link-github {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 100%;
  max-height: 54px;
  color: #000;
  font-family: 'Poppins';
  font-size: 24px;
}

body {
  background-color: #ebeef3;
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

.repo-container {
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  width: auto;
}

.repo-image {
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-container {
  display: flex;
  width: 740px;
  height: 450px;
  border: 1px solid #000;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.release-container {
  width: 300px;
  height: 450px;
  background-color: #00000020;
  border: 1px solid #000;
}

.release-header {
  width: 100%;
  background-color: #382F70;
  color: #fff;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  font-size: 20px;
}

.release-row {
  display: flex;
  gap: 20px;
  padding: 10px;
  background-color: #fff;
  color: #000;
  font-family: 'Poppins-Bold';
  font-size: 20px;
  align-items: center;
}

.comment-container {
  margin: auto;
  width: 860px;
  height: 450px;
  background-color: #00000005;
  border: 1px solid #000;
}

.comment-header {
  width: 100%;
  background-color: #702F5A;
  color: #fff;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  font-size: 20px;
}
</style>