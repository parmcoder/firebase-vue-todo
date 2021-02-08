import Vue from 'vue';
import Vuex from 'vuex';

import Todos from './todos';
import Auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: { ...Auth, namespaced: true },
    todos: { ...Todos, namespaced: true },
  },
});

Vue.$store = store;
export default store;
