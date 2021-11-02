import axios from "../lib/axios";

const req = {
  trendingMovies: "trending/movie/week?append_to_response=videos,release_dates",
  topRatedMovies: "movie/top_rated",
  movieInfo: "movie",
  genres: "genre/movie/list",
  search: "search/movie",
  discover: "discover/movie",
};

const getTrendingMovies = () =>
  axios.get(req.trendingMovies).then((res) => res.data.results);

const getGenres = () => axios.get(req.genres).then((res) => res.data.genres);

const getTopRatedMovies = () =>
  axios.get(req.topRatedMovies).then((res) => res.data.results);

const searchMovies = (movie) =>
  axios
    .get(`${req.search}?query=${movie}&language=en-US`)
    .then((res) => res.data.results);

const getMovieDetail = (movieId) =>
  axios.get(`${req.movieInfo}/${movieId}`).then((res) => res.data);

const getSimilarMovies = (movieId) =>
  axios
    .get(`${req.movieInfo}/${movieId}/similar`)
    .then((res) => res.data.results);

const getMovieByGenre = (genreId) => {
  if (genreId === 1) {
    genreId = "28,35,27,10749";
  }
  return axios
    .get(`${req.discover}?with_genres=${genreId}`)
    .then((res) => res.data.results);
};

export {
  getTrendingMovies,
  getGenres,
  getTopRatedMovies,
  getMovieDetail,
  getMovieByGenre,
  getSimilarMovies,
  searchMovies,
};
