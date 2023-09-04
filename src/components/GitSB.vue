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
      url: String
    },
    computed: {
      codesandboxUrl() {
        //return `https://codesandbox.io/s/github/\${this.owner}/\${this.repo}/tree/master/\${this.subdir}`;
        //return `https://codesandbox.io/s/github/StArE-js/stare.js-client/tree/master/examples/client-only/public?codemirror=1&highlights=1,3`;
        //return `https://codesandbox.io/p/sandbox/still-meadow-my33bk?file=%2Fpublic%2Fmain.js%3A16%2C15`;

        //return `https://codesandbox.io/p/github/MitchVera/StareClientExample/main?file=/public/main.js:1,1&workspaceId=623b8d9a-2eaa-4610-a880-6e93d6979e29`;
        //return `https://codesandbox.io/p/github/MitchVera/StareClientExample/draft/quirky-engelbart?file=/public/main.js:1,1&workspaceId=623b8d9a-2eaa-4610-a880-6e93d6979e29`;
        //return `https://codesandbox.io/p/sandbox/still-meadow-my33bk`;
        //return `https://codesandbox.io/s/upbeat-liskov-fmphsn?file=/main.js`;




        //return `https://codesandbox.io/s/github/MitchVera/StareClientExample5/tree/aa44c3a5cb7782c3217a7218d8901519c67ef018`;
        return this.url;
      },
    },
  };
  </script>