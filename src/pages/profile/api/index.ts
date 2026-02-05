import { BASE_URL } from "@/apis";
import type { UpdateProfile } from "../interfaces";

// Tạo biến môi trường
const API_URL = "users/me";

// Api thấy thông tin cá nhân
export const getProfileApi = async () => {
  const response = await BASE_URL.get(`/${API_URL}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

// Api cập nhật thông tin cá nhân 
export const updateProfileApi = async (data: UpdateProfile) => {
  const response = await BASE_URL.patch(`/${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};
