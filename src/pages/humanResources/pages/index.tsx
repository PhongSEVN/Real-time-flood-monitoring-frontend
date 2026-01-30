import { Dropdown, Table, type MenuProps } from "antd";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";

const personnels = [
  {
    id: "CB01",
    name: "Nguyễn Văn A",
    role: "Cán bộ trực cảnh báo",
    station: "Trạm B5 - Thủ Đức",
    phone: "0901 234 567",
    status: "Đang trực",
    shift: "Ca sáng (06:00 - 14:00)",
  },
  {
    id: "CB02",
    name: "Trần Thị B",
    role: "Bác sĩ hỗ trợ y tế",
    station: "Khu vực Thủ Đức",
    phone: "0902 345 678",
    status: "Sẵn sàng",
    shift: "Ca ngày (08:00 - 20:00)",
  },
  {
    id: "CB03",
    name: "Lê Văn C",
    role: "Đội trưởng cứu hộ",
    station: "Trạm B3 - Quận 3",
    phone: "0903 456 789",
    status: "Đang xử lý vụ việc",
    shift: "Ca linh hoạt",
  },
];

export default function HumanResourcesPage() {
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
      dataIndex: "id",
      key: "id",
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
      title: <span className="text-[#ACACAC] text-[16px]">Vai trò</span>,
      dataIndex: "role",
      key: "role",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Trạm</span>,
      dataIndex: "station",
      key: "station",
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
      title: <span className="text-[#ACACAC] text-[16px]">Ca làm việc</span>,
      dataIndex: "shift",
      key: "shift",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: <span className="text-[#ACACAC] text-[16px]">Trạng thái</span>,
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">{text}</span>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text: string) => (
        <span className="text-[#000000] text-[16px]">
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <EllipsisVertical size={20} className="cursor-pointer" />
          </Dropdown>
        </span>
      ),
    },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold text-slate-800">
              Danh sách nhân sự
            </div>
          </div>
          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm hover:shadow-md">
            Thêm nhân sự
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          <Table dataSource={personnels} columns={columns} />
        </div>
      </div>
    </div>
  );
}
