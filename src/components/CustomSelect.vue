<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { MdTranslate } from 'oh-vue-icons/icons/md';
import { MdKeyboardarrowdown } from "oh-vue-icons/icons";
import { addIcons } from "oh-vue-icons";
import { OhVueIcon } from "oh-vue-icons";

addIcons(MdTranslate);
addIcons(MdKeyboardarrowdown);

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
  },
  startIcon: {
    type: String,
    default: '',
  },
  endIcon: {
    type: String,
    default: 'md-keyboardarrowdown',
  },
  defaultText: {
    type: String,
    default: 'some-label',
  },
})

const normalizedOptions = computed(() =>
  props.options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: opt, value: opt }
    }
    return opt
  })
)

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (value) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const selectedLabel = computed(() => {
  const selected = normalizedOptions.value.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : props.defaultText
})

const isFocused = ref(false)

const handleKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    toggle()
  } else if (e.key === 'Escape') {
    isOpen.value = false
  }
}
</script>

<template>
  <div class="custom-select"
    tabindex="0"
    @blur="isOpen = false"
    @keydown="handleKeydown"
    @focus="isFocused = true"
    @blur.capture="isFocused = false"
  >
    <div class="selected" @click="toggle">
      <span class="icon" v-if="startIcon">
        <OhVueIcon :name="startIcon" />
      </span>
      <span class="label">{{ selectedLabel }}</span>
      <span :class="['icon', 'custom-caret', { 'is-open': isOpen }]">
        <OhVueIcon :name="endIcon" />
      </span>
    </div>
    <ul v-if="isOpen" class="options">
      <li
        v-for="option in normalizedOptions"
        :key="option.value"
        @click="select(option.value)"
        :class="{ selected: option.value === modelValue }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  cursor: pointer;
  user-select: none;
  border: 1px solid #818181;
  border-radius: 8px;
  color: #000;
  outline: none;
  font-size: 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Poppins-SemiBold';
}

.custom-select:focus {
  border-color: #000;
  box-shadow: 0 0 0 3px #000;
}

.selected {
  display: flex;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  position: relative;
  font-size: 20px;
  align-items: center;
}

.label {
  flex: 1;
  text-align: center;
}

.icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 150px;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  background: white;
  list-style: none;
  z-index: 100;
  box-shadow: 0 4px 6px rgb(0 0 0 / 0.1);
}

.options li {
  padding: 10px;
  cursor: pointer;
}

.options li.selected {
  border: 0px;
  border-radius: 0px;
  background-color: #000;
  color: #fff;
}

.options li:hover {
  background-color: #b2b2b2;
  color: #000;
}

.custom-caret {
  display: flex;
  width: 22px;
  height: 22px;
  transition: transform 0.3s;
  transform-origin: center;
}

.custom-caret svg {
  width: 22px;
  height: 22px;
  fill: #000;
}

/* rotated when open */
.custom-caret.is-open {
  transform: rotate(180deg);
}

</style>
