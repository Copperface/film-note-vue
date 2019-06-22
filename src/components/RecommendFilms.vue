<template>
  <div v-if="filmsData.length" class="recommend-films">
    <PageTitle :text="'Recomend Films'" />
    <v-progress-circular
      v-if="isLoading"
      :size="100"
      :width="7"
      color="blue"
      indeterminate
    />
    <AlertMessage
      v-else-if="isError"
      :text="'Oops, something went wrong, please try later'"
    />
    <FilmsList
      v-else
      :films="filmsData"
      :genresList="genresList"
      additionalKey="recommend"
    />
  </div>
</template>

<script>
import PageTitle from "../components/partials/PageTitle.vue";
import AlertMessage from "../components/partials/AlertMessage.vue";
import FilmsList from "../components/film_list/FilmsList.vue";

import { getRecommendFilmsData } from "../utils/API";
import { prepareFilmData, refreshFavoriteFilmData } from "../utils/FilmData";

export default {
  name: "RecommendFilms",
  components: {
    PageTitle,
    AlertMessage,
    FilmsList
  },
  data() {
    return {
      filmsData: [],
      isLoading: false,
      isError: false
    };
  },
  props: {
    filmID: {
      type: Number,
      default: 0
    },
    favoriteFilms: {
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
    }
  },
  mounted() {
    this.initComponent();
  },
  watch: {
    $route() {
      this.initComponent();
    },
    favoriteFilms() {
      this.filmsData = refreshFavoriteFilmData(
        this.filmsData,
        this.favoriteFilms
      );
    }
  },
  methods: {
    initComponent() {
      this.createFilmsData();
    },
    createFilmsData() {
      this.isLoading = true;
      getRecommendFilmsData(this.filmID)
        .then(({ results }) => {
          this.filmsData = [...prepareFilmData(results, this.favoriteFilms)];
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        });
    }
  }
};
</script>
