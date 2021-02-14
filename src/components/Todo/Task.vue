<template>
  <v-container>
    <!-- todo textbox -->
    <v-card>
      <v-card-text>
        <v-row align="center">
          <v-checkbox
            v-model="includeFiles"
            hide-details
            class="shrink mr-2 mt-0"
          ></v-checkbox>
          <v-text-field label="Include files"></v-text-field>
        </v-row>
        <v-row align="center">
          <v-checkbox
            v-model="enabled"
            hide-details
            class="shrink mr-2 mt-0"
          ></v-checkbox>
          <v-text-field
            :disabled="!enabled"
            label="I only work if you check the box"
          ></v-text-field>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- add -->
    <!-- complete/done -->
    <!-- todo progress bar -->
    <!-- subtasks -->
    <!-- complete/done -->
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

const database = firebase.database();

export default {
  data() {
    return {
      editing: null,
      includeFiles: true,
      enabled: false,
      todos: {},
      todoRef: null
    };
  },
//   props: ["todos"],
  methods: {
    // update() {},
    // create() {},
    createTodo() {
      this.todoRef.push({ text: this.todoText.trim(), isDone: false });
      this.todoText = "";
    },
    clearCompleted() {
      this.$store.dispatch("todos/clearCompleted");
    },
    destroyTodo(task) {
      this.$store.dispatch("todos/destroyTodo", task);
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
    }
  },
  created() {
    this.todoRef = database.ref(`/users/${this.$store.state.auth.user.uid}`);
  },
  mounted() {
    this.todoRef.on("value", snapshot => {
      this.todos = snapshot.val();
      console.log(this.todos)
    });
  },
};
</script>
