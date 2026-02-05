import { Button, List, Modal, Popconfirm, Progress, Tag, message } from "antd";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Clock,
  CloudRain,
  Eye,
  MapPin,
  Waves,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Report {
  id: string;
  type: string;
  eventType?: "rain" | "tide" | "flood" | "dyke_break" | "other";
  severity?: "light" | "medium" | "emergency";
  title: string;
  description: string;
  location: { lat: number; lng: number; address?: string };
  images: any[];
  status: "pending" | "approved" | "rejected";
  timestamp: string;
}

export default function VerificationPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      type: "flood",
      eventType: "flood",
      severity: "emergency",
      title: "Báo cáo: Starbucks, 45, Trường Sơn, Phường Tân Sơn Hòa",
      description:
        "Mô tả thêm về thời gian, hướng nước chảy, lưu ý cho người đi đường...",
      location: {
        lat: 10.813,
        lng: 106.663,
        address:
          "Starbucks, 45, Trường Sơn, Phường Tân Sơn Hòa, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
      },
      images: [],
      status: "pending",
      timestamp: new Date().toLocaleString("vi-VN"),
    },
    {
      id: "2",
      type: "rain",
      eventType: "rain",
      severity: "medium",
      title: "Báo cáo: 123 Đường Lê Lợi, Quận 1, TP.HCM",
      description: "Mưa lớn kéo dài, nước ngập khoảng 30cm",
      location: {
        lat: 10.7769,
        lng: 106.7009,
        address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      },
      images: [],
      status: "approved",
      timestamp: new Date(Date.now() - 3600000).toLocaleString("vi-VN"),
    },
    {
      id: "3",
      type: "tide",
      eventType: "tide",
      severity: "light",
      title: "Báo cáo: 456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      description: "Triều cường dâng cao, chưa ảnh hưởng giao thông",
      location: {
        lat: 10.7756,
        lng: 106.7019,
        address: "456 Đường Nguyễn Huệ, Phường Đa Kao, Quận 1, TP.HCM",
      },
      images: [],
      status: "pending",
      timestamp: new Date(Date.now() - 7200000).toLocaleString("vi-VN"),
    },
  ]);

  // Hàm xử lý xác thực báo cáo
  const handleVerify = (id: string, status: "approved" | "rejected") => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );
    message.success(
      status === "approved"
        ? "Đã duyệt báo cáo thành công!"
        : "Đã từ chối báo cáo!"
    );
    if (selectedReport?.id === id) {
      setSelectedReport({ ...selectedReport, status });
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Tag
            className="flex items-center gap-1"
            icon={<Clock size={12} />}
            color="orange"
          >
            Đang chờ duyệt
          </Tag>
        );
      case "approved":
        return (
          <Tag
            className="flex items-center gap-1"
            icon={<CheckCircle size={12} />}
            color="green"
          >
            Đã duyệt
          </Tag>
        );
      case "rejected":
        return (
          <Tag
            className="flex items-center gap-1"
            icon={<XCircle size={12} />}
            color="red"
          >
            Từ chối
          </Tag>
        );
      default:
        return <Tag className="flex items-center gap-1">Mới</Tag>;
    }
  };

  const getEventTypeIcon = (eventType?: string) => {
    switch (eventType) {
      case "rain":
        return <CloudRain size={24} className="text-blue-500" />;
      case "tide":
        return <Waves size={24} className="text-cyan-500" />;
      case "flood":
        return <Waves size={24} className="text-red-500" />;
      default:
        return <AlertTriangle size={24} className="text-orange-500" />;
    }
  };

  const getEventTypeLabel = (eventType?: string) => {
    switch (eventType) {
      case "rain":
        return "Mưa";
      case "tide":
        return "Triều cường";
      case "flood":
        return "Ngập lụt";
      case "dyke_break":
        return "Vỡ đê";
      default:
        return "Khác";
    }
  };

  return (
    <div className="space-y-4">
      {/* Danh sách báo cáo */}
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-4 flex items-center gap-2">
          <div className="text-lg font-semibold text-slate-800">
            Danh sách báo cáo
          </div>
        </div>

        <List
          dataSource={reports}
          split={false}
          className="space-y-3"
          renderItem={(item) => (
            <List.Item className="!p-0 !border-0 mb-3">
              <div
                className="w-full bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                onClick={() => {
                  setSelectedReport(item);
                  setIsDetailModalOpen(true);
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  {getEventTypeIcon(item.eventType)}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  {/* Title & Status */}
                  <div className="md:col-span-4 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-base font-semibold text-slate-800"
                        title={item.title}
                      >
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{item.timestamp}</span>
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:flex items-center gap-1 truncate ">
                        <MapPin size={12} />
                        {item.location.lat.toFixed(4)},{" "}
                        {item.location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="md:col-span-5 flex items-center gap-2 overflow-hidden flex-wrap">
                    {getStatusTag(item.status)}
                    {item.severity === "emergency" && (
                      <Tag color="red" className="m-0">
                        Khẩn cấp
                      </Tag>
                    )}
                    {item.severity === "medium" && (
                      <Tag color="gold" className="m-0">
                        Trung bình
                      </Tag>
                    )}
                    {item.severity === "light" && (
                      <Tag color="green" className="m-0">
                        Nhẹ
                      </Tag>
                    )}
                    {item.eventType && (
                      <Tag className="m-0">
                        {getEventTypeLabel(item.eventType)}
                      </Tag>
                    )}
                  </div>

                  {/* Description Preview */}
                  <div className="hidden md:col-span-3 md:block min-w-0">
                    <span
                      className="text-sm text-slate-500 truncate block"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.description || "Không có mô tả"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex items-center gap-1 shrink-0 pl-2 border-l border-slate-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.status === "pending" && (
                    <>
                      <Popconfirm
                        title="Xác nhận duyệt báo cáo?"
                        description="Báo cáo này sẽ được đánh dấu là đã duyệt."
                        onConfirm={() => handleVerify(item.id, "approved")}
                        okText="Duyệt"
                        cancelText="Hủy"
                      >
                        <Button
                          type="text"
                          shape="circle"
                          icon={
                            <Check
                              size={18}
                              className="text-green-500 group-hover:text-green-600"
                            />
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
                      <Popconfirm
                        title="Xác nhận từ chối báo cáo?"
                        description="Báo cáo này sẽ bị từ chối."
                        onConfirm={() => handleVerify(item.id, "rejected")}
                        okText="Từ chối"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          type="text"
                          shape="circle"
                          danger
                          icon={
                            <X
                              size={18}
                              className="text-red-500 group-hover:text-red-600"
                            />
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
                    </>
                  )}
                  <Button
                    type="text"
                    shape="circle"
                    icon={
                      <Eye
                        size={18}
                        className="text-slate-400 group-hover:text-blue-500"
                      />
                    }
                    onClick={() => {
                      setSelectedReport(item);
                      setIsDetailModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </List.Item>
          )}
          locale={{ emptyText: "Chưa có báo cáo nào" }}
        />
      </div>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết báo cáo"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={
          selectedReport?.status === "pending" ? (
            <div className="flex justify-end gap-2">
              <Popconfirm
                title="Xác nhận từ chối báo cáo?"
                description="Báo cáo này sẽ bị từ chối."
                onConfirm={() => {
                  if (selectedReport) {
                    handleVerify(selectedReport.id, "rejected");
                    setIsDetailModalOpen(false);
                  }
                }}
                okText="Từ chối"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<X size={16} />}>
                  Từ chối
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Xác nhận duyệt báo cáo?"
                description="Báo cáo này sẽ được đánh dấu là đã duyệt."
                onConfirm={() => {
                  if (selectedReport) {
                    handleVerify(selectedReport.id, "approved");
                    setIsDetailModalOpen(false);
                  }
                }}
                okText="Duyệt"
                cancelText="Hủy"
              >
                <Button type="primary" icon={<Check size={16} />}>
                  Duyệt báo cáo
                </Button>
              </Popconfirm>
            </div>
          ) : null
        }
        width={600}
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold m-0">
                {selectedReport.title}
              </h3>
              {getStatusTag(selectedReport.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg">
              <div>
                <span className="block text-xs text-slate-500 mb-1">
                  Loại sự kiện
                </span>
                <Tag color="blue">
                  {getEventTypeLabel(selectedReport.eventType)}
                </Tag>
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1">
                  Mức độ
                </span>
                <span
                  className="font-semibold"
                  style={{
                    color:
                      selectedReport.severity === "light"
                        ? "green"
                        : selectedReport.severity === "medium"
                        ? "#ca8a04"
                        : selectedReport.severity === "emergency"
                        ? "red"
                        : "inherit",
                  }}
                >
                  {selectedReport.severity === "light"
                    ? "Nhẹ"
                    : selectedReport.severity === "medium"
                    ? "Trung bình"
                    : selectedReport.severity === "emergency"
                    ? "Khẩn cấp"
                    : "Chưa cập nhật"}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-xs text-slate-500 mb-1">Vị trí</span>
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin size={16} />
                <a
                  href={`https://www.google.com/maps?q=${selectedReport.location.lat},${selectedReport.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {selectedReport.location.address ||
                    `Lat: ${selectedReport.location.lat.toFixed(
                      6
                    )}, Lng: ${selectedReport.location.lng.toFixed(6)}`}
                </a>
              </div>
            </div>

            <div>
              <span className="block text-xs text-slate-500 mb-1">
                Ghi chú thêm
              </span>
              <div className="bg-slate-50 p-3 rounded-lg text-slate-700 min-h-[60px]">
                {selectedReport.description || "Không có ghi chú"}
              </div>
            </div>

            {/* Trust score removed */}
          </div>
        )}
      </Modal>
    </div>
  );
}
