import { BASE_URL } from "@/apis";
import type { Reflection } from "../interfaces";


const REPORT = "reports"
// Api thêm phản ánh
export const addReflectionApi = async (data: Reflection | FormData) => {
  const isFormData = data instanceof FormData;
  const response = await BASE_URL.post(`/${REPORT}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
  return response.data;
};

// Api lấy danh sách phản ánh
export const getReflectionsApi = async () => {
  const response = await BASE_URL.get(`/${REPORT}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

// Api xóa phản ánh
export const deleteReflectionApi = async (id: string) => {
  const response = await BASE_URL.delete(`/${REPORT}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};