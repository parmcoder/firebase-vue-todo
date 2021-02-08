import store from '@/store';
import router from '@/router';
import Vue from 'vue';
import App from './App.vue';

import '@/assets/todo.css';

Vue.config.productionTip = false;

new Vue({
  render: (createApp) => createApp(App),
  store,
  router,
}).$mount('#app');
