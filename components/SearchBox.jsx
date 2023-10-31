"use client";
import { useState } from "react";
import Link from "next/link";
import usePageAuthorization from "../components/AuthCmps/usePageAuthorization";
import styles from "../styles/SearchBox.module.scss";
import AvatarBtn from "./BtnCmps/AvatarBtn";
import useSearchUsers from "./Hooks/user/useSearchUsers";

const SearchBox = () => {
  const { access_token } = usePageAuthorization();
  const { userSearchData, isChanged, handleChange } =
    useSearchUsers(access_token);
  const [isSearchFocused, setSearchIsFocused] = useState(false);

  return (
    <div className={styles.searchBoxAb}>
      <input
        className={styles.searchInputStyle}
        type="text"
        placeholder="搜尋"
        // value={keyword}
        onFocus={() => setSearchIsFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setSearchIsFocused(false);
          }, 50);
        }}
        onChange={handleChange} // 將事件處理器指向 handleChange 函數
      />
      {isSearchFocused && isChanged ? (
        <div
          className={styles.friendListContainer}
          // onBlur={() => setIsChanged(false)}
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
