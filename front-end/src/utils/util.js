export const getToken = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    return token;
  }
  return token;
};
