<template>
  <div>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex md10>
          <v-card class="elevation-12">
            <v-card-text>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="createTodo">
                  <validation-provider name="task" rules="required">
                    <v-text-field
                      name="task"
                      label="What needs to be done?"
                      id="task"
                      v-model="task"
                      type="text"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="invalid"
                      color="primary"
                      x-large
                      type="submit"
                    >
                      Add to todo-list</v-btn
                    >
                  </v-layout>
                </form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-data-iterator :items="todos" item-key="name">
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
                  <v-checkbox v-model="checkbox" :value="item.id"></v-checkbox>
                  <h4>{{ item.text }}</h4>
                  <v-spacer></v-spacer>
                  <v-btn small color="blue">add</v-btn>
                  <v-btn small color="green">done</v-btn>
                  <v-btn small color="red">remove</v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card v-if=true class="elevation-12">
                  <v-card-text>
                    <validation-observer ref="observer" v-slot="{ invalid }">
                      <form @submit.prevent="createTodo">
                        <validation-provider :name="item.id" rules="required">
                          <v-text-field
                            :name="item.id"
                            label="What needs to be done?"
                            :id="item.id"
                            :v-model="item.id"
                            type="text"
                            required
                          ></v-text-field>
                        </validation-provider>
                        <v-layout>
                          <v-spacer></v-spacer>
                          <v-btn
                            :disabled="invalid"
                            color="primary"
                            x-large
                            type="submit"
                          >
                            Add to todo-list</v-btn
                          >
                        </v-layout>
                      </form>
                    </validation-observer>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { required } from "vee-validate/dist/rules";
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
const database = firebase.database();

export default {
  data: () => ({
    singleExpand: false,
    editing: null,
    includeFiles: true,
    enabled: false,
    todos: [],
    todoRef: null,
    checkbox: [],
    task: ""
  }),
  components: {
    ValidationProvider,
    ValidationObserver
  },
  //   props: ["todos"],
  methods: {
    // update() {},
    // create() {},
    createTodo() {
      this.todoRef.push({
        text: this.task.trim(),
        isDone: false,
        subtasks: []
      });
      this.task = "";
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
        let obj = fb[key];
        obj["id"] = key;
        array.push(obj);
      });
      this.todos = array;
      console.log(this.checkbox);
    });
  }
};
</script>