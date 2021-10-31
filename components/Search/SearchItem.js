import Image from "next/image";
import { IMAGE_THUMB_BASE } from "../../lib/constants";

function SearchItem({ item }) {
  const { title, release_year, backdrop_path } = item;

  return (
    <div className="flex space-x-5 pb-5 items-center cursor-pointer">
      <div className="relative h-14 w-20 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={
            backdrop_path
              ? `${IMAGE_THUMB_BASE}${backdrop_path}`
              : "https://via.placeholder.com/150"
          }
          alt="hello"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="flex flex-1 overflow-hidden flex-col space-y-2">
        <h2 className="w-8/12 text-gray-100 truncate">
          {title} {release_year && `(${release_year})`}
        </h2>
        <h2 className="text-gray-300">{}</h2>
      </div>
    </div>
  );
}

export default SearchItem;
