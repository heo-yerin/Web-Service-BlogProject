import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";

import axios from "axios";

export default function Write() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string| null>(null);
  const [desc, setDesc] = useState<string>("");

  const encodeFileToBase64= (image: File) => {
    return new Promise((resolve, reject) => {
      const reader= new FileReader();
      // FileReader에게이파일을Base64 형식으로읽도록
      reader.readAsDataURL(image);
      // 파일읽기가성공적으로끝났을때호출되는콜백
      reader.onload= (event) => {
        const target = event.target as FileReader| null;
        if (target && target.result) {
          // Promise를성공(resolve)시키면서base64 데이터(URL 문자열)를넘겨줌
          resolve(target.result);
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror= (error) => reject(error);
    });
  };

  const handleFileChange= async(
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (event.target.files&& event.target.files[0]) || null;
    if (!file) return;
    const convertedFile= await encodeFileToBase64(file);
    setThumbnail(convertedFile as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로 고침 방지
    try {
      if (!title || !category || !thumbnail || !desc || !username) {
        alert("입력 값이누락되었습니다.");
        return;
      }
      const { status } = await axiosInstance.post("/posts", {
        title,
        category,
        thumbnail,
        desc,
        username,
      });
      if (status === 201) {
        alert("글이 등록되었습니다.");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message ?? "오류가 발생했습니다."); //에러메시지alert 출력
      }
    };
  }

  return (
    <div className="page">
      <main className="page__main">
        <div className="page__write">
          <h2 className="page__write-text">새로운 글 작성</h2>

          <form onSubmit={handleSubmit}>
            <div className="page__write-form">
              <div className="page__write-group">
                <label htmlFor="title" className="page__write-label">
                  제목
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="page__write-input"
                  placeholder="Type product name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="page__write-label">
                  카테고리
                </label>
                <select 
                  id="category" 
                  className="page__write-select" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} 
                  required
                >
                  <option value="">Select category</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Life">Life</option>
                </select>
              </div>

              <div>
                <label htmlFor="writer" className="page__write-label">
                  작성자
                </label>
                <input
                  type="text"
                  name="writer"
                  id="writer"
                  className="page__write-input"
                  placeholder="Type product name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="page__write-group">
                <div>
                  <label htmlFor="item-weight" className="page__write-label">
                    썸네일
                  </label>

                  <label className="page__write-file--hidden" htmlFor="user_avatar">
                    Upload file
                  </label>

                  <input
                    className="page__write-file"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*" 
                    required
                  />

                  {thumbnail && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={thumbnail}
                        alt="thumbnail preview"
                        style={{ width: "160px", borderRadius: "8px" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="page__write-group">
                <label htmlFor="description" className="page__write-label">
                  내용
                </label>
                <textarea
                  id="description"
                  className="page__write-textarea"
                  placeholder="Your description here"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className="page--btn">
              글등록
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
