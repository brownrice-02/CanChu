"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../../styles/fonts.css"; // add google font and style for class "logo"
import { Skeleton } from "@material-ui/lab";
import SearchBox from "../../components/SearchBox";
import AvatarBtn from "../BtnCmps/AvatarBtn";
import styles from "../../styles/TopNav.module.scss";
import { destroyCookie } from "nookies";
import { useSelector } from "react-redux";

const TopNav = () => {
  const router = useRouter();
  const userdata = useSelector((state) => state.profile.profile);
  // console.log("TopNav: ", userdata);

  const [isDivVisible, setIsDivVisible] = useState(false);
  const handleNavRightClick = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleLogout = () => {
    destroyCookie(null, "access_token");
    destroyCookie(null, "user_id");
    console.log("登出");
    router.push("/login");
    console.log("登出且轉向至 /login");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <div className="logo">
          <Link href="/">Canchu</Link>
        </div>
        <div className={styles.searchBar}>
          <SearchBox />
        </div>
      </div>
      <div className={styles.navRight} onClick={handleNavRightClick}>
        {userdata ? (
          userdata.picture ? (
            // <AvatarBtn
            //   fill="true"
            //   src={userdata.picture}
            //   alt="navAvatar"
            //   link={`/users/${userdata.id}`}
            // />
            <Image
              src={userdata.profile}
              alt="user"
              fill={true}
              style={{ borderRadius: "50%" }}
              objectFit="cover"
            />
          ) : (
            <Image
              src="/avatar.svg"
              alt="user"
              fill={true}
              style={{ borderRadius: "50%" }}
              objectFit="cover"
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
      {isDivVisible && (
        <div className={styles.setting}>
          <div className={styles.name}>{userdata.name}</div>
          <div className={styles.info}>
            <Link href={`/users/${userdata.id}`}>查看個人檔案</Link>
          </div>
          <hr></hr>
          <div className={styles.info} onClick={handleLogout}>
            <p>登出</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
