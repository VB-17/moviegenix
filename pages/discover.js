import { useState } from "react";
import ListItem from "../components/MovieList/ListItem";
import QueryResult from "../components/QueryResult";
import SearchSection from "../components/Search/SearchSection";
import { useDiscoverData } from "../hooks/useDiscoverData";
import { genreDetails } from "../lib/utils";

function Discover() {
  const [currentGenreID, setCurrentGenreID] = useState(1);
  const { data, isLoading, error } = useDiscoverData(currentGenreID);

  return (
    <div>
      <SearchSection />
      <div className="flex space-x-8">
        {Object.entries(genreDetails).map(([key, value]) => (
          <button
            key={value}
            onClick={() => setCurrentGenreID(value)}
            className="py-3 px-8 rounded-full bg-dark-200 text-gray-100 hover:bg-dark-300 focus:outline-none focus:ring-3 focus:ring-gray-400 "
          >
            {key}
          </button>
        ))}
      </div>
      <div className="mt-20 flex flex-wrap gap-14">
        <QueryResult data={data} loading={isLoading} error={error}>
          {data?.map((item) => (
            <ListItem key={item.id} item={item} variant="tertiary" />
          ))}
        </QueryResult>
      </div>
    </div>
  );
}

export default Discover;
