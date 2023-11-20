<template>
  <div class="overflow-auto" style="max-height: 96vh">
  <div class="container-fluid">

    <div class="row">
      <div class="col-7">
        <h1>{{ $t('stareQuestion') }}</h1>
      </div>

    </div>
 
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">
        <form @submit="register" method="post" id="form_crearCliente">
    
          <div class="row m-3">

     
          </div>
          ㅤ
          <h3>{{ $t('stareLine1') }}</h3>
          ㅤ

            <h3>{{ $t('stareLine2') }}</h3>
          ㅤ
          <div>
          <h3>
            <a href="https://starejs.informatica.usach.cl" target="_blank">
              {{ $t('stareWebsite') }}
            </a>
          </h3>
          ㅤ
          <h3>
            <a href="https://github.com/StArE-js" target="_blank">
              {{ $t('stareGithub') }}
            </a>
          </h3>
          ㅤ

        </div>
          <div class="col-2">
            </div>

              {{ $t('changeLanguage') }}:
            <div>
            <select v-model="selectedLocale">
             <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
              {{ locale }}
             </option>
          </select>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
   export default {
     name: "LocaleSwitcher",
     data() {
       return { 
         locales: ["english", "spanish"],
         selectedLocale: this.$i18n.locale 
       };
     },

     created() {
    this.selectedLocale = this.$i18n.locale;
    },

     watch: {
       selectedLocale(newLocale) {
         this.$i18n.locale = newLocale; 
         localStorage.setItem('locale', newLocale); 
       }
     }
   };
   </script>

<style>
/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}

/* Personalización del select */
select {
  background-color: #ffffff;
  width: 100%;
  font-size: 18px;
  border-radius: 4px;
}

/* Con estos ajustes se crea el input para número sin tener las flechas del costado */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
