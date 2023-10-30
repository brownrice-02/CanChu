"use client";
import styles from "../../page.module.css";
import { Skeleton } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import useMyProfile from "../../../../components/Hooks/user/useMyProfile";
import useUserProfile from "../../../../components/Hooks/user/useUserProfile";
import usePosts from "../../../../components/Hooks/usePosts";
import usePostCreation from "../../../../components/Hooks/usePostCreation";
import useEditPost from "../../../../components/Hooks/useEditPost";
import useInfiniteScroll from "../../../../components/Hooks/useInfiniteScroll";
import axiosInstance from "../../api/axiosInstance";
import usePageAuthorization from "../../../../components/AuthCmps/usePageAuthorization";
import TopNav from "../../../../components/NavCmps/TopNav";
import ProfileSideNav from "../../../../components/NavCmps/ProfileSideNav";
import PersonalInfo from "../../../../components/PersonalInfo";
import CreatePost from "../../../../components/PostCmps/CreatePost";
import Post from "../../../../components/PostCmps/Post";
import { useSelector } from "react-redux";

export default function PersonalProfilePage({ params }) {
  const { user_id, access_token } = usePageAuthorization();
  const current_user_id = params.id;

  // Profile
  // 取得使用者的個人資訊
  useMyProfile(access_token, user_id);
  const myProfile = useSelector((state) => state.profile.myProfile);
  // console.log("My Profile: ", myProfile);
  // 取得對應 id 的個人資訊
  const { handleGetProfile } = useUserProfile(access_token, current_user_id);
  const currentUserProfile = useSelector((state) => state.profile.userProfile);
  // console.log("User Profile: ", currentUserProfile);

  // Post
  const {
    posts,
    updatePosts,
    next_cursor,
    isLoading: postsIsLoading,
  } = usePosts(access_token, current_user_id); // 取得貼文
  const { handlePostCreated } = usePostCreation(access_token, updatePosts); // 自己頁面能創建貼文
  const { handleEditPost } = useEditPost(access_token, updatePosts); // 編輯貼文
  const [isYourPage, setIsYourPage] = useState(false);

  useEffect(() => {
    if (current_user_id) {
      setIsYourPage(user_id === current_user_id); // 解決 id 一開始會是 undefined
    }
  }, [current_user_id, user_id]);

  // 用戶的 profile 更新 API
  const handleUpdateProfile = (UpdatedProfileData) => {
    axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
    axiosInstance
      .put("/users/profile", UpdatedProfileData)
      .then((put_response) => {
        if (put_response.status === 200) {
          console.log("PUT成功");
          // PUT 請求成功後，重新取得用戶的個人資料
          handleGetProfile();
        }
      })
      .catch((put_error) => {
        console.log("PUT失敗");
        alert("Error: " + put_error.message);
      });
  };

  // 「喜歡」按鈕點擊事件
  const handleLikeButtonClick = (postId) => {
    // 找出該貼文物件
    const post = posts.find((post) => post.id === postId);
    if (!post) return;

    // 暫時切換「喜歡」狀態，樂觀式 UI 更新
    post.is_liked = !post.is_liked;
    updatePosts(); // 建立副本的方式來更新

    if (post.is_liked) {
      // POST Like
      axiosInstance.defaults.headers.common["Authorization"] = access_token;
      axiosInstance
        .post(`/posts/${postId}/like`)
        .then((put_response) => {
          if (put_response.status === 200) {
            console.log(postId, "喜歡狀態更新成功");
          }
        })
        .catch((put_error) => {
          console.log(postId, "喜歡狀態更新失敗，回復臨時更新");
          post.is_liked = !post.is_liked;
          updatePosts();
          console.log(posts);
          alert("Error: " + put_error.message);
        });
    } else {
      // Delete Like
      axiosInstance.defaults.headers.common["Authorization"] = access_token;
      axiosInstance
        .delete(`/posts/${postId}/like`)
        .then((put_response) => {
          if (put_response.status === 200) {
            console.log(postId, "取消喜歡狀態成功");
          }
        })
        .catch((put_error) => {
          console.log(postId, "取消喜歡狀態失敗，回復臨時更新");
          post.is_liked = !post.is_liked;
          updatePosts();
          console.log(posts);
          alert("Error: " + put_error.message);
        });
    }
  };

  // Scroll and Trigger
  const handleLoadMorePosts = () => {
    updatePosts(next_cursor); // 將 next_cursor 傳遞給 updatePosts
  };
  useInfiniteScroll(handleLoadMorePosts, 500);

  return (
    <main className={styles.container}>
      <div className={styles.TopNav}>
        {myProfile ? <TopNav /> : <TopNav userdata={myProfile} />}
        <div>
          {!myProfile ? (
            <PersonalInfo />
          ) : (
            <PersonalInfo
              userdata={myProfile}
              // handleImageUpload={handleImageUpload}
              isYourPage={isYourPage}
            />
          )}
        </div>
      </div>
      <div className={styles.main} style={{ marginTop: "4%" }}>
        <div className={styles.sideNav}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* current_user_id */}
            {!currentUserProfile ? (
              <ProfileSideNav />
            ) : (
              <ProfileSideNav
                userdata={currentUserProfile}
                onProfileUpdated={handleUpdateProfile}
                isYourPage={isYourPage}
                friendship={currentUserProfile.friendship}
                handleGetProfile={handleGetProfile}
              />
            )}
          </div>
        </div>
        <div className={styles.postFlow}>
          <div>
            {isYourPage && (
              <CreatePost
                userdata={currentUserProfile}
                onPostCreated={handlePostCreated}
              />
            )}
          </div>
          {/*  posts.length === 0 && <h1>目前沒有貼文</h1> */}

          {postsIsLoading ? (
            // <div>Loading...</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1vw",
              }}
            >
              {posts &&
                posts.map((post) => (
                  <Post
                    key={post.id}
                    postdata={post}
                    userdata={myProfile}
                    condition={false}
                    edit={true}
                    onLikeButtonClick={handleLikeButtonClick}
                  />
                ))}
              <CircularProgress
                style={{
                  color: "gray",
                  marginTop: "1.5vw",
                  marginBottom: "1.5vw",
                }}
              />
              <Post />
            </div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                postdata={post}
                userdata={currentUserProfile}
                condition={false}
                edit={isYourPage ? true : false}
                onEditPost={handleEditPost}
                onLikeButtonClick={handleLikeButtonClick}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
