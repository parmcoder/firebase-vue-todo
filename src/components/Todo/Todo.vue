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
                    <v-text-field name="task" label="What needs to be done?" id="task" v-model="task" type="text" required></v-text-field>
                  </validation-provider>
                  <v-layout>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="invalid" color="primary" x-large type="submit"> Add to todo-list</v-btn>
                  </v-layout>
                </form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex md10>
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="3">
                <v-card-text>
                  <h2>Active tasks: {{ activeCount }}</h2>
                  <h2>Completed tasks: {{ completedCount }}</h2>
                </v-card-text>
              </v-col>
              <v-col>
                <v-container>
                  <v-layout align-center justify-center>
                    <v-btn color="green"> Show completed tasks</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="purple"> Hide completed tasks</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red"> Remove completed tasks</v-btn>
                  </v-layout>
                </v-container>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-data-iterator :items="todos" item-key="name">
        <template v-slot:default="{ items }">
          <v-row>
            <v-col v-for="item in items" :key="item.key" cols="20" sm="10" md="10" lg="6">
              <v-card>
                <v-card-title>
                  <v-checkbox :input-value="item.isDone" v-on:change="changeStatusTask(item.id, item.isDone, item.subtasks, 'isDone')"></v-checkbox>
                  <h4>{{ item.text }}</h4>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-row
                  ><v-col>
                    <v-card-text>
                      <h2>Progress bar</h2>
                    </v-card-text>
                  </v-col>
                  <v-col cols="3">
                    <v-btn v-if="!item.isDone && !item.isAdding" small color="blue" @click="changeStatus(item.id, item.isAdding, 'isAdding')"
                      >ADD</v-btn
                    ><v-btn v-if="!item.isDone && item.isAdding" color="blue" small @click="changeStatus(item.id, item.isAdding, 'isAdding')"
                      >done</v-btn
                    >
                    <v-btn v-if="item.isDone" small color="red" @click="destroyTodo(item.id)">remove</v-btn></v-col
                  >
                </v-row>
                <v-divider></v-divider>
                <v-card-text v-if="item.isAdding && !item.isDone">
                  <validation-observer ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="createSubTodo(item.id)">
                      <validation-provider :name="item.id" rules="required">
                        <v-text-field
                          :name="item.id"
                          label="What needs to be done?"
                          :id="item.id"
                          v-model="subtask[item.id]"
                          type="text"
                          required
                        ></v-text-field>
                      </validation-provider>
                      <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="invalid" color="primary" type="submit"> Add subtask</v-btn>
                      </v-layout>
                    </form>
                  </validation-observer>
                </v-card-text>
              </v-card>
              <v-divider></v-divider>
              <v-card>
                <v-card-title>
                  <v-spacer></v-spacer>
                  Subtasks
                  <v-spacer></v-spacer>
                </v-card-title>
              </v-card>
              <v-list v-for="subtask in item.subtasks" :key="subtask.id" dense>
                <v-list-item>
                  <v-checkbox
                    :input-value="subtask.isDone"
                    v-on:change="changeStatus(item.id + '/subtasks/' + subtask.id, subtask.isDone, 'isDone')"
                  ></v-checkbox>
                  <v-list-item-content class="align-end">
                    {{ subtask.text }}
                  </v-list-item-content>
                  <v-btn small color="red" @click="destroySubTodo(item.id, subtask.id, item.subtasks)">remove</v-btn>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import { required } from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
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
    task: '',
    subtask: {},
    adds: {},
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  //   props: ["todos"],
  methods: {
    // update() {},
    // create() {},
    createTodo() {
      this.todoRef.push({
        text: this.task.trim(),
        isDone: false,
        isAdding: false,
        subtasks: 'none',
      });
      database.ref(`/users/${this.$store.state.auth.user.uid}/subtasks`).push({});
      this.task = '';
    },
    createSubTodo(id2) {
      console.log(this.subtask[id2]);
      database.ref(`/users/${this.$store.state.auth.user.uid}/${id2}/subtasks`).push({
        text: this.subtask[id2].trim(),
        isDone: false,
      });
      this.subtask[id2] = '';
    },
    changeStatus(id2, status, value) {
      // console.log(`users/${this.$store.state.auth.user.uid}/${id2}/${value}`);
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${id2}/${value}`)
        .set(!status);
    },
    changeStatusTask(id2, status, item, value) {
      if (item.length > 0 && !status) {
        item.forEach((x) => firebase
          .database()
          .ref(`users/${this.$store.state.auth.user.uid}/${id2}/subtasks/${x.id}/${value}`)
          .set(!status));
      }
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${id2}/${value}`)
        .set(!status);
    },
    clearCompleted() {
      this.$store.dispatch('todos/clearCompleted');
    },
    destroyTodo(task) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${task}`)
        .set({});
    },
    destroySubTodo(task, subtask, subtasks) {
      // console.log(task);
      // console.log(subtasks.length);
      if (subtasks.length === 1) {
        firebase
          .database()
          .ref(`users/${this.$store.state.auth.user.uid}/${task}/subtasks`)
          .set('none');
      } else {
        firebase
          .database()
          .ref(`users/${this.$store.state.auth.user.uid}/${task}/subtasks/${subtask}`)
          .set({});
      }
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
  created() {
    this.todoRef = database.ref(`/users/${this.$store.state.auth.user.uid}`);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      const fb = snapshot.val();
      // turn object to array
      const array = [];
      if (fb) {
        Object.keys(fb).forEach((key) => {
          const array2 = [];
          // console.log(fb[key]["subtasks"]);
          if (fb[key].subtasks !== 'none' && fb[key].subtasks !== 'undefined') {
            Object.keys(fb[key].subtasks).forEach((key2) => {
              const obj = fb[key].subtasks[key2];
              obj.id = key2;
              array2.push(obj);
            });
            // console.log(array2);
          }
          const obj = fb[key];
          obj.id = key;
          obj.subtasks = array2;

          if (array2.length > 0) {
            console.log('yo!');
            const done = array2.filter((x) => x.isDone).length;
            console.log(done);
            if (done === array2.length) {
              console.log(array2);
              console.log(key);
              obj.isDone = true;
              // this.changeStatusTask(key, false, array2, 'isDone');
              firebase
                .database()
                .ref(`users/${this.$store.state.auth.user.uid}/${key}/isDone`)
                .set(true);
            } else {
              firebase
                .database()
                .ref(`users/${this.$store.state.auth.user.uid}/${key}/isDone`)
                .set(false);
              obj.isDone = false;
            }
          }
          // console.log(obj);
          this.adds[key] = false;
          array.push(obj);
        });
      }

      this.todos = array;
      // console.log(array);
    });
  },
  computed: {
    activeCount() {
      return this.todos.filter((todo) => !todo.isDone).length;
    },
    completedCount() {
      return this.todos.filter((todo) => todo.isDone).length;
    },
  },
};
</script>
