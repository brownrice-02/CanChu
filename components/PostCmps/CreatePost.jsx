"use client";
import { useState } from "react";
import AvatarBtn from "../BtnCmps/AvatarBtn";
import styles from "../../styles/CreatePost.module.scss";
import { Skeleton } from "@material-ui/lab";

const CreatePost = ({ userdata, onPostCreated }) => {
  const [context, setContext] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 會送到後端的
    const contextData = {
      context: context,
    };

    // 呼叫註冊回調函式將使用者資料傳遞給父元件 (page.js)
    onPostCreated(contextData);
    setContext("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.info}>
          <div className={styles.userpic}>
            {userdata ? (
              userdata.picture ? (
                <AvatarBtn
                  src={userdata.picture}
                  alt="your picture"
                  link={`/users/${userdata.id}`}
                />
              ) : (
                <AvatarBtn
                  fill="true"
                  src="/avatar.svg"
                  alt="Avatar"
                  link={`/users/${userdata.id}`}
                />
              )
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
            <form onSubmit={handleFormSubmit}>
              <div className={styles.messageBox}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="說點什麼嗎？"
                  style={{
                    width: "100%",
                    height: "48px",
                  }}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>
              <div className={styles.messageContainerBtn}>
                <button type="submit">發布貼文</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
