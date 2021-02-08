<template>
  <v-app>
    <main>
      <NavBar/>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
