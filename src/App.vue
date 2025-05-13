<template>
  <v-app
    :style="{ backgroundColor: 'var(--background)' }"
    :class="[{ 'theme--dark': isDarkMode, 'theme--light': !isDarkMode }]"
  >
    <v-main class="app-main">
      <NavBar class="header" />
      <TextBanner
        :title="title"
        :subtitle="subtitle"
        class="text-banner"
      />
      <component
        :is="loadedView"
        class="loaded-view"
      />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import TextBanner from "@/components/TextBanner.vue";
import eventBus from "@/plugins/eventBus.js";

import PortfolioView from "@/views/PortfolioView.vue";
import ExperiencesView from "@/views/ExperiencesView.vue";
import ViewProjectsDiplomas from "@/views/Projects-Diplomas.vue";

export default {
  name: "App",

  components: {
    NavBar,
    TextBanner,
    PortfolioView,
    ExperiencesView,
    ViewProjectsDiplomas,
  },

  data() {
    return {
      loadedView: ExperiencesView,
      title: "Your Title",
      subtitle: "Your Subtitle",
      // showTextBanner: true,
    };
  },

  computed: {
    isDarkMode() {
      return this.$vuetify.theme.global.current.dark;
    },
  },

  created() {
    eventBus.on("changeView", this.handleChangeView);
  },

  mounted() {
  },

  beforeUnmount() {
    eventBus.off("changeView", this.handleChangeView);
  },

  methods: {
    handleChangeView(view) {
      switch (view) {
        case "portfolio":
          this.loadedView = PortfolioView;
          break;
        case "experiences":
          this.loadedView = ExperiencesView;
          break;
        case "projects-diplomas":
          this.loadedView = ViewProjectsDiplomas;
          break;
        default:
          this.loadedView = PortfolioView;
      }
    },
  },
};
</script>

<style>
.app-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex: 0 0 auto;
}

.text-banner,
.loaded-view {
  flex: 0 0 auto;
}

/* Exemple d'extra contenu pour forcer le scroll (si nécessaire) */
.extra-content {
  flex: 1;
  padding: 1rem;
  background-color: #f5f5f5;
  min-height: 150vh;
}
</style>
