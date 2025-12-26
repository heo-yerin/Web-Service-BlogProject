import ReadArea from "../components/read/ReadArea";
import RecommendationArea from "../components/read/RecommendationArea";

export default function Read() {
  return (
    <div className="page">
      <main className="page__main">
        {/* ReadArea */}
        <ReadArea />
        {/* RecommendationArea */}
        <RecommendationArea />
      </main>
    </div>
  );
}
