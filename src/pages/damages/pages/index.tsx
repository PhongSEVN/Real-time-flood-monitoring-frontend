const damages = [
  {
    id: 1,
    area: "Khu vực Thủ Đức",
    events: 2,
    estimatedCost: "250 triệu",
    households: 35,
  },
  {
    id: 2,
    area: "Quận 3",
    events: 1,
    estimatedCost: "90 triệu",
    households: 12,
  },
];

export default function DamagesPage() {
  return (
    <>
      {/* Modal Ghi nhận thiệt hại */}

      <div className="space-y-4">
        <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-lg font-semibold text-slate-800">
                Quản lý thiệt hại
              </div>
              <div className="text-xs text-slate-500">
                Ghi nhận sơ bộ thiệt hại do mưa, ngập gây ra theo khu vực (dữ
                liệu mô phỏng)
              </div>
            </div>
            <button className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:shadow-md">
              Thêm ghi nhận thiệt hại
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left">Khu vực</th>
                  <th className="px-4 py-2 text-left">Số đợt ngập</th>
                  <th className="px-4 py-2 text-left">Hộ dân bị ảnh hưởng</th>
                  <th className="px-4 py-2 text-left">Ước tính thiệt hại</th>
                </tr>
              </thead>
              <tbody>
                {damages.map((d, index) => (
                  <tr
                    key={d.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="px-4 py-2 text-slate-800">{d.area}</td>
                    <td className="px-4 py-2 text-slate-700">{d.events}</td>
                    <td className="px-4 py-2 text-slate-700">{d.households}</td>
                    <td className="px-4 py-2 font-semibold text-rose-600">
                      {d.estimatedCost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
