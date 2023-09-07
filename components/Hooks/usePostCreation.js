// usePostCreation.js
import { useState } from 'react';
import axiosInstance from '../../src/app/api/axiosInstance';

const usePostCreation = (access_token, updatePosts) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePostCreated = async (contextData) => {
    setIsLoading(true);
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
    
    try {
      const post_response = await axiosInstance.post('/posts/', contextData);
      if (post_response.status === 200) {
        console.log('POST成功');
        updatePosts();
      }
    } catch (post_error) {
      console.log('連接失敗2');
      alert('Error: ' + post_error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePostCreated, isLoading };
};

export default usePostCreation;