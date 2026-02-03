import { BASE_URL } from "@/apis";
import type { RegisterRequest } from "../interfaces";

// Tạo biến môi trường
const REGISTER_URL = '/auth/register';

// Api đăng nhập
export const registerApi = async (values: RegisterRequest) => {
    const response = await BASE_URL.post(REGISTER_URL, values);
    return response.data;
}