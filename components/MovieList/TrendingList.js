import { useTrendingMovies } from "../../hooks/useTrendingMovies";

import ListItem from "./ListItem";
import ListSlider from "./ListSlider";

function TrendingList() {
  const trending = useTrendingMovies();
  const { data } = trending;

  return (
    <ListSlider
      title={"Trending Now"}
      description={"All the movies which are trending this current week"}
      queryInfo={trending}
      slidePerPage={3.5}
    >
      {data && data.map((item) => <ListItem key={item.id} item={item} />)}
    </ListSlider>
  );
}

export default TrendingList;
