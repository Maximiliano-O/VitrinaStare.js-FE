<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const stars = [1, 2, 3, 4, 5]
const localValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localValue.value = val
})

const setRating = (index, half) => {
  let value = index - 1
  if (half === 'left') {
    value += 0.5
  } else {
    value += 1
  }
  localValue.value = value
  emit('update:modelValue', value)
}

const getStarClass = (starIndex) => {
  if (localValue.value >= starIndex) {
    return 'full'
  }
  if (localValue.value >= starIndex - 0.5) {
    return 'half'
  }
  return 'empty'
}
</script>

<template>
  <div class="stars" role="radiogroup" aria-label="Star rating">
    <span
      v-for="star in stars"
      :key="star"
      class="star"
      role="radio"
      :aria-checked="localValue >= star - 0.5 && localValue < star ? 'mixed' : localValue >= star ? 'true' : 'false'"
    >
      <span class="half left" @click="setRating(star, 'left')" aria-label="Half star"></span>
      <span class="half right" @click="setRating(star, 'right')" aria-label="Full star"></span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      >
        <defs>
          <linearGradient id="halfBW">
            <stop offset="50%" stop-color="black" />
            <stop offset="50%" stop-color="white" />
          </linearGradient>
        </defs>
        <path
          :fill="getStarClass(star) === 'full' ? 'black' : getStarClass(star) === 'half' ? 'url(#halfBW)' : 'white'"
          stroke="black"
          d="M12 2l3 7h7l-5.5 4.5 2 7-6-4.5-6 4.5 2-7L2 9h7l3-7z"
        />
      </svg>
    </span>
  </div>
</template>

<style scoped>
.stars {
  display: flex;
  gap: 8px;
  user-select: none;
}

.star {
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: inline-block;
}

.half {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
  z-index: 10;
}

.half.left {
  left: 0;
}

.half.right {
  right: 0;
}

/* Prevent SVG from intercepting clicks */
svg {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
