import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import RecommendationItem from "./RecommendationItem";

export default function RecommendationArea() {
  const params = useParams();

  const { data, isLoading, error } = useAxios<Post[]>(
    `/posts/${params.id}/related`,
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (data.length === 0) return null; // 받아온 배열 길이 0인 경우 null 리턴

  return (
    <article className="page__recommend">
      <h3 className="page__recommend-title">Recommend Reading</h3>

      <ul className="page__recommend-lists">
        {data &&
          data.map((post) => <RecommendationItem key={post.id} {...post} />)}
      </ul>
    </article>
  );
}
