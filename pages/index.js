import SearchSection from "../components/Search/SearchSection";
import TrendingList from "../components/MovieList/TrendingList";
import TopRatedList from "../components/MovieList/TopRatedList";

export default function Home() {
  return (
    <section>
      <SearchSection />
      <TrendingList />
      <TopRatedList />
    </section>
  );
}
