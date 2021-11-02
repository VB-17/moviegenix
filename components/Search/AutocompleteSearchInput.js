import { useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { FiSearch } from "react-icons/fi";
import { useSearch } from "../../hooks/useSearch";
import SearchItem from "./SearchItem";

function AutocompleteSearchInput() {
  const autoCompleteRef = useRef();
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading } = useSearch(search);

  return (
    <div className="relative flex-1 flex-col">
      <div className="relative flex flex-1 items-center">
        <FiSearch className="absolute -top-[1px] left-4 h-6 w-6 text-gray-300" />
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder={`Search Your Movie`}
          className="placeholder-gray-300 w-full text-gray-300 bg-dark-600 h-14 px-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsVisible(true)}
          onBlur={() => setTimeout(() => setIsVisible(false), 200)}
        />
      </div>

      {!isLoading && data && isVisible && (
        <div
          ref={autoCompleteRef}
          className="z-50 absolute mt-2 rounded-lg h-auto max-h-64 overflow-y-auto p-7 w-full bg-dark-600"
        >
          {data?.map((item, idx) => (
            <SearchItem key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteSearchInput;
