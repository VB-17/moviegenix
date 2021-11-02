import { useTopRatedMovies } from "../../hooks/useTopRatedMovies";
import QueryResult from "../QueryResult";

import List from "./List";
import ListItem from "./ListItem";

function TopRatedList() {
  const { data, isLoading, error } = useTopRatedMovies();
  return (
    <List
      title={"Top Rated"}
      description={"All the movies which are rated the highest on the charts"}
    >
      <QueryResult loading={isLoading} error={error} data={data}>
        {data &&
          data.map((item) => (
            <ListItem key={item.id} item={item} variant="secondary" />
          ))}
      </QueryResult>
    </List>
  );
}

export default TopRatedList;
