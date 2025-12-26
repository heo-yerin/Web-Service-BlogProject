import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { useAuthStore } from "../../stores/useAuthStore";
import axios from "axios";
import RecommendationArea from "./RecommendationArea";

export default function ReadArea() {
  const navigate = useNavigate();

  const params = useParams(); // 동적세그먼트(:id)
  const user = useAuthStore((store) => store.user);
  const {
    data: { category, title, username, thumbnail, desc, author, regdate}, 
    isLoading, 
    error,
  } = useAxios<Post>(`/posts/${params.id}`, {} as Post);

  const handleDelete= async() => {
    try {
      const { status } = await axiosInstance.delete(`/posts/${params.id}`);
      if (status === 204) {
        alert("삭제되었습니다.");
        navigate("/");
      } else {
        throw new Error("삭제에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message ?? "삭제에 실패했습니다.");//에러메시지alert 로출력
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <article className="page__read">
        <section>
          <strong className="page__read-tag">{category}</strong>
          <h2 className="page__read-title">{title}</h2>

          <div className="page__read-meta-group">
            <p className="page__read-profile">{username} • {format(regdate, "MMM dd, yyyy")}</p>
            {user?.email=== author && (
              <button className="page__read-btn" onClick={handleDelete}>
                삭제
              </button>
            )}
          </div>

          <img src={thumbnail} alt={title} className="page__read-image" />
        </section>

        <section className="page__read-desc">
          <p>
            {desc}
          </p>
        </section>
      </article>
      <RecommendationArea />
    </>
  );
}
