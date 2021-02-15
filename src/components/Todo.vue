<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <!--router-link :to="{ name: 'login' }">Go To Login Page</router-link-->
    <section class="todoapp">
      <header class="header">
        <h1 id="heading">{{ title }}</h1>
        <input
          v-model="todoText"
          class="new-todo"
          placeholder="What needs to be done?"
          v-on:keyup.enter="createTodo"
          autofocus
        />
      </header>
      <tasks :todos="todos" />
      <todo-footer v-if="todos" />
    </section>
    <footnote />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import TodoFooter from "@/components/TodoFooter.vue";
import Tasks from "./Task.vue";
import Footnote from "./Footnote.vue";

const database = firebase.database();

export default {
  components: {
    Tasks,
    Footnote,
    TodoFooter
  },
  data() {
    return {
      title: "Change this!",
      todoText: "",
      editing: null,
      todos: {},
      todoRef: null
    };
  },
  created() {
    this.todoRef = database.ref(`/users/${this.$store.state.auth.user.uid}`);
  },
  mounted() {
    this.todoRef.on("value", snapshot => {
      this.todos = snapshot.val();
      console.log(this.todos);
    });
  },
  methods: {
    createTodo() {
      this.todoRef.push({ text: this.todoText.trim(), isDone: false });
      this.todoText = "";
    },
    clearCompleted() {
      this.$store.dispatch("todos/clearCompleted");
    }
  }
};
</script>
