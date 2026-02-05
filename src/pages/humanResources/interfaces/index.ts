import type { Gender } from "@/enums";

export interface HumanResources {
  code: string; // Mã nhân sự
  name: string; // Tên nhân sự
  email: string; // Email
  phone: string; // Số điện thoại
  address: string; // Địa chỉ
  position: string; // Chức vụ
  gender: Gender; // Giới tính
  status: string; // Trạng thái
}