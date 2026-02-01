import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Spin } from "antd";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string; // Có thể mở rộng để kiểm tra role
}

/**
 * Component bảo vệ route - chuyển hướng về login nếu chưa đăng nhập
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
}) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Hiển thị loading spinner khi đang kiểm tra authentication
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                }}
            >
                <Spin size="large" tip="Đang kiểm tra đăng nhập..." />
            </div>
        );
    }

    // Chưa đăng nhập -> chuyển hướng đến login
    // Lưu lại đường dẫn hiện tại để sau khi login có thể quay lại
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Kiểm tra role nếu cần
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Đã đăng nhập -> render children
    return <>{children}</>;
};

export default ProtectedRoute;
