import axiosInstance from "./axiosInstance";

export const register = async (signIndata: any) => {
  const response = await axiosInstance.post("/users/register", signIndata);
  return response.data;
};
export const login = async (postData: any) => {
  const response = await axiosInstance.post("/users/auth", postData);
  return response.data;
};
export const getProfile = async (authToken: string) => {
  // Add the authentication token to the request headers
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axiosInstance.get("/users/register", { headers });
  return response.data;
};
export const updateUser = async (postData: any, authToken: string) => {
  // Add the authentication token to the request headers
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axiosInstance.put("/users/profile", postData, {
    headers,
  });
  return response.data;
};
