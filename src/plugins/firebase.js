import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Use dot env later
var firebaseConfig = {
  apiKey: "AIzaSyA6X_mJUYd4nm3NhKzCNqKtkrDWUqah_P8",
  authDomain: "todo-vue-firebase-40724.firebaseapp.com",
  projectId: "todo-vue-firebase-40724",
  storageBucket: "todo-vue-firebase-40724.appspot.com",
  messagingSenderId: "562000671090",
  appId: "1:562000671090:web:73156a7dfa6073a3d26deb",
  measurementId: "G-W5Z2C6PNCB"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
