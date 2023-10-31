"use client";
import { useState } from "react";
import usePageAuthorization from "../../components/AuthCmps/usePageAuthorization";
import axiosInstance from "../../src/app/api/axiosInstance";
import styles from "../../styles/ProfileSideNav.module.scss";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import useUpdateProfile from "../Hooks/user/useUpdateProfile";

const ProfileSideNav = ({
  // onProfileUpdated,
  isYourPage,
  friendship,
  // handleGetProfile,
  // a
}) => {
  const userdata = useSelector((state) => state.profile.userProfile);
  const { access_token } = usePageAuthorization();
  const [isLoginMode, setLoginMode] = useState(true); // true 為一般模式，這是指編輯貼文的，抱歉我之後會改名
  const [introduction, setIntroduction] = useState("");
  const [tags, setTags] = useState("");
  const { updateProfile } = useUpdateProfile();

  // 一般與修改模式切換用
  const handleSwitchMode = () => {
    setLoginMode(!isLoginMode);
    setIntroduction(""); // 表單送出後能重置
    setTags(""); // 表單送出後能重置
  };

  // 表單送出修改個人資料
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 會送到後端的
    const updatedProfileData = {
      // name: userdata.name,
      ...userdata, // 複製原始資料
      introduction,
      tags,
    };

    updateProfile(updatedProfileData);
  };

  // 送出好友邀請
  const handleFriendRquest = () => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .post(`/friends/${userdata.id}/request`)
      .then((post_friend_request) => {
        if (post_friend_request.status === 200) {
          console.log("送出好友邀請成功");
          // handleGetProfile();
        }
      })
      .catch((post_error) => {
        console.log("送出好友邀請失敗");
        alert("Error: " + post_error.message);
      });
  };

  // 接受好友邀請
  const handleFriendshipRequestAgree = () => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .post(`/friends/${friendship.id}/agree`)
      .then((post_friendship_agree) => {
        if (post_friendship_agree.status === 200) {
          console.log("接受好友邀請成功");
          setProfileData(post_friendship_agree.data);
          // handleGetProfile();
        }
      })
      .catch((friendship_agree_error) => {
        console.log("接受好友邀請失敗");
        alert("Error: " + friendship_agree_error.message);
      });
  };

  // 刪除好友邀請
  const handleFriendshipRequestDelete = () => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .delete(`/friends/${friendship.id}`)
      .then((delete_friendship_request) => {
        if (delete_friendship_request.status === 200) {
          console.log("刪除好友邀請成功");
          // handleGetProfile();
        }
      })
      .catch((delete_friendship_request_error) => {
        console.log("刪除好友邀請失敗");
        alert("Error: " + delete_friendship_request_error.message);
      });
  };

  return (
    <>
      <div className={styles.sideNav}>
        {isYourPage ? (
          <div className={styles.yourPage}>
            {isLoginMode ? (
              <button
                className={styles.NormalModeBtn}
                onClick={handleSwitchMode}
              >
                編輯個人檔案
              </button>
            ) : (
              <button className={styles.EditModeBtn}>編輯個人檔案</button>
            )}
          </div>
        ) : (
          <div className={styles.notYourPage}>
            {friendship && friendship.status === "requested" ? (
              <button
                className={styles.NormalModeBtn}
                onClick={handleFriendshipRequestDelete}
              >
                刪除好友邀請
              </button>
            ) : friendship && friendship.status === "pending" ? (
              <button
                className={styles.NormalModeBtn}
                onClick={handleFriendshipRequestAgree}
              >
                接受好友邀請
              </button>
            ) : friendship && friendship.status === "friend" ? (
              <button
                className={styles.NormalModeBtn}
                onClick={handleFriendshipRequestDelete}
              >
                刪除好友
              </button>
            ) : (
              <button
                className={styles.NormalModeBtn}
                onClick={handleFriendRquest}
              >
                邀請成為好友
              </button>
            )}
          </div>
        )}

        {isLoginMode ? (
          <div className={styles.enterBox}>
            <div className={styles.introduction}>
              <h3>自我介紹</h3>
              {userdata ? (
                userdata.introduction ? (
                  <p>{userdata.introduction}</p>
                ) : (
                  <p>目前還沒有介紹呦～</p>
                )
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </div>
            <div className={styles.hobby}>
              <h3>興趣</h3>
              {userdata ? (
                userdata.tags ? (
                  <p>{userdata.tags}</p>
                ) : (
                  <p>目前還沒有介紹呦～</p>
                )
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </div>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleFormSubmit}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div className={styles.enterBoxOutside}>
                <h3>自我介紹</h3>
                <div className={styles.enterBoxInside}>
                  <input
                    type="text"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className={styles.enterBoxOutside}>
                <h3>興趣</h3>
                <div className={styles.enterBoxInside}>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className={styles.buttonBox}>
                <button
                  className={styles.confirmBtn}
                  type="submit"
                  onClick={(e) => {
                    handleFormSubmit(e); // 先執行表單提交
                    handleSwitchMode(); // 再切換回一般模式
                  }}
                >
                  確認
                </button>
                <button
                  className={styles.cancelBtn}
                  type="submit"
                  onClick={handleSwitchMode}
                >
                  取消
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <div className={styles.copyright}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.</p>
      </div>
    </>
  );
};
export default ProfileSideNav;
