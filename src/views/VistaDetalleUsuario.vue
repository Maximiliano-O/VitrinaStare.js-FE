<script setup>
import RepositoryCard from '../components/RepositoryCard.vue';
import UserIcon from '../components/UserIcon.vue';
import ColoredButton from '../components/buttons/ColoredButton.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="overflow-auto" style="max-height: 100%">
    <div class="header">
      <div class="title">
        <UserIcon 
          iconName="fa-regular-user-circle"
          :imageUrl="user.imageURL"
        />
        {{ user.username }}
      </div>
      <div class="button-container">
        <ColoredButton variant="black" :to="{ name: 'repos' }">Volver a Repositorios</ColoredButton>
        <ColoredButton variant="night" @click="goToEdit(userID)">{{ $t('editProfile') }}</ColoredButton>
      </div>
    </div>
    <div>
      <div class="info">
        <div class="info-bold">
          {{ $t('email') }}:
        </div>
        {{ user.email }}
        <span class="divider"></span>
        <div class="info-bold">
          {{ $t('urlGitHub') }}: 
        </div>
        {{ user.urlGithubProfile }}
      </div>
      <div class="sub-title header">
        {{ $t('publications') }}
      </div>
      <div class="repo-container">
        <RepositoryCard 
          v-for="repo in repositories" 
          :key="repo.repositoryID"
          :repository="repo"
          @click="goToRepo(repo._id)"
        />
      </div>
    </div>
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

.button-container {
  display: flex;
  justify-content: flex-end;
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
  width: 100%;
  height: 65px;
  color: #000;
  font-family: 'Poppins';
  font-size: 24px;
}

.sub-title {
  align-items: center;
  font-family: 'Poppins-SemiBold', sans-serif;
  font-size: 28px;
}

.repo-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  justify-items: center;
  column-gap: auto;
  row-gap: 30px;
  margin: 20px 0px;
}
</style>