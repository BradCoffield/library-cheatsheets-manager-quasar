import Vue from 'vue'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: 'AIzaSyDh_RPQxVpCUAFtGn0zstO9elmUrEMWlls',
      authDomain: 'rmc-library-cheatsheets.firebaseapp.com',
      databaseURL: 'https://rmc-library-cheatsheets.firebaseio.com',
      projectId: 'rmc-library-cheatsheets',
      storageBucket: 'rmc-library-cheatsheets.appspot.com',
      messagingSenderId: '263509113587',
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.firestore()

Vue.prototype.$firestore = firebaseApp.firestore()
Vue.prototype.$fireAuth = firebaseApp.auth()

export {firebaseAuth, firebaseDb}

//import {firebaseAuth, firebaseDb} from 'boot/firebase'
