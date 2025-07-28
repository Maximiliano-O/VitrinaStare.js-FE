<template>
  <div class="iframe-wrapper">
    <iframe
      src="https://codesandbox.io/embed/sj55my?view=preview&fontsize=14&hidenavigation=1&theme=light"
      class="sandbox-frame"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
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
  height: 100vh; /* or your desired container height */
}

.sandbox-frame {
  width: 95vw;
  height: 90vh;
  border: 0;
  border-radius: 0px;
  overflow: hidden;
}
</style>
