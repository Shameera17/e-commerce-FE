import axiosInstance from "./axiosInstance";

const prefix = "products";

export const createProduct = async (postData: any, authToken: string) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axiosInstance.post(`/${prefix}/product`, postData, {
    headers,
  });
  return response.data;
};

export const getAllProductsByStatus = async () => {
  const response = await axiosInstance.get(`/${prefix}/all`, {
    params: {
      status: "ACTIVE",
    },
  });
  return response.data;
};

export const getAllProductById = async (productId: any) => {
  const response = await axiosInstance.get(`/${prefix}/product`, {
    params: { productId },
  });
  return response.data;
};

export const getAllProductsByStatusBySellerId = async (authToken: string) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axiosInstance.get(`/${prefix}/seller`, { headers });
  return response.data;
};

export const updateProduct = async (postData: any, authToken: string) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axiosInstance.put(`/${prefix}/product`, postData, {
    headers,
  });
  return response.data;
};

export const removeProduct = async (productId: any, authToken: string) => {
  // Add the authentication token to the request headers
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axiosInstance.delete(`/${prefix}/product`, {
    headers,
    params: {
      productId,
    },
  });
  return response.data;
};
