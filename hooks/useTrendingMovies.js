import { useQuery } from "react-query";
import { getTrendingMovies } from "../lib/requests";
import { useGenres } from "./useGenres";

export function useTrendingMovies() {
  let info = {};

  const {
    data: trendingData,
    isLoading: movieLoading,
    error: movieError,
  } = useQuery("trending", getTrendingMovies);

  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  if (movieError || genresError) {
    info = {
      data: null,
      isLoading: false,
      error: {
        movieError: movieError ? movieError.message : null,
        genresError: genresError ? genresError.message : null,
      },
    };

    return;
  }

  if (movieLoading || genresLoading) {
    info = { data: null, isLoading: true, error: null };
  }

  if (trendingData && genresData) {
    const modifiedData = trendingData.map(
      ({
        id,
        title,
        backdrop_path,
        release_date,
        poster_path,
        genre_ids,
        vote_average,
        vote_count,
      }) => {
        const release_year = release_date.split("-")[0];
        const genres = [];

        genre_ids.forEach((genreId) => {
          const genreName = genresData
            ?.map(({ id, name }) => id === genreId && name)
            ?.filter(Boolean);

          genres.push(genreName[0]);
        });

        return {
          id,
          title,
          backdrop_path,
          poster_path,
          release_year,
          vote_count,
          vote_average,
          genres,
        };
      }
    );

    info = {
      ...info,
      data: [...modifiedData],
      isLoading: false,
    };
  }

  return { ...info };
}
