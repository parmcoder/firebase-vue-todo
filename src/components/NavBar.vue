<template>
  <!-- display the navigation bar -->
  <v-toolbar>
    <v-toolbar-items>
      <v-layout align-center> <v-toolbar-title>VUEBASE TODO</v-toolbar-title> </v-layout>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <!-- navigation bar links -->
    <v-toolbar-items class="hidden-xs-only" v-if="!user">
      <v-btn text v-for="item in items" :key="item.title" :to="item.link">
        {{ item.title }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>

    <!-- sign out button -->
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn text @click="logoutFromFirebase">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  computed: {
    items() {
      const menuItems = [
        {
          title: 'Register',
          link: '/register',
        },
        {
          title: 'Login',
          link: '/login',
        },
      ];
      return menuItems;
    },

    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    logoutFromFirebase() {
      this.$store.dispatch('auth/signOut');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
