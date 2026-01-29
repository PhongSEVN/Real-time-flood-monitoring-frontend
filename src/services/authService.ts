import axios from "axios";
import type { LoginRequest, LoginResponse } from "@/interfaces";
import { API_BASE_URL } from "@/utils/constants";

// Cấu hình base URL cho API (đã được import từ constants)
// const API_BASE_URL = ...

// Token key trong localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user_info";

// Interface cho decoded JWT
// Interface cho decoded JWT (giữ lại để tham khảo hoặc dùng decode access token nếu cần)
interface DecodedToken {
    sub?: string;
    email?: string;
    role?: string;
    exp?: number;
    iat?: number;
}

// Tạo axios instance với interceptor
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor - tự động thêm token vào header
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - xử lý lỗi 401 (Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token hết hạn hoặc không hợp lệ -> redirect về login
            // Token hết hạn hoặc không hợp lệ -> redirect về login
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const authService = {
    /**
     * Đăng nhập với email và password
     */
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const payload: LoginRequest = { email, password };
        const response = await apiClient.post<LoginResponse>("/auth/login", payload);
        return response.data;
    },

    /**
     * Đăng ký tài khoản mới
     */
    register: async (
        email: string,
        password: string,
        name?: string
    ): Promise<LoginResponse> => {
        const payload = { email, password, name };
        const response = await apiClient.post<LoginResponse>("/auth/register", payload);
        return response.data;
    },

    /**
     * Đăng nhập bằng Google
     * Gửi Google credential token đến backend để xác thực
     */
    loginWithGoogle: async (googleToken: string): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post<LoginResponse>("/auth/google", {
                idToken: googleToken,
            });
            return response.data;
        } catch (error: any) {
            console.error("Google Login Failed. Server Response:", JSON.stringify(error.response?.data, null, 2));
            throw error;
        }
    },

    /**
     * Lưu token vào localStorage
     */
    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    /**
     * Lấy token từ localStorage
     */
    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Xóa token khỏi localStorage
     */
    saveUser: (user: any): void => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    getUser: (): any | null => {
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    removeToken: (): void => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    /**
     * Decode JWT token để lấy thông tin user
     */
    decodeToken: (token: string): DecodedToken | null => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    },

    /**
     * Kiểm tra token có hợp lệ không (chưa hết hạn)
     */
    isTokenValid: (): boolean => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return false;

        const decoded = authService.decodeToken(token);
        if (!decoded || !decoded.exp) return false;

        // Kiểm tra thời gian hết hạn (exp là timestamp tính bằng giây)
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    },

    /**
     * Kiểm tra user đã đăng nhập chưa
     */
    isAuthenticated: (): boolean => {
        return authService.isTokenValid();
    },

    /**
     * Refresh token (nếu backend hỗ trợ)
     */
    refreshToken: async (): Promise<string | null> => {
        try {
            const response = await apiClient.post<LoginResponse>("/auth/refresh");
            const { accessToken } = response.data.data;
            authService.setToken(accessToken);
            return accessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            authService.removeToken();
            return null;
        }
    },

    /**
     * Lấy thông tin user hiện tại từ backend
     */
    getCurrentUser: async () => {
        const response = await apiClient.get("/auth/me");
        return response.data;
    },
};

// Export axios instance để sử dụng ở các service khác
export { apiClient };
