// useUnlikeAPost.js
import { useState } from "react";
import axiosInstance from "@/app/api/axiosInstance";

const useUnlikeAPost = (access_token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const unlikePost = async (postId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/posts/${postId}/like`, {
        headers: {
          Authorization: access_token,
        },
      });

      if (response.status === 200) {
        // console.log(postId, "取消喜歡狀態成功");
      }
    } catch (error) {
      console.log(postId, "取消喜歡狀態失敗，回復臨時更新");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { unlikePost, isLoading, error };
};

export default useUnlikeAPost;
