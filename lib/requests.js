import axios from "../lib/axios";

const req = {
  trendingMovies: "trending/movie/week?append_to_response=videos,release_dates",
  topRatedMovies: "movie/top_rated",
  genres: "genre/movie/list",
  search: "search/movie",
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

export { getTrendingMovies, getGenres, getTopRatedMovies, searchMovies };
