<template>
  <div>
    <div v-if="!this.$store.state.store.user">
      <div id="firebaseui-auth-container"></div>
    </div>
    <div v-else>
      You are logged in as {{ this.$store.state.store.user.displayName }}
      <q-btn color="primary" label="Sign Out" @click="signOut" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
// import firebaseui from 'firebaseui'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loggedUser: this.$store.state.store.user
    };
  },

  mounted() {
  
  

    const firebaseui = require("firebaseui");
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fireAuth);
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          console.log("signInSuccessWithAuthResult");
          // console.log(authResult);
        },
        uiShown: function() {
          console.log("uiShown");
        }
      }
      // Other config options...
    });
  },
  methods: {
    signOut() {
      console.log("signOut");
      this.$fireAuth.signOut();
    }
  }
};
</script>
