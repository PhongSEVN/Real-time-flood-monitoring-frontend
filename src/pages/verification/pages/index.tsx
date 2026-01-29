export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">Báo cáo & Thống kê</div>
            <div className="text-xs text-slate-500">
              Tổng hợp số liệu mưa, mực nước và cảnh báo theo ngày/tháng
            </div>
          </div>
          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:shadow-md">
            Xuất báo cáo PDF
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm shadow-sm">
            <div className="mb-2 text-sm font-semibold text-slate-800">
              Thống kê lượng mưa theo ngày (giả lập)
            </div>
            <div className="flex h-32 items-end gap-1">
              {[10, 24, 32, 18, 40, 28, 36].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-sky-300 to-sky-600"
                  style={{ height: `${v + 20}%` }}
                />
              ))}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Biểu đồ cột minh họa lượng mưa 7 ngày gần nhất.
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm shadow-sm">
            <div className="mb-2 text-sm font-semibold text-slate-800">
              Tần suất cảnh báo theo mức độ (giả lập)
            </div>
            <div className="mt-2 space-y-2 text-[13px] text-slate-700">
              <div className="flex items-center justify-between">
                <span>Mức cao</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-28 rounded-full bg-rose-200">
                    <div className="h-2 w-16 rounded-full bg-rose-500" />
                  </div>
                  <span>4 lần</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Mức trung bình</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-28 rounded-full bg-amber-200">
                    <div className="h-2 w-20 rounded-full bg-amber-500" />
                  </div>
                  <span>7 lần</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Mức thấp</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-28 rounded-full bg-emerald-200">
                    <div className="h-2 w-24 rounded-full bg-emerald-500" />
                  </div>
                  <span>12 lần</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


