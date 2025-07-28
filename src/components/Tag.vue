<template>
  <div
    class="tag-wrapper"
  >
    <slot />
  </div>
</template>

<style scoped>
.tag-wrapper {
  display: inline-block;
  padding: 5px 10px;
  color: white;
  background-color: #40702F;
  border: none;
  border-radius: 6px;
  /* cursor: pointer; */
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.2s;
}
</style>
