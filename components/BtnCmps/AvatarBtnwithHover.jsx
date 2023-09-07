"use client";
import { useState, useRef } from "react";
import styles from "../../styles/AvatarBtnwithHover.module.scss";
import Image from "next/image";

const AvatarBtnwithHover = ({ src, alt, link, handleImageUpload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null); // 用來操作 input 元素的 ref

  return (
    <div
      className={`${styles.avatarBtn} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 增加 input 元素處理圖片上傳 */}
      <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
        <Image
          src={src}
          alt={alt}
          fill={true}
          className={styles.pic}
          objectFit="cover"
        />
        {/* 隱藏 input 元素，並綁定 onChange 事件處理上傳圖片 */}
        <input
          ref={inputRef} // 綁定 ref 到 input 元素
          id="avatar-upload"
          type="file"
          accept="image/*" // 限制檔案傳送的類型
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </label>

      {isHovered && <span className={styles.text}>編輯大頭貼</span>}
    </div>
  );
};

export default AvatarBtnwithHover;
