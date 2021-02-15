<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <v-container
        ><v-footer absolute>
          <div class="text-h5">Written by Parmcoder</div>
        </v-footer></v-container
      >
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
