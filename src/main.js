import "@/plugins/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import store from "@/store";
import router from "@/router";
import Vue from "vue";
import App from "./App.vue";

import "@/assets/todo.css";

Vue.config.productionTip = false;

let isInitialized = false;
console.log(isInitialized)

new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Vue.$store.dispatch("auth/setAuthenticated", user);
    } else {
      Vue.$store.dispatch("auth/setAuthenticated", null);
      Vue.$router.push({ name: "login" });
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
    router,
  }).$mount("#app");
});
