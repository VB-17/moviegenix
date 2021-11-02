import { useLocalStorage } from "../hooks/useLocalStorage";
import { BsFillBookmarkFill } from "react-icons/bs";
import ListItem from "../components/MovieList/ListItem";
import Link from "next/link";

function Bookmarks() {
  const [bookmarkList] = useLocalStorage("bookmarks");

  return (
    <div className="flex flex-col min-h-[calc(100vh-4.5rem)]">
      <h1 className="text-4xl mb-16 font-semibold text-gray-50">Bookmarks</h1>
      <div className="flex flex-1 flex-wrap gap-14">
        {bookmarkList && bookmarkList.length > 0 ? (
          bookmarkList?.map((movie) => <ListItem key={movie.id} item={movie} />)
        ) : (
          <div className="flex flex-col space-y-10 w-full items-center justify-center">
            <div className="flex flex-col space-y-5 text-center">
              <BsFillBookmarkFill className="mx-auto mb-5 text-gray-100 w-20 h-20" />
              <div className="flex flex-col space-y-3">
                <h2 className="text-3xl font-semibold text-gray-200">
                  No bookmarks yet!
                </h2>
                <p className="mx-auto text-md max-w-sm font-normal text-gray-300">
                  Looks like you haven't bookmarked anything yet. Go Ahead and
                  browse.
                </p>
              </div>
            </div>
            <Link href={`/`}>
              <button className="w-64 px-5 py-3 rounded-full bg-dark-200 text-gray-100 ">
                Go Back to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
