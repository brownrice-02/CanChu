// useSearchUsers.js
import { useState, useEffect } from "react";
import axiosInstance from "@/app/api/axiosInstance";

const useSearchUsers = (access_token) => {
  const [userSearchData, setUserSearchData] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (isChanged && keyword) {
      handleUserSearch(keyword);
    }
  }, [isChanged, keyword]);

  const handleUserSearch = async (keyword) => {
    try {
      axiosInstance.defaults.headers.common["Authorization"] = access_token;
      const response = await axiosInstance.get("/users/search", {
        params: {
          keyword: keyword,
        },
      });
      if (response.status === 200) {
        setUserSearchData(response.data);
      }
    } catch (error) {
    //   console.log("無法搜尋到其他使用者");
    //   alert("Error: " + error);
    }
  };

  const handleChange = (event) => {
    const keyword = event.target.value;
    setKeyword(keyword);
    setIsChanged(true);
  };

  return { userSearchData, isChanged, handleChange };
};

export default useSearchUsers;
