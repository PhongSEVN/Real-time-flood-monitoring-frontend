import { useQuery } from "@tanstack/react-query";
import { Modal, Typography } from "antd";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Car,
  CloudRain,
  Info,
  Waves,
} from "lucide-react";
import React, { useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

import { mapApi } from "@/apis/mapApi";
import NewsFeed from "../components/NewsFeed";
import OtherInfo from "../components/OtherInfo";
import RainInfo from "../components/RainInfo";
import TideInfo from "../components/TideInfo";
import TrafficInfo from "../components/Tranficlnfo";

const { Title } = Typography;

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);
  const [modalType, setModalType] = useState<
    "rain" | "tide" | "traffic" | "other" | null
  >(null);

  const { data: mapData } = useQuery({
    queryKey: ["map-layers"],
    queryFn: mapApi.getAllLayers,
  });

  const { data: householdsData } = useQuery({
    queryKey: ["map-households"],
    queryFn: mapApi.getHouseholds,
  });

  const handleOpenModal = (
    type: "rain" | "tide" | "traffic" | "other",
    title: string,
    content: string
  ) => {
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
        <p className="text-slate-500 italic mt-4">
          Nội dung chi tiết đang được cập nhật...
        </p>
      </>
    );
  };

  const geoJsonStyle = (feature: any) => {
    if (feature.geometry.type === "MultiLineString" || feature.geometry.type === "LineString") {
      return { color: "#3b82f6", weight: 4 }; // Đường: xanh dương đậm
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
      }; // Sông: xanh nhạt
    }
    return {};
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const { ten_duong, tensong, gid, ten_chu_ho } = feature.properties;
      const name = ten_duong || tensong || ten_chu_ho || `Đối tượng ${gid}`;
      layer.bindPopup(
        `<div class="p-2">
          <h3 class="font-bold text-sm text-slate-800 mb-1">${name}</h3>
          <p class="text-xs text-slate-500 m-0">ID: ${gid}</p>
        </div>`
      );
    }
  };

  // Tọa độ trung tâm Phường Tam Bình, Thủ Đức
  const mapCenter: [number, number] = [10.8521, 106.7483];

  // Giới hạn bản đồ chỉ trong khu vực Phường Tam Bình (ước lượng)
  const mapBounds = [
    [10.8400, 106.7300], // Tây Nam
    [10.8700, 106.7700], // Đông Bắc
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between mb-2">
        <Title level={3} className="!m-0 text-slate-800">
          Bản đồ ngập lụt Phường Tam Bình
        </Title>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={15}
          className="h-[450px] w-full"
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
            <GeoJSON
              data={mapData.data}
              style={geoJsonStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {householdsData?.data && (
            <GeoJSON
              data={householdsData.data}
              onEachFeature={onEachFeature}
              pointToLayer={(_feature: any, latlng: any) => {
                return L.circleMarker(latlng, {
                  radius: 6,
                  fillColor: "#ff7800",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8,
                });
              }}
            />
          )}
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() =>
            handleOpenModal(
              "rain",
              "Thông tin Mưa",
              "Chi tiết về lượng mưa, dự báo mưa trong khu vực..."
            )
          }
          className="h-20 cursor-pointer rounded-xl bg-blue-500 hover:bg-blue-600 shadow-sm flex flex-col items-center justify-center gap-1 text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <CloudRain size={24} />
          <span className="text-sm font-semibold">Mưa</span>
        </div>

        <div
          onClick={() =>
            handleOpenModal(
              "tide",
              "Thông tin Triều Cường",
              "Lịch triều cường, mực nước đỉnh triều..."
            )
          }
          className="h-20 cursor-pointer rounded-xl bg-cyan-600 hover:bg-cyan-700 shadow-sm flex flex-col items-center justify-center gap-1 text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <Waves size={24} />
          <span className="text-sm font-semibold">Triều Cường</span>
        </div>

        <div
          onClick={() =>
            handleOpenModal(
              "traffic",
              "Giao Thông & Tuyến Đường",
              "Các tuyến đường bị ngập, kẹt xe, lộ trình thay thế..."
            )
          }
          className="h-20 cursor-pointer rounded-xl bg-amber-500 hover:bg-amber-600 shadow-sm flex flex-col items-center justify-center gap-1 text-white transition-all transform hover:scale-[1.02] active:scale-95"
        >
          <Car size={24} />
          <span className="text-sm font-semibold">Giao Thông</span>
        </div>

        <div
          onClick={() =>
            handleOpenModal(
              "other",
              "Thông Tin Khác",
              "Các thông báo khác từ hệ thống, tin tức liên quan..."
            )
          }
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
