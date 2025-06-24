<script setup>
import { ref, computed } from 'vue'
import { BiEyeFill } from "oh-vue-icons/icons";
import { BiEyeSlashFill } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";
import { OhVueIcon } from "oh-vue-icons";

addIcons(BiEyeFill);
addIcons(BiEyeSlashFill);

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  placeholder: String,
  name: {
    type: String,
    defaul: ''
  },
  autocomplete: {
    type: String,
    defaul: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isPassword = computed(() => props.type === 'password')
const showPassword = ref(false)

const currentType = computed(() => {
  return isPassword.value ? (showPassword.value ? 'text' : 'password') : props.type
})

const touched = ref(false)

const isFocused = ref(false);

function onFocus() {
  isFocused.value = true;
}

function onBlur() {
  isFocused.value = false;
  touched.value = true;
}
</script>

<template>
  <div class="custom-input" :class="{ focused: isFocused }">
    <div class="input-name">
     <slot />
    </div>
    <div class="input-wrapper">
      <input
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="onBlur"
        @focus="onFocus"
        class="input"
      />
      <span v-if="isPassword" class="eye-icon" @click="showPassword = !showPassword">
        <OhVueIcon :name="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" scale="1.3" />
      </span>
    </div>
    <div v-if="touched && (!modelValue || modelValue.trim() === '') && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  position: relative;
  width: 100%;
  height: auto;
  font-size: 20px;
  display: flex;
  align-items: start;
  font-family: 'Poppins', sans-serif;
}

.custom-input input {
  width: 100%;
  height: 40px;
  padding: 10px 12px 10px 10px;
  font-size: 20px;
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

.input-name{
  font-family: 'Poppins-SemiBold';
  font-size: 20px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.eye-icon {
  position: absolute;
  right: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.custom-input.error input {
  border-color: #ff0800; /* red */
  box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.3);
}

.error-message {
  margin-top: 5px;
  color: #ff0800;
  font-size: 16px;
  font-family: 'Poppins-SemiBold', sans-serif;
}
</style>
