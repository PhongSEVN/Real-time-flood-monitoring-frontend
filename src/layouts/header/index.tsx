import { Button, Modal, type MenuProps } from "antd";
import Dropdown from "antd/es/dropdown/dropdown";
import { LockKeyhole, Menu as MenuIcon, Power, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isConnected] = useState(false);
  const [alertsCount] = useState<number | null>(null);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

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
            onClick={() => setIsOpenModalLogout(true)}
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
      {/* Modal đổi mật khẩu */}

      {/* Modal đăng xuất */}
      <Modal
        open={isOpenModalLogout}
        onCancel={() => setIsOpenModalLogout(false)}
        title={<h1 className="text-2xl font-bold"> Đăng xuất</h1>}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              className="h-10!"
              onClick={() => setIsOpenModalLogout(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/login");
              }}
              type="primary"
              className="h-10!"
            >
              Đăng xuất
            </Button>
          </div>
        }
      >
        <div>Bạn có chắc chắn muốn đăng xuất không?</div>
      </Modal>
      <header className="sticky top-0 z-1000 flex h-16 items-center justify-between bg-[linear-gradient(90deg,#1a5d9f_0%,#1b75c8_100%)] px-6 text-white shadow-lg">
        <div className="flex items-center gap-4 xl:gap-6">
          {/* Hamburger button cho mobile */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="xl:hidden grid h-10 w-10 place-items-center rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
              aria-label="Mở menu"
            >
              <MenuIcon size={20} />
            </button>
          )}
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isConnected ? "bg-emerald-400" : "bg-rose-400"
              }`}
              title={
                isConnected ? "Realtime: Connected" : "Realtime: Disconnected"
              }
            />
            <div className="text-lg font-semibold tracking-wide">{time}</div>
          </div>
          <div className="rounded-full bg-white/15 px-3 py-1 text-sm">
            {date}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-1">
            <div className="relative">
              <BellIcon />
              {alertsCount && alertsCount > 0 ? (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[11px] font-extrabold text-[#0d2f56]">
                  {alertsCount > 99 ? "99+" : alertsCount}
                </span>
              ) : (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
              )}
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
                <span>{user?.fullName}</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}
