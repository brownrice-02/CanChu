// useUploadAvatar.js
import { useState } from "react";
import axiosInstance from "../../../src/app/api/axiosInstance"
import { useDispatch } from "react-redux";
import { setUserProfilePicture } from "../../../src/redux/store/profileSlice"
import usePageAuthorization from "../../../components/AuthCmps/usePageAuthorization"

const useUploadAvatar = () => {
    const { access_token } = usePageAuthorization();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadAvatar = async (file) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('picture', file);

      const response = await axiosInstance.put('/users/picture', formData, {
        headers: {
          Authorization: access_token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const newPicture = response.data.data.picture;
        // console.log(response.data.data.picture);
        dispatch(setUserProfilePicture({ userProfile: { picture: newPicture }, myProfile: { picture: newPicture } }));
      }
    } catch (error) {
      console.error('上傳頭像失敗:', error);
      // 處理錯誤，例如顯示錯誤訊息
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadAvatar, isLoading };
};

export default useUploadAvatar;
