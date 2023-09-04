<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-8">
        <h1>Vista Repositorios</h1>
      </div>

      <div class="col-2">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/contribuidores"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Registrar Repositorio
        </a>
        
      </div>

      
      <div class="col-2">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/ejemplo"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Ejemplo repositorio
        </a>
        
      </div>
      
    </div>
    ㅤ
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
  <div class="container-fluid">
    <Multiselect
      v-model="value"
      mode="tags"
      placeholder="Type and select tags"
      :options="options"
      :searchable="true"
    />

    <Multiselect
      v-model="value2"
      mode="value"
      placeholder="Type and select tags"
      :options="value"
      :searchable="true"
    />
    <div class="grid-container">
      <div class="item">
        <img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png" alt="Image 1">

        <div>Mark</div>
        <div>mark@gmail.com</div>
        <div>Calle A</div>
      </div>
 
      
      <!-- Add more grid items here -->
    </div>
  </div>
</div>
  </div>
</template>


<script>
  import Multiselect from '@vueform/multiselect'
  

  export default {
    components: { Multiselect },
    data() {
      return {
        value: [],
        options: ['Tag1', 'Tag2', 'Tag3']
      }
    }
  }
</script>

<style src="@vueform/multiselect/themes/default.css">
/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}

/* Ajustes a la barra de búsqueda por id op */
/* Con estos ajustes se crea el input para número sin tener las flechas del costado */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
  /* ajustes de tamaño */
  margin-top: 1%;
  margin-bottom: 3.5%;
  padding-left: 0.8%;
  font-size: 20px;
  width: 40%;
}

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .item {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    .item img {
      width: 100%;
      height: auto;
      display: block;
      margin-bottom: 1rem;
    }

</style>
