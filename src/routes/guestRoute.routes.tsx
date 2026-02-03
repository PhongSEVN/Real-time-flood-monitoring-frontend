import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem("accessToken");

  // Đã đăng nhập → đá về dashboard
  if (accessToken) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
