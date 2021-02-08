<template>
  <!-- display the navigation bar -->
  <v-toolbar>
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
      let menuItems = [
        {
          title: "Register",
          link: "/register"
        },
        {
          title: "Login",
          link: "/login"
        }
      ];
      return menuItems;
    },

    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    logoutFromFirebase() {
      this.$store.dispatch("auth/signOut");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
