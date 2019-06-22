<template>
  <v-bottom-nav class="primary" :value="true" dark>
    <v-btn to="/" dark>
      <span>Popular</span>
      <v-icon>star_border</v-icon>
    </v-btn>
    <v-btn to="/favorites" dark>
      <span>Favorite</span>
      <v-icon>favorite_border</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>
