import { BASE_URL } from "@/apis";
import type { Reflection } from "../interfaces";


const REPORT = "reports"
// Api thêm phản ánh
export const addReflectionApi = async (data: Reflection) => {
  const response = await BASE_URL.post(`/${REPORT}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};