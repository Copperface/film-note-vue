<template>
  <v-app>
    <AppHeader/>
    <v-content>
      <router-view :favoriteFilms="favoriteFilms" :genresList="genresList"/>
    </v-content>
    <AppFooter/>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

import LocalStorageHelper from "./utils/LocalStorageHelper";
import EventBus from "./utils/EventBus";

import { getGenresListData } from "./utils/API";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      genresList: [],
      favoriteFilmsStorage: {},
      favoriteFilms: []
    };
  },
  created() {
    EventBus.$on("clickAddToFavorite", id => {
      this.favoriteFilms = [...this.favoriteFilms, id];
      this.favoriteFilmsStorage.setData(this.favoriteFilms);
    });
    EventBus.$on("clickRemoveFromFavorite", id => {
      const indexOfID = this.favoriteFilms.indexOf(id);
      if (~indexOfID) {
        this.favoriteFilms.splice(indexOfID, 1);
        this.favoriteFilmsStorage.setData(this.favoriteFilms);
      }
    });
  },
  mounted() {
    this.favoriteFilmsStorage = new LocalStorageHelper("favoriteFilms");
    this.favoriteFilms = this.favoriteFilmsStorage.getData();

    getGenresListData().then(({ genres }) => {
      this.genresList = genres;
    });
  }
};
</script>
