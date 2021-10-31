import { useQuery } from "react-query";
import { queryClient } from "../lib/query-client";
import { getTopRatedMovies } from "../lib/requests";

export function useTopRatedMovies() {
  let data = [];
  const {
    data: topRatedData,
    isLoading,
    error,
  } = useQuery("top-rated", getTopRatedMovies);

  if (topRatedData) {
    const genresData = queryClient.getQueryData("genres");
    const modifiedData = topRatedData.map(
      ({
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
            .map(({ id, name }) => id === genreId && name)
            .filter(Boolean);

          genres.push(genreName[0]);
        });

        return {
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
