import { Link } from "react-router-dom";

type PolicySection = {
  id: string;
  title: string;
};

const SECTIONS: PolicySection[] = [
  { id: "gioi-thieu", title: "Giới thiệu" },
  { id: "dieu-khoan", title: "Điều khoản sử dụng" },
  { id: "quyen-va-trach-nhiem", title: "Quyền và trách nhiệm của người dùng" },
  { id: "du-lieu-thu-thap", title: "Dữ liệu thu thập" },
  { id: "muc-dich-su-dung", title: "Mục đích sử dụng dữ liệu" },
  { id: "chia-se-du-lieu", title: "Chia sẻ dữ liệu" },
  { id: "luu-tru-va-bao-mat", title: "Lưu trữ & bảo mật" },
  { id: "canh-bao-va-mien-tru", title: "Cảnh báo & miễn trừ trách nhiệm" },
  { id: "lien-he", title: "Liên hệ" },
];

export default function Policy() {
  return (
    <main className="min-h-screen w-full px-4 py-10">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="rounded-[20px] bg-white/95 shadow-sm backdrop-blur p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-[22px] md:text-[28px] font-bold text-[#144c65]">
                Điều khoản & Chính sách của Hệ thống giám sát ngập lụt thời gian
                thực
              </h1>
              <p className="mt-2 text-[14px] md:text-[15px] text-[#4b5563]">
                Trang này mô tả điều khoản sử dụng và chính sách bảo mật áp dụng
                cho nền tảng giám sát mực nước/cảnh báo ngập. Khi đăng ký/tải
                nhập và sử dụng hệ thống, bạn đồng ý với các nội dung dưới đây.
              </p>
              <p className="mt-2 text-[13px] text-[#6b7280]">
                Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-[10px] border border-[#e5e7eb] px-4 py-2 text-[14px] font-semibold text-[#144c65] hover:bg-[#144c65]/5 transition"
              >
                Quay lại đăng ký
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-[10px] bg-[#144c65] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#144c65]/90 transition"
              >
                Đăng nhập
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
            <aside className="rounded-[14px] border border-[#eef2f7] bg-[#f8fafc] p-4 md:sticky md:top-6 h-fit">
              <div className="text-[13px] font-semibold text-[#144c65]">
                Mục lục
              </div>
              <ul className="mt-3 space-y-2">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-[10px] px-3 py-2 text-[14px] text-[#334155] hover:bg-white transition"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <article className="space-y-6 text-[#111827]">
              <section id="gioi-thieu" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  1) Giới thiệu
                </h2>
                <p className="mt-2 text-[14px] md:text-[15px] text-[#374151] leading-7">
                  Hệ thống giám sát ngập lụt thời gian thực thu thập dữ liệu mực
                  nước và trạng thái thiết bị từ các điểm đo (IoT), hiển thị lên
                  bản đồ/dashboard và phát cảnh báo khi vượt ngưỡng. Mục tiêu là
                  hỗ trợ theo dõi, ra quyết định và giảm thiểu rủi ro ngập.
                </p>
              </section>

              <section id="dieu-khoan" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  2) Điều khoản sử dụng
                </h2>
                <ul className="mt-2 list-disc pl-5 text-[14px] md:text-[15px] text-[#374151] leading-7 space-y-1">
                  <li>
                    Bạn cam kết cung cấp thông tin đăng ký chính xác và cập nhật
                    khi có thay đổi.
                  </li>
                  <li>
                    Không sử dụng hệ thống cho mục đích trái pháp luật, gây gián
                    đoạn dịch vụ, hoặc truy cập trái phép.
                  </li>
                  <li>
                    Không sao chép/khai thác dữ liệu hệ thống để bán lại, phát
                    tán hoặc gây nhầm lẫn về nguồn dữ liệu.
                  </li>
                  <li>
                    Nhà cung cấp có thể tạm ngừng dịch vụ để bảo trì hoặc khi có
                    dấu hiệu lạm dụng/vi phạm.
                  </li>
                </ul>
              </section>

              <section id="quyen-va-trach-nhiem" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  3) Quyền và trách nhiệm của người dùng
                </h2>
                <ul className="mt-2 list-disc pl-5 text-[14px] md:text-[15px] text-[#374151] leading-7 space-y-1">
                  <li>
                    Bảo mật tài khoản/mật khẩu, không chia sẻ thông tin đăng
                    nhập cho người khác.
                  </li>
                  <li>
                    Chịu trách nhiệm cho các thao tác phát sinh từ tài khoản của
                    mình.
                  </li>
                  <li>
                    Phối hợp khi hệ thống yêu cầu xác minh để bảo vệ an toàn tài
                    khoản.
                  </li>
                </ul>
              </section>

              <section id="du-lieu-thu-thap" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  4) Dữ liệu thu thập
                </h2>
                <ul className="mt-2 list-disc pl-5 text-[14px] md:text-[15px] text-[#374151] leading-7 space-y-1">
                  <li>
                    <b>Thông tin tài khoản</b>: họ tên, số điện thoại, email
                    (nếu có), lịch sử đăng nhập cơ bản.
                  </li>
                  <li>
                    <b>Dữ liệu thiết bị/điểm đo</b>: mã thiết bị, trạng thái kết
                    nối, ngưỡng cảnh báo cấu hình, thông số mực nước theo thời
                    gian.
                  </li>
                  <li>
                    <b>Dữ liệu vận hành</b>: nhật ký thao tác (audit log) phục
                    vụ bảo mật và truy vết sự cố.
                  </li>
                </ul>
              </section>

              <section id="muc-dich-su-dung" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  5) Mục đích sử dụng dữ liệu
                </h2>
                <ul className="mt-2 list-disc pl-5 text-[14px] md:text-[15px] text-[#374151] leading-7 space-y-1">
                  <li>
                    Vận hành hệ thống giám sát và hiển thị dữ liệu theo thời
                    gian thực.
                  </li>
                  <li>
                    Gửi cảnh báo (trên hệ thống) khi mực nước vượt ngưỡng.
                  </li>
                  <li>
                    Cải thiện độ ổn định, hiệu năng và an toàn của hệ thống.
                  </li>
                </ul>
              </section>

              <section id="chia-se-du-lieu" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  6) Chia sẻ dữ liệu
                </h2>
                <p className="mt-2 text-[14px] md:text-[15px] text-[#374151] leading-7">
                  Hệ thống không chia sẻ thông tin cá nhân của bạn cho bên thứ
                  ba vì mục đích thương mại. Dữ liệu có thể được chia sẻ trong
                  các trường hợp: (i) bạn cho phép; (ii) phục vụ yêu cầu pháp
                  lý/hành chính theo quy định; (iii) đối tác hạ tầng
                  (hosting/logging) nhằm vận hành dịch vụ, với các biện pháp bảo
                  mật phù hợp.
                </p>
              </section>

              <section id="luu-tru-va-bao-mat" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  7) Lưu trữ & bảo mật
                </h2>
                <ul className="mt-2 list-disc pl-5 text-[14px] md:text-[15px] text-[#374151] leading-7 space-y-1">
                  <li>
                    Mật khẩu được lưu trữ theo cơ chế băm (hash) và không hiển
                    thị lại.
                  </li>
                  <li>
                    Dữ liệu truyền tải được bảo vệ bởi giao thức bảo mật (khi
                    cấu hình triển khai).
                  </li>
                  <li>
                    Áp dụng phân quyền truy cập theo vai trò để giới hạn dữ liệu
                    và chức năng.
                  </li>
                </ul>
              </section>

              <section id="canh-bao-va-mien-tru" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  8) Cảnh báo & miễn trừ trách nhiệm
                </h2>
                <p className="mt-2 text-[14px] md:text-[15px] text-[#374151] leading-7">
                  Cảnh báo trong hệ thống mang tính hỗ trợ tham khảo theo dữ
                  liệu cảm biến và điều kiện vận hành (mất điện/mạng, sai lệch
                  cảm biến, độ trễ truyền tin). Hệ thống không thay thế hoàn
                  toàn cảnh báo chính thức của cơ quan chức năng. Người dùng cần
                  kết hợp nhiều nguồn thông tin khi ra quyết định.
                </p>
              </section>

              <section id="lien-he" className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#144c65]">
                  9) Liên hệ
                </h2>
                <p className="mt-2 text-[14px] md:text-[15px] text-[#374151] leading-7">
                  Nếu bạn có câu hỏi về điều khoản/chính sách hoặc muốn yêu cầu
                  cập nhật/xóa dữ liệu tài khoản, vui lòng liên hệ quản trị hệ
                  thống.
                </p>
                <div className="mt-4 rounded-[14px] border border-[#eef2f7] bg-[#f8fafc] p-4 text-[14px] text-[#374151]">
                  <div className="font-semibold text-[#144c65]">
                    Gợi ý thông tin liên hệ (bạn có thể thay sau):
                  </div>
                  <ul className="mt-2 space-y-1">
                    <li>- Email: support@your-domain.vn</li>
                    <li>- Hotline: 0xxx xxx xxx</li>
                  </ul>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
