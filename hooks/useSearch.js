import { useEffect } from "react";
import { useQuery } from "react-query";
import { searchMovies } from "../lib/requests";

import { queryClient } from "../lib/query-client";

export function useSearch(query) {
  let data = undefined;
  const {
    data: searchData,
    isLoading,
    error,
    refetch,
  } = useQuery(["search", query], () => searchMovies(query), {
    enabled: Boolean(query),
  });

  console.log(searchData);

  if (searchData) {
    const genresData = queryClient.getQueryData("genres");
    const modifiedData = searchData.map(
      ({
        title,
        backdrop_path,
        release_date,
        poster_path,
        genre_ids,
        vote_average,
        vote_count,
        overview
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

  useEffect(() => {
    if (!query) {
      return;
    } else {
      refetch();
    }
  }, [query]);

  return { data, isLoading, error };
}
