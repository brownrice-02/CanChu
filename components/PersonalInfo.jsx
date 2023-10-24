import { useState } from "react";
import AvatarBtn from "../components/BtnCmps/AvatarBtn";
import AvatarBtnwithHover from "./BtnCmps/AvatarBtnwithHover";
import { Skeleton } from "@material-ui/lab";
import styles from "../styles/PersonalInfo.module.scss";
import { useSelector } from "react-redux";

const PersonalInfo = ({ handleImageUpload, isYourPage }) => {
  const userdata = useSelector((state) => state.profile.profile);
  console.log("PersonalInfo", isYourPage);
  return (
    <div className={styles.personalInfo}>
      <div className={styles.info}>
        <div className={styles.avatarContainer}>
          {userdata ? (
            userdata.picture ? (
              isYourPage ? (
                <AvatarBtnwithHover
                  src={userdata.picture}
                  alt="your picture"
                  handleImageUpload={handleImageUpload}
                />
              ) : (
                <AvatarBtn
                  src={userdata.picture}
                  alt="your picture"
                  link={`/users/${userdata.id}`}
                />
              )
            ) : isYourPage ? (
              <AvatarBtnwithHover
                src="/avatar.svg"
                alt="your picture"
                handleImageUpload={handleImageUpload}
              />
            ) : (
              <AvatarBtn
                src="/avatar.svg"
                alt="your picture"
                link={`/users/${userdata.id}`}
              />
            )
          ) : (
            <Skeleton
              variant="circle"
              width="100%"
              height="100%"
              style={{ backgroundColor: "lightgray", flex: "1" }}
            />
          )}
        </div>
        <div className={styles.userName}>
          {userdata ? userdata.name : <Skeleton variant="text" width={80} />}

          <div className={styles.userFriendCount}>
            {userdata ? (
              userdata.friend_count + "位朋友"
            ) : (
              <Skeleton variant="text" width={80} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.postBox}>
          <div className={styles.postText}>貼文</div>
          <div className={styles.postSeparator}></div>
        </div>
      </div>
    </div>
  );
};
export default PersonalInfo;
