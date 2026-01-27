import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import type { ReactNode, FC } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/interfaces";

// Interface cho User (có thể mở rộng thêm các field từ backend)


// Interface cho Auth Context
interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (googleToken: string) => Promise<void>;
    logout: () => void;
    setToken: (token: string) => void;
}

// Tạo context với giá trị mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);

    // Helper function để xử lý token và set user
    const handleAuthSuccess = useCallback((authToken: string, userInfo: User) => {
        authService.setToken(authToken);
        authService.saveUser(userInfo);

        setTokenState(authToken);
        setUser(userInfo);
        setIsAuthenticated(true);
    }, []);

    // Kiểm tra token khi app khởi động
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = authService.getToken();
                const storedUser = authService.getUser();

                if (storedToken && authService.isTokenValid()) {
                    setTokenState(storedToken);
                    // Nếu có storedUser thì dùng luôn, không cần decode lại
                    if (storedUser) {
                        setUser(storedUser);
                    }
                    setIsAuthenticated(true);
                } else {
                    // Token không hợp lệ hoặc hết hạn -> xóa
                    authService.removeToken();
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                authService.removeToken();
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Hàm login với email/password
    const login = useCallback(
        async (email: string, password: string) => {
            setIsLoading(true);
            try {
                const response = await authService.login(email, password);
                if (response.success && response.data) {
                    handleAuthSuccess(response.data.accessToken, response.data.user);
                }
            } catch (error) {
                console.error("Login error:", error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [handleAuthSuccess]
    );

    // Hàm login với Google
    const loginWithGoogle = useCallback(
        async (googleToken: string) => {
            setIsLoading(true);
            try {
                const response = await authService.loginWithGoogle(googleToken);
                if (response.success && response.data) {
                    handleAuthSuccess(response.data.accessToken, response.data.user);
                }
            } catch (error) {
                console.error("Google login error:", error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [handleAuthSuccess]
    );

    // Hàm logout
    const logout = useCallback(() => {
        authService.removeToken();
        setTokenState(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    // Hàm set token (dùng cho các trường hợp đặc biệt như OAuth callback)
    // Hàm set token (dùng cho các trường hợp đặc biệt như OAuth callback)
    const setToken = useCallback(
        (newToken: string) => {
            authService.setToken(newToken);
            setTokenState(newToken);
            setIsAuthenticated(true);
            // Sau khi set token, nên fetch lại user info nếu chưa có
            authService.getCurrentUser().then((userInfo) => {
                authService.saveUser(userInfo);
                setUser(userInfo);
            }).catch(console.error);
        },
        []
    );

    // Memoize context value để tránh re-render không cần thiết
    const contextValue = useMemo(
        () => ({
            isAuthenticated,
            isLoading,
            user,
            token,
            login,
            loginWithGoogle,
            logout,
            setToken,
        }),
        [isAuthenticated, isLoading, user, token, login, loginWithGoogle, logout, setToken]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
