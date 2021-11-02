import { useEffect } from "react";
import { useQuery } from "react-query";
import { searchMovies } from "../lib/requests";
import { useGenres } from "./useGenres";

import { queryClient } from "../lib/query-client";

export function useSearch(query) {
  let data;
  let genresData;

  const {
    data: searchData,
    isLoading,
    error,
    refetch,
  } = useQuery(["search", query], () => searchMovies(query), {
    enabled: Boolean(query),
  });

  const { data: freshGenres } = useGenres();

  if (searchData) {
    genresData = queryClient.getQueryData("genres");

    if (!genresData) {
      genresData = freshGenres;
    }

    const modifiedData = searchData.map(
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
        const release_year = release_date?.split("-")[0];
        const genres = [];

        genre_ids.forEach((genreId) => {
          const genreName = genresData
            .map(({ id, name }) => id === genreId && name)
            .filter(Boolean);

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

  useEffect(() => {
    if (!query) {
      return;
    } else {
      refetch();
    }
  }, [query]);

  return { data, isLoading, error };
}
