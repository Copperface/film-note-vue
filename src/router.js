import Vue from "vue";
import Router from "vue-router";
import PopularFilms from "./views/PopularFilms.vue";
import FavoriteFilms from "./views/FavoriteFilms.vue";
import SearchFilms from "./views/SearchFilms.vue";
import FilmCard from "./views/FilmCard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "PopularFilms",
      component: PopularFilms
    },
    {
      path: "/favorites",
      name: "FavoriteFilms",
      component: FavoriteFilms
    },
    {
      path: "/search",
      name: "SearchFilms",
      component: SearchFilms,
      props: route => ({ queryString: route.query.q })
    },
    {
      path: "/film/:id",
      name: "FilmCard",
      component: FilmCard,
      props: true
    }
  ]
});
