import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  Trash2,
  Upload as UploadIcon,
  Waves,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix Leaflet icon issue
import { mapApi } from "@/apis/mapApi";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  addReflectionApi,
  deleteReflectionApi,
  getReflectionsApi,
} from "../api";

const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;

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
  const queryClient = useQueryClient();
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [reliability, setReliability] = useState(0);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);

  const {
    data: reportsData,
    isLoading: isLoadingReports,
    // refetch, // Unused
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getReflectionsApi,
    select: (data) =>
      (Array.isArray(data) ? data : data?.data || []).map((item: any) => {
        const loc = item.location || {};
        return {
          ...item,
          location: {
            lat: loc.lat || item.lat || item.latitude,
            lng: loc.lng || item.lng || item.longitude || item.lon,
            address: loc.address || item.address || item.full_address || item.location_name,
          },
          images: Array.isArray(item.images) ? item.images : [],
        };
      }),
  });

  // Fetch Map Layers (Tam Binh)
  const { data: mapData } = useQuery({
    queryKey: ["map-layers"],
    queryFn: mapApi.getAllLayers,
  });

  // Extract reports list from API response
  const reportsList = Array.isArray(reportsData?.data)
    ? reportsData.data
    : Array.isArray(reportsData)
    ? reportsData
    : [];

  // Mutation for creating report
  const createReportMutation = useMutation({
    mutationFn: addReflectionApi,
    onSuccess: () => {
      message.success("Báo cáo thông tin thành công");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      form.resetFields();
      setLocation(null);
      setFileList([]);
    },
    onError: (error: any) => {
      console.error("Create report error:", error);
      const errorData = error?.response?.data;
      
      Modal.error({
        title: "Lỗi gửi báo cáo",
        content: (
          <div className="max-h-[300px] overflow-auto">
            <p>Chi tiết lỗi từ hệ thống:</p>
            <pre className="bg-gray-100 p-2 rounded text-xs">
              {JSON.stringify(errorData, null, 2)}
            </pre>
          </div>
        ),
      });
    },
  });

  // Mutation for deleting report
  const deleteReportMutation = useMutation({
    mutationFn: deleteReflectionApi,
    onSuccess: () => {
      message.success("Đã xóa báo cáo");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      if (isDetailModalOpen) setIsDetailModalOpen(false);
    },
    onError: (error: any) => {
      console.error("Delete report error:", error);
      message.error(
        error?.response?.data?.message || error?.message || "Xóa báo cáo thất bại"
      );
    },
  });

  const calculateReliability = () => {
    let score = 0;
    const values = form.getFieldsValue();
    
    // 1. Vị trí (40%)
    if (location?.lat && location?.lng) {
      score += 40;
    }

    // 2. Hình ảnh (30%)
    if (fileList.length > 0) {
      score += 20;
      if (fileList.length >= 2) score += 10;
    }

    // 3. Mô tả (20%)
    const desc = values.description || "";
    if (desc.length > 10) score += 10;
    if (desc.length > 50) score += 10;

    // 4. Thông tin phân loại (10%)
    if (values.eventType) score += 5;
    if (values.severity) score += 5;

    setReliability(score);
  };

  useEffect(() => {
    calculateReliability();
  }, [location, fileList]);

  const handleValuesChange = () => {
    calculateReliability();
  };

  const fetchAddress = async (lat: number, lng: number) => {
    setFetchingAddress(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await res.json();
      if (data?.display_name) {
        form.setFieldsValue({ address: data.display_name });
        
        setLocation((prev) => {
          const newLocation = prev ? { ...prev, address: data.display_name } : null;
          return newLocation;
        });
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    } finally {
      setFetchingAddress(false);
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
        const newLocation = {
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: addr,
        };
        setLocation(newLocation);
        message.success("Đã tìm thấy vị trí!");
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
    const newLocation = {
      lat: latlng.lat,
      lng: latlng.lng,
      address: location?.address,
    };
    setLocation(newLocation);
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleConfirmSubmit = (values: any) => {
    confirm({
      title: "Xác nhận gửi báo cáo?",
      content: "Bạn có chắc chắn muốn gửi báo cáo này không?",
      okText: "Gửi ngay",
      cancelText: "Hủy",
      onOk() {
        handleSubmit(values);
      },
    });
  };

  const handleSubmit = async (values: any) => {
    if (!location?.lat || !location?.lng) {
      message.error(
        "Vui lòng chọn vị trí trên bản đồ hoặc xác định từ địa chỉ!"
      );
      return;
    }

    const images: string[] = [];
    if (fileList && fileList.length > 0) {
      try {
        const promises = fileList.map((file) => {
          if (file.originFileObj) {
            return fileToBase64(file.originFileObj);
          }
          return Promise.resolve("");
        });
        const results = await Promise.all(promises);
        results.forEach((res) => {
          if (res) images.push(res);
        });
      } catch (error) {
        console.error("Error converting images:", error);
        message.error("Lỗi khi xử lý hình ảnh");
        return;
      }
    }

    // Calculate the final score right here to ensure accuracy
    
    const payload = {
      title:
        values.title ||
        values.description?.substring(0, 60) +
          (values.description?.length > 60 ? "..." : "") ||
        "Báo cáo mới",
      description: values.description || "",
      location: {
        lat: Number(location.lat),
        lng: Number(location.lng),
        address: values.address || location.address || "",
      },
      // Backward compatibility for scoring
      lat: Number(location.lat),
      lng: Number(location.lng),
      latitude: Number(location.lat),
      longitude: Number(location.lng),
      lon: Number(location.lng),
      address: values.address || location.address || "",
      
      eventType: values.eventType,
      severity: values.severity,
      images: images,
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));
    createReportMutation.mutate(payload as any);
  };

  const handleDelete = (report: any) => {
    confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa báo cáo này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Use reportId or id depending on API response structure
        const id = report.reportId || report.id || report._id;
        if (id) {
          deleteReportMutation.mutate(id);
        } else {
          message.error("Không tìm thấy ID báo cáo");
        }
      },
    });
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

  const getEventTypeLabel = (type?: string) => {
    switch (type) {
      case "RAIN":
        return "Mưa";
      case "TIDE":
        return "Triều cường";
      case "FLOOD":
        return "Ngập lụt";
      case "DYKE_BREAK":
        return "Vỡ đê";
      case "OTHER":
        return "Khác";
      default:
        return type || "Chưa cập nhật";
    }
  };

  const getEventTypeIcon = (type?: string) => {
    switch (type) {
      case "RAIN":
        return <CloudRain size={20} />;
      case "TIDE":
      case "FLOOD":
        return <Waves size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  const getSeverityLabel = (sev?: string) => {
    const s = sev?.toUpperCase();
    switch (s) {
      case "LOW":
      case "LIGHT":
        return "Nhẹ";
      case "MEDIUM":
        return "Trung bình";
      case "HIGH":
      case "EMERGENCY":
        return "Nặng";
      default:
        return sev || "Chưa cập nhật";
    }
  };

  const getSeverityColorCode = (sev?: string) => {
    const s = sev?.toUpperCase();
    switch (s) {
      case "LOW":
      case "LIGHT":
        return "#16a34a"; // green-600
      case "MEDIUM":
        return "#ca8a04"; // yellow-600
      case "HIGH":
      case "EMERGENCY":
        return "#dc2626"; // red-600
      default:
        return "#4b5563"; // gray-600
    }
  };

  const getImageSrc = (url: string) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    // Assume base64 jpeg if no prefix
    return `data:image/jpeg;base64,${url}`;
  };

  // Map Config for Tam Binh
  const mapCenter: [number, number] = [10.8521, 106.7483];
  const mapBounds = [
    [10.8400, 106.7300], // Tây Nam
    [10.8700, 106.7700], // Đông Bắc
  ];

  const geoJsonStyle = (feature: any) => {
    if (
      feature.geometry.type === "MultiLineString" ||
      feature.geometry.type === "LineString"
    ) {
      return { color: "#3b82f6", weight: 4 };
    }
    if (
      feature.geometry.type === "MultiPolygon" ||
      feature.geometry.type === "Polygon"
    ) {
      return {
        color: "#0ea5e9",
        fillColor: "#0ea5e9",
        fillOpacity: 0.3,
        weight: 1,
      };
    }
    return {};
  };

  return (
    <div className="p-4">
      <Title level={3}>Đăng phản ánh / Sự kiện</Title>

      <div className="gap-6">
        {/* Map + Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow">
            <MapContainer
              center={mapCenter}
              zoom={15}
              className="h-full w-full"
              scrollWheelZoom={true}
              maxBounds={mapBounds}
              minZoom={14}
              maxZoom={18}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapData?.data && (
                <GeoJSON data={mapData.data} style={geoJsonStyle} />
              )}
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
              onFinish={handleConfirmSubmit}
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
                    <Option value="RAIN">Mưa</Option>
                    <Option value="TIDE">Triều cường</Option>
                    <Option value="FLOOD">Ngập lụt</Option>
                    <Option value="DYKE_BREAK">Vỡ đê</Option>
                    <Option value="OTHER">Khác</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="severity"
                  label="Mức độ"
                  rules={[{ required: true }]}
                >
                  <Radio.Group className="flex gap-6">
                    <Radio value="LOW">Nhẹ</Radio>
                    <Radio value="MEDIUM">Trung bình</Radio>
                    <Radio value="HIGH">Khẩn cấp</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <Form.Item label="Hình ảnh / Video">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={({ fileList: newList }) => {
                    setFileList(newList);
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

              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between mb-2">
                   <Text strong>Độ tin cậy của tin báo:</Text>
                   <Text strong style={{ color: reliability > 70 ? '#52c41a' : reliability > 40 ? '#faad14' : '#ff4d4f' }}>
                     {reliability}%
                   </Text>
                </div>
                <div className="w-full">
                  <Progress 
                    percent={reliability} 
                    status={reliability === 100 ? 'success' : 'normal'} 
                    strokeColor={reliability > 70 ? '#52c41a' : reliability > 40 ? '#faad14' : '#ff4d4f'} 
                    showInfo={false}
                    className="!m-0 !w-full"
                  />
                </div>
                <Text type="secondary" className="text-xs mt-1 block">
                  * Thêm hình ảnh và mô tả chi tiết để tăng độ tin cậy.
                </Text>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createReportMutation.isPending || fetchingAddress}
                  disabled={!location?.lat || fetchingAddress}
                >
                  {fetchingAddress ? "Đang lấy địa chỉ..." : "Gửi báo cáo"}
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      {/* Lịch sử báo cáo */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-2">
          <MoreHorizontal size={20} />
          <Title level={4} className="!mb-0">
            Lịch sử gửi tin
          </Title>
        </div>

        <List
          loading={isLoadingReports}
          dataSource={reportsList}
          locale={{ emptyText: "Chưa có báo cáo nào được gửi" }}
          renderItem={(item: any) => (
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
                      <div className="flex items-center gap-2">
                        {getStatusTag(item.status)}
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<Trash2 size={16} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 max-w-[200px] truncate" title={item.location?.address || item.address}>
                        <MapPin size={12} className="shrink-0" />
                        {item.location?.address || item.address ? (
                           <span>{item.location?.address || item.address}</span>
                        ) : (
                           <span>
                             {(item.location?.lat || item.lat || 0).toFixed(4)},{" "}
                             {(item.location?.lng || item.lng || 0).toFixed(4)}
                           </span>
                        )}
                      </span>
                      <span>•</span>
                      <span>
                        {item.timestamp ||
                          (item.created_at
                            ? new Date(item.created_at).toLocaleString("vi-VN")
                            : "Vừa gửi")}
                      </span>
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
        footer={[
          <Button
            key="delete"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(selectedReport)}
          >
            Xóa báo cáo
          </Button>,
          <Button key="close" onClick={() => setIsDetailModalOpen(false)}>
            Đóng
          </Button>,
        ]}
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
                  style={{ color: getSeverityColorCode(selectedReport.severity) }}
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
                  selectedReport.location?.lat || selectedReport.lat || 0
                },${selectedReport.location?.lng || selectedReport.lng || 0}`}
                target="_blank"
                className="text-blue-600 hover:underline flex flex-col items-start gap-1"
              >
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>
                    {(
                      selectedReport.location?.lat ||
                      selectedReport.lat ||
                      0
                    ).toFixed(6)}
                    ,{" "}
                    {(
                      selectedReport.location?.lng ||
                      selectedReport.lng ||
                      0
                    ).toFixed(6)}
                  </span>
                </div>
                {(selectedReport.location?.address ||
                  selectedReport.address) && (
                  <span className="text-gray-600 text-sm ml-5">
                    {selectedReport.location?.address || selectedReport.address}
                  </span>
                )}
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
                  {selectedReport.images
                    .filter((url: string) => url && typeof url === 'string' && url.trim() !== "")
                    .map((url: string, i: number) => (
                      <img
                        key={i}
                        src={getImageSrc(url)}
                        alt="evidence"
                        className="w-full h-24 object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Reliability Score in Detail Modal */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
               <div className="flex justify-between mb-2">
                  <Text strong>Độ tin cậy của tin báo:</Text>
               </div>
               {(() => {
                  let score = 0;
                  if (selectedReport.location?.lat || selectedReport.lat) score += 40;
                  if (selectedReport.images && selectedReport.images.length > 0) {
                    score += 20;
                    if (selectedReport.images.length >= 2) score += 10;
                  }
                  const desc = selectedReport.description || "";
                  if (desc.length > 10) score += 10;
                  if (desc.length > 50) score += 10;
                  if (selectedReport.eventType) score += 5;
                  if (selectedReport.severity) score += 5;
                  
                  score = Math.max(0, score - 10);

                  return (
                    <div className="w-full">
                      <Progress 
                        percent={score} 
                        status={score === 100 ? 'success' : 'normal'} 
                        strokeColor={score > 70 ? '#52c41a' : score > 40 ? '#faad14' : '#ff4d4f'} 
                        showInfo={false}
                        className="!m-0 !w-full"
                      />
                    </div>
                  );
               })()}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
