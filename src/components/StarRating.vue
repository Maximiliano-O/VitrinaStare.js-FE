<template>
    <div class="star-rating">
      <span v-for="(star, index) in stars" :key="index">
        <i class="fa" :class="starClass(star)" @click="rate(star)"></i>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      maxStars: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentRating: this.value
      }
    },
    computed: {
      stars() {
        return Array.from({length: this.maxStars}, (_, i) => i + 1);
      }
    },
    methods: {
      rate(star) {
        this.currentRating = star;
        this.$emit('update:rating', star);
      },
      starClass(star) {
        return ['fa-star', { 'fa-star-o': star > this.currentRating }];
      }
    }
  }
  </script>

  <style scoped>
.fa-star, .fa-star-o {
  color: gray;
  font-size: 1.5em; 
}
.fa-star:hover,
.fa-star:hover ~ .fa-star{
   color: gold;
}
</style>