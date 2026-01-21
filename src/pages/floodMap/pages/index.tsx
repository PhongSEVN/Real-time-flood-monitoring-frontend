export default function FloodMapPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">Bản đồ ngập</div>
            <div className="text-xs text-slate-500">
              Hiển thị các điểm ngập và trạm đo mực nước theo khu vực
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">
              Trực tuyến
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
              3 điểm ngập
            </span>
          </div>
        </div>
        <div className="relative h-[360px] overflow-hidden rounded-xl border border-white/60 bg-slate-900 shadow-inner">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
              alt="Flood map"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
          </div>
          <div className="relative h-full w-full">
            <div className="absolute left-6 top-6 rounded-lg bg-white/90 px-4 py-3 text-xs shadow-lg">
              <div className="text-[11px] font-semibold uppercase text-slate-500">
                Lọc khu vực
              </div>
              <div className="mt-1 text-slate-700">Khu vực trung tâm • 15 trạm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


