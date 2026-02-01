import { Button, Dropdown, Modal, Table, Tooltip, type MenuProps } from "antd";
import type { ColumnType } from "antd/es/table";
import { EllipsisVertical, Eye, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";
import FormanagerResidents from "../components/FormanagerResidents";
import { HouseType } from "../enum";
import type { Resident } from "../interfaces";

export default function ResidentsPage() {
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
      title: <span className="text-[#ACACAC] text-[16px]">Mã hộ dân</span>,
      dataIndex: "code",

      key: "code",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Tên chủ hộ</span>,
      dataIndex: "name",
      key: "name",
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
      title: (
        <span className="text-[#ACACAC] text-[16px]">Kinh độ - Vĩ độ</span>
      ),
      key: "coordinates",
      render: (_: any, record: Resident) => (
        <span className="text-[#000000] text-[16px]">
          {record.longitude} - {record.latitude}
        </span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Số thành viên</span>,
      dataIndex: "numberOfMembers",
      key: "numberOfMembers",
      render: (text: number) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Có người già</span>,
      dataIndex: "hasElderly",
      key: "hasElderly",
      render: (text: boolean) => (
        <span className="text-[#000000] text-[16px]">
          {text ? "Có" : "Không"}
        </span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Có trẻ em</span>,
      dataIndex: "hasChildren",
      key: "hasChildren",
      render: (text: boolean) => (
        <span className="text-[#000000] text-[16px]">
          {text ? "Có" : "Không"}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[#ACACAC] text-[16px]">Có phụ nữ mang thai</span>
      ),
      dataIndex: "hasPregnantWomen",
      key: "hasPregnantWomen",
      render: (text: boolean) => (
        <span className="text-[#000000] text-[16px]">
          {text ? "Có" : "Không"}
        </span>
      ),
    },
    {
      title: (
        <span className="text-[#ACACAC] text-[16px]">Có người bị bệnh nền</span>
      ),
      dataIndex: "hasChronicDisease",
      key: "hasChronicDisease",
      render: (text: boolean) => (
        <span className="text-[#000000] text-[16px]">
          {text ? "Có" : "Không"}
        </span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Loại nhà</span>,
      dataIndex: "houseType",
      key: "houseType",
      render: (text: HouseType) => (
        <span className="text-[#000000] text-[16px]">
          {text === HouseType.APARTMENT
            ? "Nhà phố"
            : text === HouseType.HOUSE
            ? "Nhà trệt"
            : text === HouseType.VILLA
            ? "Nhà biệt thự"
            : "Loại nhà khác"}
        </span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Số tầng</span>,
      dataIndex: "numberOfFloors",
      key: "numberOfFloors",
      render: (text: number) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      width: 150,
      fixed: "right",
      title: (
        <span className="text-[#ACACAC] text-[16px] flex justify-center">
          Có kinh doanh
        </span>
      ),
      dataIndex: "hasBusiness",
      key: "hasBusiness",
      render: (text: boolean) => (
        <div className="flex gap-2 justify-end">
          <span className="text-[#000000] text-[16px]">
            {text ? "Có" : "Không"}
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
  const personnels: Resident[] = [
    {
      id: 1,
      code: "DC001",
      name: "Nguyễn Văn A",
      phone: "0909090909",
      address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      latitude: 10.7769,
      longitude: 106.7009,
      numberOfMembers: 4,
      hasElderly: true,
      hasChildren: true,
      hasPregnantWomen: false,
      hasChronicDisease: false,
      houseType: HouseType.APARTMENT,
      numberOfFloors: 3,
      hasBusiness: true,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      code: "DC002",
      name: "Trần Thị B",
      phone: "0912345678",
      address: "456 Đường Nguyễn Huệ, Phường Đa Kao, Quận 1, TP.HCM",
      latitude: 10.7756,
      longitude: 106.7019,
      numberOfMembers: 5,
      hasElderly: true,
      hasChildren: true,
      hasPregnantWomen: true,
      hasChronicDisease: true,
      houseType: HouseType.APARTMENT,
      numberOfFloors: 1,
      hasBusiness: false,
      createdAt: new Date("2024-02-20"),
    },
    {
      id: 3,
      code: "DC003",
      name: "Lê Văn C",
      phone: "0923456789",
      address: "789 Đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP.HCM",
      latitude: 10.8022,
      longitude: 106.7147,
      numberOfMembers: 3,
      hasElderly: false,
      hasChildren: true,
      hasPregnantWomen: false,
      hasChronicDisease: false,
      houseType: HouseType.HOUSE,
      numberOfFloors: 1,
      hasBusiness: true,
      createdAt: new Date("2024-03-10"),
    },
    {
      id: 4,
      code: "DC004",
      name: "Phạm Thị D",
      phone: "0934567890",
      address: "321 Đường Võ Văn Tần, Phường 6, Quận 3, TP.HCM",
      latitude: 10.7831,
      longitude: 106.6904,
      numberOfMembers: 6,
      hasElderly: true,
      hasChildren: true,
      hasPregnantWomen: false,
      hasChronicDisease: true,
      houseType: HouseType.APARTMENT,
      numberOfFloors: 2,
      hasBusiness: false,
      createdAt: new Date("2024-01-25"),
    },
    {
      id: 5,
      code: "DC005",
      name: "Hoàng Văn E",
      phone: "0945678901",
      address: "654 Đường Cách Mạng Tháng 8, Phường 10, Quận 3, TP.HCM",
      latitude: 10.7889,
      longitude: 106.6872,
      numberOfMembers: 2,
      hasElderly: false,
      hasChildren: false,
      hasPregnantWomen: false,
      hasChronicDisease: false,
      houseType: HouseType.APARTMENT,
      numberOfFloors: 1,
      hasBusiness: true,
      createdAt: new Date("2024-04-05"),
    },
    {
      id: 6,
      code: "DC006",
      name: "Võ Thị F",
      phone: "0956789012",
      address: "987 Đường Lý Tự Trọng, Phường Bến Thành, Quận 1, TP.HCM",
      latitude: 10.772,
      longitude: 106.6983,
      numberOfMembers: 4,
      hasElderly: true,
      hasChildren: false,
      hasPregnantWomen: true,
      hasChronicDisease: false,
      houseType: HouseType.APARTMENT,
      numberOfFloors: 4,
      hasBusiness: false,
      createdAt: new Date("2024-02-14"),
    },
    {
      id: 7,
      code: "DC007",
      name: "Đặng Văn G",
      phone: "0967890123",
      address: "147 Đường Pasteur, Phường 6, Quận 3, TP.HCM",
      latitude: 10.7856,
      longitude: 106.6901,
      numberOfMembers: 5,
      hasElderly: false,
      hasChildren: true,
      hasPregnantWomen: false,
      hasChronicDisease: true,
      houseType: HouseType.HOUSE,
      numberOfFloors: 1,
      hasBusiness: true,
      createdAt: new Date("2024-03-22"),
    },
    {
      id: 8,
      code: "DC008",
      name: "Bùi Thị H",
      phone: "0978901234",
      address: "258 Đường Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3, TP.HCM",
      latitude: 10.7823,
      longitude: 106.6889,
      numberOfMembers: 3,
      hasElderly: true,
      hasChildren: true,
      hasPregnantWomen: true,
      hasChronicDisease: true,
      houseType: HouseType.APARTMENT,
      numberOfFloors: 1,
      hasBusiness: false,
      createdAt: new Date("2024-01-08"),
    },
  ];
  return (
    <>
      <Modal
        centered
        maskClosable={false}
        closeIcon={false}
        className="xl:min-w-[1108px] lg:min-w-[960px] z-100 my-10"
        title={
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
              Thêm hộ dân
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
        <FormanagerResidents onCancel={() => setIsOpenModalAdd(false)} />
      </Modal>
      <div className="space-y-4">
        <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="2xl:text-[26px] xl:text-[22px] text-[18px] font-semibold text-[#272727]">
                Danh sách hộ dân
              </div>
            </div>
            <Button
              onClick={() => setIsOpenModalAdd(true)}
              type="primary"
              className="text-[16px] font-medium h-9!"
            >
              + Thêm hộ dân
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <Table
              dataSource={personnels}
              columns={columns as ColumnType<Resident>[]}
              scroll={{ x: "max-content", y: 600 }}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </>
  );
}
