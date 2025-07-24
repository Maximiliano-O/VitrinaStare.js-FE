<script setup>
import ColoredButton from './buttons/ColoredButton.vue';
import CustomSelect from './CustomSelect.vue';
import LoginModal from './LoginModal.vue';

import { useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t, locale } = useI18n();

const showLoginModal = ref(false);
const selectedLocale = ref(locale.value);

const locales = computed(() => [
  { label: t('englishLabel'), value: 'english' },
  { label: t('spanishLabel'), value: 'spanish' }
]);

const isGuest = ref(localStorage.getItem('guest') === 'true');
const userName = ref(localStorage.getItem('user') || '');
const userImg = ref(localStorage.getItem('userIcon') || '');

function openLogin() {
  showLoginModal.value = true;
};

function closeLogin() {
  showLoginModal.value = false;
};

function logOff() {
  localStorage.setItem('user', 'Invitado');
  localStorage.setItem('guest', 'true');
  localStorage.removeItem('userID');
  window.location.href = '/';
};

function getUserLink() {
  const id = localStorage.getItem('userID');
  return `/contribuidores/${id}`;
};

watch(selectedLocale, (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
});
</script>

<template>
  <nav id="navbar" v-if=!route.meta.hideNavbar>
    <div class="navbar-header">
      <img src="../assets/Stare.js-Only-Eye-Logo.png" width="85" height="55" />
      StArE.js
    </div>
    <div class="button-container">
      <CustomSelect
        v-model="selectedLocale"
        :options="locales"
        start-icon="md-translate"
        default-text="Español"
      />
      <div class="button-container" v-if="isGuest">
        <ColoredButton variant="transparent" :to="{ name: 'repos' }">{{ t('navbarRepositories') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'aboutStare' }">{{ t('navbarStare') }}</ColoredButton>
        <ColoredButton variant="wine" @click="openLogin">{{ t('navbarLogin') }}</ColoredButton>
        <LoginModal v-if="showLoginModal" @close="closeLogin" />
        <ColoredButton variant="night" :to="{ name: 'registrarse' }">{{ t('navbarSignup') }}</ColoredButton>
      </div>
      <div class="button-container" v-else>
        <ColoredButton variant="transparent" :to="{ name: 'staticObservable' }">Testing pipeline</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'repos' }">{{ t('navbarRepositories') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'aboutStare' }">{{ t('navbarStare') }}</ColoredButton>
        <ColoredButton
          variant="transparent"
          :to="getUserLink()"
          iconName="fa-regular-user-circle"
          :imageUrl="userImg"
        >
          {{ userName }}
        </ColoredButton>
        <ColoredButton variant="white" :onClick="logOff">{{ t('logOff') }}</ColoredButton>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px 5px 300px;
  min-width: 100%;
  max-height: 75px;
  -webkit-box-shadow: 0px 4px 4px 1.5px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 4px 4px 1.5px rgba(0, 0, 0, 0.35);
  background: #40702f;
  color: #fff;
  transition: all 0.3s;
  margin-bottom: 10px;
}

#navbar .navbar-header {
  align-items: center;
  font-family: 'Poppins-SemiBold', sans-serif;
  font-size: 32px;
}

#navbar .button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 20px;
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 20px;
}
</style>
