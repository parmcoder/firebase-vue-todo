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
      <tasks/>
      <todo-footer v-if="todos.length"/>
    </section>
    <footnote />
  </div>
</template>

<script>
import TodoFooter from '@/components/TodoFooter.vue';
import Tasks from './Task.vue';
import Footnote from './Footnote.vue';

// const LOCAL_STORAGE_KEY = "todo-app-vue";

export default {
  components: {
    Tasks,
    Footnote,
    TodoFooter,
  },
  data() {
    return {
      title: 'Change this!',
      todoText: '',
      editing: null,
    };
  },
  methods: {
    createTodo() {
      this.$store.dispatch('todos/createTodo', { text: this.todoText.trim(), isDone: false });
      this.todoText = '';
    },
    clearCompleted() {
      this.$store.dispatch('todos/clearCompleted');
    },
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos;
    },
  },
};
</script>
