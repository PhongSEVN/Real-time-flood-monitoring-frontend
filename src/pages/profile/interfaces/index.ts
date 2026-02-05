import type { ProfileStatus } from "../enum";

export interface Profile {
  userId: number; // ID người dùng
  fullName: string; // Họ và tên
  phoneNumber: string; // Số điện thoại
  email: string; // Email
  gender: string; // Giới tính
  birthDate: string; // Ngày sinh
  address: string; // Địa chỉ
  addressGroup: string; // Nhóm địa chỉ
  role: string; // Vị trí
  reportsCount: number; // Số lượng báo cáo
  priorityLevel: number; // Mức độ ưu tiên
  status: ProfileStatus; // Trạng thái
}


export interface UpdateProfile {
  userId: number; // ID người dùng
  fullName: string; // Họ và tên
  phoneNumber: string; // Số điện thoại
  email: string; // Email
  gender: string; // Giới tính
  birthDate: string; // Ngày sinh
  address: string; // Địa chỉ
  status: ProfileStatus; // Trạng thái
}