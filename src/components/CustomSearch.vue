<script setup>
import { ref, computed } from 'vue'
import { IoSearch } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";
import { OhVueIcon } from "oh-vue-icons";

addIcons(IoSearch);

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Enter text',
  },
  type: {
    type: String,
    default: 'text',
  },
  id: String,
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <div class="custom-input" :class="{ focused: isFocused }">
    <OhVueIcon name="io-search" class="icon" />
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="inputId"
    />
  </div>
</template>

<style scoped>
.custom-input {
  position: relative;
  width: 500px;
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
}

.custom-input input {
  width: 100%;
  height: 100%;
  padding: 10px 12px 10px 40px; /* padding-left makes space for icon */
  font-size: 18px;
  border: 1px solid #818181;
  border-radius: 8px;
  outline: none;
  background: transparent;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.custom-input input:focus {
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.9);
}

.custom-input .icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #000000;
}

.custom-input.focused .icon {
  color: #000;
}
</style>
