const stations = [
  { id: "B1", name: "Trạm B1 - Quận 1", rain: "4mm", waterLevel: "0.3m", status: "Ổn định" },
  { id: "B3", name: "Trạm B3 - Quận 3", rain: "7mm", waterLevel: "0.5m", status: "Cảnh báo nhẹ" },
  { id: "B5", name: "Trạm B5 - Thủ Đức", rain: "15mm", waterLevel: "0.9m", status: "Vượt ngưỡng" },
];

export default function StationsPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">Danh sách trạm đo</div>
            <div className="text-xs text-slate-500">
              Thông tin nhanh về mưa, mực nước và trạng thái cảnh báo của từng trạm
            </div>
          </div>
          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm hover:shadow-md">
            Thêm trạm mới
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left">Mã trạm</th>
                <th className="px-4 py-2 text-left">Tên trạm</th>
                <th className="px-4 py-2 text-left">Lượng mưa</th>
                <th className="px-4 py-2 text-left">Mực nước</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((st, index) => (
                <tr
                  key={st.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                >
                  <td className="px-4 py-2 font-semibold text-slate-800">{st.id}</td>
                  <td className="px-4 py-2 text-slate-700">{st.name}</td>
                  <td className="px-4 py-2 text-slate-700">{st.rain}</td>
                  <td className="px-4 py-2 text-slate-700">{st.waterLevel}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        st.status === "Vượt ngưỡng"
                          ? "bg-rose-100 text-rose-700"
                          : st.status === "Cảnh báo nhẹ"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


