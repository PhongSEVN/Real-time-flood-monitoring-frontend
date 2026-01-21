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

const WifiIcon = () => (
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
      d="M8.344 15.657a4.5 4.5 0 016.312 0M6.222 13.536a7.5 7.5 0 0111.556 0M4.1 11.414c4.773-4.772 11.828-4.772 16.6 0M12 18.5h.01"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export default function Header() {
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

  return (
    <header className="flex h-16 items-center justify-between bg-[linear-gradient(90deg,#1a5d9f_0%,#1b75c8_100%)] px-6 text-white shadow-lg">
      <div className="flex items-center gap-6">
        <div className="text-lg font-semibold tracking-wide">{time}</div>
        <div className="rounded-full bg-white/15 px-3 py-1 text-sm">
          {date}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium">
          <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.3)]" />
          Kết nối
        </div>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-[#1a5d9f] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
          <WifiIcon />
          Kết nối thiết bị
        </button>
        <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-1">
          <div className="relative">
            <BellIcon />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="h-8 w-8 rounded-full bg-white/30" />
            <span>Admin</span>
          </div>
        </div>
        <button className="rounded-full bg-white/10 p-2 text-lg hover:bg-white/20">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
