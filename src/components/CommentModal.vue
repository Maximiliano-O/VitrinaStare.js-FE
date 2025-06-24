<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ColoredButton from './buttons/ColoredButton.vue'
import FormInput from './FormInput.vue'
const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}

const commentContent = ref('')
const showError = ref(false)
</script>

<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <button class="close-button" @click="emitClose">×</button>
      <div class="title">
        Comenta
      </div>
      <FormInput 
        type="text" 
        v-model="commentContent" 
        placeholder="Comentario..."
      >
      </FormInput>
      <div class="button-pair">
        <ColoredButton variant="black" @click="emitClose">Volver</ColoredButton>
        <ColoredButton variant="wine" @click="logIn">Enviar</ColoredButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Poppins-Bold";
  font-size: 36px;
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

.modal-content {
  display: flex;
  gap: 10px;
  width: 550px;
  height: auto;
  color: #000;
  background: white;
  padding: 20px;
  position: relative;
}

.button-pair {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.base-button {
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