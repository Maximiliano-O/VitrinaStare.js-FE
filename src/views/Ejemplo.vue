<template>
     <div class="overflow-auto" style="max-height: 100vh">
    <div style="width: 100%;">
      <GitHubCodeSandbox owner="StArE-js" repo="stare.js-client" subdir="examples/client-only/public" />
    </div>
    ㅤ
    <div class="comments-section">
  <div class="comment">
    <div class="comment-author">User1</div>
    <div class="comment-body">This is a comment.</div>
    <div class="comment-replies">
      <div class="comment">
        <div class="comment-author">User2</div>
        <div class="comment-body">This is a reply to the comment.</div>
      </div>
      <!-- More replies go here -->
    </div>
  </div>
  <div class="comment">
    <div class="comment-author">User3</div>
    <div class="comment-body">This is another comment.</div>
    <div class="comment-replies">
      <!-- Replies go here -->
    </div>
  </div>
  <!-- More comments go here -->
</div>


</div>

  </template>
  
  <script>
  import GitHubCodeSandbox from "@/components/GitSB.vue";
  
  export default {
    components: {
      GitHubCodeSandbox,
    },
  };
  </script>

<style>

.comments-section {
    font-family: Arial, sans-serif;
  }
  
  .comment {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .comment-author {
    font-weight: bold;
  }
  
  .comment-body {
    margin-top: 0.5rem;
  }
  
  .comment-replies {
    margin-left: 2rem;
    margin-top: 1rem;
  }
</style>