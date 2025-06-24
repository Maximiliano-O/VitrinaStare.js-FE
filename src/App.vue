<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
@font-face {
  font-family: 'Poppins-Bold';
  src: url('@/assets/fonts/Poppins/Poppins-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins-SemiBold';
  src: url('@/assets/fonts/Poppins/Poppins-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins-Medium';
  src: url('@/assets/fonts/Poppins/Poppins-Medium.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins';
  src: url('@/assets/fonts/Poppins/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

</style>
