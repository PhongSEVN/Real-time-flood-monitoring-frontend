import { Gender } from "@/enums";
import { Button, Form, Input, Select } from "antd";
import { HumanResourcesPosition, HumanResourcesStatus } from "../enum";
import type { HumanResources } from "../interfaces";

type Props = {
  onCancel: () => void;
};

export default function FormManagerHumanResources({ onCancel }: Props) {
  const [form] = Form.useForm<HumanResources>();

  const handleLogin = (values: HumanResources) => {
    console.log(values);
  };
  return (
    <div>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        requiredMark="optional"
        form={form}
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập mã nhân sự" }]}
            name="code"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Mã nhân sự
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập mã nhân sự" />
          </Form.Item>
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập tên nhân sự" }]}
            name="name"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Tên nhân sự
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập tên nhân sự" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
            name="email"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Email
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập email" />
          </Form.Item>
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            name="phone"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Số điện thoại
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập số điện thoại" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            name="address"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Địa chỉ
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập chức vụ" }]}
            name="position"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Chức vụ
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              options={Object.values(HumanResourcesPosition).map(
                (position) => ({
                  label:
                    position === HumanResourcesPosition.STAFF
                      ? "Cán bộ"
                      : "Bác sĩ",
                  value: position,
                })
              )}
              placeholder="Nhập chức vụ"
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập giới tính" }]}
            name="gender"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Giới tính
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              options={Object.values(Gender).map((status) => ({
                label: status === Gender.MALE ? "Nam" : "Nữ",
                value: status,
              }))}
              placeholder="Nhập giới tính"
            />
          </Form.Item>
          <Form.Item<HumanResources>
            rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
            name="status"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Trạng thái
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              options={Object.values(HumanResourcesStatus).map((status) => ({
                label:
                  status === HumanResourcesStatus.ACTIVE
                    ? "Đang hoạt động"
                    : "Tạm ngừng hoạt động",
                value: status,
              }))}
              placeholder="Nhập trạng thái"
            />
          </Form.Item>
        </div>
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button
              color="danger"
              variant="solid"
              className="text-[16px] font-medium h-9!"
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              className="text-[16px] font-medium h-9!"
              htmlType="submit"
            >
              Thêm Nhân Sự
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
