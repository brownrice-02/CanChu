"use client";
import usePageAuthorization from "../../components/AuthCmps/usePageAuthorization";
import { useState, useEffect } from "react";
import useProfile from "../../components/Hooks/user/useMyProfile";
import usePosts from "../../components/Hooks/post/usePosts";
import usePostCreation from "../../components/Hooks/post/usePostCreation";
import useInfiniteScroll from "../../components/Hooks/useInfiniteScroll";
import { Skeleton } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import styles from "./page.module.css";
import axiosInstance from "../../src/app/api/axiosInstance";
import TopNav from "../../components/NavCmps/TopNav";
import HomeSideNav from "../../components/NavCmps/HomeSideNav";
import CreatePost from "../../components/PostCmps/CreatePost";
import Post from "../../components/PostCmps/Post";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { user_id, access_token } = usePageAuthorization();

  // GET myProfile
  useProfile(access_token, user_id);
  const profileData = useSelector((state) => state.profile.myProfile);
  // console.log("Redux 出 profile: ", profileData);

  // GET posts
  usePosts(access_token);
  const postsData = useSelector((state) => state.posts.posts);
  const next_cursor = useSelector((state) => state.posts.next_cursor);
  const { updatePosts, isLoading: postsIsLoading } = usePosts(access_token);

  const { handlePostCreated } = usePostCreation(access_token, updatePosts); // 創建貼文
  const [friendList, setfriendList] = useState(null);
  const [pendingList, setPendingList] = useState(null);

  // 取得朋友列表
  const handleGetFriendList = () => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .get("/friends/")
      .then((friendList_response) => {
        if (friendList_response.status === 200) {
          setfriendList(friendList_response.data.data.users);
          // console.log("取得朋友列表");
          // console.log(friendList_response.data.data.users);
        }
      })
      .catch((friendList_error) => {
        console.log("連接失敗2");
        alert("Error: " + friendList_error.message);
      });
  };
  useEffect(() => {
    handleGetFriendList();
  }, []);

  // 取得 pending（朋友）列表
  const handleGetPendingList = () => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .get("/friends/pending")
      .then((pendingList_response) => {
        if (pendingList_response.status === 200) {
          setPendingList(pendingList_response.data.data.users);
          // console.log("pending 列表");
          // console.log(pendingList_response.data.data.users);
        }
      })
      .catch((pendingList_error) => {
        // console.log("取得pending列表失敗");
        // alert("Error: " + pendingList_error.message);
      });
  };
  useEffect(() => {
    handleGetPendingList();
  }, []);

  // // Scroll and Trigger
  const handleLoadMorePosts = () => {
    updatePosts(next_cursor); // 將 next_cursor 傳遞給 updatePosts
  };
  useInfiniteScroll(handleLoadMorePosts, 500);

  return (
    <main className={styles.container}>
      {/* <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1> // try Tailwind */}
      <div className={styles.topNav}>
        <TopNav />
      </div>
      <div className={styles.main}>
        <div className={styles.sideNav}>
          {pendingList ? (
            pendingList && (
              <HomeSideNav
                friendList={friendList}
                pendingList={pendingList}
                handleGetFriendList={handleGetFriendList}
                handleGetPendingList={handleGetPendingList}
              />
            )
          ) : (
            <HomeSideNav friendList={friendList} />
          )}
        </div>
        <div className={styles.postFlow}>
          <></>
          <CreatePost onPostCreated={handlePostCreated} />
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
              {/* 添加此段來處理取得下一組貼文時，能維持原本貼文 */}
              {postsData &&
                postsData.map((post) => (
                  <Post
                    key={post.id}
                    postdata={post}
                    userdata={profileData}
                    condition={false}
                    edit={false}
                    // onLikeButtonClick={handleLikeButtonClick}
                  />
                ))}
              {/* Loading 圓圈圈 */}
              <CircularProgress
                style={{
                  color: "gray",
                  marginTop: "1.5vw",
                  marginBottom: "1.5vw",
                }}
              />
              {/* 裡面有照片與文字的 Skeleton 處理 */}
              <Post />
            </div>
          ) : (
            postsData.map((post) => (
              <Post
                key={post.id}
                postdata={post}
                userdata={profileData}
                condition={false}
                edit={false}
                // onLikeButtonClick={handleLikeButtonClick}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
