import { useEffect } from "react";
import { useQuery } from "react-query";
import { useGenres } from "./useGenres";
import { queryClient } from "../lib/query-client";
import { getGenreNamesFromIds } from "../lib/utils";

import { getMovieDetail, getSimilarMovies } from "../lib/requests";

export function useMovieInfo(movieId) {
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  const similarMovieInfo = useQuery(
    ["movie", movieId, "similar"],
    () => getSimilarMovies(movieId),
    {
      enabled: Boolean(movieId),
      select: (data) => {
        return data.map((item) => {
          let genres = [];
          const cachedGenres = queryClient.getQueryData("genres");
          const release_year = item.release_date.split("-")[0];
          if (cachedGenres) {
            genres = getGenreNamesFromIds(item, cachedGenres);
          }

          genres = getGenreNamesFromIds(item, genresData);
          return { ...item, genres, release_year };
        });
      },
    }
  );

  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
    refetch: movieRefetch,
  } = useQuery(["movie", movieId], () => getMovieDetail(movieId), {
    enabled: Boolean(movieId),
    select: (data) => {
      const release_year = data.release_date.split("-")[0];
      const genres = data.genres.map((item) => item.name);

      const recommended = similarMovieInfo?.data ? similarMovieInfo.data : [];
      return { ...data, release_year, genres, recommended };
    },
  });

  useEffect(() => {
    if (!movieId) {
      return;
    }
    movieRefetch();
    similarMovieInfo.refetch();
  }, [movieId]);

  return {
    data: movieData,
    isLoading: movieLoading || genresLoading,
    error: {
      movie: movieError ? movieError.message : null,
      genres: genresError ? genresError.message : null,
    },
  };
}
