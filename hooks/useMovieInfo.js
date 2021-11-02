import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useGenres } from "./useGenres";
import { queryClient } from "../lib/query-client";

import { getMovieDetail, getSimilarMovies } from "../lib/requests";

export function useMovieInfo(movieId) {
  let info = {};
  const [genresData, setGenresData] = useState([]);
  const { data: freshGenres } = useGenres();

  const movieInfo = useQuery(
    ["movie", movieId],
    () => getMovieDetail(movieId),
    {
      enabled: Boolean(movieId),
    }
  );
  const similarMovieInfo = useQuery(
    ["movie", movieId, "similar"],
    () => getSimilarMovies(movieId),
    {
      enabled: Boolean(movieId),
    }
  );

  useEffect(() => {
    if (queryClient.getQueryData("genres")) {
      setGenresData(queryClient.getQueriesData("genres"));
    }
    setGenresData(freshGenres);
  }, [freshGenres]);

  if (movieInfo.isLoading || similarMovieInfo.isLoading) {
    info = { data: null, isLoading: true, error: null };
  }

  if (movieInfo.error || similarMovieInfo.error) {
    info = {
      data: null,
      isLoading: false,
      error: {
        movieInfo: movieInfo.error ? movieInfo.error.message : null,
        similarMovieInfo: similarMovieInfo.error
          ? similarMovieInfo.error.message
          : null,
      },
    };
  }

  if (movieInfo.data && similarMovieInfo.data) {
    const modifiedData = similarMovieInfo.data.map(
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
    const data = { ...movieInfo.data, recommended: [...modifiedData] };
    info = {
      ...info,
      data,
      isLoading: false,
    };
  }

  useEffect(() => {
    if (!movieId) {
      return;
    }
    movieInfo.refetch();
    similarMovieInfo.refetch();
  }, [movieId]);

  return { ...info };
}
