<template>
  <!-- Ajoute la classe dynamique pour le thème -->
  <div class="color-transition" :style="{ background: 'var(--background)' }">
    <!-- Section 1 : Zone de test pleine largeur -->
    <section class="full-width-test">
      <p>Test plein largeur</p>
    </section>

    <!-- Section 2 : Logos de langues avec affichage d'un texte alternatif sur survol ou clic -->
    <section class="logo-section">
      <div
        v-for="(logo, index) in logos"
        :key="index"
        class="logo-container"
        @mouseenter="showAlt(index)"
        @mouseleave="hideAlt(index)"
        @click="toggleAlt(index)"
      >
        <img :src="logo.src" :alt="logo.alt" class="language-logo" />
        <div v-if="logo.showAlt" class="alt-text">
          {{ logo.alt }}
        </div>
      </div>
    </section>

    <!-- Section 3 : Liste de langues avec indication du niveau -->
    <section class="language-levels">
      <ul>
        <li v-for="(lang, index) in languages" :key="index">
          {{ lang.name }} : {{ lang.level }}/6
        </li>
      </ul>
    </section>

    <!-- Section 4 : Cartes de texte avec un titre et un sous-titre -->
    <section class="card-section">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
      >
        <h3>{{ card.title }}</h3>
        <p>{{ card.subtitle }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PortfolioView',
  data() {
    return {
      // Choisis le thème initial : 'theme--light' ou 'theme--dark'
      theme: 'theme--light',
      // Section 2 : Logos de langue avec texte alternatif
      logos: [
        { src: require("@/assets/logos/html5.png"), alt: 'HTML5', showAlt: false },
        { src: require("@/assets/logos/php.png"), alt: 'PHP', showAlt: false },
        { src: require("@/assets/logos/sql.png"), alt: 'SQL', showAlt: false }
      ],
      // Section 3 : Liste des langues avec leur niveau
      languages: [
        { name: 'Anglais', level: 5 },
        { name: 'Espagnol', level: 6 }
      ],
      // Section 4 : Cartes regroupant un titre et un sous-titre
      cards: [
        { title: 'Titre 1', subtitle: 'Sous-titre 1' },
        { title: 'Titre 2', subtitle: 'Sous-titre 2' },
        { title: 'Titre 3', subtitle: 'Sous-titre 3' }
      ]
    };
  },
  methods: {
    showAlt(index) {
      this.logos[index].showAlt = true;
    },
    hideAlt(index) {
      this.logos[index].showAlt = false;
    },
    toggleAlt(index) {
      this.logos[index].showAlt = !this.logos[index].showAlt;
    },
    toggleTheme() {
      this.theme = this.theme === 'theme--light' ? 'theme--dark' : 'theme--light';
    }
  }
};
</script>

<style scoped>
/* Section 1 : Test plein largeur */
.full-width-test {
  width: 100%;
  background-color: var(--primary); /* Utilisation de la variable pour la couleur */
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
}

/* Section 2 : Logos de langue */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.logo-container {
  position: relative;
  cursor: pointer;
}

.language-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s;
}

.logo-container:hover .language-logo {
  transform: scale(1.05);
}

/* Texte alternatif affiché sur le logo */
.alt-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;
  border-radius: 50%;
  transition: opacity 0.3s;
}

/* Section 3 : Liste des langues avec niveau */
.language-levels ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.language-levels li {
  background-color: var(--secondary);
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
}

/* Section 4 : Cartes de texte */
.card-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  width: 300px;
  padding: 1rem;
  border: 1px solid var(--terciary);
  border-radius: 8px;
  box-shadow: 2px 2px 8px var(--effect-shadow);
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 4px 4px 12px var(--effect-shadow);
}

.card h3 {
  margin: 0 0 0.5rem;
}
</style>
