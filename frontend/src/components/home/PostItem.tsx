import { NavLink } from "react-router-dom";
import{format}from'date-fns';

export default function PostItem({
  // 게시글데이터를props 로전달받음
  id,
  title,
  category,
  username,
  thumbnail,
  desc,
  regdate,
}: Post) {
  return (
    <article className="posts-area__post">
      <NavLink to={`/read/${id}`} className="posts-area__post-link">
        <img src={thumbnail} alt={title} className="posts-area__post-image" />

        <em className="posts-area__post-tag">{category}</em>

        <h2 className="posts-area__post-title">
          {title}
        </h2>

        <p className="posts-area__post-meta">
          {username} • {format(regdate, "MMM dd, yyyy")}
        </p>
        <p className="posts-area__post-excerpt">{desc}</p>
      </NavLink>
    </article>
  );
}
