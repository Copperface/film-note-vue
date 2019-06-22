<template>
  <v-card class="films-list-item">
    <v-img class="films-list-item__poster" :src="fullImgURL" :alt="originalTitle"></v-img>
    <v-card-title class="films-list-item__title" primary-title>
      <div>
        <h3 class="headline mb-0">{{ originalTitle }}</h3>
        <GenresBlock :genreIDs="genreIDs" :genres="genres" :genresList="genresList" :filmID="id"/>
        <div>{{ overview }}</div>
      </div>
    </v-card-title>
    <v-card-actions class="films-list-item__actions">
      <v-btn flat color="orange" :to="moreInfoRoutePath">More</v-btn>
      <v-spacer/>
      <v-btn v-if="favorite" flat icon color="pink" @click="handleClickRemoveFromFavorite">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn v-else flat icon color="pink" @click="handleClickAddToFavorite">
        <v-icon>favorite_border</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GenresBlock from "../GenresBlock.vue";

import { imgURL } from "../../utils/API";
import EventBus from "../../utils/EventBus";

export default {
  name: "FilmListItem",
  components: {
    GenresBlock
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    originalTitle: {
      type: String,
      default: ""
    },
    posterPath: {
      type: String,
      default: ""
    },
    overview: {
      type: String,
      default: ""
    },
    favorite: {
      type: Boolean,
      default: false
    },
    genresList: {
      type: Array,
      default() {
        return [];
      }
    },
    genreIDs: {
      type: Array,
      default() {
        return [];
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
    fullImgURL() {
      return this.posterPath ? imgURL + this.posterPath : "";
    },
    moreInfoRoutePath() {
      return "/film/" + this.id;
    }
  },
  methods: {
    handleClickAddToFavorite() {
      EventBus.$emit("clickAddToFavorite", this.id);
    },
    handleClickRemoveFromFavorite() {
      EventBus.$emit("clickRemoveFromFavorite", this.id);
    }
  }
};
</script>

<style lang="scss">
.films-list-item {
  margin: 20px;
  width: 300px;

  &__actions {
    padding: 15px;
  }
}
</style>