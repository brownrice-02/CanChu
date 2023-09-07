import React from "react";
import Image1 from "next/image";
import AvatarBtn2 from "../BtnCmps/AvatarBtn";
import styles from "../../styles/DetailedPost.module.scss";

const DetailedPost = ({ postdata }) => {
  return (
    <div className={styles.container}>
      {/* 動態貼文 */}
      <div className={styles.post}>
        <div className={styles.info}>
          {/* <div className={styles.profilePicture}> */}
          <div
            className={`${styles.profilePicture} custom-profile`}
            style={{
              position: "relative",
              overflow: "hidden",
              width: "7vw",
              height: "7vw",
            }}
          >
            <AvatarBtn2
              // src = 'https://i.imgur.com/5NAGJfl.png' //test
              src={postdata.picture}
              alt="your picture"
              link="/"
            />
          </div>
          <div className={styles.friend}>
            {postdata.name}
            <div className={styles.timeAgo}>{postdata.created_at}</div>
          </div>
        </div>
        <div className={styles.postContent}>{postdata.context}</div>
      </div>
      {/* 按讚或分享 */}
      <div className={styles.interactions}>
        <div className={styles.buttons}>
          <button className={styles.likeBtn}>
            <img src="/heart.svg" alt="Heart" />
          </button>
          <button className={styles.shareBtn}>
            <img src="/comment.svg" alt="Heart" />
          </button>
        </div>
      </div>
      {/* 按讚或分享數的count */}
      <div className={styles.likeAndShare}>
        <div className={styles.likeCount}>
          <p>{postdata.like_count}人喜歡這則貼文</p>
        </div>
        <div className={styles.commentCount}>
          <p>{postdata.comment_count}則留言</p>
        </div>
      </div>
      {/* 朋友留言 */}
      <div className={styles.commentsFromFriends}>
        {postdata.comments.map((comment, index) => (
          <div className={styles.cmt} key={index}>
            <div
              className={`${styles.friendPicture} custom-comments`}
              style={{ width: "2.5vw", height: "2.5vw" }}
            >
              <AvatarBtn2
                src={comment.user.picture}
                alt="your picture"
                link="/"
              />
            </div>
            <div className={styles.friendCmtBox}>
              <div className={styles.friendCmt}>
                <p className={styles.friendCmtName}>{comment.user.name}</p>
                <p>{comment.content}</p>
              </div>
              <div>
                <p>{comment.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 自己留言 */}
      <div className={styles.comments}>
        <div
          className={`${styles.commentsProfile} custom-comments`}
          style={{
            position: "relative",
            overflow: "hidden",
            width: "5vw",
            height: "5vw",
          }}
        >
          <AvatarBtn2 src="/avatar.svg" alt="your picture" link="/" />
        </div>
        <button className={styles.messageContainer}>
          <p>留個言吧</p>
        </button>
      </div>
    </div>
  );
};

export default DetailedPost;
