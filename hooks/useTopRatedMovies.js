import { useQuery } from "react-query";
import { queryClient } from "../lib/query-client";
import { getTopRatedMovies } from "../lib/requests";
import { getGenreNamesFromIds } from "../lib/utils";
import { useGenres } from "./useGenres";

export function useTopRatedMovies() {
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  const {
    data: topRated,
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useQuery("top-rated", () => getTopRatedMovies(), {
    enabled: Boolean(genresData),
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

  return {
    data: topRated,
    isLoading: topRatedLoading || genresLoading,
    error: {
      topRated: topRatedError ? topRatedError.message : null,
      genres: genresError ? genresError.message : null,
    },
  };
}
