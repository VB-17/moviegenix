import { useQuery } from "react-query";
import { queryClient } from "../lib/query-client";
import { getTrendingMovies } from "../lib/requests";
import { getGenreNamesFromIds } from "../lib/utils";
import { useGenres } from "./useGenres";

export function useTrendingMovies() {
  const {
    data: genresData,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useQuery("trending", () => getTrendingMovies(), {
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
    data: trendingData,
    isLoading: trendingLoading || genresLoading,
    error: {
      topRated: trendingError ? trendingError.message : null,
      genres: genresError ? genresError.message : null,
    },
  };
}
