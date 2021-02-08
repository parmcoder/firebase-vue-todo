export default {
  state: {
    todos: [
      { text: 'Learn JavaScript ES6+ goodies', isDone: true },
      { text: 'Learn Vue', isDone: false },
      { text: 'Build something awesome', isDone: false },
    ],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
  },
  actions: {
    clearCompleted(context) {
      context.commit('todos/setTodos', context.state.todos.filter((todo) => !todo.isDone));
    },
    destroyTodo(context, todo) {
      const index = context.state.todos.indexOf(todo);
      context.commit('todos/removeTodo', index);
    },
    createTodo(context, todo) {
      context.commit('todos/addTodo', todo);
    },
  },
  getters: {
    activeTodos(state) {
      console.log(state.todos);
      return state.todos.filter((todo) => !todo.isDone);
    },
    completedTodos(state) {
      return state.todos.filter((todo) => todo.isDone);
    },
  },
};
