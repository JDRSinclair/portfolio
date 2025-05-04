<template>
  <v-app :style="{ backgroundColor: 'var(--background)' }" :class="['color-transition', { 'theme--dark': isDarkMode, 'theme--light': !isDarkMode }]">
    <v-main>
      <NavBar />
      <!-- Autres composants de votre application -->
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    isDarkMode() {
      return this.$vuetify.theme.global.current.dark;
    }
  }
}
</script>

<style>
.color-transition {
  transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
}
</style>
