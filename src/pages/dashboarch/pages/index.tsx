import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, Tag, Typography, Button, Modal } from "antd";
import { AlertTriangle, Droplets, MapPin, Clock, CloudRain, Waves, Car, Info } from "lucide-react";

const { Title, Text } = Typography;

interface FloodPoint {
  id: number;
  position: [number, number];
  level: "low" | "medium" | "high";
  locationName: string;
  description: string;
  depth: number; // cm
  updatedAt: string;
}

const floodData: FloodPoint[] = [
  {
    id: 1,
    position: [10.8231, 106.6297], // Gò Vấp
    level: "low",
    locationName: "Ngã 5 Chuồng Chó",
    description: "Nước ngập nhẹ do triều cường, xe máy vẫn di chuyển được.",
    depth: 15,
    updatedAt: "10 phút trước",
  },
  {
    id: 2,
    position: [10.786, 106.695], // Quận 1
    level: "low",
    locationName: "Đường Nguyễn Hữu Cảnh",
    description: "Mặt đường ướt, có vũng nước nhỏ.",
    depth: 5,
    updatedAt: "5 phút trước",
  },
  {
    id: 3,
    position: [10.852, 106.77], // Thủ Đức
    level: "high",
    locationName: "Đường Võ Văn Ngân",
    description: "Ngập sâu, dòng nước chảy xiết, nguy hiểm cho xe máy.",
    depth: 50,
    updatedAt: "2 phút trước",
  },
  {
    id: 4,
    position: [10.76, 106.66], // Quận 5
    level: "medium",
    locationName: "Đường Hồng Bàng",
    description: "Ngập nửa bánh xe máy, di chuyển chậm.",
    depth: 30,
    updatedAt: "15 phút trước",
  },
  {
    id: 5,
    position: [10.74, 106.73], // Quận 7
    level: "medium",
    locationName: "Đường Huỳnh Tấn Phát",
    description: "Ngập do triều cường dâng cao.",
    depth: 25,
    updatedAt: "20 phút trước",
  },
  {
    id: 6,
    position: [10.80, 106.65], // Tân Bình
    level: "high",
    locationName: "Đường Âu Cơ",
    description: "Kẹt xe nghiêm trọng do ngập sâu.",
    depth: 45,
    updatedAt: "Vừa xong",
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "low":
      return "#22c55e"; // Green
    case "medium":
      return "#eab308"; // Yellow
    case "high":
      return "#ef4444"; // Red
    default:
      return "#3b82f6"; // Blue default
  }
};

const getLevelLabel = (level: string) => {
  switch (level) {
    case "low":
      return <Tag color="success">Nhẹ</Tag>;
    case "medium":
      return <Tag color="warning">Trung bình</Tag>;
    case "high":
      return <Tag color="error">Nặng</Tag>;
    default:
      return <Tag>Không xác định</Tag>;
  }
};

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const mapCenter: [number, number] = [10.82, 106.7];

import RainInfo from "../components/RainInfo";
import TideInfo from "../components/TideInfo";
import TrafficInfo from "../components/TrafficInfo";
import OtherInfo from "../components/OtherInfo";
import NewsFeed from "../components/NewsFeed";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [modalType, setModalType] = useState<"rain" | "tide" | "traffic" | "other" | null>(null);

  const handleOpenModal = (type: "rain" | "tide" | "traffic" | "other", title: string, content: string) => {
    setModalType(type);
    setCurrentInfo({ title, content });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentInfo(null);
    setModalType(null);
  };

  const renderModalContent = () => {
    if (modalType === "rain") {
      return <RainInfo />;
    }
    if (modalType === "tide") {
      return <TideInfo />;
    }
    if (modalType === "traffic") {
      return <TrafficInfo />;
    }
    if (modalType === "other") {
      return <OtherInfo />;
    }
    
    // Placeholder cho các loại khác
    return (
      <>
        <p>{currentInfo?.content}</p>
        <p className="text-slate-500 italic mt-4">Nội dung chi tiết đang được cập nhật...</p>
      </>
    );
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-2">
        <Title level={3} className="!m-0 text-slate-800">
          Bản đồ cảnh báo ngập lụt
        </Title>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 block"></span> Nhẹ
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span> Trung bình
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 block"></span> Nặng
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={12}
          className="h-[450px] w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {floodData.map((point) => (
            <CircleMarker
              key={point.id}
              center={point.position}
              pathOptions={{
                color: "white",
                weight: 2,
                fillColor: getLevelColor(point.level),
                fillOpacity: 0.8,
              }}
              radius={10}
            >
              <Popup>
                <div className="p-1 min-w-[250px]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base m-0 text-slate-800 flex items-center gap-1">
                      <MapPin size={16} className="text-blue-500" />
                      {point.locationName}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Text className="text-slate-500 text-xs">Mức độ:</Text>
                      {getLevelLabel(point.level)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Text className="text-slate-500 text-xs flex items-center gap-1">
                        <Droplets size={12} /> Độ sâu:
                      </Text>
                      <Text strong>{point.depth} cm</Text>
                    </div>

                    <div className="flex items-center justify-between">
                      <Text className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock size={12} /> Cập nhật:
                      </Text>
                      <Text className="text-xs text-slate-600">{point.updatedAt}</Text>
                    </div>

                    <div className="bg-slate-50 p-2 rounded text-sm text-slate-700 mt-2 border border-slate-100">
                      <AlertTriangle size={14} className="inline mr-1 text-orange-500" />
                      {point.description}
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => handleOpenModal("rain", "Thông tin Mưa", "Chi tiết về lượng mưa, dự báo mưa trong khu vực...")}
          className="h-20 cursor-pointer rounded-xl bg-blue-500 hover:bg-blue-600 shadow-sm flex flex-col items-center justify-center gap-1 text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <CloudRain size={24} />
          <span className="text-sm font-semibold">Mưa</span>
        </div>

        <div
          onClick={() => handleOpenModal("tide", "Thông tin Triều Cường", "Lịch triều cường, mực nước đỉnh triều...")}
          className="h-20 cursor-pointer rounded-xl bg-cyan-600 hover:bg-cyan-700 shadow-sm flex flex-col items-center justify-center gap-1 text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <Waves size={24} />
          <span className="text-sm font-semibold">Triều Cường</span>
        </div>

        <div
          onClick={() => handleOpenModal("traffic", "Giao Thông & Tuyến Đường", "Các tuyến đường bị ngập, kẹt xe, lộ trình thay thế...")}
          className="h-20 cursor-pointer rounded-xl bg-amber-500 hover:bg-amber-600 shadow-sm flex flex-col items-center justify-center gap-1 text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <Car size={24} />
          <span className="text-sm font-semibold">Giao Thông</span>
        </div>

        <div
          onClick={() => handleOpenModal("other", "Thông Tin Khác", "Các thông báo khác từ hệ thống, tin tức liên quan...")}
          className="h-20 cursor-pointer rounded-xl bg-white border border-slate-200 hover:bg-slate-50 shadow-sm flex flex-col items-center justify-center gap-1 text-slate-700 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <Info size={24} />
          <span className="text-sm font-semibold">Thông Tin Khác</span>
        </div>
      </div>

      <NewsFeed />

      <Modal
        title={currentInfo?.title}
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        width={800}
        footer={null}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
