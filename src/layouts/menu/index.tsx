import { type ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DashboardIcon,
  ProductIcon,
  ScheduleIcon,
  ServiceIcon,
  WarningIcon,
  HomeIcon,
} from "@/components/base/icons";
import { ShieldCheck as ShieldCheckIcon } from "lucide-react";

type MenuItem = {
  key: string;
  label: string;
  icon: (isActive: boolean) => ReactNode;
  path?: string;
  badge?: string;
};

const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Trang chủ",
    icon: (isActive) => (
      <DashboardIcon height={22} width={22} isActive={isActive} />
    ),
    path: "/app/dashboard",
  },
  {
    key: "reflection",
    label: "Quản lý phản ánh",
    icon: (isActive) => (
      <ServiceIcon height={22} width={22} isActive={isActive} />
    ),
    path: "/app/reflection",
  },
  {
    key: "verification",
    label: "Quản lý xác thực",
    icon: (isActive) => (
      <ShieldCheckIcon
        height={22}
        width={22}
        className={isActive ? "text-white" : "text-sky-400"}
      />
    ),
    path: "/app/verification",
  },
  {
    key: "human-resources",
    label: "Quản lý nhân sự",
    icon: (isActive) => (
      <ProductIcon height={22} width={22} isActive={isActive} />
    ),
    path: "/app/human-resources",
  },
  {
    key: "alerts",
    label: "Cảnh báo",
    icon: <ScheduleIcon height={22} width={22} />,
    badge: "2",
    path: "/app/alerts",
  },
  {
    key: "manage-reports",
    label: "Quản lý phản ánh",
    icon: <WarningIcon height={22} width={22} />,
    path: "/app/manage-reports",
  },
  {
    key: "household",
    label: "Nhà ở & cư dân",
    icon: <HomeIcon height={22} width={22} />,
    path: "/app/household",
  },
  {
    key: "reports",
    label: "Báo cáo & Thống kê",
    icon: <CategoryIcon height={22} width={22} />,
    path: "/app/reports",
  },
  {
    key: "damages",
    label: "Quản lý thiệt hại",
    icon: <CategoryIcon height={22} width={22} />,
    path: "/app/damages",
  },
];

type MenuProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Menu({ isOpen = true, onClose }: MenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string>("dashboard");

  useEffect(() => {
    const found = menuItems.find((item) =>
      location.pathname.startsWith(item.path ?? "#")
    );
    if (found) {
      setActiveKey(found.key);
    }
  }, [location.pathname]);

  const handleClick = (item: MenuItem) => {
    setActiveKey(item.key);
    if (item.path) {
      navigate(item.path);
      // Đóng menu trên mobile sau khi chọn
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <>
      {/* Overlay cho mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-[45] xl:hidden transition-opacity duration-300"
        />
      )}
      <menu
        className={`fixed top-0 left-0 flex h-screen w-[230px] md:w-[240px] flex-col bg-[linear-gradient(180deg,#0e2d4d_0%,#113c6b_100%)] text-white shadow-2xl shadow-[#0c1f36]/40 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-6 bg-(--color-menu)! overflow-hidden">
          <img
            width={150}
            height={90}
            src="/image-logo.png"
            alt="logo"
            className="object-contain mix-blend-screen"
          />
          {/* Close button cho mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="xl:hidden grid h-8 w-8 place-items-center rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
              aria-label="Đóng menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <nav className="flex-1 space-y-2 px-3 py-4">
          {menuItems.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleClick(item)}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 backdrop-blur text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
                    : "text-white/80 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
                    isActive
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 group-hover:border-white/25"
                  }`}
                >
                  {item.icon(isActive)}
                </span>
                <span className="flex-1 text-sm font-semibold tracking-wide">
                  {item.label}
                </span>
                {item.badge ? (
                  <span className="rounded-full bg-amber-400/90 px-2.5 py-0.5 text-xs font-semibold text-[#0d2f56]">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
        <div className="px-4 pb-6 pt-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/80">
            <div className="font-semibold text-white">Trung tâm cảnh báo</div>
            <p className="mt-1 leading-relaxed">
              Theo dõi thời gian thực tình hình mưa, mực nước và các cảnh báo
              ngập úng trên toàn hệ thống.
            </p>
          </div>
        </div>
      </menu>
    </>
  );
}
