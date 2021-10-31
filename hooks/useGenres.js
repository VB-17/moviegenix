import { useQuery } from "react-query";
import { getGenres } from "../lib/requests";

export function useGenres() {
  return useQuery("genres", getGenres);
}
