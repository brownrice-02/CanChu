// useUpdateProfile.js
import { useState, useEffect } from "react";
import axiosInstance from "../../../src/app/api/axiosInstance";
import { useDispatch } from "react-redux";
import { setUserProfileData } from "../../../src/redux/store/profileSlice"

const useUpdateProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const updateProfile = (updatedProfileData) => {
    setIsUpdating(true);
    setError(null);

    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
    axiosInstance
      .put('/users/profile', updatedProfileData)
      .then((put_response) => {
        if (put_response.status === 200) {
          console.log('更新 profile 成功');
          dispatch(setUserProfileData({ userProfile: updatedProfileData }));
          // PUT 請求成功後，重新取得用戶的個人資料
          // handleGetProfile();
        }
      })
      .catch((put_error) => {
        console.log('PUT失敗');
        setError(`Error: ${put_error.message}`);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return { isUpdating, error, updateProfile };
};

export default useUpdateProfile;
