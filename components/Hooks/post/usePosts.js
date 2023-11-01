import { useState, useEffect } from "react";
import axiosInstance from "../../../src/app/api/axiosInstance";
import { useDispatch } from 'react-redux';
import { setPostsData } from '../../../src/redux/store/postsSlice';

const usePosts = (access_token, user_id = null) => {
  const [posts, setPosts] = useState([]);
  const [next_cursor, setNext_cursor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const updatePosts = async (cursor) => {
    if (cursor === null) return;
    setIsLoading(true);
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    let url = user_id ? `/posts/search?user_id=${user_id}` : "/posts/search";
    if (cursor) {
      url += user_id ? `&cursor=${cursor}` : `?cursor=${cursor}`;
    }

    try {
      const get_response = await axiosInstance.get(url);
      if (get_response.status === 200) {
        const nextCursorData = get_response.data.data.next_cursor;
        setNext_cursor(nextCursorData);
        if (cursor) {
          const newPosts = get_response.data.data.posts;
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } else {
          const postsData = get_response.data.data.posts;
          setPosts(postsData);
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

  // 監聽 posts 的變化，一旦變化觸發 dispatch
  useEffect(() => {
    dispatch(setPostsData({ posts, next_cursor }));
  }, [posts, next_cursor, dispatch]);

  return { posts, updatePosts, next_cursor, isLoading };
};

export default usePosts;
