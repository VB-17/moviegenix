export function getGenreNamesFromIds(data, genresData) {
  const genres = [];
  data.genre_ids.forEach((genreId) => {
    const genreName = genresData
      ?.map(({ id, name }) => id === genreId && name)
      ?.filter(Boolean);

    genres.push(genreName[0]);
  });

  return genres;
}
