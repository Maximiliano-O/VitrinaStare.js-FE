<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <!-- Setup barra de navegación --->
    <nav id="sidebar" v-if="!$route.meta.hideNavbar">
      <div class="sidebar-header">
        <img src="./assets/logo_empresa.png" width="200" height="200" />
      </div>
      <ul class="list-unstyled components">
        <!-- La clase navbar-icon setea los filtros para cambiar el ícono .svg a blanco -->
        <!-- Las propiedades aplicadas en style para la img de abajo son para centrar el ícono -->
        <img
          class="navbar-icon"
          style="display: block; margin-left: auto; margin-right: auto; width: 50%"
          src="./assets/user-avatar.svg"
          width="75"
          height="65"
        />


  
        
        
        <p class="navbar-username">{{ user }}</p>
        <li>
          <RouterLink to="/">
            <p>{{ $t('sidebarRepositories') }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink v-if="isguest==='false'" :to="getUserLink()">
            <p>{{ $t('sidebarUserProfile') }}</p>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/contribuidores">
            <p>{{ $t('sidebarUsers') }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/aboutStare">
            <p> {{ $t('sidebarStare') }}</p>
          </RouterLink>
        </li>

        

        <li>
          
          <!-- El div hace que el contenido de esta sección quede fija en la base de la pantalla -->
          <div style="position: fixed; bottom: 0; width: 215px">
            <img
              class="navbar-icon"
              style="display: block; margin-left: auto; margin-right: auto; width: 50%"
              src="./assets/exit-outline.svg"
              width="30"
              height="25"
            />
            <!-- Hasta que se defina la metodología para cerrar sesión, se regresa a la raiz -->

            <a v-if="isguest==='true'">
            <p
     

      data-bs-toggle="modal"
      data-bs-target="#modal-login"
      
    >
    {{ $t('login') }}
    </p>
  </a>
<!--
{{ 'userdata:' }}
{{  user }}
{{ 'isguest:' }}
{{  isguest }}
      -->
            <a v-if="isguest==='false'">
            <p @click="logOff">{{ $t('logOff') }}</p>
            </a>
          </div>
        </li>
      </ul>
    </nav>
    <!-- En este segmento es donde se localiza el contenido a cargar de las diferenres vistas-->
    <div id="content">
      <RouterView />
    </div>




    <div
        class="modal fade"
        id="modal-login"
        tabindex="-1"
        aria-labelledby="modal-login-label"
        aria-hidden="true"
      >
      >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="col-12 text-center">
                <h1>{{ $t('login') }}</h1>
                ㅤ

                
              </div>



              <div class="row m-3 justify-content-center">
  <div class="col-10 text-center">
    <p style="font-size: 18px; margin-top: 2%"><strong>{{ $t('email') }}:</strong></p>
    <input
    
      type="text"
      name="input_email"
      autocomplete="off"
      v-model="input_email"
      style="width: 100%; margin-left: auto; margin-right: auto; font-size: 18px"
      required
    />
  </div>
</div>

<div class="row m-3 justify-content-center">
  <div class="col-10 text-center">
    <p style="font-size: 18px; margin-top: 2%"><strong>{{ $t('password') }}:</strong></p>
    <input
    type="password"
      name="input_password"
      autocomplete="off"
      v-model="input_password"
      style="width: 100%; margin-left: auto; margin-right: auto; font-size: 18px"
      required
    />
  </div>
  
</div>
ㅤ
<div class="row">
  <div class="col-6 text-center">
    <button
      type="button"
      class="btn btn-secondary text-white"
      data-bs-dismiss="modal"
      style="
        font-weight: bold;
        --bs-btn-padding-y: 0.45rem;
        --bs-btn-padding-x: 0.8rem;
        --bs-btn-font-size: 1.15rem;
      "
    >
      {{ $t('return') }}
    </button>
  </div>
  <div class="col-6 text-end">
    <button
      type="button"
      class="btn btn-primary text-white"
      @click="logIn"
      style="
        background-color: #6251b7c3;
        font-weight: bold;
        --bs-btn-padding-y: 0.45rem;
        --bs-btn-padding-x: 0.8rem;
        --bs-btn-font-size: 1.15rem;
      "
    >
      {{ $t('login') }}
    </button>
  </div>
</div>
ㅤ
<div class="row">
  <div class="col-12 text-center">
    <button
      type="button"
      class="btn btn-primary text-white"
      @click="logInWithGithub"
      :disabled="loginButtonDisabled"
      style="
        background-color: #6251b7c3;
        font-weight: bold;
        --bs-btn-padding-y: 0.45rem;
        --bs-btn-padding-x: 0.8rem;
        --bs-btn-font-size: 1.15rem;
      "
    >
      {{ $t('loginGitHub') }}
    </button>
  </div>
</div>
                 
                
              
            </div>
            <div v-if="showError" class="error-message text-danger" style="font-weight: bold;">
                  {{ message }}
                </div>
          </div>
        </div>
      </div>

    </div>
           

  </div>
</template>

<script>


import axios from 'axios';
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";




export default {
  data() {
    return {
        isguest: localStorage.getItem("guest"),
        user: localStorage.getItem("user"),
        input_email: '',
        input_password: '',
        test_name:'',
        showError: false,
        message:'Las credenciales no coinciden'

      
    };
  },

  


  methods: {
     logOff() {

      
       localStorage.setItem("user", 'Invitado');;
       localStorage.setItem("guest", 'true');
  
       localStorage.removeItem("userID");

       window.location.href = '/';
     },

     logIn() {
  const email = this.input_email; 
  const password = this.input_password; 

  axios.post(`http://localhost:9000/api/login`, { email, password })
    .then(response => {
      console.log(response.data);
      const { loggedIn } = response.data;
      if (loggedIn) {
        // Login successful
        //const { username, userID } = response.data.user; // Assuming the server response includes the user's name and userID
        
        const user = response.data.user

        //const userInfo = { name: user.contrInfo.username };
        //const userid = { name: user._id };

        


        //localStorage.setItem("user", name);
        localStorage.setItem("user", user.username);
        localStorage.setItem("guest", 'false');
        localStorage.setItem("userID", user._id);
        //this.$router.push('/');
        window.location.href = '/';

        
      } else {
        // Login failed
        // Handle the error or show an error message

        this.showError = true
      }
    })
    .catch(error => {
      // Handle the error or show an error message
    });
    },

    logInWithGithub() {
  this.loginButtonDisabled = true;
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Se revisa si el email del la cuenta de github existe entre los usuarios
      fetch(`http://localhost:9000/api/usersV2/email/${user.email}`)
        .then(response => response.json())
        .then(data => {
          if (data === null) {

            console.log('This email does not exist in the database');
            alert('This email does not exist in the database');
          } else {

            localStorage.setItem("user", data.username);
            localStorage.setItem("userID", data._id);
            localStorage.setItem("guest", 'false');
            window.location.href = '/';
   
            console.log('This email exists in the database');
          }
        })
        .catch(error => console.error('Error:', error));


    })
    .catch((error) => {
      // Check if the popup was closed by the user
      if (error.code === 'auth/popup-closed-by-user') {
        // Show a message to the user
        console.log('Sign-in was cancelled. Please try again.');
      }
    })
    .finally(() => {
      // Enable the login button again
      this.loginButtonDisabled = false;
    });
},


      getUserByEmail(email) {
    axios
      .get(`http://localhost:9000/users/email/${email}`)
      .then(response => {
        console.log(response.data);
        // Handle the response data as needed
      })
      .catch(error => {
        console.error(error);
        // Handle the error as needed
      });
  },

    getUserLink() {
      const id=localStorage.getItem('userID')
      return `/contribuidores/${id}`;
    }

   },
};
</script>


<style>
.wrapper {
  display: flex;
  width: 100%;
  max-height: 100vh;
  height: 100%;
  max-height: 100vh;
  align-items: stretch;
  overflow-y: hidden;
  overflow-x: hidden;
}

#sidebar {
  min-width: 215px;
  max-width: 215px;
  max-height: 100vh;
  background: #b6b6b7;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  background: #b6b6b7;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 93%;
}

#sidebar ul.components {
  padding: 10% 0;
}

#sidebar ul li {
  padding: 1.75%;
}

#sidebar ul li p {
  text-align: center;
  background: #b6b6b7;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

#sidebar ul li a:link {
  text-decoration: none;
}

#sidebar ul li a:visited {
  text-decoration: none;
}

#sidebar ul li a:hover {
  text-decoration: none;
}

#sidebar ul li a:active {
  text-decoration: none;
}

#sidebar ul p.navbar-username {
  text-align: center;
  background: #b6b6b7;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 10%;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  min-width: 100vh;
  transition: all 0.3s;
}

.navbar-icon {
  filter: invert(100%) sepia(13%) saturate(0%) hue-rotate(335deg) brightness(109%) contrast(102%);
}
</style>
