import React, { useState, useEffect } from "react";
import { reportService, type Report, type ReportStatus } from "@/services/reportService";

const statusConfig: Record<ReportStatus, { label: string; className: string }> = {
  unverified: { label: "Chưa xác thực", className: "bg-slate-100 text-slate-600" },
  verified: { label: "Đã xác thực", className: "bg-blue-100 text-blue-600" },
  processing: { label: "Đang xử lý", className: "bg-amber-100 text-amber-600" },
  processed: { label: "Đã xử lý", className: "bg-emerald-100 text-emerald-600" },
};

export default function ManageReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formStatus, setFormStatus] = useState<ReportStatus>("unverified");
  const [formUnit, setFormUnit] = useState("");
  const [formNote, setFormNote] = useState("");

  const loadReports = () => {
    setReports(reportService.getReports());
  };

  useEffect(() => {
    loadReports();
    // Listen for updates from other components (like user report form)
    window.addEventListener("reports-updated", loadReports);
    return () => {
      window.removeEventListener("reports-updated", loadReports);
    };
  }, []);

  const handleOpenModal = (report: Report) => {
    setSelectedReport(report);
    setFormStatus(report.status);
    setFormUnit(report.assignedUnit || "");
    setFormNote(report.note || "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const handleSave = () => {
    if (selectedReport) {
      const updatedReport: Report = {
        ...selectedReport,
        status: formStatus,
        assignedUnit: formUnit,
        note: formNote,
      };
      
      reportService.updateReport(updatedReport);
      handleCloseModal();
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">
              Quản lý phản ánh
            </div>
            <div className="text-xs text-slate-500">
              Xác thực và xử lý các sự kiện được báo cáo từ người dân
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Người gửi / Thời gian</th>
                <th className="px-4 py-3 text-left">Nội dung / Vị trí</th>
                <th className="px-4 py-3 text-left">Trạng thái</th>
                <th className="px-4 py-3 text-left">Đơn vị xử lý</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Chưa có phản ánh nào.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium text-slate-800">{report.reporter}</div>
                      <div className="text-xs text-slate-500">{report.timestamp}</div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="text-slate-800">{report.content}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 10 3 9c0 3.492 1.698 5.988 3.355 7.62.829.799 1.654 1.381 2.274 1.766.311.192.571.337.757.433a5.746 5.746 0 00.299.149h.002zM10 13a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
                        </svg>
                        {report.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusConfig[report.status].className}`}>
                        {statusConfig[report.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      {report.assignedUnit ? (
                        <span className="text-slate-700">{report.assignedUnit}</span>
                      ) : (
                        <span className="text-slate-400 italic">Chưa gán</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-center">
                      <button
                        onClick={() => handleOpenModal(report)}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        Xử lý
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Xử lý */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Cập nhật trạng thái phản ánh
            </h3>
            
            <div className="space-y-4">
              {/* Thông tin phản ánh */}
              <div className="rounded-lg bg-slate-50 p-3 text-sm">
                <div className="font-medium text-slate-700 mb-1">Nội dung:</div>
                <div className="text-slate-600">{selectedReport.content}</div>
                <div className="mt-2 text-xs text-slate-500">
                  Tại: {selectedReport.location} | Bởi: {selectedReport.reporter}
                </div>
              </div>

              {/* Form Controls */}
              <div className="grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Trạng thái
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ReportStatus)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="unverified">Chưa xác thực</option>
                    <option value="verified">Đã xác thực</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="processed">Đã xử lý</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Đơn vị xử lý
                  </label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="Nhập tên đơn vị..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Ghi chú xác nhận
                  </label>
                  <textarea
                    rows={3}
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    placeholder="Nhập ghi chú..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-sm"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
