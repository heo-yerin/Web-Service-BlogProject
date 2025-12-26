import { NavLink } from "react-router-dom";

export default function RecommendationItem({
   id, title, desc, thumbnail // 연관글관련데이터를props 로받음
}: Post) {
  return (
    <li>
      <NavLink to={`/read/${id}`}>
        <div className="page__recommend-list">
          <img src={thumbnail} alt={title} className="page__recommend-img" />
          <div>
            <h4 className="page__recommend-subtitle">
              {title}
            </h4>
            <p className="page__recommend-desc">
              {desc}
            </p>
          </div>
        </div>
      </NavLink>
    </li>
  );
}
