import React, { useRef } from 'react';

const PhotoUpload = () => {
  const fileInputRef = useRef(null);

  // 處理選擇照片的事件
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // 在這裡處理上傳文件的邏輯，你可以呼叫上傳的 API 或進行其他處理
    console.log('選擇的檔案：', file);
  };

  // 點擊上傳按鈕時觸發
  const handleUploadButtonClick = () => {
    fileInputRef.current.click(); // 觸發隱藏的檔案選擇按鈕
  };

  return (
    <div>
      {/* 隱藏的檔案選擇按鈕 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* 上傳按鈕 */}
      <button onClick={handleUploadButtonClick}>選擇照片</button>
    </div>
  );
};

export default PhotoUpload;