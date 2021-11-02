import { useLocalStorage } from "../hooks/useLocalStorage";
import ListItem from "../components/MovieList/ListItem";

function Bookmarks() {
  const [bookmarkList] = useLocalStorage("bookmarks");

  return (
    <div>
      <h1 className="text-4xl mb-16 font-semibold text-gray-50">Bookmarks</h1>
      <div className="flex flex-wrap gap-14">
        {bookmarkList?.map((movie) => (
          <ListItem key={movie.id} item={movie} />
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;
