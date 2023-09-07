"use client";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

const usePageAuthorization = () => {
  const cookies = parseCookies();
  const user_id = cookies["user_id"];
  const access_token = cookies["access_token"];
  return { user_id, access_token };
};

export default usePageAuthorization;
