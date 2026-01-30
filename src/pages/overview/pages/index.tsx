import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const countdownSeconds = 3.5;

export default function Overview() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepMs = 50;
    const totalSteps = (countdownSeconds * 1000) / stepMs;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min(100, Math.round((current / totalSteps) * 100)));
      if (current >= totalSteps) {
        clearInterval(timer);
        navigate("/app/dashboard", { replace: true });
      }
    }, stepMs);
    return () => clearInterval(timer);
  }, [navigate]);

  const skip = () => navigate("/app/dashboard", { replace: true });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2340] via-[#0f345f] to-[#1a5d9f] px-4 py-6 text-white shadow-[0_20px_80px_-32px_rgba(15,23,42,0.6)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-5xl gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:grid-cols-[1.25fr_1fr] md:p-7">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Splash • Hệ thống giám sát mưa & ngập
          </div>
          <div className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            Khởi động nền tảng giám sát mưa, mực nước và cảnh báo ngập
          </div>
          <p className="text-sm text-white/80 sm:text-base">
            Kết nối trạm đo, hiển thị bản đồ ngập, theo dõi lượng mưa 24h qua và nhận cảnh báo kịp
            thời. Giao diện tối ưu cho PC, laptop và cả thiết bị di động.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
              <div className="text-xs text-white/70">Trạm trực tuyến</div>
              <div className="text-2xl font-bold">15</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
              <div className="text-xs text-white/70">Cảnh báo</div>
              <div className="text-2xl font-bold text-amber-200">2</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
              <div className="text-xs text-white/70">Điểm ngập</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={skip}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f345f] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Vào bảng điều khiển
            </button>
            <button
              onClick={skip}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Bỏ qua
            </button>
          </div>

          <div className="mt-2 space-y-2 text-xs text-white/80">
            <div className="flex items-center justify-between">
              <span>Đang tải giao diện</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm shadow-inner sm:grid-cols-2 md:grid-cols-1">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Kịch bản</div>
            <div className="text-base font-semibold">Theo dõi mưa & cảnh báo ngập</div>
            <div className="text-xs text-white/70">Cập nhật liên tục theo thời gian thực</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Thiết bị</div>
            <div className="text-base font-semibold">Kết nối 5 bình</div>
            <div className="text-xs text-white/70">Gateway đã hoạt động ổn định</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Biểu đồ nhanh</div>
            <div className="mt-2 flex h-20 items-end gap-1">
              {[20, 36, 60, 55, 78, 88, 70, 90].map((v, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-cyan-300 to-white"
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
            <div className="mt-1 text-[11px] text-white/60">Mực nước vs lượng mưa (giả lập)</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Hành động nhanh</div>
            <ul className="mt-2 space-y-1 text-[13px] text-white/85">
              <li>• Kết nối thiết bị mới</li>
              <li>• Đặt ngưỡng cảnh báo mực nước</li>
              <li>• Mở bản đồ theo khu vực</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

