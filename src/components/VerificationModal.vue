<script setup>
import { computed } from 'vue';
import ColoredButton from '@/components/buttons/ColoredButton.vue';

const props = defineProps({
  visible: Boolean,
  title: String,
  confirmLabel: String,
  confirmClass: String, // This will map to the variant of ColoredButton
  modelValue: String
});

const emit = defineEmits(['confirm', 'update:modelValue', 'update:visible']);

// Proxy for two-way binding
const proxyValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const close = () => {
  emit('update:visible', false);
};

const confirm = () => {
  emit('confirm');
  close();
};
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">×</button>
      <div class="modal-header-text">
        <img src="/src/assets/warning.svg" width="50" />
        <p>{{ title }}</p>
      </div>
      <p class="obs-label">{{ $t('verification.observations') }}:</p>
      <textarea rows="3" v-model="proxyValue"></textarea>
      <div class="button-pair">
        <ColoredButton variant="black" @click="close">
          {{ $t('common.actions.back') }}
        </ColoredButton>
        <ColoredButton variant="night" @click="confirm">
          {{ confirmLabel }}
        </ColoredButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  z-index: 9999;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 550px;
  max-width: 90vw;
  background: white;
  color: #000;
  padding: 20px;
  position: relative;
  border-radius: 6px;
  font-family: "Poppins", sans-serif;
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

.modal-header-text {
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: bold;
  font-size: 1.2rem;
}

.obs-label {
  margin-top: 10px;
  font-size: 0.95rem;
  font-weight: bold;
}

textarea {
  width: 100%;
  resize: none;
  margin: 10px 0;
  padding: 8px;
  font-size: 1rem;
}

.button-pair {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  width: 100%;
}
</style>
