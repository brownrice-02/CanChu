// useFriends.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFriendList } from "../../../src/redux/store/friendsSlice"
import axiosInstance from "@/app/api/axiosInstance";

const useFriendList = (access_token) => {
  const dispatch = useDispatch();

  const handleGetFriendList = async () => {
    try {
      const response = await axiosInstance.get('/friends/', {
        headers: {
          Authorization: access_token,
        },
      });
      if (response.status === 200) {
          const friendList = response.data.data.users;
          dispatch(setFriendList(friendList));
          console.log(response.data.data.users);
      }
    } catch (error) {
      console.log('獲取朋友列表失敗');
      alert('Error: ' + error.message);
    }
  };

  useEffect(() => {
    handleGetFriendList();
  }, [access_token]);

  return {handleGetFriendList};
};

export default useFriendList;
