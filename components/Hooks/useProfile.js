// useProfile.js
import { useEffect, useState } from "react";
import axiosInstance from "../../src/app/api/axiosInstance";

const useProfile = (access_token, user_id) => {
  const [profile, setProfile] = useState(null);
  const [friendship, setFriendship] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleGetProfile = async () => {
    setIsLoading(true);
    try {
      axiosInstance.defaults.headers.common["Authorization"] = access_token;
      const get_profile = await axiosInstance.get(`/users/${user_id}/profile`);
      if (get_profile.status === 200) {
        console.log("GET Profile成功");
        setProfile(get_profile.data.data.user);
        setFriendship(get_profile.data.data.user.friendship)
        // console.log(get_profile.data.data.user);
      }
    } catch (get_error) {
      console.log("GET Profile失敗");
      alert("Error: " + get_error.message);
    } finally {
      setIsLoading(false); // 不論是否成功取得個人資料，都設置 isLoading 為 false
  }
  };

  useEffect(() => {
    if (!user_id) return;
    handleGetProfile();
  }, [access_token, user_id ]);

  return { profile, friendship, handleGetProfile, isLoading };
};

export default useProfile;