"use client";
import usePageAuthorization from "../../../../components/AuthCmps/usePageAuthorization";
import { useState, useEffect } from "react";
import useProfile from "../../../../components/Hooks/user/useMyProfile";
import styles from "../../page.module.css";
import axiosInstance from "../../api/axiosInstance";
import TopNav from "../../../../components/NavCmps/TopNav";
import Post from "../../../../components/PostCmps/Post";

export default function Page({ params }) {
  const { user_id, access_token } = usePageAuthorization();
  const { profile } = useProfile(access_token, user_id);
  const [postflowData, setPostData] = useState([]);
  // console.log("postflowData", postflowData);
  const id = params.id;

  // GET Post
  const handleGetPost = () => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .get(`/posts/${id}`)
      .then((get_response) => {
        if (get_response.status === 200) {
          // console.log("取得貼文成功");
          setPostData(get_response.data.data.post);
          console.log("詳細貼文", get_response.data.data.post);
        }
      })
      .catch((get_error) => {
        // GET 請求失敗
        // console.log("取得貼文失敗");
        alert("Error: " + get_error.message);
      });
  };
  // 只在頁面載入時執行一次 GET
  useEffect(() => {
    handleGetPost();
  }, []);

  // Post Create Comment API
  const handleCreateComment = (commentData) => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
    axiosInstance
      .post(`/posts/${id}/comment`, commentData)
      .then((get_response) => {
        if (get_response.status === 200) {
          console.log("創建評論成功");
          handleGetPost();
        }
      })
      .catch((get_error) => {
        // GET 請求失敗
        console.log("創建評論失敗");
        alert("Error: " + get_error.message);
      });
  };

  return (
    <main className={styles.container}>
      <div className={styles.TopNav}>
        <TopNav userdata={profile} />
      </div>
      <div
        className={styles.main}
        style={{ marginTop: "24px", justifyContent: "center" }}
      >
        <div className={styles.postFlow}>
          {postflowData.comments ? ( // 處理有時候還沒獲得評論
            <Post
              postdata={postflowData}
              userdata={profile}
              condition={true}
              edit={false}
              // onLikeButtonClick={handleLikeButtonClick}
              onCreateComment={handleCreateComment}
            />
          ) : (
            <Post />
          )}
        </div>
      </div>
    </main>
  );
}
