// useLikeAPost.js
import { useState } from "react";
import axiosInstance from "@/app/api/axiosInstance";

const useLikeAPost = (access_token) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const likePost = async (postId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/posts/${postId}/like`, null, {
        headers: {
          Authorization: access_token,
        },
      });

      if (response.status === 200) {
        // console.log(postId, "喜歡狀態更新成功");
      }
    } catch (error) {
      console.log(postId, "喜歡狀態更新失敗，回復臨時更新");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { likePost, isLoading, error };
};

export default useLikeAPost;
