<script setup>
import FormInput from './FormInput.vue'
import ColoredButton from './buttons/ColoredButton.vue'
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const commentContent = ref('')

function submitComment() {
  if (commentContent.value.trim() === '') return
  emit('submit', commentContent.value)
  commentContent.value = ''
}
</script>

<template>
  <div class="comment-form">
    <FormInput 
      type="text" 
      v-model="commentContent" 
      :placeholder="$t('comment.placeholder')"
      multiline
      backgroundColor="white"
    />
    <div class="button-container">
      <ColoredButton variant="wine" @click="submitComment">
        {{ $t('comment.actions.submit') }}
      </ColoredButton>
    </div>
  </div>
</template>


<style scoped>
.comment-form {
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.base-button {
  width: 150px;
}

.custom-input textarea {
  background-color: white;
}

</style>