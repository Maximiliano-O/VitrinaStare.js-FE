<script setup>
import { FaRegularUserCircle } from "oh-vue-icons/icons";
import { BiGithub } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";
import { OhVueIcon } from "oh-vue-icons";
import { ref } from 'vue'

addIcons(FaRegularUserCircle);
addIcons(BiGithub);

const imageError = ref(false)
const props = defineProps({
  iconName: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="image-icon icon" v-if="imageUrl || iconName">
    <img 
      v-if="imageUrl && !imageError" 
      :src="imageUrl" 
      @error="imageError = true">
    <OhVueIcon v-else :name="iconName" />
  </span>
</template>

<style scoped>
.icon :deep(svg) {
  width: 40px;
  height: 40px;
}

.image-icon img{
  width: 38px;
  height: 38px;
  border-radius: 20px;
}
</style>
