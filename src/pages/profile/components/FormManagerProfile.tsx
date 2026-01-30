import { Gender } from "@/enums";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";
import { ProfileStatus } from "../enum";
import type { UpdateProfile } from "../interfaces";

type Props = {
  onCancel: () => void;
};

export default function FormManagerUpdateProfile({ onCancel }: Props) {
  const [form] = Form.useForm<UpdateProfile>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (values: UpdateProfile) => {
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
          <Form.Item<UpdateProfile>
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            name="fullName"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Họ và tên
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item<UpdateProfile>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<UpdateProfile>
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            name="phoneNumber"
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
          <Form.Item<UpdateProfile>
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            name="dateOfBirth"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Ngày sinh
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              className="w-full h-10!"
              placeholder="Nhập ngày sinh"
            />
          </Form.Item>
        </div>
        <div className="">
          <Form.Item<UpdateProfile>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<UpdateProfile>
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
          <Form.Item<UpdateProfile>
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
              options={Object.values(ProfileStatus).map((status) => ({
                label:
                  status === ProfileStatus.ACTIVE
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
              Cập nhật thông tin
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
