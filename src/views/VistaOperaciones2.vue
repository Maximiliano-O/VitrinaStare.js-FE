<template>
  <div class="container-fluid">
    <!-- PRIMERA FILA: TÍTULO VISTA Y BOTONES SUPERIORES -->
    <div class="row">
      <div class="col-8">
        <h1>Vista general de operaciones</h1>
      </div>
      <div class="col-2">
        <a
          type="button"
          class="btn btn-primary text-white"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >Ver OP archivadas
        </a>
      </div>
      <div class="col-2">
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/operaciones/crearOperacion"
          style="
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
          Crear operación
        </a>
      </div>
    </div>
    <!-- Este segundo contenedor es el que tiene habilitado para que su contenido vertical sea scrolleable-->
    <div class="overflow-auto" style="max-height: 100vh; padding-bottom: 8%">
      <div class="container-fluid">
        <!-- SEGUNDA FILA: REVISAR OPERACIÓN POR CÓDIGO -->
        <div class="row">
          <h3>Revisar operación por código</h3>
        </div>
        <!-- TERCERA FILA: CAMPO DE BÚSQUEDA DE OPERACIÓN Y BOTÓN BUSCAR -->
        <div class="row">
          <form>
            <input
              type="number"
              id="op_id_busqueda"
              name="op_id_busqueda"
              placeholder="código de operación"
            />
            <button
              class="btn btn-primary text-white"
              href="#"
              style="
                margin-left: 2%;
                margin-bottom: 0.4%;
                font-weight: bold;
                --bs-btn-padding-y: 0.3rem;
                --bs-btn-padding-x: 0.8rem;
                --bs-btn-font-size: 1.15rem;
              "
            >
              Buscar
            </button>
          </form>
        </div>
        <!-- CUARTA FILA: SUBTÍTULO IMPORTACIONES Y BOTÓN DE EXPORTACIÓN -->
        <div class="row" style="margin-bottom: 1.5%">
          <div class="col-9">
            <h3>Operaciones de importación</h3>
          </div>
          <div class="col-3">
            <button
              class="btn btn-primary text-white"
              href="#"
              style="margin-left: 2%; margin-bottom: 0.4%; font-weight: bold"
            >
              Exportar tabla de importaciones
            </button>
          </div>
        </div>
        <!-- QUINTA FILA: TABLA DE IMPORTACIONES -->
        <div class="table-responsive" style="margin-bottom: 1.5%">
          <table class="table">
            <thead>
              <tr class="table-primary text-white">
                <th scope="col">Operation ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Current Status</th>
                <th scope="col">Description</th>
                <th scope="col">ETD</th>
                <th scope="col">ETA</th>
                <th scope="col">T/T</th>
                <th scope="col">Shipping letter</th>
                <th scope="col">Sidemar</th>
                <th scope="col">Canje</th>
                <th scope="col">Ocean Vessel</th>
                <th scope="col">BL Son</th>
                <th scope="col">BL Master</th>
                <th scope="col">Container</th>
                <th scope="col">Free days</th>
                <th scope="col">Clause</th>
                <th scope="col">Port loading</th>
                <th scope="col">Port discharge</th>
                <th scope="col">Return Vacancies</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in datos_importaciones" v-bind:key="item.id">
                <td>{{ item.operation_id }}</td>
                <td>{{ item.company_name }}</td>
                <td>{{ item.current_status }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.etd }}</td>
                <td>{{ item.eta }}</td>
                <td>{{ item.t_t }}</td>
                <td>{{ item.shipping_letter }}</td>
                <td>{{ item.sidemar }}</td>
                <td>{{ item.canje }}</td>
                <td>{{ item.ocean_vessel }}</td>
                <td>{{ item.bl_son }}</td>
                <td>{{ item.master_bl }}</td>
                <td>{{ item.container }}</td>
                <td>{{ item.free_days }}</td>
                <td>{{ item.clause }}</td>
                <td>{{ item.port_loading }}</td>
                <td>{{ item.port_discharge }}</td>
                <td>{{ item.return_vacancies }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- SEXTA FILA: SUBTÍTULO EXPORTACIONES Y BOTÓN DE EXPORTACIÓN -->
        <div class="row" style="margin-bottom: 1.5%">
          <div class="col-9">
            <h3>Operaciones de exportación</h3>
          </div>
          <div class="col-3">
            <button
              class="btn btn-primary text-white"
              href="#"
              style="margin-left: 2%; margin-bottom: 0.4%; font-weight: bold"
            >
              Exportar tabla de exportaciones
            </button>
          </div>
        </div>
        <!-- SEPTIMA FILA: TABLA DE EXPORTACIONES -->
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr class="table-primary text-white">
                <th scope="col">Operation ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Current Status</th>
                <th scope="col">Description</th>
                <th scope="col">Sidemar</th>
                <th scope="col">Freight Payable</th>
                <th scope="col">Freight Paid</th>
                <th scope="col">Liberated</th>
                <th scope="col">ETD</th>
                <th scope="col">ETA</th>
                <th scope="col">T/T</th>
                <th scope="col">BL son</th>
                <th scope="col">BL master</th>
                <th scope="col">Ocean Vessel</th>
                <th scope="col">Container</th>
                <th scope="col">Clause</th>
                <th scope="col">Port loading</th>
                <th scope="col">Port discharge</th>
                <th scope="col">Return Vacancies</th>
                <th scope="col">Gross weight</th>
                <th scope="col">Measurement</th>
                <th scope="col">Carrier</th>
              </tr>
            </thead>
            <tbody v-for="item in datos_exportaciones" v-bind:key="item.id">
              <td>{{ item.operation_id }}</td>
              <td>{{ item.company_name }}</td>
              <td>{{ item.current_status }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.etd }}</td>
              <td>{{ item.eta }}</td>
              <td>{{ item.t_t }}</td>
              <td>{{ item.sidemar }}</td>
              <td>{{ item.freight_payable }}</td>
              <td>{{ item.freight_paid }}</td>
              <td>{{ item.liberated }}</td>
              <td>{{ item.bl_son }}</td>
              <td>{{ item.master_bl }}</td>
              <td>{{ item.ocean_vessel }}</td>
              <td>{{ item.container }}</td>
              <td>{{ item.clause }}</td>
              <td>{{ item.port_loading }}</td>
              <td>{{ item.port_discharge }}</td>
              <td>{{ item.return__vacancies }}</td>
              <td>{{ item.gross_weight }}</td>
              <td>{{ item.measurement }}</td>
              <td>{{ item.carrier }}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VistaOperaciones',
  data() {
    return {
      datos_importaciones: [],
      datos_exportaciones: []
    }
  },
  async mounted() {
    try {
      const response_imp = await this.axios.get('http://localhost:8080/regimp')
      this.datos_importaciones = response_imp.data
      const response_exp = await this.axios.get('http://localhost:8080/regexp')
      this.datos_exportaciones = response_exp.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>
/* Color de fondo de la vista */
body {
  --table-width: 100%;
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

/* Ajustes a las tablas para que sean scrolleables */
.table-responsive {
  max-height: 50vh;
  overflow-y: scroll;
  overflow-x: scroll;
}

thead {
  position: sticky;
  top: -1px;
}
</style>
