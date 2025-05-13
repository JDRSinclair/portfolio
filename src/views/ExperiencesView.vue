<template>
  <div>
    <!-- Votre template ici -->
    <!-- <img
      class="logo"
      :src="test"
      alt="Image de test"
      style="width: 100px; height: 100px;"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'ExperiencesView',

  data() {
    return {
      test: require('@/assets/logos/leafs/1.png'),
    }
  },
  // Autres options du composant
}
</script>

<style>
.logo{
  mix-blend-mode: multiply;
  background-color: pink;
}
</style>