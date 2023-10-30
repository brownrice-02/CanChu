// useProfile.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../src/app/api/axiosInstance";
import { setUserProfileData } from "../../../src/redux/store/profileSlice";

const useUserProfile = (access_token, user_id) => {
  const dispatch = useDispatch();

  const handleGetProfile = async () => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = access_token;
      const get_profile = await axiosInstance.get(`/users/${user_id}/profile`);
      if (get_profile.status === 200) {
        const userData = get_profile.data.data.user;
        dispatch(setUserProfileData({ userProfile: userData }));
      }
    } catch (get_error) {
      console.log("GET User Profile失敗");
      alert("Error: " + get_error.message);
    }
  };

  useEffect(() => {
    if (!user_id) return;
    handleGetProfile();
  }, [access_token, user_id]);

  return { handleGetProfile };
};

export default useUserProfile;
