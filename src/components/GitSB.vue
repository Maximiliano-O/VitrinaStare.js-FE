<template>
    <div>
      <iframe
        :src="codesandboxUrl"
        style="width:100%; height:850px; border:0; border-radius: 2px; overflow:hidden;"
        title="CodeSandbox"
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      owner: String,
      repo: String,
      subdir: String,
      url: String
    },
    computed: {
      codesandboxUrl() {

        return this.url;
      },
    },
  };
  </script>