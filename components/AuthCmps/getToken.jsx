import { cookies } from "next/headers";

const getToken = () => {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("access_token"); // Find cookie
  console.log(token.value); // 可以拿出 token 的值
  console.log(!token);

  return token.value;
};
export default getToken;
