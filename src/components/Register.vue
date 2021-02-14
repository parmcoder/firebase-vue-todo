<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="onSignup">
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
                        rules="required|min:6|password:@confirm"
                      >
                        <v-text-field
                          name="password"
                          label="Password"
                          id="password"
                          v-model="password"
                          type="password"
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
                        name="confirm"
                        rules="required|min:6|"
                      >
                        <v-text-field
                          name="password2"
                          label="Confirm Password"
                          id="password2"
                          v-model="password2"
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
                      Sign up</v-btn
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
                  Sign up with google</v-btn
                >
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
        <v-container>
          <v-layout align-center justify-center>
            <v-btn color="green" x-large to="/login">
              Already have an account</v-btn
            >
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, min } from "vee-validate/dist/rules";
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
extend('min', {
    ...min,
    message: '{_field_} may not be lesser than {length} characters',
  })
extend("email", {
  ...email,
  message: "Email must be valid"
});
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
export default {
  data() {
    return {
      email: "",
      password: "",
      password2: ""
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
    onSignup() {
      if (this.password === this.password2) {
        this.$store.dispatch("auth/signUserUp", {
          email: this.email,
          password: this.password
        });
      }
    },
    onSigninWithGoogle() {
      this.$store.dispatch("auth/signUserInGoogle");
    }
  }
};
</script>
