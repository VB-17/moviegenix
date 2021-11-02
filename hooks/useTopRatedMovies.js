import { useQuery } from "react-query";
import { queryClient } from "../lib/query-client";
import { getTopRatedMovies } from "../lib/requests";
import { useGenres } from "./useGenres";

export function useTopRatedMovies() {
  let data = [];
  let genresData = [];

  const {
    data: topRatedData,
    isLoading,
    error,
  } = useQuery("top-rated", getTopRatedMovies);

  const { data: freshGenres } = useGenres();

  if (topRatedData) {
    genresData = queryClient.getQueryData("genres");

    if (!genresData) {
      genresData = freshGenres;
    } else {
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
  }

  return { data, isLoading, error };
}
