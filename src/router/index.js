import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from "firebase/app";
import "firebase/auth";
const Todos = () => import('@/components/Todo.vue');
const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/todos',
    name: 'todos',
    component: Todos,
    meta: {
      requiresAuth: true,
      isLoggedIn: true

    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
      isLoggedIn: false
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false,
      isLoggedIn: false

    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoggedIn = to.matched.some(record => record.meta.isLoggedIn);
  
  if (requiresAuth && !await firebase.getCurrentUser()){
    next('login');
  }else if (!isLoggedIn && await firebase.getCurrentUser()){
    next('todos');
  }
  next()
});

Vue.$router = router;

export default router;