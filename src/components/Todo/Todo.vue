<template>
  <div>
    <NavBar />

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
                    <v-spacer></v-spacer>

                    Show completed tasks:
                    <v-switch color="green" v-model="hidden" @click="setHiddenCompleted()"> Show completed tasks</v-switch>
                    <v-spacer></v-spacer>

                    <v-btn color="red" @click="removeAllCompletedTasks()"> Remove completed tasks</v-btn>
                    <v-spacer></v-spacer>
                  </v-layout>
                </v-container>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
        <v-data-iterator :items="visibleItems" item-key="id">
          <template v-slot:default="{ items }">
            <v-row>
              <v-col v-for="item in items" :key="item.key" lg="12">
                <v-layout align-center justify-center>
                  <v-card v-if="!item.isHidden" :color="color(item.isDone)" min-width="1200px" max-width="1600px">
                    <v-card-title>
                      <v-checkbox
                        :input-value="item.isDone"
                        v-on:change="changeStatusTask(item.id, item.isDone, item.subtasks, 'isDone')"
                      ></v-checkbox>
                      <h4>{{ item.text }}</h4>
                      <v-spacer></v-spacer>
                      <v-img v-if="item.isDone" max-height="100" max-width="100" src="../../assets/pngegg.png">DONE!</v-img>
                      <v-img v-if="!item.isDone" max-height="100" max-width="100" src="../../assets/sad.png"></v-img>
                    </v-card-title>
                    <v-row
                      ><v-col>
                        <v-container>
                          Progress: <v-progress-linear :value="getProgress(item)"></v-progress-linear> {{ getProgress(item) }} %
                        </v-container>
                      </v-col>
                      <v-col>
                        <v-container>
                          <h4 v-if="item.deadline.length">Deadline:</h4>
                          <v-layout align-center justify-center>
                            <h2>{{ item.deadline }}</h2></v-layout
                          >
                          <v-overlay :value="overlay"
                            ><v-date-picker :min="today" v-model="picker"></v-date-picker>
                            <v-btn color="red" @click="overlay = !overlay">quit</v-btn>
                            <v-btn :disabled="picker === null" color="blue" @click="setDate()">proceed</v-btn>
                          </v-overlay>
                        </v-container>
                      </v-col>
                      <v-col cols="3">
                        <v-container>
                          <v-layout align-center justify-center>
                            <v-btn small color="cyan" v-if="!item.isDone" @click="chooseTaskDate(item.id)">set date</v-btn>

                            <v-btn v-if="!item.isDone && !item.isAdding" small color="blue" @click="changeStatus(item.id, item.isAdding, 'isAdding')"
                              >ADD subtask</v-btn
                            ><v-btn v-if="!item.isDone && item.isAdding" color="blue" small @click="changeStatus(item.id, item.isAdding, 'isAdding')"
                              >done</v-btn
                            >
                            <v-btn v-if="item.isDone" small color="red" @click="destroyTodo(item.id)">remove</v-btn>
                          </v-layout>
                        </v-container></v-col
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
                    <v-divider></v-divider>
                    <v-expansion-panels v-if="item.subtasks.length > 0">
                      <v-expansion-panel>
                        <v-expansion-panel-header> Subtasks </v-expansion-panel-header
                        ><v-expansion-panel-content>
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
                          </v-list></v-expansion-panel-content
                        >
                      </v-expansion-panel></v-expansion-panels
                    >
                  </v-card>
                </v-layout>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
    </v-container>
    <v-row :key="componentKey" />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import { required } from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate';
import NavBar from '@/components/NavBar.vue';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});
const database = firebase.database();

export default {
  data: () => ({
    todos: [],
    todoRef: null,
    checkbox: [],
    task: '',
    subtask: {},
    picker: null,
    overlay: false,
    dateTask: null,
    hidden: false,
    componentKey: 0,
  }),
  components: {
    ValidationProvider,
    ValidationObserver,
    NavBar,
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    createTodo() {
      this.todoRef.push({
        text: this.task.trim(),
        isDone: false,
        isAdding: false,
        isHidden: false,
        subtasks: 'none',
        deadline: '',
      });
      database.ref(`/users/${this.$store.state.auth.user.uid}/subtasks`).push({});
      this.task = '';
    },
    createSubTodo(id2) {
      database.ref(`/users/${this.$store.state.auth.user.uid}/${id2}/subtasks`).push({
        text: this.subtask[id2].trim(),
        isDone: false,
      });
      this.subtask[id2] = '';
    },
    changeStatus(id2, status, value) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${id2}/${value}`)
        .set(!status);
      // this.setHiddenCompleted(this.show);
    },
    changeStatusTask(id2, status, item, value) {
      if (item.length > 0 && !status) {
        item.forEach((x) => firebase
          .database()
          .ref(`users/${this.$store.state.auth.user.uid}/${id2}/subtasks/${x.id}/${value}`)
          .set(!status));
      } else if (item.length > 0 && status) {
        firebase
          .database()
          .ref(`users/${this.$store.state.auth.user.uid}/${id2}/subtasks/${item[item.length - 1].id}/${value}`)
          .set(!status);
      }
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${id2}/${value}`)
        .set(!status);
      // console.log(this.visibleItems());
      this.setHiddenCompleted(this.hidden);
      // vm.forceRerender();
      // this.todos = this.visibleItems;
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
    setHiddenCompleted() {
      this.completedItems.forEach((x) => firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${x.id}/isHidden`)
        .set(!this.hidden));
      // this.todos = this.visibleItems;
      // console.log(this.hidden);
    },
    removeAllCompletedTasks() {
      this.completedItems.forEach((x) => firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${x.id}`)
        .set({}));
    },
    color(isDone) {
      if (isDone) {
        return 'green accent-4';
      }
      return null;
    },
    getProgress(task) {
      if (task.subtasks.length > 0) {
        return ((task.subtasks.filter((x) => x.isDone).length / task.subtasks.length) * 100).toPrecision(3);
      }
      return task.isDone ? 100 : 0;
    },
    setDate() {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.uid}/${this.dateTask}/deadline`)
        .set(this.picker);

      this.overlay = !this.overlay;
    },
    chooseTaskDate(task) {
      this.dateTask = task;
      this.overlay = !this.overlay;
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
          if (fb[key].subtasks !== 'none' && fb[key].subtasks !== 'undefined') {
            Object.keys(fb[key].subtasks).forEach((key2) => {
              const obj = fb[key].subtasks[key2];
              obj.id = key2;
              array2.push(obj);
            });
          }
          const obj = fb[key];
          obj.id = key;
          obj.subtasks = array2;

          if (array2.length > 0) {
            const done = array2.filter((x) => x.isDone).length;
            if (done === array2.length) {
              obj.isDone = true;
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
          array.push(obj);
        });
      }
      // this.todos = this.checkboxes;
      this.todos = array;
    });
    this.setHiddenCompleted(this.show);
  },
  computed: {
    activeCount() {
      return this.todos.filter((todo) => !todo.isDone).length;
    },
    completedCount() {
      return this.todos.filter((todo) => todo.isDone).length;
    },
    completedItems() {
      return this.todos.filter((todo) => todo.isDone);
    },
    today() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    },
    visibleItems() {
      const toShow = [];
      const visible = this.todos.filter((todo) => !todo.isHidden);
      // console.log(visivisibleble);
      visible.forEach((x) => {
        if (x.deadline.length > 0) {
          toShow.push(x);
        }
      });
      toShow.sort((x, y) => x.deadline - y.deadline);
      visible.forEach((x) => {
        if (x.deadline.length <= 0) {
          toShow.push(x);
        }
      });
      return toShow;
    },
    // TODO: I think v-model is binded incorrectly, so we might need to create an array of checkboxes
    checkboxes() {
      const toShow = [];
      const visible = this.todos.filter((todo) => !todo.isHidden);
      visible.forEach((x) => {
        if (x.deadline.length > 0) {
          toShow.push(x);
        }
      });
      toShow.sort((x, y) => x.deadline - y.deadline);
      visible.forEach((x) => {
        if (x.deadline.length <= 0) {
          toShow.push(x);
        }
      });
      console.log('OK, here the checkbox', visible);
      return toShow.map((x) => x.isDone);
    },
  },
};
</script>
