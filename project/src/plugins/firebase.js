import * as firebase from 'firebase/app'
import 'firebase/auth'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyA6X_mJUYd4nm3NhKzCNqKtkrDWUqah_P8",
  authDomain: "todo-vue-firebase-40724.firebaseapp.com",
  projectId: "todo-vue-firebase-40724",
  storageBucket: "todo-vue-firebase-40724.appspot.com",
  messagingSenderId: "562000671090",
  appId: "1:562000671090:web:73156a7dfa6073a3d26deb",
  measurementId: "G-W5Z2C6PNCB"
};
firebase.initializeApp(firebaseConfig)
firebase.auth().setPersistent(firebase.auth.Auth.Persistence.LOCAL)

// utils
const db = firebase.database()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}