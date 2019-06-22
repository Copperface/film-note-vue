<template>
  <v-item-group>
    <v-chip v-for="genreName in genreNamesList" :key="filmID+genreName">{{genreName}}</v-chip>
  </v-item-group>
</template>

<script>
import { getGenreName } from "../utils/FilmData";

export default {
  name: "GenresBlock",
  data() {
    return {};
  },
  props: {
    genreIDs: {
      type: Array,
      default() {
        return [];
      }
    },
    genresList: {
      type: Array,
      default() {
        return [];
      }
    },
    filmID: {
      type: Number,
      default() {
        return 0;
      }
    },
    genres: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    genreNamesList() {
      if (this.genres.length) return this.genres.map(el => el.name);
      return this.genreIDs.map(id => getGenreName(id, this.genresList));
    }
  }
};
</script>