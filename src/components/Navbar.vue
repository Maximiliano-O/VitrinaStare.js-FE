<script setup>
import ColoredButton from './buttons/ColoredButton.vue';
import CustomSelect from './CustomSelect.vue';
import LoginModal from './LoginModal.vue';
import globalState from '@/store/globalState.js';
import { clearUser } from '@/store/globalState.js';

import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

const toast = useToast();

const showLoginModal = ref(false);
const selectedLocale = ref(locale.value);

const locales = computed(() => [
  { label: t('locales.english'), value: 'english' },
  { label: t('locales.spanish'), value: 'spanish' }
]);

const isGuest = computed(() => globalState.guest);
const userName = computed(() => globalState.user);
const userImg = computed(() => globalState.userIcon);

function openLogin() {
  showLoginModal.value = true;
};

function closeLogin() {
  showLoginModal.value = false;
};

function logOut() {
  clearUser();
  toast.success(t('notifications.auth.logoutSuccess'));
  router.push({ name: 'repositories'});
}

function getUserLink() {
  const id = localStorage.getItem('userID');
  return `/user/${id}`;
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
        :default-text="t('locales.spanish')"
      />
      <div class="button-container" v-if="isGuest">
        <ColoredButton variant="transparent" :to="{ name: 'repositories' }">{{ $t('navbar.repositories') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'aboutStare' }">{{ $t('navbar.about') }}</ColoredButton>
        <ColoredButton variant="wine" @click="openLogin">{{ $t('navbar.login') }}</ColoredButton>
        <LoginModal v-if="showLoginModal" @close="closeLogin" />
        <ColoredButton variant="night" :to="{ name: 'signup' }">{{ $t('navbar.signup') }}</ColoredButton>
      </div>
      <div class="button-container" v-else>
        <ColoredButton variant="transparent" :to="{ name: 'testDrive' }">{{ $t('navbar.testDrive') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'repositories' }">{{ $t('navbar.repositories') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'aboutStare' }">{{ $t('navbar.about') }}</ColoredButton>
        <ColoredButton
          variant="transparent"
          :to="getUserLink()"
          iconName="fa-regular-user-circle"
          :imageUrl="userImg"
        >
          {{ userName }}
        </ColoredButton>
        <ColoredButton variant="white" :onClick="logOut">{{ $t('navbar.logOut') }}</ColoredButton>
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
  padding: 5px 0px 5px 150px;
  min-width: 100%;
  max-height: 75px;
  -webkit-box-shadow: 0px 4px 4px 1.5px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 4px 4px 1.5px rgba(0, 0, 0, 0.35);
  background: #40702f;
  color: #fff;
  transition: all 0.3s;
  margin-bottom: 10px;
}

.navbar-header {
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: 'Poppins-SemiBold';
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
