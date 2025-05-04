<template>
  <v-app-bar app :style="{ backgroundColor: 'var(--primary)' }" class="color-transition">
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ themeIcon }}</v-icon>
    </v-btn>

    <!-- Navigation Buttons for Desktop -->
    <div v-if="!isMobile">
      <v-btn text class="primary--text color-transition" @click="navigateTo('portfolio')">Mon Portfolio</v-btn>
      <v-btn text class="primary--text color-transition" @click="navigateTo('experience')">Mon Expérience Professionnelle</v-btn>
      <v-btn text class="primary--text color-transition" @click="navigateTo('etudes')">Mes Études et Projets Personnels</v-btn>
    </div>

    <!-- Navigation Selector for Mobile -->
    <v-select
      v-if="isMobile"
      :items="navigationItems"
      item-title="text"
      item-value="value"
      v-model="defaultNavigation"
      @update:model-value="navigateTo"
      variant="plain"
      flat
      hide-details
      density="compact"
      class="custom-select"
    ></v-select>

    <v-spacer></v-spacer>

    <!-- Language Buttons for Desktop -->
    <div v-if="!isMobile">
      <v-btn icon @click="changeLanguage('fr')">
        <img :src="frFlag" alt="French Flag" class="flag-icon-desktop" />
      </v-btn>
      <v-btn icon @click="changeLanguage('es')">
        <img :src="esFlag" alt="Spanish Flag" class="flag-icon-desktop" />
      </v-btn>
      <v-btn icon @click="changeLanguage('en')">
        <img :src="ukFlag" alt="English Flag" class="flag-icon-desktop" />
      </v-btn>
    </div>

    <!-- Language Selector for Mobile -->
    <v-select
      v-if="isMobile"
      :items="languageItems"
      item-title="text"
      item-value="value"
      v-model="defaultLanguage"
      @update:model-value="changeLanguage"
      variant="plain"
      flat
      hide-details
      density="compact"
      class="custom-select"
    >
      <template v-slot:selection="{ item }">
        <div class="d-flex align-center">
          <img :src="item.raw.flag" alt="Flag" class="flag-icon" />
          &nbsp;
          <span>{{ item.title }}</span>
        </div>
      </template>
    </v-select>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      frFlag: require("@/assets/locales/fr.png"),
      esFlag: require("@/assets/locales/es-B&W.png"),
      ukFlag: require("@/assets/locales/uk-B&W.png"),
      navigationItems: [
        { text: "Mon Portfolio", value: "portfolio" },
        { text: "Mon Expérience Professionnelle", value: "experience" },
        { text: "Mes Études et Projets Personnels", value: "etudes" },
      ],
      languageItems: [
        { text: "Français", value: "fr", flag: require("@/assets/locales/fr.png") },
        { text: "Español", value: "es", flag: require("@/assets/locales/es-B&W.png") },
        { text: "English", value: "en", flag: require("@/assets/locales/uk-B&W.png") },
      ],
      isMobile: false,
      defaultNavigation: "portfolio", // Valeur par défaut pour la navigation
      defaultLanguage: "fr" // Valeur par défaut pour la langue
    };
  },

  computed: {
    themeIcon() {
      return this.$vuetify.theme.global.current.dark ? "mdi-weather-night" : "mdi-weather-sunny";
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.global.name = this.$vuetify.theme.global.current.dark ? "light" : "dark";
    },
    changeLanguage(lang) {
      console.log(`Language changed to ${lang}`);
    },
    navigateTo(route) {
      console.log(`Navigating to ${route}`);
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 800;
    },
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkIfMobile);
  },
};
</script>

<style scoped>
.flag-icon-desktop {
  width: 35px;
  height: 24px;
}

.flag-icon {
  width: 20px;
  height: 15px;
}

.custom-select .v-input__control .v-input__slot {
  display: flex;
  align-items: center;
}

.custom-select .v-input__append-inner {
  display: flex;
  align-items: center;
}

.custom-select .v-select__selections {
  flex-grow: 1;
}
</style>
