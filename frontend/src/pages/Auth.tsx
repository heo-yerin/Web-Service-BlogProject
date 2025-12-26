// src/pages/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";

import axios from "axios";

export default function Auth() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((store) => store.setAuth);

  const [pageType, setPageType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");

  const handlePageChange= (type: string) => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setUsername("");
    setPageType(type);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 동작 차단(페이지새로고침방지)
    try {
      if (email === "" || password === "" || username === "") {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지않습니다.");
        return;
      }
      const { data } = await axiosInstance.post("/register", {
        email,
        password,
        username,
      });
      if (data) { // 응답으로 받은 data는 존재여부만체크(사용X)
        alert("회원가입을완료했습니다.\n로그인후이용해주세요.");
        // 상태값초기화및로그인탭으로화면전환
        setPassword("");
        setPasswordConfirm("");
        setUsername("");
        setPageType("login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message ?? "회원가입 중 오류가 발생했습니다."); // 에러발생시alert 로에러메시지만출력
      }
    }
  };

  const handleLogin= async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/login", {
        email,
        password,
      });
      console.log(data);
      // 받은data (JWT)정보를전역상태(zustand)에저장필요
      setAuth(data.user, data.accessToken);

      navigate("/"); // 로그인후메인페이지이동
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message ?? "로그인에 실패했습니다."); // 에러발생시alert 로에러메시지만출력}
      }
    }
  };

  return (
    <div className="page">
      <main className="page__main">
        <article className="page-auth">
          <section className="page-auth__container">
            <nav className="page-auth__toggle">
              <button
                type="button"
                className={`page-auth__toggle-button ${
                  pageType === "login" && "page-auth__toggle-button—active"
                }`}
                onClick={() => handlePageChange("login")}
              >
                로그인
              </button>

              <button
                type="button"
                className={`page-auth__toggle-button ${
                  pageType === "register" && "page-auth__toggle-button—active"
                }`}
                onClick={() => handlePageChange("register")}
              >
                회원가입
              </button>
            </nav>

            <div className="page-auth__form-section">
              {/* 로그인 폼 */}
              <form
                className={`auth-form ${
                  pageType === "login" && "auth-form--active"
                }`}
                onSubmit={handleLogin}
              >
                <label htmlFor="login-email" className="a11y-hidden">
                  이메일
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="auth-form__input"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="login-password" className="a11y-hidden">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="auth-form__input"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="auth-form__submit">
                  로그인
                </button>
              </form>

              {/* 회원가입 폼 */}
              <form
                className={`auth-form ${
                  pageType === "register" && "auth-form--active"
                }`}
                onSubmit={handleSignup}
              >
                <label htmlFor="signup-email" className="a11y-hidden">
                  이메일
                </label>
                <input
                  type="email"
                  id="signup-email"
                  className="auth-form__input"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="signup-name" className="a11y-hidden">
                  이름
                </label>
                <input
                  type="text"
                  id="signup-name"
                  className="auth-form__input"
                  placeholder="이름"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <label htmlFor="signup-password" className="a11y-hidden">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="auth-form__input"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label
                  htmlFor="signup-confirm-password"
                  className="a11y-hidden"
                >
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  className="auth-form__input"
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />

                <button type="submit" className="auth-form__submit">
                  회원가입
                </button>
              </form>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
