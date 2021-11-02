import AutocompleteSearchInput from "./AutocompleteSearchInput";

function SearchSection() {
  return (
    <div className="relative flex items-center mb-14 w-full">
      <AutocompleteSearchInput />
      <h1 className="flex justify-end text-3xl flex-[0.5] font-extrabold uppercase text-gray-100">
        TMDB
      </h1>
    </div>
  );
}

export default SearchSection;
