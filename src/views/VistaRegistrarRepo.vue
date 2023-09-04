<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>Registrar un repositorio</h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >Regresar a la vista de repositorios
        </a>
      </div>


    </div>
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">
        <form @submit.prevent="register" method="post" id="form_crearCliente">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
     

          </div>
 
 
          <div class="row m-3">
            <h3>Repositorio</h3>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Título:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryName"
                v-model="repository.title"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>

          </div>

          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Nombre Repositorio:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryDesc"
                v-model="repository.repositoryName"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Descripción Repo:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryDesc"
                v-model="repository.repositoryDesc"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Documentación Repo:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryName"
                v-model="repository.repositoryDoc"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Licencia:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.license"
                v-model="repository.license"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">URL Repo:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryUrl"
                v-model="repository.repositoryUrl"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">URL imagen:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryName"
                v-model="repository.imageURL"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Tags:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="repository.repositoryName"
                v-model="repository.tags"
                style="width: 40%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>


          ㅤ
          <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Agregar Repositorio
        </button>
      </div>


  
        </form>
      </div>
    </div>

  </div>
</template>

<script>



import axios from 'axios';

axios.defaults.timeout = 5000;

const registerRepository = async (repositoryData) => {
      try {
        const response = await axios.post(`http://localhost:9000/api/repoV2`, repositoryData);
        console.log('Server response:', response);
        return response.data;
      } catch (error) {
        //console.error(error);
        console.log('Error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Error from server:', error.response);
        throw error;
      }
    };

export default {
  name: 'VistaRegistrarRepo',
  data() {
    return {

      
      repository: {

        
        //repositoryID: 20,



        //contributorID: '',
        contributorID: localStorage.getItem('userID'),




        //ownerID: 20,


        //author: '',
        author: localStorage.getItem('user'),
        title: '',
        type: 'public',
        imageURL:'',
        tags:[],

        
        repositoryName: '',
        repositoryDesc: '',
        repositoryDoc: '',
        license: '',
        //releases: [],
        repositoryUrl: ''
        


        
      },
    };
  },
  methods: {

    async register() {
      //const author = localStorage.getItem('user');
      //this.repository.author = JSON.parse(username).name;
      //this.repository.author = author;
      //const id = localStorage.getItem('userID');
      //this.repository.contributorID = JSON.parse(id).name;
      //this.repository.contributorID = id;

      try {
        //const response = await registerRepository(this.repository);
        //console.log('Repository registered:', response);
        // Redirect to the dashboard or another page
               const response = await fetch(`http://localhost:9000/api/repoV2`, {
         method: 'POST',
         body: JSON.stringify(this.repository),
         headers: {
           'Content-Type': 'application/json',
         },
         
       });
       this.$router.push('/');

       if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
       
      } catch (error) {
        console.error('Error registering repository:', error);
      }
    },
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
