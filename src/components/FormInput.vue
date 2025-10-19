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
    default: ''
  },
  autocomplete: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  multiline: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 4
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue']);

const isPassword = computed(() => props.type === 'password');
const showPassword = ref(false);
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
     <span v-if="required" class="required-marker">*</span>
    </div>
    <div class="input-wrapper">
      <textarea
        v-if="multiline"
        :rows="rows"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        :disabled="disabled"
        @input="!disabled && $emit('update:modelValue', $event.target.value)"
        @blur="onBlur"
        @focus="onFocus"
        class="input textarea"
      ></textarea>
      <input
        v-else
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :autocomplete="autocomplete"
        :required="required"
        :disabled="disabled"
        @input="!disabled && $emit('update:modelValue', $event.target.value)"
        @blur="onBlur"
        @focus="onFocus"
        class="input"
      />
      <span v-if="isPassword && !disabled" class="eye-icon" @click="showPassword = !showPassword">
        <OhVueIcon :name="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" scale="1.3" />
      </span>
    </div>
    <div v-if="!disabled && touched && (!modelValue || modelValue.trim() === '') && errorMessage" class="error-message">
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

.custom-input input,
.custom-input textarea {
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

.custom-input input:focus,
.custom-input textarea:focus {
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

.textarea {
  min-height: 100px;
  line-height: 1.5;
}

.eye-icon {
  position: absolute;
  right: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.required-marker {
  color: #ff0800;
  margin-left: 4px;
}

.custom-input.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.input:disabled,
.textarea:disabled {
  background-color: #f3f3f3;
  border-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.custom-input.error input,
.custom-input.error textarea {
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
