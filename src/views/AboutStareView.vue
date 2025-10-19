<template>
  <div class="view-content">
    <div class="content-header">
      <div class="title">
        {{ $t('about.title') }}
      </div>
    </div>
    <div class="content-body">
      <p>{{ $t('about.content.paragraph1') }}</p>
      <p>{{ $t('about.content.paragraph2') }}</p>
      <ol>
        <li>
          {{ $t('about.content.bullet1') }}
        </li>
        <li>
          {{ $t('about.content.bullet2') }}
        </li>
        <li>
          {{ $t('about.content.bullet3') }}
        </li>
      </ol>
      <div>
      <h3>
        <a href="https://starejs.informatica.usach.cl" target="_blank">
          {{ $t('about.content.site') }}
        </a>
      </h3>
      <h3>
        <a href="https://github.com/StArE-js" target="_blank">
          {{ $t('about.content.github') }}
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
