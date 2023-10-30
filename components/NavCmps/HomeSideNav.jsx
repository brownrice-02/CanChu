"use client";
import { useState } from "react";
import usePageAuthorization from "../../components/AuthCmps/usePageAuthorization";
import axiosInstance from "../../src/app/api/axiosInstance";
import AvatarBtn from "../BtnCmps/AvatarBtn";
import Image from "next/image";
import styles from "../../styles/HomeSideNav.module.scss";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";

export default function HomeSideNav({
  friendList,
  pendingList,
  handleGetFriendList,
  handleGetPendingList,
}) {
  const { access_token } = usePageAuthorization();
  const userdata = useSelector((state) => state.profile.myProfile);
  // console.log("HomeSideNav: ", userdata);

  // 確認好友邀請
  const handleFriendRequestAgree = (pendingId) => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .post(`/friends/${pendingId}/agree`)
      .then((post_friend_agree) => {
        if (post_friend_agree.status === 200) {
          console.log("加好友成功");
          handleGetFriendList();
          handleGetPendingList();
        }
      })
      .catch((post_error) => {
        console.log("加好友失敗");
        alert("Error: " + post_error.message);
      });
  };

  // 刪除好友邀請
  const handleFriendshipRequestDelete = (pendingId) => {
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance
      .delete(`/friends/${pendingId}`)
      .then((post_friend_agree) => {
        if (post_friend_agree.status === 200) {
          console.log("刪除好友邀請成功");
          handleGetFriendList();
          handleGetPendingList();
        }
      })
      .catch((post_error) => {
        console.log("刪除好友邀請失敗");
        alert("Error: " + post_error.message);
      });
  };

  return (
    <>
      <nav className={styles.sideNavContainer}>
        <div className={styles.navItem}>
          <div className={styles.avatarContainer}>
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
                  src="avatar.svg"
                  alt="navAvatar"
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
          {userdata ? (
            <a href={`/users/${userdata.id}`}>{userdata.name}</a>
          ) : (
            <Skeleton variant="text" width={80} animation="wave" />
          )}
        </div>

        <div className={styles.friendList}>
          <ul style={{ width: "100%" }}>
            <li className={styles.navItem}>
              <div className={styles.avatarContainer}>
                <Image
                  src="/myfriend.svg"
                  alt=""
                  width={26}
                  height={26}
                  className={styles.myFriendIcon}
                />
              </div>
              <a className={styles.myFriendLink} href="#">
                我的好友
              </a>
            </li>
            {pendingList &&
              pendingList.map((pending) => (
                <li key={pending.id} className={styles.navItem}>
                  <div className={styles.avatarContainer}>
                    {pending.picture ? (
                      <AvatarBtn
                        src={pending.picture}
                        alt={pending.name}
                        link={`/users/${pending.id}`}
                      />
                    ) : (
                      <Image
                        src="/avatar.svg"
                        alt="user"
                        fill={true}
                        style={{ borderRadius: "50%" }}
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <a href={`/users/${pending.id}`}>{pending.name}</a>
                  <div className={styles.pendingBtn}>
                    <button
                      className={styles.confirmButton}
                      onClick={() =>
                        handleFriendRequestAgree(pending.friendship.id)
                      }
                    >
                      確認
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() =>
                        handleFriendshipRequestDelete(pending.friendship.id)
                      }
                    >
                      取消
                    </button>
                  </div>
                </li>
              ))}
            {friendList &&
              friendList.map((friend) => (
                <li key={friend.id} className={styles.navItem}>
                  <div className={styles.avatarContainer}>
                    <AvatarBtn
                      src={friend.picture}
                      alt={friend.name}
                      link={`/users/${friend.id}`}
                    />
                  </div>
                  <a href={`/users/${friend.id}`}>{friend.name}</a>
                </li>
              ))}
          </ul>
        </div>
        <li className={styles.viewAll}>
          <div className={styles.avatarContainer}>
            <Image
              src="/all.svg"
              alt=""
              width={26}
              height={26}
              className={styles.viewAllIcon}
            />
          </div>
          <a className={styles.viewAllLink} href="#">
            查看全部
          </a>
        </li>
      </nav>
      <div className={styles.copyRight}>
        <div className={styles.copyRightContent}>
          <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.</p>
        </div>
      </div>
    </>
  );
}
