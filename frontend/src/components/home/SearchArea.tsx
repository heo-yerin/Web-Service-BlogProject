import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../../assets/images/images";

export default function SearchArea() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const debounceTimer= useRef<null | number>(null);
  useEffect(() => {
    if (debounceTimer.current) {
      // 이전타이머취소
      clearTimeout(debounceTimer.current); 
    }
    debounceTimer.current= setTimeout(() => {
      // 디바운스: 입력300ms 후에검색수행
      navigate(query ? "?q=" + query : "/");
    }, 300);
    return () => {
      // 클린업: 컴포넌트언마운트시타이머취소
      if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      }
    };
  }, [query, navigate]); // query가변경될때마다실행

  return (
    <section className="search-area">
      <article className="search-area__search">
        <h2 className="search-area__title">Blog Project</h2>
        <p className="search-area__description">
          A Blog About Food, Experience, and Recipes.
        </p>

        <form method="get" className="search-area__form">
          <input
            type="text"
            name="q"
            placeholder="Search"
            className="search-area__input"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-area__submit">
            <img
              src={search}
              alt="search-icon"
              className="search-area__icon"
            />
          </button>
        </form>
      </article>
    </section>
  );
}
