<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>{{ $t('stareQuestion') }}</h1>
      </div>



    </div>
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">
        <form @submit="register" method="post" id="form_crearCliente">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
     

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


        </div>
          <div class="col-2">

      </div>

  
 

  
        </form>
      </div>
    </div>

  </div>
  Change Language:
  <div>
    <select v-model="$i18n.locale">
      <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script>
   export default {
     name: "LocaleSwitcher",
     data() {
       return { 
         locales: ["english", "spanish"],
         selectedLocale: this.$i18n.locale // initialize selectedLocale with the current locale
       };
     },
     watch: {
       selectedLocale(newLocale) {
         this.$i18n.locale = newLocale; // update the locale in the i18n configuration
         localStorage.setItem('locale', newLocale); // store the selected locale in local storage
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
