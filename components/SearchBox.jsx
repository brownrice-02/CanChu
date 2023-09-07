"use client";
import { useState } from "react";
import Link from "next/link";
import usePageAuthorization from "../components/AuthCmps/usePageAuthorization";
import axiosInstance from "../src/app/api/axiosInstance";
import styles from "../styles/SearchBox.module.scss";
import AvatarBtn from "./BtnCmps/AvatarBtn";

const SearchBox = () => {
  const { user_id, access_token } = usePageAuthorization();
  const [keyword, setKeyword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [userSearchData, setUserSearchData] = useState(null); // 儲存搜尋到的其他使用者資料

  // 在輸入框打字搜尋用戶時
  const handleChange = (event) => {
    const keyword = event.target.value;
    setKeyword(keyword);
    setIsChanged(true);
    handleUserSearch(keyword);
  };

  // 搜尋使用者
  const handleUserSearch = async (keyword) => {
    // 使用 async 關鍵字使函數支援 await
    try {
      axiosInstance.defaults.headers.common["Authorization"] = access_token;
      const response = await axiosInstance.get("/users/search", {
        params: {
          keyword: keyword,
        },
      });
      if (response.status === 200) {
        // console.log("搜尋", keyword);
        // console.log(response.data);
        setUserSearchData(response.data); // 將搜尋到的使用者資料
      }
    } catch (error) {
      console.log("無法搜尋到其他使用者");
      alert("Error: " + error);
    }
  };

  return (
    <div className={styles.searchBoxAb}>
      <input
        className={styles.searchInputStyle}
        type="text"
        placeholder="搜尋"
        value={keyword}
        onChange={handleChange}
      />
      {isChanged ? (
        <div
          className={styles.friendListContainer}
          onBlur={() => setIsChanged(false)}
        >
          <div className={styles.friendList}>
            {userSearchData?.data?.users.map((user) => (
              <div
                className={styles.friendItem}
                key={user.id}
                onClick={(event) => event.stopPropagation()}
              >
                <div className={styles.friendPicture}>
                  {user.picture ? (
                    <AvatarBtn
                      src={user.picture}
                      alt={user.name}
                      link={`/users/${user.id}`}
                    />
                  ) : (
                    <AvatarBtn
                      src="/avatar.svg"
                      alt={user.name}
                      link={`/users/${user.id}`}
                    />
                  )}
                </div>
                <div className={styles.friendName}>
                  <Link href={`/users/${user.id}`}>
                    <p onClick={(event) => event.stopPropagation()}>
                      {user.name}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default SearchBox;
