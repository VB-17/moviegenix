import { useRouter } from "next/router";
import MovieInfo from "../../components/MovieInfo";
import SearchSection from "../../components/Search/SearchSection";

function Movie() {
  const {
    query: { id },
  } = useRouter();

  return (
    <div>
      <SearchSection />
      <MovieInfo movieId={id} />
    </div>
  );
}

export default Movie;
