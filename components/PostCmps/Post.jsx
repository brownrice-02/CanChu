"use client";
import { useState } from "react";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import Image from "next/image";
import AvatarBtn from "../BtnCmps/AvatarBtn";
import styles from "../../styles/Post.module.scss";

const Post = ({
  postdata,
  userdata,
  condition,
  edit,
  onEditPost,
  onLikeButtonClick,
  onCreateComment,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const [liked, setLiked] = useState(postdata ? postdata.is_liked : false); // 臨時 liked 狀態
  const [context, setContext] = useState(postdata ? postdata.context : ""); // 編輯貼文
  const [content, setContent] = useState(""); // 留言

  // 貼文編輯模式
  const handleEditModeClick = () => {
    setIsEdit(true);
    setIsHovered(true);
  };

  // 編輯貼文
  const handlePostSubmit = (event) => {
    event.preventDefault(); // 阻止表單預設提交行為
    onEditPost(postdata.id, context);
    setIsEdit(false);
  };

  // 處理「喜歡」按鈕點擊事件
  const handleLikeClick = () => {
    setLiked(!liked); // 暫時切換「喜歡」狀態，樂觀式 UI 更新
    onLikeButtonClick(postdata.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      content: content,
    };
    onCreateComment(commentData);
    setContent("");
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {edit &&
        isHovered && ( // 判斷是否要顯示編輯按鈕
          <div
            className={styles.editButtonContainer}
            onClick={handleEditModeClick}
          >
            <button>
              <Image src="/write.svg" alt="編輯" fill={true} />
            </button>
          </div>
        )}

      {/* 動態貼文 */}
      <div className={styles.post}>
        <div className={styles.info}>
          {/* <div className={styles.profilePicture}> */}
          <div className={styles.userpic}>
            {postdata ? (
              <AvatarBtn
                // src = 'https://i.imgur.com/5NAGJfl.png' //test
                src={postdata.picture}
                alt="your picture"
                link={`/users/${postdata.user_id}`}
              />
            ) : (
              <Skeleton
                variant="circle"
                width="100%"
                height="100%"
                style={{ backgroundColor: "lightgray" }}
              />
            )}
          </div>
          <div className={styles.friend}>
            {postdata ? (
              postdata.name
            ) : (
              <Skeleton variant="text" width={80} animation="wave" />
            )}
            <div className={styles.timeAgo}>
              {postdata ? (
                <Link href={`/posts/${postdata.id}`}>
                  {postdata.created_at}
                </Link>
              ) : (
                <Skeleton variant="text" width={80} animation="wave" />
              )}
            </div>
          </div>
        </div>
        {isedit ? (
          <form
            className={styles.postEditContentBox}
            onSubmit={handlePostSubmit}
          >
            <textarea
              rows="4"
              wrap="soft"
              className={styles.postEditContent}
              value={context}
              onChange={(e) => setContext(e.target.value)}
            ></textarea>
            <div className={styles.buttonBox}>
              <button className={styles.confirmBtn} type="submit">
                確認
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsEdit(false)}
              >
                取消
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.postContent}>
            {postdata ? (
              postdata.context
            ) : (
              <Skeleton variant="text" width={80} animation="wave" />
            )}
          </div>
        )}
      </div>
      {/* 按讚或分享 */}
      <div className={styles.interactions}>
        <div className={styles.buttons}>
          <button className={styles.likeBtn} onClick={handleLikeClick}>
            {liked ? (
              <Image src="/heart.svg" alt="liked" fill={true} />
            ) : (
              <div className={styles.unliked}>
                <Image src="/unheart.svg" alt="unliked" fill={true} />
              </div>
            )}
          </button>
          <button className={styles.shareBtn}>
            {postdata && (
              <Link href={`/posts/${postdata.id}`}>
                <Image src="/comment.svg" alt="Comment" fill={true} />
              </Link>
            )}
          </button>
        </div>
      </div>
      {/* 按讚或分享數的count */}
      <div className={styles.likeAndShare}>
        <button className={styles.likeCount}>
          {postdata && (
            <Link href={`/posts/${postdata.id}`}>
              <p>{postdata.like_count}人喜歡這則貼文</p>
            </Link>
          )}
        </button>
        <button className={styles.commentCount}>
          {postdata && (
            <Link href={`/posts/${postdata.id}`}>
              <p>{postdata.comment_count}則留言</p>
            </Link>
          )}
        </button>
      </div>

      {/* 首頁會隱藏朋友留言 */}
      {condition && postdata.comments !== null ? (
        <div className={styles.commentsFromFriends}>
          {postdata.comments.map((comment, index) => (
            <div className={styles.cmt} key={index}>
              <div
                className={`${styles.friendPicture} custom-comments`}
                style={{ width: "2.5vw", height: "2.5vw" }}
              >
                <AvatarBtn
                  src={comment.user.picture}
                  alt="user picture"
                  link={`/users/${comment.user.id}`}
                />
              </div>
              <div className={styles.friendCmtBox}>
                <div className={styles.friendCmt}>
                  <a href={`/users/${comment.user.id}`}>
                    <p className={styles.friendCmtName}>{comment.user.name}</p>
                  </a>
                  <p>{comment.content}</p>
                </div>
                <div>
                  <p>{comment.created_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* 自己的留言框 */}
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
          {userdata ? (
            <AvatarBtn src={userdata.picture} alt="your picture" link="/" />
          ) : (
            <Skeleton
              variant="circle"
              width="100%"
              height="100%"
              style={{ backgroundColor: "lightgray" }}
            />
          )}
        </div>
        <div className={styles.messageContainer}>
          {condition ? (
            <form
              style={{ display: "flex", width: "100%", alignItems: "center" }}
              onSubmit={handleCommentSubmit}
            >
              <input
                type="text"
                placeholder="留個言吧"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit"></button>
            </form>
          ) : (
            <>
              {postdata && (
                <Link href={`/posts/${postdata.id}`}>
                  <input type="text" placeholder="留個言吧" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
