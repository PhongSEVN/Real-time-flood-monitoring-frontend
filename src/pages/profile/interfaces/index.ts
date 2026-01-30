import type { HumanResourcesPosition } from "@/pages/humanResources/enum";
import type { ProfileStatus } from "../enum";

export interface Profile {
  fullName: string; // Họ và tên
  phoneNumber: string; // Số điện thoại
  email: string; // Email
  gender: string; // Giới tính
  dateOfBirth: string; // Ngày sinh
  address: string; // Địa chỉ
  position: string; // Vị trí
  createdAt: string; // Ngày tạo
}


export interface UpdateProfile {
  fullName: string; // Họ và tên
  phoneNumber: string; // Số điện thoại
  email: string; // Email
  gender: string; // Giới tính
  dateOfBirth: string; // Ngày sinh
  address: string; // Địa chỉ
  position: HumanResourcesPosition; // Vị trí
  status: ProfileStatus; // Trạng thái
}