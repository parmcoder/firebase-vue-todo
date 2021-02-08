<template>
  <footer class="footer">
        <span class="todo-count">
          <strong>{{ $store.getters['todos/activeTodos'].length }}</strong>
          item(s) left
        </span>
    <button
        class="clear-completed"
        @click="$store.dispatch('todos/clearCompleted')"
        v-show="$store.getters['todos/completedTodos'].length"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
export default {
};
</script>
