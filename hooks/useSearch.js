import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { searchMovies } from "../lib/requests";
import { useGenres } from "./useGenres";
import { getGenreNamesFromIds } from "../lib/utils";
import { queryClient } from "../lib/query-client";

export function useSearch(query) {
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
    refetch,
  } = useQuery(["search", query], () => searchMovies(query), {
    enabled: Boolean(query),
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
  });

  useEffect(() => {
    if (!query) {
      return;
    } else {
      refetch();
    }
  }, [query]);

  return {
    data: searchData,
    isLoading: searchLoading || genresLoading,
    error: {
      search: searchError ? searchError.message : null,
      genres: genresError ? genresError.message : null,
    },
  };
}
