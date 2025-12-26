import SearchArea from "../components/home/SearchArea";
import PostArea from "../components/home/PostArea";

export default function Home() {
  return (
    <div className="page">
      <main className="page__main">
        {/* Search */}
        <SearchArea />

        {/* PostArea */}
        <PostArea />
      </main>
    </div>
  );
}
