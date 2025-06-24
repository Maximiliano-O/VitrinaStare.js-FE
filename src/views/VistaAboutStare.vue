<script setup>
</script>

<template>
  <div class="view-content">
    <div class="content-header">
      <div class="title">
        {{ $t('stareQuestion') }}
      </div>
    </div>
    <div class="content-body">
      <p>{{ $t('stareP1') }}</p>
      <p>{{ $t('stareP2') }}</p>
      <ol>
        <li>
          {{ $t('stareL1') }}
        </li>
        <li>
          {{ $t('stareL2') }}
        </li>
        <li>
          {{ $t('stareL3') }}
        </li>
      </ol>
      <div>
      <h3>
        <a href="https://starejs.informatica.usach.cl" target="_blank">
          {{ $t('stareWebsite') }}
        </a>
      </h3>
      <h3>
        <a href="https://github.com/StArE-js" target="_blank">
          {{ $t('stareGithub') }}
        </a>
      </h3>
    </div>
    </div>
  </div>
</template>

<style scoped>
.content-header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 75px;
  color: #000;
}

.title {
  font-family: 'Poppins-Bold';
  font-size: 32px;
}

.content-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 140px;
  font-family: 'Poppins-Medium';
  font-size: 28px;
}

ol {
  margin-left: 80px;
}

</style>
