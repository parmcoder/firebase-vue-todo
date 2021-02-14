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
export default {
  data() {
    return {
      editing: null,
      includeFiles: true,
      enabled: false,
      todo: [],
    };
  },
//   props: ["todos"],
  methods: {
    // update() {},
    // create() {},
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
  }
};
</script>
