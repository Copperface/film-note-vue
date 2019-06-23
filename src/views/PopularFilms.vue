<template>
  <div class="popular-films">
    <PageTitle text="Popular Films" />
    <FilmsList :films="filmsData" :genresList="genresList" />
    <v-progress-circular
      v-show="isLoading"
      :size="100"
      :width="7"
      color="blue"
      indeterminate
    />
    <LoadMoreButton
      v-show="!hideLoadMoreButton"
      @clickLoadMore="handleClickLoadMore"
    />
    <AlertMessage
      v-if="isError"
      text="Oops, something went wrong, please try later"
    />
  </div>
</template>

<script>
import FilmsList from "../components/film_list/FilmsList.vue";
import LoadMoreButton from "../components/partials/LoadMoreButton.vue";
import PageTitle from "../components/partials/PageTitle.vue";
import AlertMessage from "../components/partials/AlertMessage.vue";

import { getPopularFilmsData } from "../utils/API";
import { prepareFilmData, refreshFavoriteFilmData } from "../utils/FilmData";

export default {
  name: "PopularFilms",
  components: {
    FilmsList,
    LoadMoreButton,
    PageTitle,
    AlertMessage
  },
  data() {
    return {
      page: 1,
      filmsData: [],
      isLastPage: false,
      isLoading: false,
      isError: false
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
    this.loadFilms();
  },
  computed: {
    hideLoadMoreButton() {
      return this.isLoading || this.isError || this.isLastPage;
    }
  },
  watch: {
    favoriteFilms() {
      this.filmsData = refreshFavoriteFilmData(
        this.filmsData,
        this.favoriteFilms
      );
    }
  },
  methods: {
    loadFilms() {
      this.isLoading = true;
      getPopularFilmsData(this.page)
        .then(({ results, total_pages: totalPages }) => {
          this.filmsData = [
            ...this.filmsData,
            ...prepareFilmData(results, this.favoriteFilms)
          ];

          if (this.page === totalPages) return (this.isLastPage = true);
          this.page += 1;
        })
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleClickLoadMore() {
      this.loadFilms();
    }
  }
};
</script>

<style>
.popular-films {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
}
</style>
