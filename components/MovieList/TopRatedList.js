import { useTopRatedMovies } from "../../hooks/useTopRatedMovies";
import { IMAGE_BASE } from "../../lib/constants";
import { AiFillStar } from "react-icons/ai";
import QueryResult from "../QueryResult";

import List from "./List";
import Image from "next/image";

function TopRatedList() {
  const { data, isLoading, error } = useTopRatedMovies();
  return (
    <List
      title={"Top Rated"}
      description={"All the movies which are rated the highest on the charts"}
    >
      <QueryResult loading={isLoading} error={error} data={data}>
        {data?.map((item) => {
          return (
            <div
              key={item.title}
              className="flex flex-col space-y-4 cursor-pointer"
            >
              <div className="relative h-80 w-64 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={`${IMAGE_BASE}${item.poster_path}`}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="flex  flex-col space-y-3 ml-2">
                <h2 className="w-64 truncate text-gray-200 font-semibold text-xl ">
                  {item.title}
                </h2>
                <h3 className="text-sm font-normal text-gray-300">
                  {item.release_year} · {item.genres.slice(0, 2).join(" | ")}
                </h3>
                <h3 className="flex items-center space-x-2">
                  <AiFillStar className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm font-normal text-gray-400">
                    {item.vote_average.toFixed(1)} ({item.vote_count})
                  </span>
                </h3>
              </div>
            </div>
          );
        })}
      </QueryResult>
    </List>
  );
}

export default TopRatedList;
