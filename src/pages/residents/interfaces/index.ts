import type { HouseType } from "../enum";

export interface Resident {
    id: number; // Mã dân cư
    code: string; // Mã dân cư
  
    name: string; // Tên chủ hộ
    phone: string; // Số điện thoại
  
    address: string; // Địa chỉ
    latitude: number; // Vĩ độ
    longitude: number; // Kinh độ
  
    numberOfMembers: number; // Số thành viên trong hộ
  
    hasElderly: boolean; // Có người già
    hasChildren: boolean; // Có trẻ em
    hasPregnantWomen: boolean; // Có phụ nữ mang thai
    hasChronicDisease: boolean; // Có người bị bệnh nền
  
    houseType: HouseType; // Loại nhà
    numberOfFloors: number; // Số tầng      

    hasBusiness: boolean; // Có kinh doanh
  
    createdAt: Date; // Ngày tạo
  }

  export interface CreateResident {
    code: string; // Mã dân cư
  
    name: string; // Tên chủ hộ
    phone: string; // Số điện thoại
  
    address: string; // Địa chỉ
    latitude: number; // Vĩ độ
    longitude: number; // Kinh độ
  
    numberOfMembers: number; // Số thành viên trong hộ
  
    hasElderly: boolean; // Có người già
    hasChildren: boolean; // Có trẻ em
    hasPregnantWomen: boolean; // Có phụ nữ mang thai
    hasChronicDisease: boolean; // Có người bị bệnh nền
  
    houseType: HouseType; // Loại nhà
    numberOfFloors: number; // Số tầng      

    hasBusiness: boolean; // Có kinh doanh
  
  }
  