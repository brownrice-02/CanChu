// usePost.js
import { useEffect, useState } from "react";
import axiosInstance from "@/app/api/axiosInstance";

const usePost = (postId, access_token) => {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`, {
          headers: {
            Authorization: access_token,
          },
        });
        if (response.status === 200) {
          setPostData(response.data.data.post);
        //   console.log("詳細貼文: ", response.data.data.post);
        }
      } catch (error) {
        console.error("Error fetching post data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId, access_token]);

  return { postData, isLoading };
};

export default usePost;
