const apiURL = "https://api.themoviedb.org/3";
const apiKey = "f46825213b5aa8bff450cdca03e35c8d";
export const imgURL = "https://image.tmdb.org/t/p/w342";

const commonQueryParams = {
  api_key: apiKey
};

const popularDataParams = {
  path: "/movie/popular",
  queryParams: {}
};

const similarDataParams = {
  path: "/movie/{movie_id}/similar"
};

const recommendDataParams = {
  path: "/movie/{movie_id}/recommendations"
};

const filmDataParams = {
  path: "/movie/"
}

const searchDataParams = {
  path: "/search/movie",
  queryParams: {}
}

const genresListData = {
  path: "/genre/movie/list"
}

function requestUrl(customParams) {
  const searchParams = new URLSearchParams();
  for (let param in commonQueryParams) {
    searchParams.append(param, commonQueryParams[param]);
  }

  for (let param in customParams.queryParams) {
    searchParams.append(param, customParams.queryParams[param]);
  }

  return `${apiURL}${customParams.path}?${searchParams.toString()}`;
}

export function getPopularFilmsData(page) {
  const requestParams = { ...popularDataParams };
  requestParams.queryParams.page = page;
  return fetch(requestUrl(requestParams)).then(b => b.json());
}

export function getSearchFilmsData(query, page) {
  const requestParams = { ...searchDataParams };
  requestParams.queryParams = { ...requestParams.queryParams, page, query };
  return fetch(requestUrl(requestParams)).then(b => b.json());
}

export function getSimilarFilmsData(id) {
  const requestParams = { ...similarDataParams };
  let path = requestParams.path.split("/");
  path.splice(2, 1, id);
  requestParams.path = path.join("/");
  return fetch(requestUrl(requestParams)).then(b => b.json());
}

export function getRecommendFilmsData(id) {
  const requestParams = { ...recommendDataParams };
  let path = requestParams.path.split("/");
  path.splice(2, 1, id);
  requestParams.path = path.join("/");
  return fetch(requestUrl(requestParams)).then(b => b.json());
}

export function getFilmData(id) {
  const requestParams = { ...filmDataParams };
  requestParams.path += id;
  return fetch(requestUrl(requestParams)).then(b => b.json());
}

export function getGenresListData() {
  const requestParams = { ...genresListData };
  return fetch(requestUrl(requestParams)).then(b => b.json());
}
