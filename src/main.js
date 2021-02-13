import "@/plugins/firebase";
import "@/plugins/vuetify";
import firebase from "firebase/app";
import "firebase/auth";
import store from "@/store";
import router from "@/router";
import Vue from "vue";
import App from "./App.vue";
// import "@/assets/todo.css";
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false;

let isInitialized = false;
console.log(isInitialized)

/**
 * Magic code - It is a trick to recognize user that already signed in.
 */
new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Vue.$store.dispatch("auth/setAuthenticated", user);
    } else {
      Vue.$store.dispatch("auth/setAuthenticated", null);
    }
  });
  if(!isInitialized){
    resolve();
  }
}).then(() => {
  isInitialized = true;

  new Vue({
    render: (createApp) => createApp(App),
    store,
    vuetify,
    router
  }).$mount("#app");
});
