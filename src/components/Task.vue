<template>
  <div>
    <section class="main" v-if="todos.length">
      <ul class="todo-list">
        <li
          v-for="task in todos"
          v-bind:key="task.id"
          :class="{ completed: task.isDone, editing: task === editing }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="task.isDone" />
            <label @dblclick="startEditing(task)">{{ task.text }}</label>
            <button class="destroy" @click="destroyTodo(task)"></button>
          </div>
          <input
            class="edit"
            @keyup.esc="cancelEditing"
            @keyup.enter="finishEditing"
            @blur="finishEditing"
            :value="task.text"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editing: null,
    };
  },
  methods: {
    destroyTodo(task) {
      this.$store.dispatch('todos/destroyTodo', task);
    },
    startEditing(task) {
      this.editing = task;
    },
    finishEditing(event) {
      if (!this.editing) {
        return;
      }
      const textbox = event.target;
      this.editing.text = textbox.value.trim();
      this.editing = null;
    },
    cancelEditing() {
      this.editing = null;
    },
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos;
    },
  },
};
</script>
