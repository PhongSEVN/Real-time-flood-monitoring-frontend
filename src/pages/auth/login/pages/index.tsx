import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Input, Button, Card, message, Divider, Typography } from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import "./styles.css";

const { Title, Text } = Typography;

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();

  // Lấy đường dẫn trước đó (nếu có) để redirect sau khi login
  const state = location.state as LocationState;
  const from = state?.from?.pathname || "/app/dashboard";

  // Xử lý đăng nhập bằng email/password
  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success("Đăng nhập thành công!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập bằng Google thành công
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      message.error("Không nhận được thông tin từ Google!");
      return;
    }

    setGoogleLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      message.success("Đăng nhập bằng Google thành công!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(
        err.response?.data?.message || "Đăng nhập bằng Google thất bại!"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  // Xử lý đăng nhập bằng Google thất bại
  const handleGoogleError = () => {
    message.error("Đăng nhập bằng Google thất bại. Vui lòng thử lại!");
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
            Flood Monitoring
          </Title>
          <Text className="login-subtitle">
            Hệ thống giám sát lũ lụt thời gian thực
          </Text>
        </div>

        <Divider className="login-divider" />

        {/* Login Form - Email/Password */}
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="login-form"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="input-icon" />}
              placeholder="Email"
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Mật khẩu"
              className="login-input"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="login-options">
            <Link to="/reset" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              className="login-button"
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Divider - Or continue with */}
        <Divider className="or-divider">
          <Text className="or-text">hoặc tiếp tục với</Text>
        </Divider>

        {/* Google Login Button */}
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
                useOneTap
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
                logo_alignment="left"
              />
            </div>
          )}
        </div>

        {/* Register Link */}
        <div className="login-footer">
          <Text className="footer-text">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="register-link">
              Đăng ký ngay
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
