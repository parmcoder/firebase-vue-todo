<template>
  <v-container fluid>
    <v-data-iterator
      :items="todos"
      item-key="name"
      :items-per-page="4"
    >
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.key"
            cols="20"
            sm="10"
            md="10"
            lg="6"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.text }}</h4>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content class="align-end">
                    {{ item.isDone }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

const database = firebase.database();

export default {
  data: () => ({
    singleExpand: false,
    editing: null,
    includeFiles: true,
    enabled: false,
    todos: [],
    todoRef: null
  }),
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
      const array = [];
      const fb = snapshot.val();
      //turn object to array
      Object.keys(fb).forEach(key => {
        array.push(fb[key]);
      });
      this.todos = array;
      console.log(this.todos);
    });
  }
};
</script>
