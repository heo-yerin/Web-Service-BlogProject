import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";

import axios from "axios";

export default function Header() {
  const navigate = useNavigate();

  const user = useAuthStore((store) => store.user);
  const unsetAuth = useAuthStore((store) => store.unsetAuth);

  const handleLogout= async() => {
    try {
      const { status } = await axiosInstance.post("/logout");
      if (status === 200) {
        // 로그아웃성공→zustand상태값초기화
        unsetAuth();
        alert("로그아웃되었습니다.");
        navigate("/");
      } else {
        throw new Error("로그아웃에실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message ?? "로그아웃 중 오류가 발생했습니다."); // 에러메시지alert 로출력
      }
    }
  };

  return (
    <header className="page__header">
      <h1 className="page__logo">
        <NavLink to="/" className="page__logo-link">
          JBNU
        </NavLink>
      </h1>

      <nav className="page__navigation">
        <ul className="page__nav-list">
          <li className="page__nav-item">
            <NavLink to="/write" className="page__nav-link">
              글쓰기
            </NavLink>
          </li>
          <li className="page__nav-item">
            {user ? (
              <button type="button" className="page__nav-link" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <NavLink to="/auth" className="page__nav-link">
                인증
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}