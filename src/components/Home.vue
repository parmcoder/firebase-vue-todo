<template>
  <div>
    <v-container>
      <v-layout align-center justify-center>
        <v-img
          max-height="300"
          max-width="300"
          src="../assets/logo.png"
        ></v-img>
        <v-img
          max-height="300"
          max-width="300"
          src="../assets/firebase-logo.png"
        ></v-img>
      </v-layout>
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
      <v-layout align-center justify-center>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-btn x-large color="secondary" to="/login">
          Sign in
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="primary" to="/register">
          Sign up
        </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-layout>
    </v-container>
  </div>
</template>
