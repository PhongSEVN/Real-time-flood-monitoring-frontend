import React, { useEffect, useState } from "react";
import {
  Tabs,
  Descriptions,
  Table,
  Tag,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  Space,
  Drawer,
  Checkbox,
  message,
  Popconfirm,
} from "antd";
import type { TabsProps } from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { householdService, Household } from "@/services/householdService";

// Component con: Chi tiết hộ dân (Tabs)
const HouseholdDetail = ({ data }: { data: Household }) => {
  const memberColumns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium text-slate-700">{text || "---"}</span>
      ),
    },
    {
      title: "Quan hệ",
      dataIndex: "relation",
      key: "relation",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Sức khỏe / Y tế",
      dataIndex: "health",
      key: "health",
      render: (text: string) => {
        if (!text) return <Tag>Chưa cập nhật</Tag>;
        let color = "green";
        if (text.includes("Yếu") || text.includes("Bệnh") || text.includes("thai"))
          color = "volcano";
        if (text.includes("Tiểu đường")) color = "orange";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Ghi chú cứu hộ",
      dataIndex: "note",
      key: "note",
    },
  ];

  const assetColumns = [
    {
      title: "Tên tài sản",
      dataIndex: "name",
      key: "name",
      className: "font-medium",
    },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Ước tính giá trị", dataIndex: "value", key: "value" },
    { title: "Tình trạng / Vị trí", dataIndex: "status", key: "status" },
  ];

  const business = data.business || {};
  const environment = data.environment || {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <HomeOutlined />
          Thông tin nhà
        </span>
      ),
      children: (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <Card bordered={false} className="shadow-sm">
            <Descriptions
              title="Thông tin chi tiết căn hộ"
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Chủ hộ">{data.owner}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{data.address}</Descriptions.Item>
              <Descriptions.Item label="SĐT Liên hệ">{data.phone}</Descriptions.Item>
              <Descriptions.Item label="Loại nhà">{data.type}</Descriptions.Item>
              <Descriptions.Item label="Kết cấu">
                {data.structure}
              </Descriptions.Item>
              <Descriptions.Item label="Diện tích">{data.area}</Descriptions.Item>
              <Descriptions.Item label="Năm xây dựng">
                {data.builtYear}
              </Descriptions.Item>
              <Descriptions.Item label="Cao độ nền">
                <span className="text-rose-600 font-semibold">
                  {data.floorLevel}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <UsergroupAddOutlined />
          Người trong nhà
        </span>
      ),
      children: (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-sm mb-4">
            <span className="font-bold">Lưu ý quan trọng:</span> Dữ liệu sức khỏe
            giúp đội cứu hộ ưu tiên hỗ trợ người già, trẻ em và người bệnh khi có sự
            cố ngập lụt nghiêm trọng.
          </div>
          <Table
            columns={memberColumns}
            dataSource={data.members || []}
            pagination={false}
            className="shadow-sm rounded-lg overflow-hidden border border-slate-100"
            rowKey="key"
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-center gap-2">
          <CarOutlined />
          Tài sản
        </span>
      ),
      children: (
        <div className="animate-in fade-in zoom-in duration-300">
          <Table
            columns={assetColumns}
            dataSource={data.assets || []}
            pagination={false}
            className="shadow-sm rounded-lg overflow-hidden border border-slate-100"
            rowKey="key"
          />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <span className="flex items-center gap-2">
          <ShopOutlined />
          Sản xuất kinh doanh
        </span>
      ),
      children: (
        <div className="animate-in fade-in zoom-in duration-300">
          <Card bordered={false} className="shadow-sm">
            <Descriptions
              title="Hoạt động kinh doanh tại gia"
              bordered
              column={1}
            >
              <Descriptions.Item label="Tình trạng kinh doanh">
                {business.isBusiness ? (
                  <Tag color="blue">Đang hoạt động</Tag>
                ) : (
                  <Tag>Không</Tag>
                )}
              </Descriptions.Item>
              {business.isBusiness && (
                <>
                  <Descriptions.Item label="Loại hình">
                    {business.type}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lĩnh vực">
                    {business.field}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giấy phép">
                    {business.license}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mặt hàng chính">
                    {business.items}
                  </Descriptions.Item>
                  <Descriptions.Item label="Đánh giá rủi ro ngập">
                    <span className="text-orange-600 font-medium">
                      {business.risk}
                    </span>
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          </Card>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <span className="flex items-center gap-2">
          <EnvironmentOutlined />
          Ảnh hưởng môi trường
        </span>
      ),
      children: (
        <div className="animate-in fade-in zoom-in duration-300">
          <Card bordered={false} className="shadow-sm">
            <Descriptions title="Vệ sinh & Môi trường" bordered column={1}>
              <Descriptions.Item label="Thu gom rác">
                {environment.waste}
              </Descriptions.Item>
              <Descriptions.Item label="Nguồn nước sinh hoạt">
                {environment.waterSource}
              </Descriptions.Item>
              <Descriptions.Item label="Hệ thống thoát nước">
                {environment.drainage}
              </Descriptions.Item>
              <Descriptions.Item label="Vệ sinh">
                {environment.sanitation}
              </Descriptions.Item>
              <Descriptions.Item label="Lịch sử ngập">
                <span className="text-rose-600 font-medium">
                  {environment.floodHistory}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

// Main Page Component
export default function HouseholdPage() {
  const [households, setHouseholds] = useState<Household[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(
    null
  );
  const [form] = Form.useForm();

  // Load data
  const loadData = () => {
    setHouseholds(householdService.getHouseholds());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("households-updated", loadData);
    return () => {
      window.removeEventListener("households-updated", loadData);
    };
  }, []);

  const handleCreate = (values: any) => {
    // Transform flat form values to nested object structure
    const members = (values.members || [])
      .filter((m: any) => m && m.name) // Filter valid members
      .map((m: any, idx: number) => ({
        ...m,
        key: `${Date.now()}_m_${idx}`,
      }));

    const assets = (values.assets || [])
      .filter((a: any) => a && a.name) // Filter valid assets
      .map((a: any, idx: number) => ({
        ...a,
        key: `${Date.now()}_a_${idx}`,
      }));

    const newHousehold = {
      owner: values.owner,
      address: values.address,
      phone: values.phone,
      type: values.type,
      structure: values.structure || "",
      area: values.area || "",
      floorLevel: values.floorLevel || "",
      builtYear: values.builtYear || "",
      members: members,
      assets: assets,
      business: {
        isBusiness: values.isBusiness,
        type: values.businessType || "",
        field: values.businessField || "",
        license: values.businessLicense || "",
        items: values.businessItems || "",
        risk: values.businessRisk || "",
      },
      environment: {
        waste: values.waste,
        waterSource: values.waterSource,
        drainage: values.drainage,
        sanitation: values.sanitation,
        floodHistory: values.floodHistory,
      },
    };
    householdService.addHousehold(newHousehold);
    setIsModalOpen(false);
    form.resetFields();
    message.success(
      `Đã thêm hồ sơ: ${members.length} thành viên, ${assets.length} tài sản!`
    );
  };

  const columns = [
    {
      title: "Chủ hộ",
      dataIndex: "owner",
      key: "owner",
      render: (text: string) => <span className="font-bold text-blue-700">{text}</span>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Loại nhà",
      dataIndex: "type",
      key: "type",
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: "Cao độ nền",
      dataIndex: "floorLevel",
      key: "floorLevel",
      render: (text: string) => (
        <span className={text?.includes("Thấp") ? "text-red-500" : "text-green-600"}>
          {text || "Chưa cập nhật"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: Household) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => setSelectedHousehold(record)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-lg font-semibold text-slate-800">
              Quản lý Hồ sơ Nhà ở & Cư dân
            </div>
            <div className="text-xs text-slate-500">
              Danh sách các hộ dân đã khai báo thông tin. Dữ liệu được cập nhật theo
              thời gian thực.
            </div>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Khai báo hồ sơ (Dân)
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={households}
          rowKey="id"
          className="border border-slate-100 rounded-lg overflow-hidden"
        />
      </div>

      {/* Drawer Details */}
      <Drawer
        title="Chi tiết Hồ sơ Nhà ở & Cư dân"
        placement="right"
        width={720}
        onClose={() => setSelectedHousehold(null)}
        open={!!selectedHousehold}
      >
        {selectedHousehold && <HouseholdDetail data={selectedHousehold} />}
      </Drawer>

      {/* Create Modal */}
      <Modal
        title="Khai báo thông tin Hộ gia đình"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Thông tin chung",
                children: (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        name="owner"
                        label="Chủ hộ"
                        rules={[{ required: true, message: "Vui lòng nhập tên chủ hộ" }]}
                      >
                        <Input placeholder="Nguyễn Văn A" />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}
                      >
                        <Input placeholder="0909xxxxxx" />
                      </Form.Item>
                    </div>
                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                      rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                    >
                      <Input placeholder="Số nhà, đường, phường, quận..." />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item name="type" label="Loại nhà" initialValue="Nhà phố">
                        <Select>
                          <Select.Option value="Nhà cấp 4">Nhà cấp 4</Select.Option>
                          <Select.Option value="Nhà phố">Nhà phố</Select.Option>
                          <Select.Option value="Biệt thự">Biệt thự</Select.Option>
                          <Select.Option value="Chung cư">Chung cư</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="builtYear" label="Năm xây dựng">
                        <Input placeholder="2010" />
                      </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item name="area" label="Diện tích">
                        <Input placeholder="80m2" />
                      </Form.Item>
                      <Form.Item name="floorLevel" label="Cao độ nền">
                        <Input placeholder="Thấp hơn mặt đường 0.5m" />
                      </Form.Item>
                    </div>

                    <Form.Item name="structure" label="Kết cấu nhà">
                      <Input.TextArea rows={2} placeholder="Tường gạch, mái tôn..." />
                    </Form.Item>
                  </>
                ),
              },
              {
                key: "2",
                label: "Người trong nhà",
                children: (
                  <div className="max-h-[60vh] overflow-y-auto pr-2">
                    <Form.List name="members">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3 relative"
                            >
                              <div className="absolute top-2 right-2">
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3 pr-6">
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label="Họ tên"
                                  rules={[{ required: true, message: "Nhập tên" }]}
                                  className="mb-2"
                                >
                                  <Input placeholder="Nguyễn Văn B" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "relation"]}
                                  label="Quan hệ"
                                  className="mb-2"
                                >
                                  <Input placeholder="Vợ/Con..." />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "age"]}
                                  label="Tuổi"
                                  className="mb-2"
                                >
                                  <InputNumber className="w-full" placeholder="30" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "health"]}
                                  label="Sức khỏe"
                                  className="mb-2"
                                >
                                  <Input placeholder="Bình thường/Yếu..." />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "note"]}
                                  label="Ghi chú"
                                  className="col-span-2 mb-0"
                                >
                                  <Input placeholder="Cần hỗ trợ đặc biệt..." />
                                </Form.Item>
                              </div>
                            </div>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm thành viên
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              },
              {
                key: "3",
                label: "Tài sản",
                children: (
                  <div className="max-h-[60vh] overflow-y-auto pr-2">
                    <Form.List name="assets">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3 relative"
                            >
                              <div className="absolute top-2 right-2">
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3 pr-6">
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label="Tên tài sản"
                                  rules={[{ required: true, message: "Nhập tên" }]}
                                  className="mb-2"
                                >
                                  <Input placeholder="Xe máy, Tủ lạnh..." />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "quantity"]}
                                  label="Số lượng"
                                  className="mb-2"
                                >
                                  <InputNumber className="w-full" placeholder="1" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "value"]}
                                  label="Giá trị ước tính"
                                  className="mb-2"
                                >
                                  <Input placeholder="50 triệu" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "status"]}
                                  label="Vị trí/Tình trạng"
                                  className="mb-2"
                                >
                                  <Input placeholder="Tầng trệt/Kê cao..." />
                                </Form.Item>
                              </div>
                            </div>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm tài sản
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              },
              {
                key: "4",
                label: "Kinh doanh",
                children: (
                  <>
                    <Form.Item
                      name="isBusiness"
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox className="font-semibold text-slate-700">
                        Có hoạt động kinh doanh tại gia?
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      noStyle
                      shouldUpdate={(prev, current) =>
                        prev.isBusiness !== current.isBusiness
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("isBusiness") && (
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <Form.Item name="businessType" label="Loại hình">
                              <Input placeholder="Hộ kinh doanh cá thể" />
                            </Form.Item>
                            <Form.Item name="businessField" label="Lĩnh vực">
                              <Input placeholder="Tạp hóa, Ăn uống..." />
                            </Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                              <Form.Item name="businessLicense" label="Giấy phép">
                                <Input placeholder="Số giấy phép..." />
                              </Form.Item>
                              <Form.Item name="businessItems" label="Mặt hàng chính">
                                <Input placeholder="Bánh kẹo..." />
                              </Form.Item>
                            </div>
                            <Form.Item name="businessRisk" label="Rủi ro khi ngập">
                              <Input.TextArea
                                rows={2}
                                placeholder="Hàng hóa dễ hư hỏng..."
                              />
                            </Form.Item>
                          </div>
                        )
                      }
                    </Form.Item>
                  </>
                ),
              },
              {
                key: "5",
                label: "Môi trường",
                children: (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Form.Item
                        name="waste"
                        label="Thu gom rác"
                        initialValue="Hàng ngày"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item name="floodHistory" label="Lịch sử ngập">
                        <Input placeholder="Ngập 0.5m năm 2023" />
                      </Form.Item>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Form.Item
                        name="waterSource"
                        label="Nguồn nước"
                        initialValue="Nước máy"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="drainage"
                        label="Thoát nước"
                        initialValue="Bình thường"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="sanitation"
                        label="Vệ sinh"
                        initialValue="Tự hoại"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </>
                ),
              },
            ]}
          />

          <div className="flex justify-end gap-2 mt-6 border-t pt-4">
            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Lưu hồ sơ
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
