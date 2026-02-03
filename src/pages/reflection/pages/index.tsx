import {
  Button,
  Card,
  Form,
  Input,
  List,
  Modal,
  Progress,
  Radio,
  Select,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  AlertTriangle,
  CloudRain,
  MapPin,
  MoreHorizontal,
  Upload as UploadIcon,
  Waves,
} from "lucide-react";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix Leaflet icon issue
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { addReflectionApi } from "../api";
import type { Reflection } from "../interfaces";

const { Title, Text } = Typography;
const { Option } = Select;

const defaultIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function CreateReportPage() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [trustScore, setTrustScore] = useState(0);
  // Dùng any[] tạm thời để tránh lỗi type vì interface Reflection chưa có id, status, timestamp, trustScore
  const [submittedReports, setSubmittedReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateScore = () => {
    const values = form.getFieldsValue();
    let score = 0;
    if (values.address) score += 10;
    if (location) score += 20;
    if (values.eventType) score += 10;
    if (values.severity) score += 10;
    if (values.description && values.description.length > 10) score += 10;
    if (fileList.length > 0) score += 30;
    setTrustScore(Math.min(score, 100));
  };

  const handleValuesChange = () => calculateScore();

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await res.json();
      if (data?.display_name) {
        form.setFieldsValue({ address: data.display_name });
        setLocation((prev) =>
          prev ? { ...prev, address: data.display_name } : null
        );
        calculateScore();
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    }
  };

  const fetchCoordinates = async () => {
    const addr = form.getFieldValue("address");
    if (!addr) return message.warning("Vui lòng nhập địa chỉ trước!");

    setLoadingLocation(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          addr
        )}&limit=1`
      );
      const data = await res.json();
      if (data?.length > 0) {
        const { lat, lon } = data[0];
        setLocation({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: addr,
        });
        message.success("Đã tìm thấy vị trí!");
        calculateScore();
      } else {
        message.error("Không tìm thấy địa chỉ.");
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tìm vị trí.");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleLocationSelect = (latlng: { lat: number; lng: number }) => {
    setLocation({
      lat: latlng.lat,
      lng: latlng.lng,
      address: location?.address,
    });
    fetchAddress(latlng.lat, latlng.lng);
    message.success("Đã ghim vị trí!");
  };

  function MapUpdater({
    center,
  }: {
    center: { lat: number; lng: number } | null;
  }) {
    const map = useMap();
    if (center) map.flyTo(center, 16);
    return null;
  }

  function LocationMarker() {
    useMapEvents({
      click(e: any) {
        handleLocationSelect(e.latlng);
      },
    });
    return location ? (
      <Marker position={[location.lat, location.lng]}>
        <Popup>Vị trí sự cố</Popup>
      </Marker>
    ) : null;
  }

  const handleSubmit = async (values: any) => {
    if (!location?.lat || !location?.lng) {
      message.error(
        "Vui lòng chọn vị trí trên bản đồ hoặc xác định từ địa chỉ!"
      );
      return;
    }

    setLoading(true);
    try {
      const payload: Reflection = {
        title:
          values.title ||
          values.description?.substring(0, 60) +
            (values.description?.length > 60 ? "..." : "") ||
          "Báo cáo mới",
        description: values.description || "",
        lat: location.lat,
        lng: location.lng,
        address: values.address || location.address || "",
        eventType: values.eventType,
        severity: values.severity,
        images: fileList.map(
          (file) =>
            file.thumbUrl ||
            URL.createObjectURL(file.originFileObj || file) ||
            ""
        ),
      };

      const res = await addReflectionApi(payload);

      if (res.success) {
        message.success("Báo cáo thông tin thành công");

        // Tạo object cho lịch sử (dùng any hoặc mở rộng type nếu cần)
        const newReport = {
          ...payload,
          reportId:
            res.data?.reportId ||
            res.data?.data?.reportId ||
            Date.now().toString(),
          status: res.data?.status || "PENDING",
          timestamp: res.data?.timestamp || new Date().toLocaleString("vi-VN"),
          trustScore: res.data?.trustScore || trustScore,
          images: res.data?.images || payload.images, // ưu tiên URL từ server
        };

        setSubmittedReports((prev) => [newReport, ...prev]);

        form.resetFields();
        setLocation(null);
        setFileList([]);
        setTrustScore(0);
      } else {
        message.error(res.message || "Báo cáo thông tin thất bại");
      }
    } catch (error) {
      console.error("Submit error:", error);
      message.error("Có lỗi xảy ra khi gửi báo cáo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setSubmittedReports((prev) =>
      prev.filter((r) => r.reportId !== id && r.id !== id)
    );
    message.success("Đã xóa khỏi lịch sử cục bộ");
  };

  const getStatusTag = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return <Tag color="orange">Đang chờ duyệt</Tag>;
      case "APPROVED":
        return <Tag color="green">Đã duyệt</Tag>;
      case "REJECTED":
        return <Tag color="red">Từ chối</Tag>;
      default:
        return <Tag color="default">Mới</Tag>;
    }
  };

  const getEventTypeIcon = (type?: string) => {
    switch (type) {
      case "rain":
        return <CloudRain size={20} />;
      case "tide":
      case "flood":
        return <Waves size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const getEventTypeLabel = (type?: string) => {
    switch (type) {
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

  const getSeverityLabel = (sev?: string) => {
    switch (sev) {
      case "light":
        return "Nhẹ";
      case "medium":
        return "Trung bình";
      case "emergency":
        return "Khẩn cấp";
      default:
        return sev || "Chưa cập nhật";
    }
  };

  const getSeverityColor = (sev?: string) => {
    switch (sev) {
      case "light":
        return "green";
      case "medium":
        return "gold";
      case "emergency":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4">
      <Title level={3}>Đăng phản ánh / Sự kiện</Title>

      <div className=" gap-6">
        {/* Map + Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow">
            <MapContainer
              center={[10.8231, 106.6297]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <LocationMarker />
              <MapUpdater
                center={
                  location ? { lat: location.lat, lng: location.lng } : null
                }
              />
            </MapContainer>
          </div>

          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              onValuesChange={handleValuesChange}
            >
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ví dụ: 123 Đường ABC, Quận XYZ, TP.HCM"
                  onBlur={fetchCoordinates}
                  onPressEnter={(e) => {
                    e.preventDefault();
                    fetchCoordinates();
                  }}
                  disabled={loadingLocation}
                  suffix={
                    <Button
                      type="text"
                      size="small"
                      loading={loadingLocation}
                      onClick={fetchCoordinates}
                    >
                      {loadingLocation ? "Đang tìm..." : "Tìm vị trí"}
                    </Button>
                  }
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="eventType"
                  label="Loại sự kiện"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn loại">
                    <Option value="rain">Mưa</Option>
                    <Option value="tide">Triều cường</Option>
                    <Option value="flood">Ngập lụt</Option>
                    <Option value="dyke_break">Vỡ đê</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="severity"
                  label="Mức độ"
                  rules={[{ required: true }]}
                >
                  <Radio.Group className="flex gap-6">
                    <Radio value="light">Nhẹ</Radio>
                    <Radio value="medium">Trung bình</Radio>
                    <Radio value="emergency">Khẩn cấp</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <Form.Item label="Hình ảnh / Video">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={({ fileList: newList }) => {
                    setFileList(newList);
                    calculateScore();
                  }}
                  beforeUpload={() => false}
                  maxCount={5}
                >
                  <Button icon={<UploadIcon size={16} />}>Chọn tệp</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả / Ghi chú"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  rows={4}
                  maxLength={500}
                  placeholder="Mô tả chi tiết sự cố..."
                />
              </Form.Item>

              <div className="flex justify-between items-center pt-6 border-t">
                <div className="flex items-center gap-3">
                  <span className="w-[160px]">Độ tin cậy:</span>
                  <Progress
                    percent={trustScore}
                    size="small"
                    showInfo={false}
                    className="w-32"
                  />
                  <span>{trustScore}/100</span>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!location?.lat}
                >
                  Gửi báo cáo
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      {/* Lịch sử báo cáo */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MoreHorizontal size={20} />
          <Title level={4} className="!mb-0">
            Lịch sử gửi tin
          </Title>
        </div>

        <List
          dataSource={submittedReports}
          locale={{ emptyText: "Chưa có báo cáo nào được gửi" }}
          renderItem={(item) => (
            <List.Item className="!p-0 !border-0 mb-3">
              <Card
                hoverable
                size="small"
                onClick={() => {
                  setSelectedReport(item);
                  setIsDetailModalOpen(true);
                }}
              >
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center shrink-0">
                    {getEventTypeIcon(item.eventType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <Text strong className="line-clamp-2">
                        {item.title ||
                          item.description?.substring(0, 60) ||
                          "Không có tiêu đề"}
                      </Text>
                      {getStatusTag(item.status)}
                    </div>
                    <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {item.lat?.toFixed(4)}, {item.lng?.toFixed(4)}
                      </span>
                      <span>•</span>
                      <span>{item.timestamp || "Vừa gửi"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>

      {/* Modal chi tiết */}
      <Modal
        title="Chi tiết báo cáo"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={640}
      >
        {selectedReport && (
          <div className="space-y-5">
            <div className="flex justify-between items-start">
              <Title level={5} className="!mb-0">
                {selectedReport.title ||
                  selectedReport.description?.substring(0, 100) ||
                  "Báo cáo sự kiện"}
              </Title>
              {getStatusTag(selectedReport.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
              <div>
                <Text type="secondary" className="block text-xs">
                  Loại sự kiện
                </Text>
                <Text strong>
                  {getEventTypeLabel(selectedReport.eventType)}
                </Text>
              </div>
              <div>
                <Text type="secondary" className="block text-xs">
                  Mức độ
                </Text>
                <Text
                  strong
                  className={`text-${getSeverityColor(
                    selectedReport.severity
                  )}-600`}
                >
                  {getSeverityLabel(selectedReport.severity)}
                </Text>
              </div>
            </div>

            <div>
              <Text type="secondary" className="block text-xs mb-1">
                Vị trí
              </Text>
              <a
                href={`https://www.google.com/maps?q=${
                  selectedReport.lat || 0
                },${selectedReport.lng || 0}`}
                target="_blank"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <MapPin size={14} />
                {selectedReport.address ||
                  `${(selectedReport.lat || 0).toFixed(6)}, ${(
                    selectedReport.lng || 0
                  ).toFixed(6)}`}
              </a>
            </div>

            <div>
              <Text type="secondary" className="block text-xs mb-1">
                Mô tả
              </Text>
              <div className="bg-gray-50 p-3 rounded whitespace-pre-wrap">
                {selectedReport.description || "Không có mô tả"}
              </div>
            </div>

            {selectedReport.images?.length > 0 && (
              <div>
                <Text type="secondary" className="block text-xs mb-2">
                  Hình ảnh
                </Text>
                <div className="grid grid-cols-3 gap-2">
                  {selectedReport.images.map((url: string, i: number) => (
                    <img
                      key={i}
                      src={url}
                      alt="evidence"
                      className="w-full h-24 object-cover rounded border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t text-sm text-gray-500 flex justify-between">
              <span>
                Độ tin cậy:{" "}
                <strong>{selectedReport.trustScore || trustScore}/100</strong>
              </span>
              <span>
                ID: {selectedReport.reportId || selectedReport.id || "N/A"}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
