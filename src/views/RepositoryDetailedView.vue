<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ColoredButton from '../components/buttons/ColoredButton.vue'
import CustomSelect from '../components/CustomSelect.vue'
import ReleaseModal from '../components/ReleaseModal.vue'
import EmbededComment from '../components/EmbededComment.vue'
import Tag from '../components/Tag.vue'
import RatingModal from '../components/RatingModal.vue'
import { BiTagsFill } from "oh-vue-icons/icons"
import { addIcons } from "oh-vue-icons"
import { OhVueIcon } from "oh-vue-icons"

addIcons(BiTagsFill)

const props = defineProps({ repositoryID: { type: String, required: true } })
const router = useRouter()

const isGuest = ref(localStorage.getItem('guest') === 'true');
const currentRating = ref(0);
const repo = ref({});
const newCommentText = ref('');
const allComments = ref([]);
const allReleases = ref([]);
const imageUrl = ref('');
const showReleaseModal = ref(false);


const selectedRelease = ref(allReleases.value[0]?._id || '');
const selectedReleaseItem = computed(() => {
  return allReleases.value.find(r => r._id === selectedRelease.value) || {};
});
const openSelectedRelease = () => {
  router.push({ name: 'sandbox', params: { repositoryID: props.repositoryID, releaseID: selectedRelease.value } });
}

const releaseOptions = computed(() => {
  return allReleases.value.map(r => ({
    label: r.name,
    value: r._id
  }))
})

watch(allReleases, (newVal) => {
  if (newVal.length && !selectedRelease.value) {
    selectedRelease.value = newVal[0]._id;
  }
});

const ratingCount = computed(() => Array.isArray(repo.value.ratings) ? repo.value.ratings.length : 0);

const comment = ref({
  userID: localStorage.getItem('userID'),
  repositoryID: '',
  repoName: '',
  username: localStorage.getItem('user') || '',
  usernameImageURL: '',
  body: '',
  imageUrl: ''
})

const showRatingModal = ref(false);

const openRatingModal = () => {
  const userRating = repo.value.ratings?.find(r => r.userId === localStorage.getItem('userID'));
  currentRating.value = userRating ? userRating.rating : 0;
  showRatingModal.value = true;
}

const openReleaseModal = () => (showReleaseModal.value = true)
const closeReleaseModal = () => (showReleaseModal.value = false)

const handleSubmitComment = (commentText) => {
  newCommentText.value = commentText;
  addComment();
};

const sortedComments = computed(() => {
  return [...allComments.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const contributorImage = computed(() => imageUrl.value || '')

watch(() => repo.value.userID, async (newVal) => {
  if (newVal) await fetchImageUrl(newVal)
  else imageUrl.value = ''
}, { immediate: true })

const fetchData = async () => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/repository/${props.repositoryID}`
    const { data } = await axios.get(url)
    repo.value = data.result;
  } catch (err) {
    console.error('Error fetching repository:', err)
  }
}

const fetchAllComments = async () => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/comments/repository/${props.repositoryID}`
    const { data } = await axios.get(url)
    allComments.value = data.result;
  } catch (err) {
    console.error('Error fetching comments:', err)
  }
}

const fetchReleases = async () => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/release/repository/${props.repositoryID}`
    const { data } = await axios.get(url)
    allReleases.value = data.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('Error fetching releases:', err)
  }
}

const addRating = async (rating) => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/repository/${props.repositoryID}/ratings`
    const { data } = await axios.post(url, { rating, userId: localStorage.getItem('userID') })
    if (data.result) {
      repo.value.totalRating = data.result.totalRating;
      
      const index = repo.value.ratings.findIndex(r => r.userId === localStorage.getItem('userID'));
      if (index >= 0) {
        repo.value.ratings[index].rating = rating;
      } else {
        repo.value.ratings.push({ userId: localStorage.getItem('userID'), rating });
      }
    }
  } catch (err) {
    console.error('Error adding rating:', err)
  }
}

const addComment = async () => {
  comment.value.repositoryID = repo.value._id;
  comment.value.repoName = repo.value.title;
  comment.value.body = newCommentText.value;
  comment.value.usernameImageURL = imageUrl.value || ''; // optional, if you want to show

  try {
    await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/comments`, comment.value);
    newCommentText.value = '';
    await fetchAllComments();
  } catch (err) {
    console.error('Error posting comment:', err);
  }
};


const fetchImageUrl = async (userID) => {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/users/${userID}`;
    const { data } = await axios.get(url);
    console.log(data.result);
    imageUrl.value = data.result.imageURL;
  } catch (err) {
    console.error('Error fetching image URL:', err);
    imageUrl.value = '';
  }
}

const checkAuthor = () => localStorage.getItem('userID') === repo.value.userID;
const getUserLink = () => `/user/${repo.value.userID}`;
const verify = (releaseID) => router.push(`/verification/${releaseID}`);

onMounted(() => {
  fetchData();
  fetchAllComments();
  fetchReleases();
})
</script>

<template>
  <div class="overflow-hidden" style="max-height: 100%">
    <div class="header">
      <div class="title">
        {{ repo.title }}
        <ColoredButton
          is="button"
          class="icon-button"
          variant="black"
          iconName="bi-github"
          :to="repo.repositoryUrl"
        />
      </div>
      <div class="header-buttons">
        <ColoredButton
          v-if="checkAuthor()"
          variant="night"
          :to="`/repository/${props.repositoryID}/edit`"
        >
          {{ $t('repositoryDetailed.actions.editRepository') }}
        </ColoredButton>
        <ColoredButton :to="{ name: 'repositories' }">
          {{ $t('common.actions.backToRepos') }}
        </ColoredButton>
      </div>
    </div>

    <div class="info">
      <ColoredButton
        is="button"
        variant="icon-button"
        iconName="fa-regular-user-circle"
        :imageUrl="contributorImage"
        :to="getUserLink()"
      />
      <div class="info-bold">{{ repo.author }}</div>
      <span class="divider"></span>
      <div>{{ new Date(repo.updatedAt).toLocaleDateString() }}</div>
      <span class="divider"></span>
      <div>{{ repo.totalRating }} ★ <small>({{ ratingCount }})</small></div>
      <!-- Rating Button (All logged users except owner) -->
      <ColoredButton
        v-if="!checkAuthor() && !isGuest"
        variant="night"
        @click="openRatingModal"
      >
        {{ $t('repositoryDetailed.actions.rate') }}
      </ColoredButton>
      <RatingModal
        v-model:visible="showRatingModal"
        v-model:modelValue="currentRating"
        @confirm="addRating"
      />

    </div>

    <div class="tags">
      <span class="icon">
        <OhVueIcon name="bi-tags-fill" />
      </span>
      <span v-for="(tag, index) in repo.tags" :key="index">
        <Tag>{{ tag }}</Tag>
      </span>
    </div>

    <div style="display: flex; justify-content: center;">
      <div class="repo-container">
        <div class="image-container">
          <img class="repo-image" :src="repo.imageURL" />
        </div>

        <div class="release-container">
          <!-- Release section title -->
          <div class="release-header">
            {{ $t('repositoryDetailed.header.release') }}
          </div>
          <div class="release-section">
            <!-- Button to add new release -->
            <div class="release-button" v-if="checkAuthor()">
              <ColoredButton
                class="icon-button"
                variant="night"
                iconName="md-add-round"
                @click="openReleaseModal"
              >
              </ColoredButton>
              <ReleaseModal 
                v-if="showReleaseModal" 
                :repositoryID="props.repositoryID"  
                @close="closeReleaseModal" 
                @refresh="fetchReleases"
              />
            </div>

            <!-- Release select -->
            <CustomSelect
              v-model="selectedRelease"
              :options="releaseOptions"
            />

            <!-- Verification Status -->
            <div class="release-verification" v-if="selectedReleaseItem">
             {{ selectedReleaseItem.verified 
                ?  $t('repositoryDetailed.verification.verified') 
                :  $t('repositoryDetailed.verification.pending') }}
            </div>

            <!-- Go to demo button -->
            <ColoredButton
              @click="openSelectedRelease"
            >
              {{ $t('repositoryDetailed.actions.toDemo') }}
            </ColoredButton>
          </div>
          <!-- Release description -->
          <div class="release-desc-container" v-if="selectedReleaseItem">
            <p class="release-desc">{{ $t('repositoryDetailed.header.description') }}:</p>
            <p class="release-desc-body"> {{ selectedReleaseItem.description }} </p>
          </div>
          <!-- Repository section and description -->
          <div class="release-header">
            {{ $t('repositoryDetailed.header.description') }}
          </div>
          <div class="text-container">
            <div class="text-body">
              {{ repo.repositoryDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="comment-container">
    <div class="comment-table-header">
      {{ $t('repositoryDetailed.header.comment') }}
    </div>
    <EmbededComment
      v-if="!isGuest"
      :repositoryID="props.repositoryID"
      @submit="handleSubmitComment"
    />
    <div class="comments-list" v-if="allComments.length">
      <div 
        v-for="comment in sortedComments" 
        :key="comment._id" 
        class="comment-item"
      >
        <div class="comment-timestamp">
          <small>{{ new Date(comment.createdAt).toLocaleString() }}</small>
        </div>
        <div class="comment-main">
          <img :src="comment.usernameImageURL || '/default-avatar.png'" alt="User Avatar" class="avatar"/>
          <div class="comment-text">
            <strong>{{ comment.username }}</strong> | {{ comment.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
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
  display: flex;
  align-items: center;
  gap: 10px;
  /* background: #9bb2eb; */
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 32px;
}

.header-buttons {
  display: flex;
  gap: 10px;
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

.text-container {
  flex: 1 1 auto;  
  overflow-y: auto;
  padding: 5px;
}

.text-body {
  padding: 10px;
  display: flex;
  justify-content: left;
  color: #000;
  font-family: 'Poppins-Medium';
  font-size: 18px;
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

.custom-select {
  width: 300px;
}

.repo-container {
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  width: 80%;
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
  width: 50%;
  height: 450px;
  background-color: #ffffff;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
}

.release-section {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.release-verification {
  font-family: 'Poppins-Bold';
  justify-content: center;
}

.release-desc-container {
  display: flex;
  gap: 5px;
  flex-direction: row;
  padding-left: 10px;
}

.release-desc {
  font-family: 'Poppins-Bold';
  justify-content: center;
}

.release-body {
  font-family: 'Poppins';
  justify-content: center;
}

.release-button {
  padding: 10px;
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

.wide-button {
  width: 100%;
}

.comment-container {
  margin: auto;
  width: 860px;
  height: 450px;
  background-color: #00000005;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
}

.comment-table-header {
  width: 100%;
  background-color: #702F5A;
  color: #fff;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  font-size: 20px;
}

.comment-item {
  background-color: #fff;      
  border: 1px solid #00000040;  
  padding: 12px 16px;           
  margin-bottom: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
  transition: background-color 0.3s ease;
}

.comment-item:hover {
  background-color: #f9f9f9;
}

.comment-timestamp {
  font-size: 14px;
  color: #4E4E4E;
  margin-bottom: 6px;
  font-family: 'Poppins-Medium';
}

.comment-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}

.comment-text {
  font-size: 16px;
  color: #000;
  line-height: 1.4;
  font-family: 'Poppins-Medium';
  word-break: break-word;
}


.comments-list {
  flex: 1;              
  overflow-y: auto;
  padding: 10px;        
}

</style>