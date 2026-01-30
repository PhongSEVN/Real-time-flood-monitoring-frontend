import { Button, Form, Modal, Tooltip } from "antd";
import { Edit3, KeyRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormManagerUpdateProfile from "../components/FormManagerProfile";

export interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
}

export default function DetailProfile() {
  const navigate = useNavigate();
  const [form] = Form.useForm<ProfileData>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  return (
    <>
      {/* Modal cập nhật thông tin cá nhân */}
      <Modal
        centered
        maskClosable={false}
        closeIcon={false}
        className="xl:min-w-[1108px] lg:min-w-[960px] z-100 my-10"
        title={
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
              Cập nhật thông tin
            </h3>
            <Tooltip placement="bottom" title="Đóng" arrow={false}>
              <div
                onClick={() => setIsOpenModalUpdate(false)}
                className="hover:bg-gray-200 p-2 transition-all cursor-pointer rounded-full"
              >
                <X className="text-slate-700 hover:text-slate-600" size={24} />
              </div>
            </Tooltip>
          </div>
        }
        open={isOpenModalUpdate}
        footer={null}
      >
        <FormManagerUpdateProfile
          onCancel={() => setIsOpenModalUpdate(false)}
        />
      </Modal>

      <div className="space-y-4">
        <div className="rounded-2xl bg-white/80 p-6 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Thông tin cá nhân
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Quản lý thông tin tài khoản và cài đặt cá nhân
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                icon={<Edit3 size={16} />}
                onClick={() => setIsOpenModalUpdate(true)}
                className="h-9! font-medium text-[16px]"
              >
                Cập nhât thông tin
              </Button>

              <Button
                type="default"
                icon={<KeyRound size={16} />}
                onClick={() => navigate("/app/profile-manager/detail")}
                className="h-9! font-medium text-[16px]"
              >
                Đổi mật khẩu
              </Button>
            </div>
          </div>

          <div>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Họ và tên</span>
                <span className="text-[16px] text-[#000000]">Nguyễn Văn A</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">
                  Số điện thoại
                </span>
                <span className="text-[16px] text-[#000000]">0347282803</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Email</span>
                <span className="text-[16px] text-[#000000]">
                  nguyenvana@example.com
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Giới tính</span>
                <span className="text-[16px] text-[#000000]">Nam</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Ngày sinh</span>
                <span className="text-[16px] text-[#000000]">03/03/2026</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Địa chỉ</span>
                <span className="text-[16px] text-[#000000]">
                  123 Đường ABC, Quận XYZ, TP. HCM
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">
                  Vị trí công việc
                </span>
                <span className="text-[16px] text-[#000000]">Bác sĩ</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Trạng thái</span>
                <span className="text-[16px] text-[#000000]">
                  Đang hoạt động
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Ngày tạo</span>
                <span className="text-[16px] text-[#000000]">03/03/2026</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">
                  Ngày cập nhật
                </span>
                <span className="text-[16px] text-[#000000]">03/03/2026</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
