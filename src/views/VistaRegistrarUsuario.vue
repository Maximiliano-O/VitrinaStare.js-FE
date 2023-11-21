<template>


<div v-if="isGuest==='true'">
  <div class="container-fluid">
    
    <div class="row">
      <div class="col-7">
        <h1> {{ $t('signUp') }}</h1>
      </div>
      <div class="col-3">
        <a
          type="button"
          class="btn btn-secondary text-white"
          href="/contribuidores"
          style="
            margin-left: 15%;
            font-weight: bold;
            --bs-btn-padding-y: 0.45rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
          >{{ $t('returnUserList') }}
        </a>
      </div>
      <div class="col-2">
        <button
          type="submit"
          class="btn btn-primary text-white"
          v-on:click="register"
          style="
          background-color: #6251b7c3;
            font-weight: bold;
            --bs-btn-padding-y: 0.4rem;
            --bs-btn-padding-x: 0.8rem;
            --bs-btn-font-size: 1.15rem;
          "
        >
        {{ $t('signUp') }}
        </button>
      </div>
    </div>


    
    <div class="overflow-auto" style="max-height: 100vh">
      <div style="padding-bottom: 10%">


   
        <form @submit="enviarCliente" method="post" id="form_crearCliente">
        
          <div class="row m-3">
       
     

          </div>
 
 
          <div class="row m-3">
            <h3>{{ $t('userInfo') }}</h3>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('username') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
                data-testid="username"
                type="text"
                name="user.contrInfo.username"
                v-model="user.username"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>
          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('email') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
              data-testid="email"
              type="email"
                name="user.email"
                v-model="user.email"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('password') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            <div class="col-10">
              <input
              data-testid="password"
               type="password"
                name="user.password"
                v-model="user.password"
                style="width: 100%; margin-left: 0%%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('urlImage') }}:</p>
              <p style="font-size: 15px; color: whitesmoke; margin-top: 2%">.</p>
            </div>
            <div class="col-10">
              <input
              data-testid="imageURL"
                type="text"
                name="user.contrInfo.imageURL"
                v-model="user.imageURL"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>

          <div class="row m-3">
            <div class="col-2">
              <p style="font-size: 18px; margin-top: 2%">{{ $t('urlGitHub') }}:</p>
              <p style="font-size: 15px; color: red; margin-top: 2%">{{ $t('requiredField') }}</p>
            </div>
            
            <div class="col-10">
              <input
               data-testid="profileURL"
                type="text"
                name="user.contrInfo.profileURL"
                v-model="user.urlGithubProfile"
                style="width: 100%; margin-left: 0%; font-size: 18px"
              />
            </div>
          </div>



 

  
        </form>
      </div>
    </div>
  </div>
</div>

<div v-else>
    
    <h2>{{ $t('accessDenied') }}</h2>
  
    <p style="font-size: 18px; margin-top: 2%">{{ $t('accessDeniedMessage') }}</p>
  
   
  
    </div>

</template>

<script>
import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_EXPRESS_URL}/api/usersV2`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  data() {
    return {
      isGuest: localStorage.getItem('guest'),
      user: {
      
        email: '',
        password: '',
        
          username: '',
          imageURL: '',
          
          urlGithubProfile: ''
        //}
      }
    };
  },
  methods: {
    async register() {


      if (
    this.user.email === '' || 
    this.user.password === '' || 
    this.user.username === '' || 
    this.user.urlGithubProfile === '') {
    alert('Some required fields are empty.');
    return;
     } 

    let checkUser = await this.checkGitHubUserExists();
    if(checkUser.exists) {
     

      try {
        const response = await registerUser(this.user);
        console.log('User registered:', response);
        this.$router.push({name: 'contribuidores'})
      
      } catch (error) {
        console.error('Error registering user:', error);
      }


    } else {
      alert('Github Account does not exist.');
      }


    },


    async checkGitHubUserExists() {
        try {
          const encodedUrl = encodeURIComponent(this.user.urlGithubProfile);
          const url = `${import.meta.env.VITE_APP_EXPRESS_URL}/api/checkUserExists/${encodedUrl}`;
          const response = await this.axios.get(url);
          return response.data; 
          
        } catch (err) {
          console.log('Error fetching data:', err);
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
