import { IMAGE_BASE } from "../../lib/constants";
import { AiFillStar } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";

function ListItem({ item, variant = "primary" }) {
  let textWidth = "";
  let cardDimensions = "";
  let imageSrc = "";

  switch (variant) {
    case "primary":
      textWidth = "w-10/12";
      cardDimensions = "h-64 w-96";
      imageSrc = item.backdrop_path
        ? `${IMAGE_BASE}${item.backdrop_path}`
        : "https://via.placeholder.com/250";
      break;

    case "secondary":
      textWidth = "w-64";
      cardDimensions = "h-80 w-64";
      imageSrc = item.poster_path
        ? `${IMAGE_BASE}${item.poster_path}`
        : "https://via.placeholder.com/250";
      break;

    case "tertiary":
      textWidth = "w-64";
      cardDimensions = "h-96 w-64";
      imageSrc = item.backdrop_path
        ? `${IMAGE_BASE}${item.backdrop_path}`
        : item.poster_path
        ? `${IMAGE_BASE}${item.poster_path}`
        : "https://via.placeholder.com/250";

      break;

    default:
      throw new Error(`Invalid variant type ${variant}`);
  }

  return (
    <Link href={`/movie/${item.id}`}>
      <div key={item.title} className="flex flex-col space-y-4 cursor-pointer">
        <div
          className={`relative ${cardDimensions} rounded-3xl overflow-hidden shadow-lg`}
        >
          <Image
            src={imageSrc}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="flex truncate flex-col space-y-3 ml-2">
          <h2
            className={`${textWidth} text-gray-200 truncate font-semibold text-xl`}
          >
            {item.title}
          </h2>
          {variant !== "tertiary" && (
            <h3 className="text-sm font-normal text-gray-300">
              {item.release_year} · {item.genres.slice(0, 2).join(" | ")}
            </h3>
          )}
          <h3 className="flex items-center space-x-2">
            <AiFillStar className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-normal text-gray-400">
              {item.vote_average.toFixed(1)} ({item.vote_count})
            </span>
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
