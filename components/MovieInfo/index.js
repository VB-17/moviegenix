import { useMovieInfo } from "../../hooks/useMovieInfo";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IMAGE_BASE } from "../../lib/constants";
import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";

import QueryResult from "../QueryResult";

import Image from "next/image";
import Link from "next/link";
import ListItem from "../MovieList/ListItem";
import List from "../MovieList/List";
import { useEffect, useState } from "react";

function MovieInfo({ movieId }) {
  const { data, isLoading, error } = useMovieInfo(movieId);
  const [bookmarkList, setBookmarkList] = useLocalStorage("bookmarks", []);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const isPresent =
        bookmarkList.findIndex((movie) => movie.id === Number(movieId)) !== -1;
      return isPresent;
    } catch (err) {
      console.log(err);
      return false;
    }
  });

  useEffect(() => {
    setIsBookmarked(
      bookmarkList.findIndex((movie) => movie.id === Number(movieId)) !== -1
    );
  }, [movieId]);

  const onToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      const genres = data.genres.map((info) => info.name);
      const release_year = data.release_date.split("-")[0];

      setBookmarkList([...bookmarkList, { ...data, genres, release_year }]);
    } else {
      const newList = bookmarkList.filter(
        (movie) => movie.id !== Number(movieId)
      );
      setBookmarkList([...newList]);
    }
  };

  return (
    <div>
      <QueryResult loading={isLoading} error={error} data={data}>
        {data && (
          <div className="grid grid-cols-8 w-10/12 gap-14">
            <div className="relative col-span-3 flex-[0.25] h-[30rem] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src={
                  data.poster_path
                    ? `${IMAGE_BASE}${data.poster_path}`
                    : "https://via.placeholder.com/250/300"
                }
                alt="hello"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="col-span-5 ml-6 flex-col space-y-5">
              <div className="flex justify-between">
                <h1 className="text-4xl font-semibold text-gray-200">
                  {data.title}
                </h1>
                <h2 className="flex space-x-4 items-center">
                  <AiFillStar className="h-6 w-6 text-yellow-400" />
                  <span className="text-xl text-gray-100">
                    {data.vote_average.toFixed(1)}
                  </span>
                </h2>
              </div>
              <p className="text-md text-gray-400 leading-7">{data.overview}</p>
              <div className="flex space-x-4">
                {data.genres.map(({ name }, idx) => (
                  <p
                    key={idx}
                    className="text-sm py-1 px-4 rounded-full bg-dark-500 text-gray-300"
                  >
                    {name}
                  </p>
                ))}
              </div>
              <div className="flex space-x-8">
                <Link href={`https://www.imdb.com/title/${data.imdb_id}`}>
                  <a target="_blank" rel="noreferrer">
                    <button className="flex items-center mt-10 space-x-2 h-14 px-10 rounded-full bg-gray-100 text-dark-200 font-semibold self-start hover:bg-gray-200 focus:outline-none focus:ring-3 focus:ring-gray-400 focus:ring-opacity-50">
                      <AiFillPlayCircle className="h-8 w-8" />
                      <span>Watch Now</span>
                    </button>
                  </a>
                </Link>
                <button
                  onClick={onToggle}
                  className="mt-10 px-4 active:scale-95 hover:scale-105 transition-transform duration-150 bg-dark-200 rounded-xl text-gray-100 hover:bg-dark-300 focus:outline-none focus:ring-3 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  {isBookmarked ? (
                    <BsFillBookmarkCheckFill className="font-bold h-6 w-6" />
                  ) : (
                    <BsBookmark className="font-bold h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </QueryResult>

      <div className="mt-24">
        <List title={"Recommended Movies"}>
          <QueryResult loading={isLoading} error={error} data={data}>
            {data &&
              data?.recommended.map((item) => (
                <ListItem key={item.id} item={item} variant="secondary" />
              ))}
          </QueryResult>
        </List>
      </div>
    </div>
  );
}

export default MovieInfo;
