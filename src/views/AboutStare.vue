<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>¿Qué es StArE.js?</h1>
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


          <h3>La visualización correcta hace que la información sea más fácil de entender. A veces, 
            "una imagen habla más que mil palabras", por eso queremos brindar herramientas que faciliten el proceso de visualización de los resultados de los motores de búsqueda.</h3>


            <h3>StArE.js es un proyecto de código abierto destinado a facilitar a los desarrolladores la creación de visualizaciones alternativas de la página de resultados del motor de búsqueda (SERP).
 Stare.js proporciona una canalización de procesamiento modular y extensible capaz de (1) transformar SERP, (2) extraer funciones de resultados de búsqueda individuales y (3) visualizar SERP de múltiples maneras.</h3>
          ㅤ


          

          <div>
          <h3>
            <a href="https://starejs.informatica.usach.cl" target="_blank">
              Sitio web de StArE.js
            </a>
          </h3>
          ㅤ
          <h3>
            <a href="https://github.com/StArE-js" target="_blank">
              GitHub de StArE.js
            </a>
          </h3>


        </div>
          <div class="col-2">

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
