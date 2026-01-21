const alerts = [
  {
    id: 1,
    station: "Trạm B5 - Thủ Đức",
    level: "Cao",
    time: "15:24",
    desc: "Mực nước vượt ngưỡng 0.8m",
    status: "Đang xử lý",
  },
  {
    id: 2,
    station: "Trạm B3 - Quận 3",
    level: "Trung bình",
    time: "14:10",
    desc: "Mưa lớn trong 30 phút",
    status: "Đã ghi nhận",
  },
];

export default function AlertsPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">Cảnh báo</div>
            <div className="text-xs text-slate-500">
              Nhật ký các cảnh báo mưa và ngập theo thời gian thực
            </div>
          </div>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
            {alerts.length} cảnh báo gần đây
          </span>
        </div>

        <div className="space-y-2">
          {alerts.map((a) => (
            <div
              key={a.id}
              className="flex flex-col justify-between gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm md:flex-row md:items-center"
            >
              <div>
                <div className="text-xs font-semibold uppercase text-slate-500">
                  {a.time} • {a.station}
                </div>
                <div className="text-sm font-semibold text-slate-800">{a.desc}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-3 py-1 font-semibold ${
                    a.level === "Cao"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  Mức {a.level}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-700">
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


