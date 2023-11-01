import { useState } from "react";
import axiosInstance from "../../../src/app/api/axiosInstance";

const useEditPost = (access_token, updatePosts) => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPost = async (post_id, contextData) => {
    setIsEditing(true);
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
    const requestBody = {
      context: contextData,
    };
    try {
      const editpost_response = await axiosInstance.put(`/posts/${post_id}`, requestBody);
      if (editpost_response.status === 200) {
        // console.log("編輯貼文成功");
        const updatedPost = posts.map((post) =>
          post.id === post_id ? { ...post, context: contextData } : post
        );
        setPosts(updatedPost);
        updatePosts();
      }
    } catch (editpost_error) {
      console.log("編輯貼文失敗");
      alert("Error: " + editpost_error.message);
    } finally {
      setIsEditing(false);
    }
  };

  return { isEditing, handleEditPost };
};

export default useEditPost;
