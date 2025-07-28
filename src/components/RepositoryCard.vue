<script setup>
import { computed } from 'vue';

const props = defineProps({ repository: Object });
const { repository } = props;

const ratingCount = computed(() => Array.isArray(repository.ratings) ? repository.ratings.length : 0);

</script>

<template>
  <div class="repo-card">
    <div class="repo-title">
      {{ repository.title }}
    </div>
    <div class="image-container">  
      <img class="repo-image" :src="repository.imageURL">
      <div class="info">
        <div>
          {{repository.author}}
        </div>
        <span class="divider"></span>
        <div>
          {{ new Date(repository.updatedAt).toLocaleDateString() }}
        </div>
        <span class="divider"></span>
        <div>
          {{repository.totalRating}} ★ <small>({{ ratingCount }})</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repo-card {
  width: 450px;
  height: 350px;
  padding: 10px;
  cursor: pointer;
  background-color: #000000;
  text-align: center;
}

.repo-card:hover {
  background-color: #767272;
}

.repo-card:hover .info {
  opacity: 1;
}

.repo-title {
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 20px;
  color: #fff;
}

.divider {
  padding: 0px;
  display: inline-block;
  width: 2px;
  height: 18px;
  background-color: #000;
  color: #000;
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: #000;
  background-color: #fff;
  font-family: 'Poppins';
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.repo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-container {
  display: flex;
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
