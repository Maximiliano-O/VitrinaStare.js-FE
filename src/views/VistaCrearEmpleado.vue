<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>Crear un cliente</h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/clientes"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >Regresar a la vista de clientes
        </a>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          v-on:click="enviarCliente"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Crear cliente
        </button>
      </div>
    </div>
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">
        <form @submit="enviarCliente" method="post" id="form_crearCliente">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
     

          </div>
 
 
          <div class="row m-3">
            <h3>Company</h3>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Company Name:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_name"
                v-model="company_name"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Company Adress:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_address"
                v-model="company_address"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Email:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_email"
                v-model="company_email"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Phone:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_phone"
                v-model="company_phone"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Company VAT:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_VAT"
                v-model="company_VAT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Legal Representative:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Legal Representative RUT:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <h3>Comex</h3>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Comex Individual:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Comex Phone:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Comex Email:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <h3>Finance</h3>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Finance Individual:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Finance Phone:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Finance Individual:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_RUT"
                v-model="company_RUT"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>



 

  
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VistaCrearCliente',
  data() {
    return {
    company_name: '',
    company_rut: '',
    company_email: '',
    company_phone: '',
    legal_representative: '',
    representative_rut: '',
    legal_office_address: '',
    finance_manager_name: '',
    finance_manager_email: '',
    finance_manager_phone: '',
    comex_manager_name: '',
    comex_manager_email: '',
    comex_manager_phone: ''
    }
  },
  methods: {
    //Descripción: Toma los datos registrados en el formulario y guarda la operación en la base de datos

    async enviarCliente(e) {
      await this.axios.post('http://localhost:8080/clientes', {
          company_name: this.company_name, 
          company_rut: this.company_rut,
          company_email: this.company_email,
          company_phone: this.company_phone,
          legal_representative: this.legal_representative,
          representative_rut: this.representative_rut,
          legal_office_address: this.legal_office_address,
          finance_manager_name: this.finance_manager_name,
          finance_manager_email: this.finance_manager_email,
          finance_manager_phone: this.finance_manager_phone,
          comex_manager_name: this. comex_manager_name,
          comex_manager_email: this. comex_manager_email,
          comex_manager_phone: this.comex_manager_phone,

 
     
        })
        e.preventDefault()
        //Después de crear la operación, se redirige a la vista general de clientes
        window.location.href = '/clientes'
       
    }
  }
}
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
