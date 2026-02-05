import { BASE_URL } from "@/apis";
import type { LoginRequest } from "../interfaces";

// Tạo biến môi trường
const LOGIN_URL = '/auth/login';

// Api đăng nhập
export const loginApi = async (values: LoginRequest) => {
    const response = await BASE_URL.post(LOGIN_URL, values);
    return response.data;
}