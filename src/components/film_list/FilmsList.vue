<template>
  <v-layout class="films-list">
    <FilmsListItem
      v-for="film of films"
      :key="additionalKey? additionalKey + film.id : film.id"
      v-bind="{...film}"
      :genresList="genresList"
    />
  </v-layout>
</template>

<script>
import FilmsListItem from "./FilmsListItem.vue";

export default {
  name: "FilmsList",
  components: {
    FilmsListItem
  },
  props: {
    films: {
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
    additionalKey: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.films-list {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
