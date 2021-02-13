<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="2">
          <v-img src="../assets/logo.png"></v-img>
        </v-col>
        <v-col cols="2">
          <v-img src="../assets/firebase-logo.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <!-- Some text -->
      <div class="text-h1 && text-center">Vuebase to-do</div>
      <div class="text-h6 && text-center">
        This web application helps you track your stuffs.
      </div>
    </v-container>
    <v-container>
      <!-- buttons -->
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="2">
          <v-btn x-large color="secondary" to="/login">
            Sign in
          </v-btn>
        </v-col>
        <v-col align="center" justify="center" cols="2">
          <v-btn x-large color="primary" to="/register">
            Sign up
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
