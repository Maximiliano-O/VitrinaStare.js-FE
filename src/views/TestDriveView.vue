<script setup>
import Breadcrumbs from '../components/Breadcrumbs.vue'
</script>

<template>
  <Breadcrumbs />
  <div class="iframe-wrapper">
    <iframe src="https://codesandbox.io/p/devbox/wizardly-surf-2p533p?workspaceId=ws_BcjYxFTR3ZoPhzVENHrPJF&embed=1"
     style="width:100%; height: 100%; border:0; border-radius: 4px; overflow:hidden;"
     title="Stare.js-Test-Drive"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
  </div>
</template>

<style scoped>
.iframe-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.sandbox-frame {
  width: 95vw;
  height: 90vh;
  border: 0;
  border-radius: 0px;
  overflow: hidden;
}
</style>
