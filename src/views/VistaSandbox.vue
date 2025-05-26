<script setup>
import ColoredButton from '../components/buttons/ColoredButton.vue';
</script>

<template>
  <div class="overflow-hidden">
    <div class="row">
      <div class="header">
        <div class="title">
          Demostración: {{ releaseName }}
        </div>
        <div class="button-container">
          <ColoredButton variant="black" to="/">Volver a lista de Repositorios</ColoredButton>
          <ColoredButton variant="black" 
            v-if="repositoryIDValue"
            :to="{ name: 'detalleRepo', params: { repositoryID: repositoryIDValue } }">
            Volver a {{ repositoryName }}
          </ColoredButton>
        </div>
      </div>
      <div class="sb-container">
        <GitHubCodeSandbox   :url="release.codesandbox_URL" />
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
      releaseName: '',
      repositoryIDValue: '',
      repositoryName: '',
    };
  },

  methods: {
    async fetchData() {
      try {
        const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/release/${this.releaseID}`;
        const response = await this.axios.get(url);
        this.release = response.data;

        this.releaseName = this.release.name;
        this.repositoryIDValue = this.release.repositoryID;

        const url2 = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/repoV2/${this.release.repositoryID}`;
        const response2 = await this.axios.get(url2);

        this.repositoryName = response2.data.title;
      } catch (err) {
        console.log('Error fetching data:', err);
      }
   }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
@font-face {
  font-family: 'Poppins-Bold';
  src: url('@/assets/fonts/Poppins/Poppins-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.sb-container {
  padding: 0px 20px;
}

.header {
  padding-left: 20px;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 20px;
  /* background: #772eab; */
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 20px;
}

</style>