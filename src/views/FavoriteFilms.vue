<template>
  <div class="favorites-films">
    <PageTitle :text="'Favorite Fimls'" />
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
    <EmptyMessage
      v-else-if="!favoriteFilms.length"
      :text="'Sorry... is empty, please add something'"
    />
    <FilmsList v-else :films="filmsData" :genresList="genresList" />
  </div>
</template>

<script>
import FilmsList from "../components/film_list/FilmsList.vue";
import PageTitle from "../components/partials/PageTitle.vue";
import AlertMessage from "../components/partials/AlertMessage.vue";
import EmptyMessage from "../components/partials/EmptyMessage.vue";

import { getFilmData } from "../utils/API";

export default {
  name: "FavoriteFilms",
  components: {
    FilmsList,
    PageTitle,
    AlertMessage,
    EmptyMessage
  },
  data() {
    return {
      filmsData: [],
      isError: false,
      isLoading: false
    };
  },
  props: {
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
    this.changeFilmData();
  },
  watch: {
    favoriteFilms() {
      this.changeFilmData();
    }
  },
  methods: {
    changeFilmData() {
      this.isLoading = true;
      this.formFilmDataСontent(this.favoriteFilms)
        .then(data => {
          this.filmsData = [...data];
        })
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    formFilmDataСontent(ids) {
      return new Promise((resolve, reject) => {
        const result = [];
        if (!ids.length) resolve(result);
        ids.forEach((el, index, arr) => {
          getFilmData(el)
            .then(
              ({
                id,
                original_title: originalTitle,
                poster_path: posterPath,
                genres,
                overview
              }) => {
                result.push({
                  id,
                  originalTitle,
                  posterPath,
                  genres,
                  overview,
                  favorite: true
                });
                if (index === arr.length - 1) resolve(result);
              }
            )
            .catch(() => reject());
        });
      });
    }
  }
};
</script>

<style>
.favorites-films {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
}
</style>
