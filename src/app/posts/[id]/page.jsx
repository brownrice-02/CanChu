"use client";
import usePageAuthorization from "../../../../components/AuthCmps/usePageAuthorization";
import { useState, useEffect } from "react";
import useProfile from "../../../../components/Hooks/user/useMyProfile";
import styles from "../../page.module.css";
import TopNav from "../../../../components/NavCmps/TopNav";
import Post from "../../../../components/PostCmps/Post";
import usePost from "../../../../components/Hooks/post/usePost";
import useLeaveComment from "../../../../components/Hooks/post/useLeaveComment";

export default function Page({ params }) {
  const { user_id, access_token } = usePageAuthorization();
  const { profile } = useProfile(access_token, user_id);
  const id = params.id;

  // GET Post
  const { postData, updatePost } = usePost(id, access_token);

  // Post Create Comment API
  const leaveComment = useLeaveComment(id, access_token, updatePost);

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
          {postData && (
            <Post
              postdata={postData}
              userdata={profile}
              condition={true}
              edit={false}
              // onLikeButtonClick={handleLikeButtonClick}
              onCreateComment={leaveComment}
            />
          )}
        </div>
      </div>
    </main>
  );
}
