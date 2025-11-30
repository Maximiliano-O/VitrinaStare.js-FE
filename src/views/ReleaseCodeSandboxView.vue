<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs.vue';
import ColoredButton from '../components/buttons/ColoredButton.vue';
import GitHubCodeSandbox from '@/components/GitSB.vue';

// Props
const props = defineProps({
  releaseID: String
})

// Reactive state
const release = ref({});
const releaseName = ref('');
const repositoryIDValue = ref('');
const repositoryName = ref('');

// Fetch data function
async function fetchData() {
  try {
    const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/release/${props.releaseID}`;
    const response = await axios.get(url);
    release.value = response.data.result;

    releaseName.value = release.value.name;
    repositoryIDValue.value = release.value.repositoryID;

    const url2 = `${import.meta.env.VITE_APP_EXPRESS_URL}/repository/${release.value.repositoryID}`;
    const response2 = await axios.get(url2);
    repositoryName.value = response2.data.result.title;
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}

// Lifecycle hook
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="overflow-hidden">
    <Breadcrumbs 
      :parentLabel="repositoryName"
      :title="releaseName"
      parentName="repositoryDetails"
      :repositoryID="repositoryIDValue"
    />
    <div class="row">
      <div class="header">
        <div class="title">
          {{ $t('sandBox.title') }}: {{ releaseName }}
        </div>
      </div>
      <div class="sb-container">
        <GitHubCodeSandbox v-if="release.codesandbox_URL" :url="release.codesandbox_URL" />
        <p v-else>{{ loadingSandbox }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
