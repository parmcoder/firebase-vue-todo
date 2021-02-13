import firebase from "firebase/app";
import "firebase/auth";

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setAuthenticated(context, user) {
      context.commit("setUser", user);
    },
    signUserUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUserInGoogle({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((user) => {
          const newUser = {
            id: user.uid,
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
        });
    },
  },
  getters: {
    authenticated(state) {
      return state.user != null;
    },
    user(state) {
      return state.user;
    },
  },
};
