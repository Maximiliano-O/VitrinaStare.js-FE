<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="wrapper">
    <!-- En este segmento es donde se localiza el contenido a cargar de las diferenres vistas-->
    <div id="content">
      <RouterView />
    </div>
  </div>
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
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Poppins';
  src: url('@/assets/fonts/Poppins/Poppins-Regular.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

#content {
  padding-top: 10px;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
}
</style>
