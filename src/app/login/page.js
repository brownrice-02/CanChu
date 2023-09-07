"use client"
import { useState } from "react";
import "../../../styles/fonts.css"; 
import styles from  "../../../styles/LoginSignupPage.module.scss"
import "normalize.css"; 
import LoginSignupPage from "./LoginSignupPage";

export default function Login() {
  const [isLoginMode, setLoginMode] = useState(true); // true 為登入頁面

  // 註冊登入頁面切換用
  const handleSwitchMode = () => {
    setLoginMode(!isLoginMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main} style={{minHeight: "64.4%"}}>
        <div className={styles.leftside}>
          <h1 className="logo" style={{fontSize: "3.2rem"}}>CanChu</h1>
          <h2>會員{isLoginMode ? '登入' : '註冊'}</h2>
          <div className={styles.enterBox}>
            <LoginSignupPage isLoginMode={isLoginMode} handleSwitchMode={handleSwitchMode}/>
          </div>
          <div className={styles.bottomtext}>
            <span className={styles.lefttext}>尚未成為會員？</span>
            <span className={styles.righttext} onClick={handleSwitchMode}>會員{isLoginMode ? '註冊' : '登入'}</span>
          </div>
        </div>
        <div className={styles.rightside}>
        </div>
    </div>
    <div className={styles.copyright}>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.</div>
  </div>
  );
}
