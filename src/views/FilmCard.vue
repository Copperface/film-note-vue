<template>
  <div class="film-card">
    <v-progress-circular
      v-if="isLoading"
      :size="100"
      :width="7"
      color="blue"
      indeterminate
    />
    <AlertMessage
      v-else-if="isError"
      text="Oops, something went wrong, please try later"
    />
    <template v-else>
      <div class="film-card__wrapper">
        <div class="film-card__poster">
          <div class="film-card__poster-inner">
            <div class="film-card__poster-content">
              <v-img :src="fullPosterPath" :alt="filmData.title" />
            </div>
          </div>
        </div>
        <div class="film-card__block">
          <div class="film-card__name">{{ filmData.title }}</div>
          <GenresBlock
            :genres="filmData.genres"
            :genresList="genresList"
            :filmID="+id"
          />
          <div class="film-card__records">
            <br />
            <span class="film-card__label film-card__label-status"
              >Status:</span
            >
            <span class="film-card__info film-card__info-status">
              {{ filmData.status }}
            </span>
            <br />
            <span class="film-card__label film-card__label-release-date"
              >Release date:</span
            >
            <span class="film-card__info film-card__info-release-date">
              {{ filmData.releaseDate }}
            </span>
            <br />
            <span class="film-card__label film-card__label-vote-average"
              >Vote average:</span
            >
            <span class="film-card__info film-card__info-vote-average">
              {{ filmData.voteAverage }}
            </span>
            <br />
          </div>
          <div class="film-card__description">{{ filmData.overview }}</div>
          <v-btn
            class="film-card__favorite-button"
            v-if="isFavorite"
            flat
            color="pink"
            @click="handleClickRemoveFromFavorite"
          >
            <v-icon left>favorite</v-icon>Remove from favorite
          </v-btn>
          <v-btn
            class="film-card__favorite-button"
            v-else
            flat
            color="pink"
            @click="handleClickAddToFavorite"
          >
            <v-icon left>favorite_border</v-icon>Add to favorite
          </v-btn>
        </div>
      </div>
      <RecommendFilms
        :filmID="+id"
        :favoriteFilms="favoriteFilms"
        :genresList="genresList"
      />
      <SimilarFilms
        :filmID="+id"
        :favoriteFilms="favoriteFilms"
        :genresList="genresList"
      />
    </template>
  </div>
</template>

<script>
import GenresBlock from "../components/GenresBlock.vue";
import AlertMessage from "../components/partials/AlertMessage.vue";
import RecommendFilms from "../components/RecommendFilms";
import SimilarFilms from "../components/SimilarFilms";

import { getFilmData, imgURL } from "../utils/API";
import EventBus from "../utils/EventBus";
import { isFavoriteFilm } from "../utils/FilmData";

export default {
  name: "FilmCard",
  components: {
    GenresBlock,
    AlertMessage,
    RecommendFilms,
    SimilarFilms
  },
  data() {
    return {
      filmData: [],
      isLoading: false,
      isError: false
    };
  },
  props: {
    id: {
      type: String,
      default: "0"
    },
    genresList: {
      type: Array,
      default() {
        return [];
      }
    },
    favoriteFilms: {
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
    }
  },
  computed: {
    fullPosterPath() {
      return this.filmData.posterPath ? imgURL + this.filmData.posterPath : "";
    },
    isFavorite() {
      return isFavoriteFilm(+this.id, this.favoriteFilms);
    }
  },
  methods: {
    initComponent() {
      this.createFilmData();
    },
    createFilmData() {
      this.isLoading = true;
      getFilmData(this.id)
        .then(
          ({
            genres: genres,
            status,
            title,
            overview,
            release_date: releaseDate,
            vote_average: voteAverage,
            poster_path: posterPath
          }) => {
            this.filmData = {
              title,
              status,
              genres,
              overview,
              releaseDate,
              voteAverage,
              posterPath
            };
          }
        )
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleClickAddToFavorite() {
      EventBus.$emit("clickAddToFavorite", +this.id);
    },
    handleClickRemoveFromFavorite() {
      EventBus.$emit("clickRemoveFromFavorite", +this.id);
    }
  }
};
</script>

<style lang="scss">
.film-card {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 30px 0;

  &__wrapper {
    max-width: 1080px;
    min-width: 320px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 30px;
    padding: 0 20px;
  }

  &__wrapper:after {
    content: "";
    display: table;
    clear: both;
  }

  &__poster {
    position: relative;
    width: 40%;
    float: left;
  }

  &__poster-inner {
    position: relative;
    height: 0;
    padding-top: 146.6%;
  }

  &__poster-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: inherit;
  }

  &__poster img {
    max-width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  &__block {
    width: 57.3%;
    float: right;
  }

  &__name {
    color: #2c467f;
    font-weight: bold;
    font-size: 48px;
    line-height: 66px;
    letter-spacing: 0.05em;
  }

  &__label {
    display: inline-block;
    width: 90px;
    color: #c1c4cc;
    font-size: 14px;
    text-align: left;
  }

  &__info {
    color: #000000;
    font-size: 14px;
    text-align: left;
  }

  &__description {
    margin: 33px 0;
    color: #000000;
    font-size: 18px;
  }

  @media (min-width: 675px) and (max-width: 899px) {
    &__poster {
      width: 45%;
    }

    &__block {
      width: 50%;
    }
  }
  @media (max-width: 674px) {
    &__poster {
      width: 80%;
      margin: 0 auto;
      float: none;
    }

    &__block {
      width: 90%;
      margin: 0 auto;
      float: none;
    }

    &__name {
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
