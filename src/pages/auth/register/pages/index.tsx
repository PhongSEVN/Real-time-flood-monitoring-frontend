import { Button, Checkbox, Form, Input, type FormProps } from "antd";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { RegisterRequest } from "../interfaces";

export default function Register() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // Hàm xử lý đăng ký
  const handleRegister: FormProps<RegisterRequest>["onFinish"] = async (
    values
  ) => {
    setIsLoading(true);
    try {
    console.log(values);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <main className="min-h-screen w-full bg-[url('/image-auth.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
        <div className="z-50 bg-white rounded-[20px] shadow-sm lg:w-[655px] md:w-[555px] w-[335px] flex py-[20px] justify-center ">
          <div className="w-full p-6">
            <div className="flex justify-center mb-2 lg:mt-0 mt-[25px]">
              <img
                loading="lazy"
                alt="Image Auth"
                className="lg:w-[217px] lg:h-[139px] md:w-[143px] md:h-[90px] w-[101px] rounded-[10px] h-[70px] mix-blend-multiply"
                src="/image-logo.png"
              />
            </div>
            <h3 className="lg:text-[30px] text-[24px] mb-2 text-center font-semibold text-[#144c65]">
              Đăng ký
            </h3>
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={handleRegister}
              autoComplete="off"
              form={form}
            >
              <div className="max-h-[34vh] overflow-auto hide-scrollbar">
                <Form.Item<RegisterRequest>
                  required={false}
                  name="fullName"
                  label={
                    <p className="lg:text-[16px] md:text-[15px] text-[14px] text-[#464646] font-medium">
                      Họ và tên
                      <span className="text-[#D32F2F] ml-[4px]">*</span>
                    </p>
                  }
                  rules={[
                    {
                      required: true,

                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          const characterFormat = /^[\p{L}\s.,!?]+$/u;
                          const phoneRegex = /^[0-9]/; // Loại bỏ khoảng trăng ở đầu và cuối
                          const spaceValue = (value || "").trim();
                          if (!spaceValue) {
                            reject(
                              new Error("Vui lòng nhập họ và tên của bạn")
                            );
                          } else if (phoneRegex.test(value)) {
                            reject(
                              new Error(
                                "Trường này không được nhập kí tự đặc biệt"
                              )
                            );
                          } else {
                            if (
                              spaceValue.length < 2 ||
                              spaceValue.length > 50
                            ) {
                              reject(
                                new Error(
                                  "Họ và tên phải có ít nhất 2 đến 50 kí tự"
                                )
                              );
                            } else {
                              if (!characterFormat.test(value)) {
                                reject(
                                  new Error("Họ và tên không đúng định dạng")
                                );
                              } else {
                                resolve("");
                              }
                            }
                          }
                        });
                      },
                    },
                  ]}
                  validateTrigger={["onBlur", "onChange"]}
                >
                  <Input
                    placeholder="Nhập họ và tên của bạn"
                    autoComplete="fullName"
                    className="h-(--height-input-large) bg-[#F5F5F5] rounded-[10px]"
                    allowClear
                    maxLength={50}
                  />
                </Form.Item>

                <Form.Item<RegisterRequest>
                  name="phoneNumber"
                  required={false}
                  label={
                    <p className="lg:text-[16px] md:text-[15px] text-[14px] text-[#464646] font-medium">
                      Số điện thoại
                      <span className="text-[#D32F2F] ml-[4px]">*</span>
                    </p>
                  }
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          const phoneRegex =
                            /^(0[1|3|5|7|8|9])([0-9]{8}|[0-9]{9})$/;
                          if (!value) {
                            reject(new Error("Vui lòng nhập số điện thoại"));
                          } else {
                            if (!phoneRegex.test(value)) {
                              reject(
                                new Error("Số điện thoại không đúng định dạng")
                              );
                            }
                            return resolve("");
                          }
                        });
                      },
                    },
                  ]}
                  validateTrigger={["onBlur", "onChange"]}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    autoComplete="phoneNumber"
                    className="h-(--height-input-large) bg-[#F5F5F5] rounded-[10px]"
                    maxLength={11}
                    allowClear
                  />
                </Form.Item>

                <Form.Item<RegisterRequest>
                  name="email"
                  required={false}
                  className="lg:[&_.ant-form-item-explain-error]:w-[491px] md:[&_.ant-form-item-explain-error]:w-[400px] [&_.ant-form-item-explain-error]:w-[315px]"
                  label={
                    <p className="lg:text-[16px] md:text-[15px] text-[14px] text-[#464646] font-medium">
                      Email
                      <span className="text-[#D32F2F] ml-[4px]">*</span>
                    </p>
                  }
                  rules={[
                    {
                      required: true,
                      validator: (_, value) =>
                        new Promise((resolve, reject) => {
                          if (!value) {
                            reject(new Error("Vui lòng nhập email"));
                          } else {
                            const DoudleDoRegex = /\.{2,}/;
                            if (
                              !value.includes("@") ||
                              DoudleDoRegex.test(value)
                            ) {
                              reject(
                                new Error(
                                  "Email không hợp lệ. Vui lòng kiểm tra lại"
                                )
                              );
                            } else {
                              resolve("");
                            }
                          }
                        }),
                    },
                  ]}
                  validateTrigger={["onBlur", "onChange"]}
                >
                  <Input
                    placeholder="Nhập email"
                    autoComplete="email"
                    className="h-(--height-input-large) bg-[#F5F5F5] rounded-[10px]"
                    maxLength={200}
                    allowClear
                  />
                </Form.Item>

                <Form.Item<RegisterRequest>
                  required={false}
                  name="password"
                  label={
                    <p className="lg:text-[16px] md:text-[15px] text-[14px] text-[#464646] font-medium">
                      Mật khẩu
                      <span className="text-[#D32F2F] ml-[4px]">*</span>
                    </p>
                  }
                  rules={[
                    {
                      required: true,
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (!value) {
                            return reject(new Error("Vui lòng nhập mật khẩu"));
                          } else {
                            const passwordRegex =
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])([A-Za-z\d@$!%*?&^#])+$/;
                            if (
                              !passwordRegex.test(value) ||
                              value.length < 8
                            ) {
                              return reject(
                                new Error(
                                  "Mật khẩu tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
                                )
                              );
                            } else {
                              return resolve("");
                            }
                          }
                        });
                      },
                    },
                  ]}
                  validateTrigger={["onBlur", "onChange"]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    autoComplete="password"
                    className="h-(--height-input-large) bg-[#F5F5F5] rounded-[10px]"
                    iconRender={(version) =>
                      version ? (
                        <Eye
                          size={24}
                          style={{
                            color: "#989898",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <EyeOff
                          size={24}
                          style={{
                            color: "#989898",
                            cursor: "pointer",
                          }}
                        />
                      )
                    }
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  required={false}
                  name="rePassword"
                  label={
                    <p className="lg:text-[16px] md:text-[15px] text-[14px] text-[#464646] font-medium">
                      Nhập lại mật khẩu
                      <span className="text-[#D32F2F] ml-[4px]">*</span>
                    </p>
                  }
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập lại mật khẩu mới",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        return new Promise((resolve, reject) => {
                          if (!value || getFieldValue("password") === value) {
                            resolve("");
                          } else {
                            reject(new Error("Mật khẩu không khớp"));
                          }
                        });
                      },
                    }),
                  ]}
                  validateTrigger={["onBlur", "onChange"]}
                >
                  <Input.Password
                    placeholder="Xác nhận lại mật khẩu"
                    autoComplete="rePassword"
                    className="h-(--height-input-large) bg-[#F5F5F5] rounded-[10px]"
                    iconRender={(version) =>
                      version ? (
                        <Eye
                          size={24}
                          style={{
                            color: "#989898",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <EyeOff
                          size={24}
                          style={{
                            color: "#989898",
                            cursor: "pointer",
                          }}
                        />
                      )
                    }
                    allowClear
                  />
                </Form.Item>
              </div>
              <div className="flex justify-between items-center">
                <Form.Item className="mb-2">
                  <Checkbox
                    onChange={(e) => setIsConfirm(e.target.checked)}
                    className="text-[#272727]/80 text-[14px] font-light"
                  >
                    Bạn đồng ý với{" "}
                    <Link
                      to="/policy"
                      className="text-[#144c65] hover:text-[#144c65]/50 transition-all text-[14px]"
                    >
                      Điều khoản
                    </Link>{" "}
                    và{" "}
                    <Link
                      to="/policy"
                      className="text-[#144c65] hover:text-[#144c65]/50 transition-all text-[14px]"
                    >
                      Chính sách
                    </Link>{" "}
                    của hệ thống
                  </Checkbox>
                </Form.Item>
              </div>
              <Form.Item className="my-2">
                <Button
                  loading={isLoading}
                  disabled={!isConfirm}
                  htmlType="submit"
                  className="h-11! w-full font-semibold lg:text-[18px]! text-[16px]!"
                  type="primary"
                >
                  Đăng ký
                </Button>
              </Form.Item>
              <Form.Item className="text-center mb-0" label={null}>
                <span className="text-[#718096]">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#144c65",
                    }}
                    className="font-semibold hover:text-[#144c65]/80 transition-all"
                  >
                    Đăng nhập
                  </Link>{" "}
                  tại đây
                </span>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
