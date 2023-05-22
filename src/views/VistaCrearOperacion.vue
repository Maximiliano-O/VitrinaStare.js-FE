<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-7">
        <h1>Crear una operación</h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/operaciones"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >Regresar a la vista general
        </a>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          v-on:click="enviarOperacion"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Crear operación
        </button>
      </div>
    </div>
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">
        <form @submit="enviarOperacion" method="post" id="form_crearOperacion">
          <!-- Las filas del formulario estan separados por el div row m-3 -->
          <div class="row m-3">
            <!-- El uso del col es para mantener el título con la selección alineados -->
            <!-- Usar v-model para conectar campo del formulario con parámetro en el JSON a enviar-->
            <div class="col-2">
              <h3>OP type:</h3>
            </div>
            <div class="col-2 mt-2">
              <select name="type_shipment" v-model="op_type.type_shipment">
                <option value="importacion">Importación (M)</option>
                <option value="exportacion">Exportación (X)</option>
              </select>
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h3>Bill of Lading No:</h3>
            </div>
            <div class="col-8">
              <input
                type="text"
                name="bill_of_lading"
                v-model="bill_of_lading"
                :disabled="op_type.type_shipment != 'importacion'"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h3>Country of origin:</h3>
            </div>
            <div class="col-8">
              <input
                type="text"
                id="country_origin"
                name="country_origin"
                v-model="country_origin"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <h3>Shipper</h3>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Name:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="shipper_name"
                v-model="shipper_name"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Address:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="shipper_address"
                v-model="shipper_address"
                style="width: 100%; margin-left: -8%; font-size: 18px"
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
                name="shipper_phone"
                v-model="shipper_phone"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Mail:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="shipper_email"
                v-model="shipper_email"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <!-- VAT Number es lo que en el contexto chileno se entiende como RUT Empresa -->
              <p style="font-size: 18px; margin-top: 2%">VAT Number:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="shipper_rut"
                v-model="shipper_rut"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <h3>Consignee</h3>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Name:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="consignee_name"
                v-model="consignee_name"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Address:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="consignee_address"
                v-model="consignee_address"
                style="width: 100%; margin-left: -8%; font-size: 18px"
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
                name="consignee_phone"
                v-model="consignee_phone"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Mail:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="consignee_email"
                v-model="consignee_email"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <!-- VAT Number es lo que en el contexto chileno se entiende como RUT Empresa -->
              <p style="font-size: 18px; margin-top: 2%">VAT Number:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="consignee_rut"
                v-model="consignee_rut"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h3>Notify Address:</h3>
            </div>
            <div class="col-8">
              <input
                type="text"
                name="notify_address"
                v-model="notify_address"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h4>Place of Receipt:</h4>
            </div>
            <div class="col-3">
              <input
                type="text"
                name="place_receipt"
                v-model="place_receipt"
                style="width: 100%; margin-left: -23%; font-size: 18px"
              />
            </div>
            <div class="col-3">
              <h4>Port of Loading:</h4>
            </div>
            <div class="col-3">
              <input
                type="text"
                name="port_loading"
                v-model="port_loading"
                style="width: 100%; margin-left: -28%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h4>Ocean Vessel:</h4>
            </div>
            <div class="col-3">
              <input
                type="text"
                name="ocean_vessel"
                v-model="ocean_vessel"
                style="width: 100%; margin-left: -23%; font-size: 18px"
              />
            </div>
            <div class="col-3">
              <h4>Port of Discharge:</h4>
            </div>
            <div class="col-3">
              <input
                type="text"
                name="port_discharge"
                v-model="port_discharge"
                style="width: 100%; margin-left: -28%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h4>Place of Delivery:</h4>
            </div>
            <div class="col-3">
              <input
                type="text"
                name="place_delivery"
                v-model="place_delivery"
                style="width: 100%; margin-left: -23%; font-size: 18px"
              />
            </div>
            <div class="col-3">
              <h4>Type of Service:</h4>
            </div>
            <div class="col-3" style="margin-left: -6.5%; font-size: 18px">
              <select name="type_of_service" v-model="type_of_service">
                <option value="LCL/LCL">LCL/LCL</option>
                <option value="LCL/FCL">LCL/FCL</option>
                <option value="FCL/LCL">FCL/LCL</option>
                <option value="FCL/FCL">FCL/FCL</option>
              </select>
            </div>
          </div>
          <div class="row m-3">
            <div class="col-3">
              <h3>Marks and Numbers</h3>
            </div>
          </div>
          <div class="row m-3">
            <div class="col-1 text-center">
              <h4>N:</h4>
            </div>
            <div class="col-5">
              <input
                type="text"
                name="marks_and_numbers_n"
                v-model="marks_and_numbers.n"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-1 text-center">
              <h4>M:</h4>
            </div>
            <div class="col-5">
              <input
                type="text"
                name="marks_and_numbers_m"
                v-model="marks_and_numbers.m"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <h3>No. and Kind of Packages</h3>
          </div>
          <div class="row m-3">
            <div class="col-2 text-center">
              <h5>Total of Packages:</h5>
            </div>
            <div class="col-2">
              <!-- Este input va en packages->quantity -->
              <input
                type="text"
                name="packages_quantity"
                v-model="packages.quantity"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-2 text-center">
              <h5>Gross Weight (KG):</h5>
            </div>
            <div class="col-2">
              <input
                type="number"
                name="gross_weight"
                v-model="gross_weight"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-2 text-center">
              <h5>Measurement(CBM):</h5>
            </div>
            <div class="col-2">
              <input
                type="number"
                name="measurement"
                v-model="measurement"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <h3>Description of Goods</h3>
            <!-- A su lado va un pop-up con el formato de redacción recomendado -->
          </div>
          <div class="row m-3">
            <!-- Este textarea va en packages->description -->
            <textarea
              name="description_of_goods"
              v-model="packages.description"
              style="width: 90%; font-size: 18px; margin-left: 2%"
              rows="10"
            ></textarea>
          </div>
          <div class="row m-3">
            <div class="col-4">
              <h3>Freight Details, Charges, etc:</h3>
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <h5>Freight Details:</h5>
            </div>
            <div class="col-4">
              <input
                type="text"
                name="freight_details"
                v-model="freight_details"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-1 text-center">
              <h5>Prepaid:</h5>
            </div>
            <div class="col-2">
              <input
                type="text"
                name="prepaid"
                v-model="prepaid"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-1 text-center">
              <h5>Collect:</h5>
            </div>
            <div class="col-2">
              <input
                type="text"
                name="collect"
                v-model="collect"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <h5>Freight Payable at:</h5>
            </div>
            <div class="col-2">
              <input
                type="text"
                name="freight_payable"
                v-model="freight_payable"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-2 text-center">
              <h5>Place and Date of issue:</h5>
            </div>
            <div class="col-2">
              <input
                type="date"
                name="place_and_date_of_issue"
                v-model="place_and_date_of_issue"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
            <div class="col-2 text-center">
              <h5>Number of Original BL's:</h5>
            </div>
            <div class="col-2">
              <input
                type="number"
                name="number_of_original_BL"
                v-model="number_of_original_BL"
                style="width: 86.5%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <h3>For Delivery of Goods Please Apply To:</h3>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Name:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_name"
                v-model="for_delivery.company_name"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Address:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_address"
                v-model="for_delivery.company_address"
                style="width: 100%; margin-left: -8%; font-size: 18px"
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
                v-model="for_delivery.company_phone"
                style="width: 100%; margin-left: -8%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">Mail:</p>
            </div>
            <div class="col-10">
              <input
                type="text"
                name="company_email"
                v-model="for_delivery.company_email"
                style="width: 100%; margin-left: -8%; font-size: 18px"
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
  name: 'VistaCrearOperacion',
  data() {
    return {
      cadena: 'ACCV',
      operation_id: null,
      shipper_name: '',
      shipper_rut: '',
      shipper_email: '',
      shipper_phone: '',
      shipper_address: '',
      consignee_name: '',
      consignee_rut: '',
      consignee_email: '',
      consignee_phone: '',
      consignee_address: '',
      notify_address: '',
      country_origin: '',
      bill_of_lading: '',
      type_of_service: '',
      ocean_vessel: '',
      freight_details: '',
      prepaid: '',
      collect: '',
      freight_payable: '',
      place_and_date_of_issue: null,
      number_of_original_BL: null,
      port_loading: '',
      port_discharge: '',
      place_receipt: '',
      place_delivery: '',
      gross_weight: null,
      measurement: null,
      marks_and_numbers: {
        m: '',
        n: ''
      },
      packages: {
        quantity: null,
        description: ''
      },
      for_delivery: {
        company_name: '',
        company_address: '',
        company_phone: '',
        company_email: ''
      },
      op_type: {
        type_shipment: ''
      }
    }
  },
  methods: {
    //Descripción: Toma los datos registrados en el formulario y guarda la operación en la base de datos
    //Dependiendo de si es una importación o exportación, el JSON enviado toma un formato difernete para su
    //registro tanto en la tabla BL como el la tabla RegistrosImportación o RegistrosExportación según caso
    async enviarOperacion(e) {
      if (this.op_type.type_shipment == 'importacion') {
        await this.axios.get('http://localhost:8080/opid').then((response) => {
          this.operation_id = response.data
        })
        await this.axios.post('http://localhost:8080/bl', {
          operation_id: this.operation_id,
          shipper_name: this.shipper_name,
          shipper_rut: this.shipper_rut,
          shipper_email: this.shipper_email,
          shipper_phone: this.shipper_phone,
          shipper_address: this.shipper_address,
          consignee_name: this.consignee_name,
          consignee_rut: this.consignee_rut,
          consignee_email: this.consignee_email,
          consignee_phone: this.consignee_phone,
          consignee_address: this.consignee_address,
          notify_address: this.notify_address,
          country_origin: this.country_origin,
          bill_of_lading: this.bill_of_lading,
          type_of_service: this.type_of_service,
          ocean_vessel: this.ocean_vessel,
          freight_details: this.freight_details,
          prepaid: this.prepaid,
          collect: this.collect,
          freight_payable: this.freight_payable,
          place_and_date_of_issue: this.place_and_date_of_issue,
          number_of_original_BL: this.number_of_original_BL,
          port_loading: this.port_loading,
          port_discharge: this.port_discharge,
          place_receipt: this.place_receipt,
          place_delivery: this.place_delivery,
          gross_weight: this.gross_weight,
          measurement: this.measurement,
          marks_and_numbers: {
            m: this.marks_and_numbers.m,
            n: this.marks_and_numbers.n
          },
          packages: {
            quantity: this.packages.quantity,
            description: this.packages.description
          },
          for_delivery: {
            company_name: this.for_delivery.company_name,
            company_address: this.for_delivery.company_address,
            company_phone: this.for_delivery.company_phone,
            company_email: this.for_delivery.company_email
          },
          registroImportacion: {
            type_shipment: 'M', //Símbolo que usan para reconocer la importación
            operation_id: this.operation_id,
            company_name: this.consignee_name, //Al ser importación, la empresa asesora al Consignee
            current_status: 'En curso - Flete por pagar', //Estado inicial de una importación
            description: '', //Descripción de la importación. Comentario adicional que se puede hacer, distinto de packages->description
            etd: null,
            eta: null,
            shipping_letter: '',
            canje: 0,
            't/t': null,
            ocean_vessel: this.ocean_vessel,
            bl_son: this.bill_of_lading, //Como es una importación, el codigo de BL de la empresa exportadora es la que va ahí
            master_bl: '', //BL de naviera
            container: this.marks_and_numbers.n,
            free_days: null,
            carrier: '',
            clause: '',
            port_loading: this.port_loading,
            port_discharge: this.port_discharge,
            return_vacancies: null,
            archived: 0
          }
        })
        e.preventDefault()
        //Después de crear la operación, se redirige a la vista general de operaciones
        window.location.href = '/operaciones'
      } else if (this.op_type.type_shipment == 'exportacion') {
        await this.axios.get('http://localhost:8080/opid').then((response) => {
          this.operation_id = response.data
        })
        //Si no es importación, quiere decir que es exportación
        await this.axios.post('http://localhost:8080/bl', {
          operation_id: this.operation_id,
          shipper_name: this.shipper_name,
          shipper_rut: this.shipper_rut,
          shipper_email: this.shipper_email,
          shipper_phone: this.shipper_phone,
          shipper_address: this.shipper_address,
          consignee_name: this.consignee_name,
          consignee_rut: this.consignee_rut,
          consignee_email: this.consignee_email,
          consignee_phone: this.consignee_phone,
          consignee_address: this.consignee_address,
          notify_address: this.notify_address,
          country_origin: this.country_origin,
          bill_of_lading: this.cadena + this.operation_id,
          type_of_service: this.type_of_service,
          ocean_vessel: this.ocean_vessel,
          freight_details: this.freight_details,
          prepaid: this.prepaid,
          collect: this.collect,
          freight_payable: this.freight_payable,
          place_and_date_of_issue: this.place_and_date_of_issue,
          number_of_original_BL: this.number_of_original_BL,
          port_loading: this.port_loading,
          port_discharge: this.port_discharge,
          place_receipt: this.place_receipt,
          place_delivery: this.place_delivery,
          gross_weight: this.gross_weight,
          measurement: this.measurement,
          marks_and_numbers: {
            m: this.marks_and_numbers.m,
            n: this.marks_and_numbers.n
          },
          packages: {
            quantity: this.packages.quantity,
            description: this.packages.description
          },
          for_delivery: {
            company_name: this.for_delivery.company_name,
            company_address: this.for_delivery.company_address,
            company_phone: this.for_delivery.company_phone,
            company_email: this.for_delivery.company_email
          },
          registroExportacion: {
            type_shipment: 'X', //Símbolo que usan para reconocer la exportación
            operation_id: this.operation_id,
            company_name: this.shipper_name, //Al ser exportación, la empresa asesora al Shipper
            current_status: 'En curso - Sidemar', //Estado inicial de una exportación
            sidemar: 0, //Valores booleanos que cambian con la actualización de estado
            freight_payable: 0,
            freight_paid: 0,
            liberated: 0,
            description: '', //Descripción de la importación. Comentario adicional que se puede hacer, distinto de packages->description
            eta: null,
            etd: null,
            bl_son: this.cadena + this.operation_id, //Al ser exportación, el BL Hijo es el BL que emite la empresa
            master_BL: '',
            ocean_vessel: '',
            't/t': null,
            container: this.marks_and_numbers.n,
            clause: '', //Nomenclatura propia de la empresa para las cláusulas
            port_loading: this.port_loading,
            port_discharge: this.port_discharge,
            return_vacancies: '',
            gross_weight: this.gross_weight,
            measurement: this.measurement,
            carrier: '',
            archived: 0
          }
        })
        e.preventDefault()
        //Después de crear la operación, se redirige a la vista general de operaciones
        window.location.href = '/operaciones'
      } else {
        alert('No ha seleccionado el tipo de operación')
      }
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
