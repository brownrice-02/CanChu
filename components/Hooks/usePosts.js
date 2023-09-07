// usePosts.js
import { useState, useEffect } from "react";
import axiosInstance from "../../src/app/api/axiosInstance";

const usePosts = (access_token, user_id = null) => {
  const [posts, setPosts] = useState([]);
  const [next_cursor, setNext_cursor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updatePosts = async (cursor) => {
    if (cursor === null) return;
    setIsLoading(true);
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    let url = user_id ? `/posts/search?user_id=${user_id}` : "/posts/search";
    if (cursor) {
      url +=user_id ? `&cursor=${cursor}` : `?cursor=${cursor}`;
    }

    try {
      const get_response = await axiosInstance.get(url);
      if (get_response.status === 200) {
        if (cursor) {
          // 如果有指定 cursor，表示要加載下一組貼文，將新貼文附加到原有貼文列表後面
          setPosts((prevPosts) => [...prevPosts, ...get_response.data.data.posts]);
          setNext_cursor(get_response.data.data.next_cursor);
          // console.log(get_response.data.data.next_cursor)
        } else {
          // console.log("GET Post成功");
          setPosts(get_response.data.data.posts);
          setNext_cursor(get_response.data.data.next_cursor);
        }
      }
    } catch (get_error) {
      // GET 請求失敗
      console.log("GET Post失敗");
      alert("Error: " + get_error.message);
    } finally {
      setIsLoading(false); // 無論成功或失敗都設置載入完成
    }
  };

  useEffect(() => {
    updatePosts();
  }, []);

  return { posts, updatePosts, next_cursor, isLoading };
};

export default usePosts;