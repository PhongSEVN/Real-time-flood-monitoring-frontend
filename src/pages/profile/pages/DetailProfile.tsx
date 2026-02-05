import { Role } from "@/enums";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Spin, Tooltip } from "antd";
import { Edit3, KeyRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileApi } from "../api";
import FormManagerUpdateProfile from "../components/FormManagerProfile";
import { ProfileStatus } from "../enum";

export default function DetailProfile() {
  const navigate = useNavigate();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfileApi();
      return response?.data;
    },
  });

  if (isLoading) {
    return <Spin />;
  }

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
          initialValues={profileData}
          onSuccess={() => refetch()}
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
                <span className="text-[16px] text-[#000000]">
                  {profileData?.fullName}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">
                  Số điện thoại
                </span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.phoneNumber}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Email</span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.email}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Giới tính</span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.gender}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Ngày sinh</span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.birthDate}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Địa chỉ</span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.address}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Vai trò</span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.role === Role.OFFICIAL ? "Cán bộ" : "Người dân"}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Trạng thái</span>
                <span
                  className={`text-[16px] ${
                    profileData?.status === ProfileStatus.ACTIVE
                      ? "text-green-500"
                      : "text-shadow-amber-400"
                  }`}
                >
                  {profileData?.status === ProfileStatus.ACTIVE
                    ? "Đang hoạt động"
                    : "Tạm ngừng hoạt động"}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[16px] text-[#ACACAC]">Ngày tạo</span>
                <span className="text-[16px] text-[#000000]">
                  {profileData?.createdAt}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
