// useLeaveComment.js
import axiosInstance from '@/app/api/axiosInstance';

const useLeaveComment = (postId, access_token, updatePost) => {

  const leaveComment = async (commentData) => {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = access_token;
      axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
      const response = await axiosInstance.post(`/posts/${postId}/comment`, commentData);
      if (response.status === 200) {
        console.log('創建評論成功');
        // 刷新頁面
        updatePost();
        // window.location.reload();
      }
    } catch (error) {
      console.error('創建評論失敗', error);
      alert('Error: ' + error.message);
    }
  };

  return leaveComment;
};

export default useLeaveComment;
