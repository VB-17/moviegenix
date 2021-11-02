import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { queryClient } from "../lib/query-client";
import { getTopRatedMovies } from "../lib/requests";
import { useGenres } from "./useGenres";

export function useTopRatedMovies() {
  const [data, setData] = useState([]);
  const [genresData, setGenresData] = useState([]);

  const {
    data: topRatedData,
    isLoading,
    error,
  } = useQuery("top-rated", getTopRatedMovies);

  const { data: freshGenres, refetch } = useGenres();

  useEffect(() => {
    if (queryClient.getQueryData("genres")) {
      setGenresData(queryClient.getQueriesData("genres"));
    }
    setGenresData(freshGenres);
  }, [freshGenres]);

  if (topRatedData) {
    const modifiedData = topRatedData.map(
      ({
        id,
        title,
        backdrop_path,
        release_date,
        poster_path,
        genre_ids,
        vote_average,
        vote_count,
        overview,
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
          overview,
          genres,
        };
      }
    );
    data = [...modifiedData];
  }

  return { data, isLoading, error };
}
