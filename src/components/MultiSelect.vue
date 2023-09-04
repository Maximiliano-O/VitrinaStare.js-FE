<template>
    <div>
      <Multiselect
        v-model="currentTags"
        mode="tags"
        placeholder="Type and select tags"
        :options="tags"
        :searchable="true"
      />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';
  
  export default {
    components: {
      Multiselect,
    },
    setup() {
      const currentTags = ref([]);
      const tags = ['Tag1', 'Tag2', 'Tag3'];
  
      return {
        currentTags,
        tags,
      };
    },
  };
  </script>