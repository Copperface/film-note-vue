<template>
  <div class="search-films">
    <PageTitle :text="'Search Result'" />
    <EmptyMessage v-if="showEmptyMessage" :text="emptyMessageText" />
    <FilmsList :films="filmsData" :genresList="genresList" />
    <LoadMoreButton
      v-show="!hideLoadMoreButton"
      @clickLoadMore="handleClickLoadMore"
    />
    <v-progress-circular
      v-show="isLoading"
      :size="100"
      :width="7"
      color="blue"
      indeterminate
    />
    <AlertMessage
      v-if="isError"
      :text="'Oops, something went wrong, please try later'"
    />
  </div>
</template>

<script>
import FilmsList from "../components/film_list/FilmsList.vue";
import PageTitle from "../components/partials/PageTitle.vue";
import LoadMoreButton from "../components/partials/LoadMoreButton.vue";
import AlertMessage from "../components/partials/AlertMessage.vue";
import EmptyMessage from "../components/partials/EmptyMessage.vue";

import { getSearchFilmsData } from "../utils/API";
import { prepareFilmData, refreshFavoriteFilmData } from "../utils/FilmData";

export default {
  name: "SearchFilms",
  components: {
    PageTitle,
    FilmsList,
    EmptyMessage,
    LoadMoreButton,
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
    queryString: {
      type: String,
      default() {
        return "";
      }
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
    this.loadFilms();
  },
  computed: {
    isFilmsDataEmpty() {
      return !this.filmsData.length;
    },
    emptyMessageText() {
      return `Sorry... nothing found with ${this.queryString}`;
    },
    showEmptyMessage() {
      return this.isFilmsDataEmpty && !this.isLoading;
    },
    hideLoadMoreButton() {
      return (
        this.isLoading ||
        this.isError ||
        this.isLastPage ||
        this.isFilmsDataEmpty
      );
    }
  },
  watch: {
    queryString() {
      this.page = 1;
      this.filmsData = [];
      this.loadFilms();
    },
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
      getSearchFilmsData(this.queryString, this.page)
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
.search-films {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
}
</style>
