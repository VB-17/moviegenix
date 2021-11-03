import { useTopRatedMovies } from "../../hooks/useTopRatedMovies";
import ListSlider from "./ListSlider";

import ListItem from "./ListItem";

function TopRatedList() {
  const topRated = useTopRatedMovies();
  const { data, isLoading, error } = topRated;

  return (
    <ListSlider
      title={"Top Rated"}
      description={"All the movies which are rated the highest on the charts"}
      queryInfo={topRated}
      slidePerPage={4.5}
    >
      {data &&
        data.map((item) => (
          <ListItem key={item.id} item={item} variant="secondary" />
        ))}
    </ListSlider>
  );
}

export default TopRatedList;
