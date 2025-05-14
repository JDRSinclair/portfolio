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
      loadedView: PortfolioView,
      title: "RODRIGUEZ SINCLAIR Juan David",
      subtitle: "Ici, vous pourrez trouver des informations me concernant, notamment mes diplômes, mon expérience et mes compétences. J'ai décidé de diviser ces points en trois parties. Vous pourrez naviguer entre elles grâce au menu de navigation situé dans la partie supérieure de la page.",
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

.color-transition {
  transition: background-color 1s ease, color 1s ease, border-color 1s ease;
}
</style>
