<template>
  <v-app>
    <v-main>
      <!-- <NavBar/> -->
      <router-view></router-view>
      <v-footer absolute>
        <div class="text-h5">Written by Parmcoder</div>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
// import NavBar from '@/components/NavBar'
export default {
  name: "App",
  components: {
    // NavBar
  }
};
</script>
