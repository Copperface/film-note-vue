export function isFavoriteFilm(id, favorite) {
  return favorite.includes(id);
}

export function prepareFilmData(data, favorite) {
  return data.map(
    ({
      id,
      original_title: originalTitle,
      poster_path: posterPath,
      genre_ids: genreIDs,
      overview
    }) => ({
      id,
      originalTitle,
      posterPath,
      genreIDs,
      overview,
      favorite: isFavoriteFilm(id, favorite)
    })
  );
}

export function refreshFavoriteFilmData(data, favorite) {
  return data.map(({ id, ...other }) => ({
    id,
    ...other,
    favorite: isFavoriteFilm(id, favorite)
  }));
}

export function getGenreName(id, genres) {
  const result = genres.find(el => el.id == id);
  return result ? result.name : "";
}
