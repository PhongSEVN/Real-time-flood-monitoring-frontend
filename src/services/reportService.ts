export type ReportStatus = "unverified" | "verified" | "processing" | "processed";

export interface Report {
  id: number;
  reporter: string;
  content: string;
  location: string;
  timestamp: string;
  status: ReportStatus;
  assignedUnit?: string;
  note?: string;
}

const STORAGE_KEY = "flood_monitoring_reports";

const initialReports: Report[] = [
  {
    id: 1,
    reporter: "Nguyễn Văn A",
    content: "Ngập nặng tại đường Võ Văn Ngân, xe chết máy hàng loạt.",
    location: "Võ Văn Ngân, Thủ Đức",
    timestamp: "2023-10-25 14:30",
    status: "unverified",
  },
  {
    id: 2,
    reporter: "Trần Thị B",
    content: "Cây đổ chắn ngang đường, gây ùn tắc.",
    location: "Lê Văn Việt, Quận 9",
    timestamp: "2023-10-25 15:00",
    status: "verified",
    assignedUnit: "Công ty Cây xanh",
    note: "Đã xác nhận qua camera giao thông",
  },
  {
    id: 3,
    reporter: "Lê Văn C",
    content: "Nước tràn vào nhà dân, cần hỗ trợ bao cát.",
    location: "Thảo Điền, Quận 2",
    timestamp: "2023-10-25 15:15",
    status: "processing",
    assignedUnit: "UBND Phường Thảo Điền",
    note: "Đang điều động lực lượng dân quân",
  },
  {
    id: 4,
    reporter: "Phạm Văn D",
    content: "Hố ga mất nắp nguy hiểm.",
    location: "Xa lộ Hà Nội",
    timestamp: "2023-10-24 09:00",
    status: "processed",
    assignedUnit: "Công ty Thoát nước",
    note: "Đã lắp đặt nắp mới",
  },
];

export const reportService = {
  getReports: (): Report[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // Initialize if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReports));
      return initialReports;
    } catch (error) {
      console.error("Error getting reports", error);
      return [];
    }
  },

  addReport: (report: Omit<Report, "id" | "timestamp" | "status">): Report => {
    const reports = reportService.getReports();
    const newReport: Report = {
      ...report,
      id: Date.now(),
      timestamp: new Date().toLocaleString("vi-VN"), // Format simple for demo
      status: "unverified",
    };
    const updatedReports = [newReport, ...reports];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event("reports-updated"));
    return newReport;
  },

  updateReport: (updatedReport: Report): void => {
    const reports = reportService.getReports();
    const newReports = reports.map((r) =>
      r.id === updatedReport.id ? updatedReport : r
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newReports));
    window.dispatchEvent(new Event("reports-updated"));
  },
};
