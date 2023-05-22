<template>
    <div>
      <iframe
        :src="codesandboxUrl"
        style="width:100%; height:650px; border:0; border-radius: 4px; overflow:hidden;"
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
    },
    computed: {
      codesandboxUrl() {
        //return `https://codesandbox.io/s/github/\${this.owner}/\${this.repo}/tree/master/\${this.subdir}`;
        return `https://codesandbox.io/s/github/StArE-js/stare.js-client/tree/master/examples/client-only/public?codemirror=1&highlights=1,3`;
      },
    },
  };
  </script>