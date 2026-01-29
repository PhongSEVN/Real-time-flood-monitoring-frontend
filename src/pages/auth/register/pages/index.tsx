import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, message, Divider, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import "./styles.css";

const { Title, Text } = Typography;

export default function Register() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const from = "/app/dashboard";

  // Xử lý đăng nhập bằng Google thành công
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      message.error("Không nhận được thông tin từ Google!");
      return;
    }

    setGoogleLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      message.success("Đăng ký bằng Google thành công!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err.response?.data?.message || "Đăng ký bằng Google thất bại!"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  // Xử lý đăng nhập bằng Google thất bại
  const handleGoogleError = () => {
    message.error("Đăng ký bằng Google thất bại. Vui lòng thử lại!");
  };

  return (
    <div className="login-container">
      {/* Background animated elements */}
      <div className="login-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <Card className="login-card" variant="borderless">
        {/* Logo & Title */}
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 100 100" className="logo-svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00B4DB" />
                  <stop offset="100%" stopColor="#0083B0" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1" />
              <path
                d="M50 20 C35 35, 25 50, 25 65 C25 80, 35 85, 50 85 C65 85, 75 80, 75 65 C75 50, 65 35, 50 20"
                fill="url(#logoGradient)"
              />
              <path
                d="M40 55 Q45 50, 50 55 T60 55"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <Title level={2} className="login-title">
            Đăng ký tài khoản
          </Title>
          <Text className="login-subtitle">
            Hệ thống giám sát lũ lụt thời gian thực
          </Text>
        </div>

        <Divider className="login-divider" />

        {/* Google Register Button */}
        <div className="google-login-wrapper">
          {googleLoading ? (
            <Button
              className="google-button-loading"
              icon={<GoogleOutlined />}
              loading
              block
            >
              Đang xử lý...
            </Button>
          ) : (
            <div className="google-login-container">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false} // Tắt OneTap ở trang đăng ký để tránh phiền
                theme="outline"
                size="large"
                text="signup_with" // Đổi text thành Sign up with Google
                shape="pill"
                logo_alignment="left"
                width="300"
              />
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className="login-footer">
          <Text className="footer-text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="register-link">
              Đăng nhập ngay
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
