<script setup>
import ColoredButton from './buttons/ColoredButton.vue';
import CustomSelect from './CustomSelect.vue';
import LoginModal from './LoginModal.vue';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showLoginModal = ref(false)

function openLogin() {
  showLoginModal.value = true
}

function closeLogin() {
  showLoginModal.value = false
}
</script>

<template>
  <!-- Setup barra de navegación --->
  <nav id="navbar" v-if="!$route.meta.hideNavbar">
    <div class="navbar-header">
      <img src="../assets/Stare.js-Only-Eye-Logo.png" width="85" height="55" />
      StArE.js
    </div>
    <div class='button-container'>
      <CustomSelect 
        v-model="selectedLocale" 
        :options="locales" 
        start-icon="md-translate" 
        default-text="Español"
      />
      <div class='button-container' v-if="isGuest">
        <ColoredButton variant="transparent" :to="{ name: 'repos' }">{{ $t('navbarRepositories') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'aboutStare' }">{{ $t('navbarStare') }}</ColoredButton>
        <ColoredButton variant="wine" @click="openLogin">{{ $t('navbarLogin') }}</ColoredButton>
        <LoginModal v-if="showLoginModal" @close="closeLogin" />
        <ColoredButton variant="night">{{ $t('navbarSignup') }}</ColoredButton>
      </div>
      <div class='button-container' v-else>
        <ColoredButton variant="transparent" :to="{ name: 'repos' }">{{ $t('navbarRepositories') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="{ name: 'aboutStare' }">{{ $t('navbarStare') }}</ColoredButton>
        <ColoredButton variant="transparent" :to="getUserLink()">User 1</ColoredButton>
        <ColoredButton variant="white" :onClick="logOff">{{ $t('logOff') }}</ColoredButton>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
      return { 
        locales: null,
        selectedLocale: this.$i18n.locale, 
        isGuest: localStorage.getItem("guest") === "true",
      };
    },

    created() {
      
      this.selectedLocale = this.$i18n.locale;
    },

    computed: {
      locales() {
        return [
          { label: this.$t('englishLabel'), value: "english" },
          { label: this.$t('spanishLabel'), value: "spanish" }
        ]
      }
    },

    watch: {
      selectedLocale(newLocale) {
        this.$i18n.locale = newLocale; 
        localStorage.setItem('locale', newLocale); 
      }
    },

    methods: {
      logOff() {
        localStorage.setItem("user", 'Invitado');;
        localStorage.setItem("guest", 'true');
        localStorage.removeItem("userID");
        window.location.href = '/';
      },
      getUserLink() {
        const id=localStorage.getItem('userID')
        return `/contribuidores/${id}`;
      },
    }
};
</script>

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
  -webkit-box-shadow: 0px 4px 4px 1.5px rgba(0,0,0,0.35); 
  box-shadow: 0px 4px 4px 1.5px rgba(0,0,0,0.35);
  background: #40702F;
  color: #fff;
  transition: all 0.3s;
}

#navbar .navbar-header {
  align-items: center;
  /* background: #9bb2eb; */
  font-family: 'Poppins-SemiBold', sans-serif;
  font-size: 32px;
}

#navbar .button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 20px;
  /* background: #772eab; */
  font-family: 'Poppins-Bold', sans-serif;
  font-size: 20px;
}
</style>