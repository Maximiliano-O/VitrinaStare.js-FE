<template>
  <component
    class="base-button"
  >
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<style scoped>
.base-button {
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
