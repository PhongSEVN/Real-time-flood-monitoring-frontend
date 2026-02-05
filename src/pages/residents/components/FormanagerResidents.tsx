import { Button, Form, Input, Select } from "antd";
import { HouseType } from "../enum";
import type { CreateResident } from "../interfaces";

type Props = {
  onCancel: () => void;
};

export default function FormanagerResidents({ onCancel }: Props) {
  // Hàm xử lấy khi submit
  const onFinish = (values: CreateResident) => {
    console.log(values);
  };
  return (
    <div>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark="optional"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập mã hộ dân" }]}
            name="code"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Mã hộ dân
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập mã hộ dân" />
          </Form.Item>
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập tên chủ hộ" }]}
            name="name"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Tên chủ hộ
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập tên chủ hộ" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<CreateResident>
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
          <Form.Item<CreateResident>
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
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập mã hộ dân" }]}
            name="longitude"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Kinh độ
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập kinh độ" />
          </Form.Item>
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập vĩ độ" }]}
            name="latitude"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Vĩ độ
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập vĩ độ" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập số thành viên" }]}
            name="numberOfMembers"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Số thành viên
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập số thành viên" />
          </Form.Item>
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập có người già" }]}
            name="hasElderly"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Có người già
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              placeholder="Nhập có người già"
              options={[
                {
                  label: "Có",
                  value: true,
                },
                {
                  label: "Không",
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập có trẻ em" }]}
            name="hasChildren"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Có trẻ em
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              placeholder="Nhập có trẻ em"
              options={[
                {
                  label: "Có",
                  value: true,
                },
                {
                  label: "Không",
                  value: false,
                },
              ]}
            />
          </Form.Item>
          <Form.Item<CreateResident>
            rules={[
              { required: true, message: "Vui lòng nhập có phụ nữ mang thai" },
            ]}
            name="hasPregnantWomen"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Có phụ nữ mang thai
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              placeholder="Nhập có phụ nữ mang thai"
              options={[
                {
                  label: "Có",
                  value: true,
                },
                {
                  label: "Không",
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập mã hộ dân" }]}
            name="hasChronicDisease"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Có người bị bệnh nền
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              placeholder="Nhập có người bị bệnh nền"
              options={[
                {
                  label: "Có",
                  value: true,
                },
                {
                  label: "Không",
                  value: false,
                },
              ]}
            />
          </Form.Item>
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập loại nhà" }]}
            name="houseType"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Loại nhà
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              className="w-full h-10!"
              placeholder="Nhập loại nhà"
              options={Object.values(HouseType).map((houseType) => ({
                label:
                  houseType === HouseType.APARTMENT
                    ? "Nhà cao ốc"
                    : houseType === HouseType.HOUSE
                    ? "Nhà riêng"
                    : houseType === HouseType.VILLA
                    ? "Nhà biệt thự"
                    : "Loại nhà khác",
                value: houseType,
              }))}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập số tầng" }]}
            name="numberOfFloors"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Số tầng
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input className="w-full h-10!" placeholder="Nhập số tầng" />
          </Form.Item>
          <Form.Item<CreateResident>
            rules={[{ required: true, message: "Vui lòng nhập có kinh doanh" }]}
            name="hasBusiness"
            label={
              <p className="lg:text-[16px] text-[14px] text-[#464646] font-medium">
                Hộ kinh doanh
                <span className="text-[#D32F2F] ml-1">*</span>
              </p>
            }
            validateTrigger={["onBlur", "onChange"]}
          >
            <Select
              options={[
                {
                  label: "Có",
                  value: true,
                },
                {
                  label: "Không",
                  value: false,
                },
              ]}
              className="w-full h-10!"
              placeholder="Nhập tên chủ hộ"
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
              Thêm Hộ Dân
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
