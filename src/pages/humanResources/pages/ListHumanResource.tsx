import { Gender } from "@/enums";
import { Button, Dropdown, Modal, Table, Tooltip, type MenuProps } from "antd";
import type { ColumnType } from "antd/es/table";
import { EllipsisVertical, Eye, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";
import FormManagerHumanResources from "../components/FormManagerHumanResources";
import { HumanResourcesPosition, HumanResourcesStatus } from "../enum";
import type { HumanResources } from "../interfaces";

const personnels = [
  {
    code: "CB01",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0901 234 567",
    address: "Trạm B5 - Thủ Đức",
    position: HumanResourcesPosition.STAFF,
    status: HumanResourcesStatus.ACTIVE,
    gender: Gender.MALE,
  },
  {
    code: "CB02",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0902 345 678",
    address: "Khu vực Thủ Đức",
    position: HumanResourcesPosition.DOCTOR,
    status: HumanResourcesStatus.ACTIVE,
    gender: Gender.FEMALE,
  },
  {
    code: "CB03",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    phone: "0903 456 789",
    address: "Trạm B3 - Quận 3",
    position: HumanResourcesPosition.STAFF,
    status: HumanResourcesStatus.ACTIVE,
    gender: Gender.MALE,
  },
];

export default function HumanResourcesPage() {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span className="text-blue-500 text-[16px] cursor-pointer flex items-center gap-2">
          {" "}
          <Pencil size={16} /> Sửa
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-red-500 text-[16px] cursor-pointer flex items-center gap-2">
          {" "}
          <Trash size={16} /> Xóa
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span className="text-[#000000] text-[16px] cursor-pointer flex items-center gap-2">
          {" "}
          <Eye size={16} /> Chi tiết
        </span>
      ),
    },
  ];
  const columns = [
    {
      title: <span className="text-[#ACACAC] text-[16px]">Mã nhân sự</span>,
      dataIndex: "code",
      key: "code",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Tên</span>,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Email</span>,
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Số điện thoại</span>,
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Địa chỉ</span>,
      dataIndex: "address",
      key: "address",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },

    {
      title: <span className="text-[#ACACAC] text-[16px]">Chức vụ</span>,
      dataIndex: "position",
      key: "position",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">
          {text === HumanResourcesPosition.STAFF ? "Cán bộ" : "Bác sĩ"}
        </span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Giới tính</span>,
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">
          {text === Gender.MALE ? "Nam" : "Nữ"}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[#ACACAC] text-[16px] flex justify-center">
          Trạng thái
        </span>
      ),
      dataIndex: "status",
      fixed: "right",
      width: 220,
      key: "status",
      render: (text: string) => (
        <div className="flex gap-2 justify-end">
          <span
            className={`text-[16px] font-medium ${
              text === HumanResourcesStatus.ACTIVE
                ? "text-[#008000]"
                : "text-[#D32F2F]"
            }`}
          >
            {text === HumanResourcesStatus.ACTIVE
              ? "Đang hoạt động"
              : "Tạm ngừng hoạt động"}
          </span>
          <span className="text-[#000000] text-[16px]">
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <EllipsisVertical size={20} className="cursor-pointer" />
            </Dropdown>
          </span>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* Modal Thêm nhân sự */}
      <Modal
        centered
        maskClosable={false}
        closeIcon={false}
        className="xl:min-w-[1108px] lg:min-w-[960px] z-100 my-10"
        title={
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
              Thêm nhân sự
            </h3>
            <Tooltip placement="bottom" title="Đóng" arrow={false}>
              <div
                onClick={() => setIsOpenModalAdd(false)}
                className="hover:bg-gray-200 p-2 transition-all cursor-pointer rounded-full"
              >
                <X className="text-slate-700 hover:text-slate-600" size={24} />
              </div>
            </Tooltip>
          </div>
        }
        open={isOpenModalAdd}
        footer={null}
      >
        <FormManagerHumanResources onCancel={() => setIsOpenModalAdd(false)} />
      </Modal>
      <div className="space-y-4">
        <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="2xl:text-[26px] xl:text-[22px] text-[18px] font-semibold text-[#272727]">
                Danh sách nhân sự
              </div>
            </div>
            <Button
              onClick={() => setIsOpenModalAdd(true)}
              type="primary"
              className="text-[16px] font-medium h-9!"
            >
              + Thêm nhân sự
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <Table
              dataSource={personnels}
              columns={columns as ColumnType<HumanResources>[]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
