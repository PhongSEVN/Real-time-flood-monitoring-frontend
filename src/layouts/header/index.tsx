import { useAuth } from "@/contexts/AuthContext";
import { Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { LogoutOutlined, UserOutlined, SettingOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { reportService } from "@/services/reportService";

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.7}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.657a2 2 0 01-3.714 0M6.5 9a5.5 5.5 0 1111 0c0 1.764.394 3.134 1.154 4.126.4.523.613 1.16.596 1.813-.024.91-.757 1.561-1.667 1.561H6.417c-.91 0-1.643-.65-1.667-1.56a2.74 2.74 0 01.596-1.814C6.106 12.134 6.5 10.764 6.5 9z"
    />
  </svg>
);

type HeaderProps = {
  onMenuToggle?: () => void;
};

export default function Header({ onMenuToggle }: HeaderProps) {
  const navigate = useNavigate();
  const [now, setNow] = useState(() => new Date());
  const [isConnected, setIsConnected] = useState(false);
  const [alertsCount, setAlertsCount] = useState<number | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    realtimeSocket.connect(getDefaultWsUrl());
    const unsubOpen = realtimeSocket.onOpen(() => setIsConnected(true));
    const unsubClose = realtimeSocket.onClose(() => setIsConnected(false));
    const unsubCount = realtimeSocket.on("alerts_count", (payload) => {
      const n = typeof payload === "number" ? payload : Number(payload);
      if (Number.isFinite(n)) setAlertsCount(n);
    });

    // optional: ask server for initial state
    realtimeSocket.onOpen(() => realtimeSocket.send("get_alerts_count"));

    return () => {
      unsubOpen();
      unsubClose();
      unsubCount();
      realtimeSocket.disconnect();
    };
  }, []);

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    content: "",
    location: "",
    reporter: "Người dân (Demo)",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleReportSubmit = () => {
    if (!reportForm.content || !reportForm.location) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    reportService.addReport({
      content: reportForm.content,
      location: reportForm.location,
      reporter: reportForm.reporter,
    });

    message.success("Gửi phản ánh thành công!");
    setIsReportModalOpen(false);
    setReportForm({ content: "", location: "", reporter: "Người dân (Demo)" });
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Thông tin tài khoản",
      icon: <UserOutlined />,
      onClick: () => navigate("/app/profile"),
    },
    {
      key: "settings",
      label: "Cài đặt",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Dropwdown menu items
  const dropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: (
          <div className="flex items-center gap-2 p-2">
            <UserRound size={18} className="text-gray-700" />
            <span>Thông tin cá nhân</span>
          </div>
        ),
        key: "profile",
        onClick: () => navigate("/app/profile-manager/detail"),
      },
      {
        label: (
          <div
            // onClick={() => setModalChangePassword(true)}
            className="flex items-center gap-2 p-2"
          >
            <LockKeyhole size={18} className="text-gray-700" />
            <span>Đổi mật khẩu</span>
          </div>
        ),
        key: "change-password",
      },

      {
        label: (
          <div
            // onClick={showLogoutModal}
            className="flex items-center gap-2 p-2"
          >
            <Power size={18} className="text-gray-700" />
            <span>Đăng xuất</span>
          </div>
        ),
        key: "logout",
      },
    ],
    []
  );

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-[linear-gradient(90deg,#1a5d9f_0%,#1b75c8_100%)] px-6 text-white shadow-lg">
        {/* Left: Mobile Menu Trigger (hidden on desktop) */}
        <div className="flex items-center gap-4 md:hidden">
          <button className="rounded p-1 hover:bg-white/10">
            <MenuIcon />
          </button>
        </div>

        {/* Center/Right: System Status & Profile */}
        <div className="ml-auto flex items-center gap-6">
          {/* Button Giả lập gửi báo cáo */}
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-full bg-rose-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-600 transition-colors animate-pulse"
          >
            <WarningOutlined />
            Gửi phản ánh (Dân)
          </button>

          {/* Time Display */}
          <div className="hidden text-right md:block">
            <div className="text-sm font-semibold tracking-wide">{time}</div>
            <div className="text-[11px] opacity-80">{date}</div>
          </div>

          {/* System Icons */}
          <div className="flex items-center gap-4 border-l border-white/20 pl-6">
            <div className="relative cursor-pointer hover:opacity-80">
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                3
              </span>
              <BellIcon />
            </div>
            <div className="cursor-pointer hover:opacity-80">
              <WifiIcon />
            </div>
          </div>

          {/* User Profile */}
          <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
            <div className="flex cursor-pointer items-center gap-3 rounded-full bg-white/10 py-1 pl-1 pr-3 hover:bg-white/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-900">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">
                    {user?.fullName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div className="hidden text-xs md:block">
                <div className="font-semibold">{user?.fullName || "Người dùng"}</div>
                <div className="opacity-75">{user?.role === "admin" ? "Quản trị viên" : "Cán bộ"}</div>
              </div>
            </div>
          </Dropdown>
        </div>
      </header>

      {/* Modal Gửi phản ánh (Giả lập phía người dân) */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h3 className="mb-1 text-lg font-bold text-slate-800">
              Gửi phản ánh sự cố
            </h3>
            <p className="mb-4 text-xs text-slate-500">
              Giả lập giao diện người dân gửi tin báo ngập lụt/sự cố.
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Họ tên người gửi
                </label>
                <input
                  type="text"
                  value={reportForm.reporter}
                  onChange={(e) => setReportForm({ ...reportForm, reporter: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Vị trí sự cố <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                  placeholder="Ví dụ: Ngã tư Hàng Xanh..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={reportForm.content}
                  onChange={(e) => setReportForm({ ...reportForm, content: e.target.value })}
                  placeholder="Mô tả tình trạng ngập, kẹt xe..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Đóng
              </button>
              <button
                onClick={handleReportSubmit}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 shadow-sm"
              >
                Gửi phản ánh
              </button>
            </div>
          </div>
          <Dropdown
            arrow
            menu={{ items: dropdownItems }}
            className="cursor-pointer"
            placement="bottomRight"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-8 w-8 rounded-full bg-white/30">
                <img
                  src="/avatar-trang-4 1.png"
                  alt="avatar"
                  className="w-full h-full rounded-full"
                />
              </span>
              <span>Admin</span>
            </div>
          </Dropdown>
        </div>
      )}
    </>
  );
}
