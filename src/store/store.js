import { firebaseAuth, firebaseDb } from "boot/firebase";
import { store } from "quasar/wrappers";

export const state = () => ({
  user: false,
  editCheatsheetID: "",
  citation_styles: {
    citationStylesController: [],
    metadata: {useInProduction: false},
    toUse: []
  }
});

export const mutations = {

// AUTH AND USER MANAGEMENT
  SET_USER(state, payload) {
    let authUser = payload;
    state.user = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      picture: authUser.photoURL
    };
  },
 RESET_USER(state) {
    state.user = null;
  },

  //WHAT CHEATSHEET WE WANT TO EDIT. This makes it so we don't lose things to refresh.
  SET_EDIT_CHEATSHEET(state, item) {
    state.editCheatsheetID = item;
  },

// Working with the citation
  ADD_TO_CITATIONS_CONTROLLER(state, item){
    state.citation_styles.citationStylesController.push[item]
  }
};

export const getters = {
  //Getters neccessary when processing state data
};

export const actions = {
  handleAuthStateChanged({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(firebaseAuth.currentUser.displayName);
        console.log(firebaseAuth.currentUser.email);
        console.log(firebaseAuth.currentUser.uid);
        console.log(firebaseAuth.currentUser.photoURL);
        console.log(user.displayName); //i should probably use this that is passed to the function
        commit("SET_USER", user);
      } else {
        console.log("no user now");
        this.$router.push("/login");
        commit("RESET_USER", false);
        // store.dispatch('updateAuthState', {authUser: false})
        // User is signed out.
      }
    });
  },
  updateEditCheatsheet({ commit }, item) {
    commit("SET_EDIT_CHEATSHEET", item);
  },
  updateCitationsController({commit}, item){
    commit("ADD_TO_CITATIONS_CONTROLLER", item)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
