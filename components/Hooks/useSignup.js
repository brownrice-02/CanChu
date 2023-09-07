// useSignup.js
import { useState } from "react";
import axiosInstance from "../../src/app/api/axiosInstance";
import Swal from "sweetalert2";

const useSignup = (handleSwitchMode) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleSignup = (userData) => {
    setIsLoading(true); // 開始 API 請求時設置 isLoading 為 true
    axiosInstance
      .post("/users/signup", userData)
      .then((response) => {
        if (response.status === 200) {
          console.log("註冊成功");
          handleSwitchMode();
        } else {
          // console.log("註冊失敗");
          setError(response.data.message);
          if (error.status >= 500 && error.status < 600) {
            alert("伺服器出現問題，請稍後再試或通知我們的工程團隊。");
          }
        }
      })
      .catch((error) => {
        // console.log("註冊失敗2");
        setError(error.message);
        if (error.response.status >= 500 && error.response.status < 600) {
          Swal.fire({
            icon: "error",
            title: "伺服器出現問題",
            text: "請稍後再試或通知我們的工程團隊。",
          });
        }
        if (error.response.status >= 400 && error.response.status < 500) {
          Swal.fire({
            icon: "error",
            title: "註冊失敗",
            text: error.response.data.error,
          });
        }
      })
      .finally(() => {
        setIsLoading(false); // 無論請求成功或失敗，設置 isLoading 為 false
      });
  };

  return { handleSignup, isLoading, error };
};

export default useSignup;