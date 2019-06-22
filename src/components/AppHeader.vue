<template>
  <v-toolbar app dark class="primary">
    <v-toolbar-title>Film Note</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">
        <v-icon left>star_border</v-icon>Popular
      </v-btn>
      <v-btn flat to="/favorites">
        <v-icon left>favorite_border</v-icon>Favorites
      </v-btn>
    </v-toolbar-items>
    <v-text-field
      v-model="searchQuery"
      class="xs12 sm6 md4"
      v-if="showSearchField"
      @blur="handleBlurSearchField"
      @click:append="handleClickSearchField"
      @submit="handleClickSearchField"
      autofocus
      light
      placeholder="Search..."
      append-icon="search"
      hide-details
      solo
    ></v-text-field>
    <v-btn v-else @click="handleClickShowSearch" icon>
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      showSearchField: false,
      searchQuery: ""
    };
  },
  methods: {
    handleClickShowSearch() {
      this.showSearchField = true;
    },
    handleBlurSearchField() {
      this.showSearchField = false;
    },
    handleClickSearchField() {
      this.searchQuery &&
        this.$router.push({ path: "/search", query: { q: this.searchQuery } });
    }
  }
};
</script>
