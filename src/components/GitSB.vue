<script setup>
import { computed } from 'vue';

const props = defineProps({
  owner: String,
  repo: String,
  subdir: String,
  url: String,
  previewOnly: {
    type: Boolean,
    default: false,
  },
});

const codesandboxUrl = computed(() => {
  if (!props.url || props.url.trim() === '') return '' // Guard for empty URLs

  let finalUrl = props.url
  const params = new URLSearchParams()

  params.set('theme', 'light')
  if (props.previewOnly) {
    params.set('view', 'preview')
  }

  return finalUrl.includes('?')
    ? finalUrl + '&' + params.toString()
    : finalUrl + '?' + params.toString()
});
</script>

<template>
  <div>
    <iframe
      v-if="codesandboxUrl"
      :src="codesandboxUrl"
      style="width:100%; height:850px; border:0; border-radius: 2px; overflow:hidden;"
      title="CodeSandbox"
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    ></iframe>
    <p v-else style="text-align:center; color:red;">Sandbox URL no disponible.</p>
  </div>
</template>
