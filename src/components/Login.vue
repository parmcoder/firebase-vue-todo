<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Log in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="onSignin">
                  <v-layout row>
                    <v-flex xs12>
                      <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                      >
                        <v-text-field
                          name="email"
                          label="E-Mail"
                          id="email"
                          v-model="email"
                          type="email"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </validation-provider>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <validation-provider
                        v-slot="{ errors }"
                        name="password"
                        rules="required"
                      >
                        <v-text-field
                          name="password"
                          label="Password"
                          id="password"
                          v-model="password"
                          :error-messages="errors"
                          type="password"
                          required
                        ></v-text-field>
                      </validation-provider>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="invalid"
                      color="primary"
                      x-large
                      type="submit"
                    >
                      Sign in</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-layout>
                </form>
              </validation-observer>
            </v-container>
            <v-container>
              <div class="text-h5 && text-center">or</div>
            </v-container>
            <v-container>
              <v-layout align-center justify-center>
                <v-btn color="red" x-large @click="onSigninWithGoogle">
                  Sign in with google</v-btn
                >
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
        <v-container>
          <v-layout align-center justify-center>
            <v-btn color="green" x-large to="/register">
              Sign up for an account</v-btn
            >
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("email", {
  ...email,
  message: "Email must be valid"
});

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/todos");
      }
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch("auth/signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onSigninWithGoogle() {
      this.$store.dispatch("auth/signUserInGoogle");
    }
  }
};
</script>
