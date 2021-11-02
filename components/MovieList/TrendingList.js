import { useTrendingMovies } from "../../hooks/useTrendingMovies";
import QueryResult from "../QueryResult";

import List from "./List";
import ListItem from "./ListItem";

function TrendingList() {
  const { data, isLoading, error } = useTrendingMovies();
  return (
    <List
      title={"Trending Now"}
      description={"All the movies which are trending this current week"}
    >
      <QueryResult loading={isLoading} error={error} data={data}>
        {data && data.map((item) => <ListItem key={item.id} item={item} />)}
      </QueryResult>
    </List>
  );
}

export default TrendingList;
