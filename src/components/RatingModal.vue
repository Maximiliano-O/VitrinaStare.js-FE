<script setup>
import { ref, watch } from 'vue'
import ColoredButton from './buttons/ColoredButton.vue'
import StarRating from './StarRating.vue'

const props = defineProps({
  visible: Boolean,
  modelValue: Number,
})
const emit = defineEmits(['update:visible', 'update:modelValue', 'confirm'])

const localRating = ref(props.modelValue)

// Keep local rating in sync if prop changes externally
watch(() => props.modelValue, (newVal) => {
  localRating.value = newVal;
})

const confirm = () => {
  emit('confirm', localRating.value);
  emit('update:visible', false);
}
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('update:visible', false)">
      <div class="modal-content">
        <button class="close-button" @click="$emit('update:visible', false)">×</button>
        <div class="modal-header-text">
          <p>¿Cómo califica el repositorio?</p>
        </div>
        <div>
          <StarRating v-model="localRating" />
        </div>
        <div class="button-pair">
          <ColoredButton variant="black" @click="$emit('update:visible', false)">Cancelar</ColoredButton>
          <ColoredButton variant="night" @click="confirm">Enviar</ColoredButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Fade-in/out animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* Card-like container */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 450px;
  background: #fff;
  color: #000;
  padding: 30px 20px;
  border-radius: 0px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: scaleIn 0.2s ease;
}

/* Scale animation for the modal itself */
@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header-text {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Poppins-Bold";
  font-size: 22px;
  text-align: center;
}

.button-pair {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
