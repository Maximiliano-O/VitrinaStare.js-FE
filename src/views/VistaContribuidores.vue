<template>
  <div class="overflow-auto" style="max-height: 96vh">
  <div class="container-fluid">
   
    <div class="row">
      <div class="col-8">
        <h1>{{ $t('userList') }}</h1>
      </div>

      <div class="col-2"  v-if="isguest=='true'" >
        <a
          type="button"
          class="btn btn-primary text-white"
          href="/registrarse"
          style="
          background-color: #6251b7c3;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
        {{ $t('signUp') }}
        </a>
        
      </div>
    </div>


    <div class="overflow-auto" style="max-height: 100vh">
      <div class="container-fluid">
        ㅤ
        
        <div class="row">
          <table class="table">
            <thead>
              <tr class="custom-row" >
                
                <th scope="col">{{ $t('image') }}</th>
                <th scope="col"> {{ $t('username') }}</th>
                <th scope="col"> {{ $t('email') }}</th>
                <th scope="col">Switch</th>
                
                
                 
              </tr>
            </thead>
            <tbody>
          <tr class="custom-row2" v-for="item in users" v-bind:key="item.userID" @click="this.goToDetails(item._id)">
            
            <img
          class="navbar-icon"
          style="display: block; margin-left: auto; margin-right: auto; width: 50%"
          src="../assets/user-avatar.svg"
          width="75"
          height="65"
        />
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>

              <button @click="switchUser(item)">
                Switch to {{ item.username }}
              </button>
            </td>
               <!--
            <td>
              <a
                class="btn btn-primary text-white"
                style="font-weight: bold"
                :href="`/contribuidores/${item._id}`"
              >
              {{ $t('userDetails') }}
              </a>
              
            </td>
-->
          </tr>
        </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios';
export default {
  name: "Users",
  data() {
    return {
      users: [],
      isguest: localStorage.getItem("guest")

    };
  },
  async mounted() {
    try {
      const response_cli = await axios.get('http://localhost:9000/api/usersV2')
      this.users = response_cli.data
    } catch (error) {
      console.log(error)
    }
  },


  methods: {
     switchUser(user) {
      const userInfo = { name: user.username };
      const userid = { name: user._id };
   
      localStorage.setItem("user", userInfo.name);
      localStorage.setItem("userID", user._id);
      localStorage.setItem("guest", 'false');
      //this.$router.push({ path: `/contribuidores/${user._id}` })
      window.location.href = '/contribuidores/';
     },

     goToDetails(userID) {
      this.$router.push({ path: `/contribuidores/${userID}` })
    },
   },

       

};
</script>

<style>
/* Color de fondo de la vista */
body {
  background-color: #ebeef3;
}


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

.item img {
      width: 100%;
      height: auto;
      display: block;
      margin-bottom: 1rem;
    }

    .custom-row {
     background-color: #b199db7f; /* Change this to your preferred color */
     border: 3px solid #313131;
   }
    .custom-row2 {
     background-color: #deceed1a; /* Change this to your preferred color 
    /* border: 1px solid #8e8989;*/
   }


</style>
