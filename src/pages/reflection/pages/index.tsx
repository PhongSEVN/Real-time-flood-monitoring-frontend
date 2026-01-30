export default function ReflectionPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">
              Bản đồ mưa
            </div>
            <div className="text-xs text-slate-500">
              Phân bố cường độ mưa theo khu vực trong 24 giờ gần nhất
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-700">
              Radar mưa
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
              24h gần nhất
            </span>
          </div>
        </div>
        <div className="relative h-[360px] overflow-hidden rounded-xl border border-white/60 bg-slate-900 shadow-inner">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=1600&q=80"
              alt="Rain map"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
          </div>
          <div className="relative h-full w-full">
            <div className="absolute right-6 top-6 rounded-lg bg-white/90 px-4 py-3 text-xs shadow-lg">
              <div className="text-[11px] font-semibold uppercase text-slate-500">
                Cường độ mưa
              </div>
              <div className="mt-1 flex items-center gap-2 text-slate-700">
                <span className="h-2 w-2 rounded-full bg-sky-300" /> Nhẹ
                <span className="h-2 w-2 rounded-full bg-sky-500" /> Vừa
                <span className="h-2 w-2 rounded-full bg-blue-700" /> To
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
