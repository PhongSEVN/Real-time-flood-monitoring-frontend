import { useState, useEffect } from "react";
import {
    Card,
    Avatar,
    Typography,
    Tabs,
    Form,
    Input,
    Button,
    Tag,
    Row,
    Col,
    message,
    Spin,
    Divider
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    SaveOutlined,
    CameraOutlined,
    SafetyCertificateOutlined,
    CalendarOutlined,
    EditOutlined,
    CheckCircleFilled
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import type { TabsProps } from "antd";

const { Title, Text } = Typography;

export default function Profile() {
    const { user: contextUser } = useAuth();
    const [user, setUser] = useState<any>(contextUser);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setPageLoading(true);
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    setUser(userData);
                    authService.saveUser(userData);
                    form.setFieldsValue({
                        fullName: userData.fullName,
                        phoneNumber: userData.phoneNumber,
                        email: userData.email,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchUserProfile();
    }, [form]);

    const handleUpdateProfile = async (values: any) => {
        setLoading(true);
        try {
            console.log("Update values:", values);
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success("Cập nhật thông tin thành công!");
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            message.error("Có lỗi xảy ra khi cập nhật!");
        } finally {
            setLoading(false);
        }
    };

    // Component hiển thị thông tin dạng dòng (cho Tab Tổng quan)
    const InfoRow = ({ icon, label, value }: any) => (
        <div className="flex items-start py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-4 rounded-lg -mx-4">
            <div className="mt-1 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 mr-4">
                {icon}
            </div>
            <div className="flex-1">
                <Text className="text-gray-400 text-xs uppercase font-bold tracking-wider block mb-1">
                    {label}
                </Text>
                <Text className="text-gray-700 font-medium text-base">
                    {value || "Chưa cập nhật"}
                </Text>
            </div>
        </div>
    );

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Thông tin cá nhân",
            children: (
                <div className="animate-fade-in pt-2">
                    <Title level={4} className="mb-6 font-bold text-gray-800">
                        Chi tiết hồ sơ
                    </Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        <InfoRow
                            icon={<UserOutlined />}
                            label="Họ và tên"
                            value={user?.fullName}
                        />
                        <InfoRow
                            icon={<MailOutlined />}
                            label="Email"
                            value={user?.email}
                        />
                        <InfoRow
                            icon={<PhoneOutlined />}
                            label="Số điện thoại"
                            value={user?.phoneNumber}
                        />
                        <InfoRow
                            icon={<EnvironmentOutlined />}
                            label="Địa chỉ"
                            value={user?.addressGroup ? "Đã có nhóm địa chỉ" : "Chưa cập nhật"}
                        />
                        <InfoRow
                            icon={<SafetyCertificateOutlined />}
                            label="Vai trò hệ thống"
                            value={<Tag color="blue" className="px-2 py-0.5 rounded-md border-0 bg-blue-50 text-blue-600 font-semibold">{user?.role || "USER"}</Tag>}
                        />
                        <InfoRow
                            icon={<CalendarOutlined />}
                            label="Ngày tham gia"
                            value="29/01/2026"
                        />
                    </div>
                </div>
            ),
        },
        {
            key: "2",
            label: "Chỉnh sửa hồ sơ",
            children: (
                <div className="animate-fade-in pt-2">
                    <div className="flex justify-between items-center mb-6">
                        <Title level={4} className="m-0 font-bold text-gray-800">
                            Cập nhật thông tin
                        </Title>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdateProfile}
                        requiredMark={false}
                    >
                        <Row gutter={24}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="fullName"
                                    label={<span className="font-semibold text-gray-600">Họ và tên</span>}
                                    rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                                >
                                    <Input prefix={<UserOutlined className="text-gray-400" />} size="large" className="rounded-lg py-2.5 bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<span className="font-semibold text-gray-600">Email (Không thể thay đổi)</span>}
                                >
                                    <Input prefix={<MailOutlined className="text-gray-400" />} disabled size="large" className="rounded-lg py-2.5 bg-gray-100 border-gray-200 text-gray-500" value={user?.email} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="phoneNumber"
                                    label={<span className="font-semibold text-gray-600">Số điện thoại</span>}
                                    rules={[{ pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ" }]}
                                >
                                    <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Nhập số điện thoại" size="large" className="rounded-lg py-2.5 bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider className="my-6" />

                        <div className="flex justify-end">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                className="bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-500/20 px-8 h-11 rounded-lg font-semibold flex items-center gap-2"
                            >
                                <SaveOutlined /> Lưu thay đổi
                            </Button>
                        </div>
                    </Form>
                </div>
            ),
        },
    ];

    if (pageLoading && !user) {
        return <div className="flex h-screen items-center justify-center"><Spin size="large" /></div>;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Row gutter={[24, 24]}>
                    {/* Left Column: ID Card Design */}
                    <Col xs={24} lg={8} xl={7}>
                        <Card
                            className="h-full border-0 shadow-sm rounded-2xl overflow-hidden text-center sticky top-6"
                            bodyStyle={{ padding: "40px 24px" }}
                        >
                            {/* Abstract Decor Background */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 z-0"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-40"></div>

                            <div className="relative z-10">
                                <div className="inline-block relative mb-6">
                                    <Avatar
                                        size={120}
                                        src={user?.avatar}
                                        className="shadow-xl border-4 border-white bg-white text-5xl"
                                    >
                                        {!user?.avatar && (user?.fullName?.charAt(0) || user?.email?.charAt(0) || "U")}
                                    </Avatar>
                                    <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:text-blue-600 hover:scale-110 transition-all border border-gray-100">
                                        <CameraOutlined className="text-lg text-gray-500" />
                                    </div>
                                </div>

                                <Title level={3} className="mb-1 font-bold text-gray-800">
                                    {user?.fullName || "User Name"}
                                </Title>
                                <Text className="text-gray-500 block mb-4">{user?.email}</Text>

                                <div className="flex items-center justify-center gap-2 mb-8">
                                    <Tag color="cyan" className="px-3 py-1 rounded-full border-0 font-semibold bg-cyan-50 text-cyan-600 m-0">
                                        {user?.role || "USER"}
                                    </Tag>
                                    <Tag color="orange" className="px-3 py-1 rounded-full border-0 font-semibold bg-orange-50 text-orange-600 m-0">
                                        Level {user?.priorityLevel || 0}
                                    </Tag>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-800">0</div>
                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mt-1">Cảnh báo</div>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <div className="text-xl font-bold text-gray-800">Active</div>
                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mt-1">Trạng thái</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Right Column: Content */}
                    <Col xs={24} lg={16} xl={17}>
                        <Card
                            className="bg-white border-0 shadow-sm rounded-2xl h-full"
                            bodyStyle={{ padding: 0 }}
                        >
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                size="large"
                                className="custom-tabs"
                                tabBarStyle={{ padding: "0 24px", marginBottom: 0 }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <style>{`
                .custom-tabs .ant-tabs-nav {
                    margin-bottom: 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                .custom-tabs .ant-tabs-nav-list {
                    margin-top: 12px;
                }
                .custom-tabs .ant-tabs-tab {
                    padding: 16px 4px;
                    margin: 0 24px 0 0;
                    font-weight: 500;
                    font-size: 15px;
                    color: #64748b;
                    transition: all 0.3s;
                }
                .custom-tabs .ant-tabs-tab:hover {
                    color: #1a5d9f;
                }
                .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #1a5d9f !important;
                    font-weight: 600;
                }
                .custom-tabs .ant-tabs-ink-bar {
                    background: #1a5d9f !important;
                    height: 3px !important;
                    border-radius: 3px 3px 0 0;
                }
                .custom-tabs .ant-tabs-content-holder {
                    padding: 24px 32px;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}