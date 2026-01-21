import type { DamageSeverityLevel, DamageStatus, DamageType, ObjectType } from "../enum";

export interface Damage {
    id: string; // ID của thiệt hại 
    eventId: string;
    area: string; // Tên khu vực
    province: string; // Tên tỉnh
    district: string; // Tên huyện
    ward: string; // Tên xã
    addressDetail: string; // Địa chỉ chi tiết
    lat?: number; // Vĩ độ
    lng?: number; // Kinh độ
  
    objectType: ObjectType; // Loại đối tượng
    ownerName: string; // Tên chủ hộ
    phone: string; // Số điện thoại
  
    damageType: DamageType; // Loại thiệt hại
    description: string; // Mô tả thiệt hại
    events: number; // Số sự kiện
    households: number; // Số hộ dân
    estimatedCost: number; // Chi phí ước tính
    currency: "VND"; // Đơn vị tiền tệ
  
    severityLevel: DamageSeverityLevel; // Mức độ nghiêm trọng
    status: DamageStatus; // Trạng thái
    supportAmount?: number; // Số tiền hỗ trợ
  
    reportTime: string; // Thời gian báo cáo
    verifiedBy?: string; // Người xác nhận
    verifiedAt?: string; // Thời gian xác nhận
  
    attachments?: string[]; // Ảnh chụp thiệt hại
    notes?: string; // Ghi chú
  }
