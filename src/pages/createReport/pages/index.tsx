import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Select, 
  Upload, 
  Typography, 
  message, 
  List, 
  Tag, 
  Modal, 
  Progress,
  Space,
  Popconfirm,
  Radio,
  Checkbox,
  Row,
  Col
} from 'antd';
import { 
  MapPin, 
  Upload as UploadIcon, 
  Trash2, 
  Eye, 
  Send,
  CloudRain,
  Waves,
  AlertTriangle,
  MoreHorizontal,
  Home,
  Car,
  Building2,
  Construction
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Setup Leaflet icons
const defaultIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface Report {
  id: string;
  type: string; // Keep for compatibility, default to 'flood' or specific types
  eventType?: 'rain' | 'tide' | 'flood' | 'dyke_break' | 'other';
  severity?: 'light' | 'medium' | 'emergency';
  title: string;
  description: string;
  location: { lat: number; lng: number; address?: string };
  waterLevel?: string;
  floodStatus?: string;
  damage?: string[];
  images: any[];
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  score: number;
}

export default function CreateReportPage() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [trustScore, setTrustScore] = useState(0);
  const [submittedReports, setSubmittedReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Calculate trust score based on form values
  const calculateScore = () => {
    const values = form.getFieldsValue();
    let score = 0;
    
    // Core info
    if (values.address) score += 10;
    if (location) score += 20;
    
    // Details
    if (values.eventType) score += 10;
    if (values.severity) score += 10;
    
    // Description length
    if (values.description && values.description.length > 10) score += 10;
    
    // Images uploaded: +30 (Critical evidence)
    if (fileList.length > 0) score += 30;

    setTrustScore(Math.min(score, 100));
  };

  const handleValuesChange = () => {
    calculateScore();
  };

  // Reverse Geocoding: Lat/Lng -> Address
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        form.setFieldsValue({ address: data.display_name });
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Forward Geocoding: Address -> Lat/Lng
  const fetchCoordinates = async () => {
    const address = form.getFieldValue('address');
    if (!address) {
      message.warning("Vui lòng nhập địa chỉ trước!");
      return;
    }

    setLoadingLocation(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setLocation(newLocation);
        message.success("Đã tìm thấy vị trí trên bản đồ!");
        calculateScore();
      } else {
        message.error("Không tìm thấy vị trí cho địa chỉ này!");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      message.error("Lỗi khi tìm kiếm vị trí!");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleLocationSelect = (latlng: { lat: number; lng: number }) => {
    setLocation(latlng);
    fetchAddress(latlng.lat, latlng.lng);
    calculateScore();
    message.success("Đã ghim vị trí!");
  };

  // Map view updater component
  function MapUpdater({ center }: { center: { lat: number; lng: number } | null }) {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.flyTo(center, 16);
      }
    }, [center, map]);
    return null;
  }

  // Map click handler component
  function LocationMarker() {
    useMapEvents({
      click(e: any) {
        handleLocationSelect(e.latlng);
      },
    });

    return location === null ? null : (
      <Marker position={location}>
        <Popup>Vị trí sự cố</Popup>
      </Marker>
    );
  }

  const handleSubmit = (values: any) => {
    if (trustScore < 50) {
      message.warning('Vui lòng cung cấp thêm thông tin để tăng độ xác thực!');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận gửi báo cáo',
      content: 'Bạn có chắc chắn muốn gửi thông tin này không? Hành động này sẽ được ghi lại trên hệ thống.',
      okText: 'Gửi ngay',
      cancelText: 'Xem lại',
      centered: true,
      onOk: () => {
        const newReport: Report = {
          id: Date.now().toString(),
          type: 'flood', // Defaulting to flood report as per UI
          title: 'Báo cáo: ' + (values.address || 'Chưa có địa chỉ'),
          description: values.description,
          location: { 
            lat: location?.lat || 10.8231, 
            lng: location?.lng || 106.6297,
            address: values.address
          },
          eventType: values.eventType,
          severity: values.severity,
          images: fileList,
          status: 'pending',
          timestamp: new Date().toLocaleString('vi-VN'),
          score: trustScore
        };

        setSubmittedReports([newReport, ...submittedReports]);
        message.success('Gửi báo cáo thành công!');
        
        // Reset form
        form.resetFields();
        setFileList([]);
        setLocation(null);
        setTrustScore(0);
      }
    });
  };

  const handleDelete = (id: string) => {
    setSubmittedReports(prev => prev.filter(r => r.id !== id));
    message.success('Đã xóa phản ánh');
  };

  const getStatusTag = (status: string) => {
    switch(status) {
      case 'pending': return <Tag color="orange">Đang chờ duyệt</Tag>;
      case 'approved': return <Tag color="green">Đã duyệt</Tag>;
      case 'rejected': return <Tag color="red">Từ chối</Tag>;
      default: return <Tag>Mới</Tag>;
    }
  };

  return (
    <div className="p-4 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title level={3} className="mb-0">Đăng phản ánh/Sự kiện</Title>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Section: Map */}
        <div className="w-full flex flex-col gap-4">
          <div className="h-[500px] rounded-xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
            <MapContainer 
              center={[10.8231, 106.6297]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
              <MapUpdater center={location} />
            </MapContainer>
            
            {/* Map Controls Overlay (Visual only to match design) */}
            <div className="absolute top-2 left-2 z-[1000] flex flex-col bg-white rounded-md shadow border border-slate-300">
               <div className="w-8 h-8 flex items-center justify-center border-b border-slate-200 cursor-pointer hover:bg-slate-50">+</div>
               <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-slate-50">-</div>
            </div>
          </div>

          <Card className="shadow-sm border-slate-200">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <Text strong>Vị trí trên bản đồ</Text>
             </div>
             <div className="flex justify-between items-center">
                <Text type="secondary" className="text-sm">
                   {location ? `Vị trí đã chọn: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Vị trí đã chọn: Chưa chọn'}
                </Text>
                <Button size="small">Chọn vị trí</Button>
             </div>
          </Card>
        </div>

        {/* Bottom Section: Form */}
        <div className="w-full">
          <Card className="shadow-sm border-slate-200">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              onValuesChange={handleValuesChange}
            >
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <Input 
                   placeholder="Ví dụ: 268 Lý Thường Kiệt, Quận 10, TP.HCM" 
                   onBlur={fetchCoordinates}
                   onPressEnter={(e) => { e.preventDefault(); fetchCoordinates(); }}
                   disabled={loadingLocation}
                   suffix={
                     <Button 
                       type="text" 
                       size="small" 
                       loading={loadingLocation}
                       className="text-slate-400"
                       onClick={fetchCoordinates}
                     >
                       {loadingLocation ? 'Đang tìm...' : 'Xác định vị trí từ địa chỉ'}
                     </Button>
                   }
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Form.Item
                    label="Loại sự kiện"
                    name="eventType"
                    rules={[{ required: true, message: 'Vui lòng chọn loại sự kiện' }]}
                 >
                    <Select placeholder="Chọn loại sự kiện">
                       <Option value="rain">Mưa</Option>
                       <Option value="tide">Triều cường</Option>
                       <Option value="flood">Ngập lụt</Option>
                       <Option value="dyke_break">Vỡ đê</Option>
                       <Option value="other">Khác</Option>
                    </Select>
                 </Form.Item>

                 <Form.Item
                    label="Mức độ"
                    name="severity"
                    rules={[{ required: true, message: 'Vui lòng chọn mức độ' }]}
                 >
                    <Radio.Group className="w-full">
                       <div className="flex gap-4">
                          <Radio value="light" className="text-green-600 font-medium">Nhẹ</Radio>
                          <Radio value="medium" className="text-yellow-600 font-medium">Trung bình</Radio>
                          <Radio value="emergency" className="text-red-600 font-medium">Khẩn cấp</Radio>
                       </div>
                    </Radio.Group>
                 </Form.Item>
              </div>

              <Form.Item label="Hình ảnh / Video hiện trường">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={({ fileList }) => {
                    setFileList(fileList);
                    calculateScore();
                  }}
                  beforeUpload={() => false}
                  maxCount={5}
                  className="w-full"
                >
                   <Button icon={<UploadIcon size={16}/>}>Chọn tệp</Button> 
                   <span className="ml-2 text-slate-400">Không có tệp nào được chọn</span>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Ghi chú thêm"
                name="description"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Mô tả thêm về thời gian, hướng nước chảy, lưu ý cho người đi đường..." 
                  maxLength={500}
                />
              </Form.Item>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4">
                 <div className="flex items-center gap-2">
                    <Text className="text-slate-500 text-sm">Độ tin cậy:</Text>
                    <Progress 
                      percent={trustScore} 
                      steps={5}
                      strokeColor={trustScore < 50 ? '#ff4d4f' : trustScore < 80 ? '#faad14' : '#52c41a'}
                      showInfo={false}
                      className="w-24 m-0"
                    />
                    <Text strong className={`text-sm ${trustScore < 50 ? 'text-red-500' : 'text-green-500'}`}>{trustScore}/100</Text>
                 </div>
                 <Button 
                   type="primary" 
                   htmlType="submit" 
                   size="large"
                   className="bg-blue-600 hover:bg-blue-700 px-8"
                   disabled={!location && !form.getFieldValue('address')}
                 >
                   Gửi báo cáo
                 </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>

      {/* Submitted Reports List */}
      <div className="mt-8">
        <Title level={4} className="flex items-center gap-2">
          <MoreHorizontal /> Lịch sử gửi tin
        </Title>
        
        <List
          dataSource={submittedReports}
          split={false}
          className="space-y-3"
          renderItem={(item) => (
            <List.Item className="!p-0 !border-0 mb-3">
              <div 
                className="w-full bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                onClick={() => { setSelectedReport(item); setIsDetailModalOpen(true); }}
              >
                {/* Icon/Image Placeholder */}
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                  {item.eventType === 'rain' ? <CloudRain size={24} /> :
                   item.eventType === 'tide' ? <Waves size={24} /> :
                   item.eventType === 'flood' ? <Waves size={24} /> :
                   <AlertTriangle size={24} />}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                   {/* Title & Status */}
                   <div className="md:col-span-5 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <Text strong className="text-base" title={item.title}>{item.title}</Text>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                         <span>{item.timestamp}</span>
                         <span className="hidden md:inline">•</span>
                         <span className="hidden md:flex items-center gap-1 truncate">
                            <MapPin size={12} />
                            {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                         </span>
                      </div>
                   </div>

                   {/* Tags - Middle */}
                   <div className="md:col-span-4 flex items-center gap-2 overflow-hidden">
                      {getStatusTag(item.status)}
                      {item.severity === 'emergency' && <Tag color="red" className="m-0">Khẩn cấp</Tag>}
                      {item.severity === 'medium' && <Tag color="gold" className="m-0">Trung bình</Tag>}
                      {item.severity === 'light' && <Tag color="green" className="m-0">Nhẹ</Tag>}
                      {item.eventType && (
                         <Tag className="m-0">
                            {item.eventType === 'rain' ? 'Mưa' : 
                             item.eventType === 'tide' ? 'Triều cường' : 
                             item.eventType === 'flood' ? 'Ngập lụt' : 
                             item.eventType === 'dyke_break' ? 'Vỡ đê' : 'Khác'}
                         </Tag>
                      )}
                   </div>

                   {/* Description/Preview - Hidden on small, shown on large */}
                   <div className="hidden md:col-span-3 md:block">
                      <Text type="secondary" className="text-sm truncate block" style={{ maxWidth: '100%' }}>
                         {item.description || 'Không có mô tả'}
                      </Text>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 pl-2 border-l border-slate-100" onClick={e => e.stopPropagation()}>
                   <Button 
                      type="text" 
                      shape="circle"
                      icon={<Eye size={18} className="text-slate-400 group-hover:text-blue-500" />} 
                      onClick={() => { setSelectedReport(item); setIsDetailModalOpen(true); }}
                   />
                   <Popconfirm title="Xóa tin này?" onConfirm={() => handleDelete(item.id)}>
                      <Button type="text" danger shape="circle" icon={<Trash2 size={18} />} />
                   </Popconfirm>
                </div>
              </div>
            </List.Item>
          )}
          locale={{ emptyText: 'Chưa có tin nào được gửi' }}
        />
      </div>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết báo cáo"
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Title level={5} className="m-0">{selectedReport.title}</Title>
              {getStatusTag(selectedReport.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg">
               <div>
                  <Text type="secondary" className="block text-xs">Loại sự kiện</Text>
                  <Text strong>
                     {selectedReport.eventType === 'rain' ? <Tag color="blue">Mưa</Tag> :
                      selectedReport.eventType === 'tide' ? <Tag color="purple">Triều cường</Tag> :
                      selectedReport.eventType === 'flood' ? <Tag color="red">Ngập lụt</Tag> :
                      selectedReport.eventType === 'dyke_break' ? <Tag color="orange">Vỡ đê</Tag> : <Tag>Khác</Tag>}
                  </Text>
               </div>
               <div>
                  <Text type="secondary" className="block text-xs">Mức độ</Text>
                  <Text strong style={{ 
                     color: selectedReport.severity === 'light' ? 'green' : 
                            selectedReport.severity === 'medium' ? '#ca8a04' : 
                            selectedReport.severity === 'emergency' ? 'red' : 'inherit'
                  }}>
                     {selectedReport.severity === 'light' ? 'Nhẹ' : 
                      selectedReport.severity === 'medium' ? 'Trung bình' : 
                      selectedReport.severity === 'emergency' ? 'Khẩn cấp' : 'Chưa cập nhật'}
                  </Text>
               </div>
            </div>

            <div>
              <Text type="secondary" className="block text-xs mb-1">Vị trí</Text>
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin size={16} />
                <a 
                  href={`https://www.google.com/maps?q=${selectedReport.location.lat},${selectedReport.location.lng}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {selectedReport.location.address || `Lat: ${selectedReport.location.lat.toFixed(6)}, Lng: ${selectedReport.location.lng.toFixed(6)}`}
                </a>
              </div>
            </div>

            <div>
              <Text type="secondary" className="block text-xs mb-1">Ghi chú thêm</Text>
              <div className="bg-slate-50 p-3 rounded-lg text-slate-700 min-h-[60px]">
                {selectedReport.description || 'Không có ghi chú'}
              </div>
            </div>

            {selectedReport.images.length > 0 && (
              <div>
                <Text type="secondary" className="block text-xs mb-2">Hình ảnh đính kèm</Text>
                <div className="grid grid-cols-3 gap-2">
                  {selectedReport.images.map((file, idx) => (
                    <div key={idx} className="aspect-square bg-slate-100 rounded overflow-hidden">
                       <img 
                        src={file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.thumbUrl} 
                        alt="evidence" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
               <Text className="text-xs text-slate-400">ID: {selectedReport.id}</Text>
               <Text strong className={selectedReport.score < 50 ? 'text-red-500' : 'text-green-500'}>
                  Độ tin cậy: {selectedReport.score}/100
               </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
