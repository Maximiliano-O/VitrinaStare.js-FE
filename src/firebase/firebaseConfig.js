//Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAR6eBOZeIYT4ImSOGpX7PWrTvSIcX-xeY",

  authDomain: "starejs-7deb9.firebaseapp.com",

  projectId: "starejs-7deb9",

  storageBucket: "starejs-7deb9.appspot.com",

  messagingSenderId: "157153665399",

  appId: "1:157153665399:web:6dbdabf911f9d9011f0172",

  measurementId: "G-NC2S9W226K"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth

const auth = getAuth();

export { app, auth };