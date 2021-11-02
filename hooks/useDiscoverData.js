import { useEffect } from "react";
import { useQuery } from "react-query";
import { getMovieByGenre } from "../lib/requests";

export function useDiscoverData(genreId) {
  const { data, isLoading, error, refetch } = useQuery(
    ["discover", genreId],
    () => getMovieByGenre(genreId),
    {
      enabled: Boolean(genreId),
    }
  );

  useEffect(() => {
    refetch();
  }, [genreId]);

  return { data, isLoading, error };
}
