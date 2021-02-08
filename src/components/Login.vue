<template>
  <div>
  <h2>Login</h2>
    <input
        v-model="username"
        class="text-input"
        type="text"
        placeholder="Enter your username"
        autofocus
    />
    <br>
    <input
        v-model="password"
        class="text-input"
        type="password"
        placeholder="Enter your password"
        autofocus
    />
    <br>
    <p if="errorMessage">{{ errorMessage }}</p>
    <br>
    <button class="login-button" type="submit" @click="doLogin">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'user',
      password: 'pass',
      errorMessage: '',
    };
  },
  methods: {
    async doLogin() {
      await this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
      });
      if (this.$store.state.auth.authenticated) {
        console.log('authenticated and attempting to redirect to todo page');
        await this.$router.push({ name: 'todos' });
      }
    },
  },
};
</script>

<style scoped>
.text-input {
  position: relative;
  margin: 10px;
  width: 100%;
  font-size: 18px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login-button {
  border: 1px solid #888;
  background-color: #2c3e50;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
}

.login-button:hover {
  cursor: pointer;
}
</style>
