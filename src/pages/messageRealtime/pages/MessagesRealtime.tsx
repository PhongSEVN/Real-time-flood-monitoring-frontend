import { Modal } from "antd";
import {
  AlertTriangle,
  Camera,
  HeartPulse,
  ImagePlus,
  LifeBuoy,
  MapPin,
  Search,
  SendHorizontal,
  TriangleAlert,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Attachment = {
  id: string;
  type: "image";
  src: string;
  alt: string;
};

type ChatMessage = {
  id: string;
  sender: "doctor" | "officer" | "user";
  title: string;
  text: string;
  time: string;
  attachments?: Attachment[];
};

export default function MessagesRealtime() {
  const [composer, setComposer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [helpType, setHelpType] = useState<"medical" | "rescue" | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>(
    []
  );
  const [geoStatus, setGeoStatus] = useState<string | null>(null);

  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const initialMedicalMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: "med-1",
        sender: "doctor",
        title: "Bác sĩ: Trần Thị B",
        text: "Chào bạn, mình là bác sĩ trực hỗ trợ khẩn cấp. Trước tiên cho mình biết: bạn có đang tỉnh táo và thở bình thường không?",
        time: "8:35 AM",
      },
      {
        id: "med-2",
        sender: "doctor",
        title: "Bác sĩ: Trần Thị B",
        text: "Nếu có người bị đuối nước/ngất: đưa lên chỗ khô ráo, gọi người xung quanh hỗ trợ. Nếu không thở, hãy gọi cấp cứu và bắt đầu ép tim nếu bạn có thể.",
        time: "8:35 AM",
      },
      {
        id: "med-3",
        sender: "doctor",
        title: "Bác sĩ: Trần Thị B",
        text: "Bạn gửi giúp mình vị trí hiện tại (địa chỉ/mốc gần nhất) và tình trạng (bị thương chỗ nào, chảy máu, lạnh run, khó thở…)?",
        time: "8:35 AM",
      },
    ],
    []
  );

  const initialRescueMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: "res-1",
        sender: "officer",
        title: "Cán bộ: Nguyễn Văn A",
        text: "Chào bạn, mình là cán bộ trực cứu hộ/di tản. Bạn cho xin vị trí hiện tại để điều phối lực lượng ngay nhé.",
        time: "8:35 AM",
      },
      {
        id: "res-2",
        sender: "officer",
        title: "Cán bộ: Nguyễn Văn A",
        text: "Trong lúc chờ: ưu tiên lên vị trí cao, tránh đứng gần cột điện/dây điện. Không cố bơi qua dòng nước chảy xiết.",
        time: "8:35 AM",
      },
      {
        id: "res-3",
        sender: "officer",
        title: "Cán bộ: Nguyễn Văn A",
        text: "Bạn có bao nhiêu người? Có người già/trẻ em không? Nước đang dâng nhanh hay đã ổn định?",
        time: "8:35 AM",
      },
    ],
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const onSend = () => {
    const value = composer.trim();
    if (!value && pendingAttachments.length === 0) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "user",
        title: "Bạn",
        text: value || "📷 Đã gửi ảnh",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        attachments:
          pendingAttachments.length > 0 ? pendingAttachments : undefined,
      },
    ]);
    setComposer("");
    setPendingAttachments([]);
  };

  const applyHelpType = (type: "medical" | "rescue") => {
    setHelpType(type);
    setMessages(
      type === "medical" ? initialMedicalMessages : initialRescueMessages
    );
    setIsModalOpen(false);
  };

  const responderTitle =
    helpType === "medical"
      ? "Bác sĩ đang hỗ trợ"
      : helpType === "rescue"
      ? "Cán bộ đang hỗ trợ"
      : "Đang kết nối";

  return (
    <>
      {/* Modal chọn đối tượng cần hỗ trợ */}
      <Modal
        centered
        maskClosable={false}
        closeIcon={false}
        width={640}
        className="my-6 sm:my-10"
        title={
          <div className="text-center text-xl sm:text-2xl font-extrabold flex items-center justify-center gap-2 text-red-500">
            <TriangleAlert className="text-red-500" size={22} />
            Trường hợp khẩn cấp
          </div>
        }
        open={isModalOpen}
        footer={null}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-center text-[14px] sm:text-[16px] font-semibold text-slate-700 leading-6">
              Mình hiểu bạn đang trong tình huống khẩn cấp. Hãy{" "}
              <span className="text-rose-600 font-extrabold">bình tĩnh</span> và
              chọn loại hỗ trợ để hệ thống ưu tiên đúng lực lượng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                applyHelpType("medical");
              }}
              className="group w-full cursor-pointer rounded-2xl border border-rose-200 bg-rose-50 p-4 text-left transition hover:bg-rose-100/70 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-600 text-white shadow-[0_16px_40px_-24px_rgba(225,29,72,0.9)]">
                  <HeartPulse size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[16px] font-extrabold text-rose-700">
                    Cấp cứu y tế
                  </div>
                  <div className="mt-1 text-[13px] text-slate-700 leading-5">
                    Dành cho trường hợp bị thương/ngất/đuối nước hoặc cần hỗ trợ
                    y tế khẩn.
                  </div>
                  <div className="mt-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-[12px] font-bold text-rose-700">
                    Ưu tiên cao
                  </div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                applyHelpType("rescue");
              }}
              className="group w-full cursor-pointer rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left transition hover:bg-amber-100/70 hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-600 text-white shadow-[0_16px_40px_-24px_rgba(217,119,6,0.9)]">
                  <LifeBuoy size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[16px] font-extrabold text-amber-700">
                    Cứu hộ / Di tản
                  </div>
                  <div className="mt-1 text-[13px] text-slate-700 leading-5">
                    Dành cho trường hợp mắc kẹt, nước dâng nhanh, cần phương án
                    di chuyển an toàn.
                  </div>
                  <div className="mt-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-[12px] font-bold text-amber-700">
                    Hỗ trợ hiện trường
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-[12px] text-slate-600">
              Bạn có thể đổi lựa chọn trong cuộc chat bất cứ lúc nào.
              {helpType ? (
                <span className="ml-1 font-semibold text-slate-800">
                  (Đã chọn:{" "}
                  {helpType === "medical" ? "Cấp cứu y tế" : "Cứu hộ / Di tản"})
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
      <main className="min-h-dvh w-full bg-[radial-gradient(circle_at_20%_20%,#0b1220,#050913_45%,#020617)] px-3 sm:px-4 py-4 sm:py-10">
        <div className="mx-auto w-full max-w-[520px]">
          <div className="flex h-[calc(100dvh-2rem)] max-h-[860px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/5 shadow-[0_30px_120px_-50px_rgba(0,0,0,0.75)] backdrop-blur sm:h-[calc(100dvh-5rem)]">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-white/10 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e53935] shadow-[0_12px_30px_-16px_rgba(229,57,53,0.9)]">
                  <AlertTriangle size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-extrabold tracking-wide uppercase">
                    Trường hợp khẩn cấp
                  </div>
                  <div className="text-[11px] text-white/70">
                    {responderTitle} • Realtime
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  Thoát
                </Link>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  aria-label="Tìm kiếm"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* List */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            >
              {messages.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[13px] text-white/80">
                  Hãy chọn loại hỗ trợ (Cấp cứu y tế / Cứu hộ - Di tản) để bắt
                  đầu cuộc chat.
                </div>
              )}
              {messages.map((m) => {
                const isUser = m.sender === "user";
                const isDoctor = m.sender === "doctor";
                const avatarLabel = isUser ? "B" : isDoctor ? "BS" : "CB";
                const avatarBg = isUser
                  ? "bg-white/15"
                  : isDoctor
                  ? "bg-rose-500/30"
                  : "bg-sky-500/25";
                return (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 ${avatarBg} text-[12px] font-extrabold text-white/90`}
                      aria-hidden
                    >
                      {avatarLabel}
                    </div>

                    <div
                      className={`min-w-0 max-w-[78%] sm:max-w-[85%] ${
                        isUser ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2 text-[11px] text-white/70">
                        <span className="truncate font-semibold text-white/80">
                          {m.title}
                        </span>
                        <span className="shrink-0">{m.time}</span>
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm ${
                          isUser
                            ? "bg-[#e53935]/20 text-white border border-[#e53935]/25"
                            : isDoctor
                            ? "bg-rose-500/10 text-white border border-rose-500/20"
                            : "bg-white/10 text-white border border-white/10"
                        }`}
                      >
                        {m.text}
                      </div>

                      {!!m.attachments?.length && (
                        <div
                          className={`mt-2 grid gap-2 ${
                            m.attachments.length > 1
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          }`}
                        >
                          {m.attachments.map((a) => (
                            <div
                              key={a.id}
                              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                            >
                              <img
                                src={a.src}
                                alt={a.alt}
                                loading="lazy"
                                className="h-[140px] w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="border-t border-white/10 bg-white/10 px-3 py-3">
              {/* hidden inputs */}
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setPendingAttachments((prev) => [
                    ...prev,
                    {
                      id: `up-${Date.now()}`,
                      type: "image",
                      src: url,
                      alt: file.name || "Ảnh tải lên",
                    },
                  ]);
                  e.currentTarget.value = "";
                }}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setPendingAttachments((prev) => [
                    ...prev,
                    {
                      id: `cam-${Date.now()}`,
                      type: "image",
                      src: url,
                      alt: "Ảnh chụp",
                    },
                  ]);
                  e.currentTarget.value = "";
                }}
              />

              {pendingAttachments.length > 0 && (
                <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                  {pendingAttachments.map((a) => (
                    <div
                      key={a.id}
                      className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5"
                    >
                      <img
                        src={a.src}
                        alt={a.alt}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPendingAttachments((prev) => {
                            const target = prev.find((x) => x.id === a.id);
                            if (target?.src?.startsWith("blob:")) {
                              URL.revokeObjectURL(target.src);
                            }
                            return prev.filter((x) => x.id !== a.id);
                          });
                        }}
                        className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white hover:bg-black/70"
                        aria-label="Xóa ảnh"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGeoStatus("Đang lấy vị trí...");
                    if (!("geolocation" in navigator)) {
                      setGeoStatus("Thiết bị không hỗ trợ định vị.");
                      return;
                    }
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        const { latitude, longitude } = pos.coords;
                        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: `loc-${Date.now()}`,
                            sender: "user",
                            title: "Bạn",
                            text: `📍 Vị trí hiện tại: ${url}`,
                            time: new Date().toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            }),
                          },
                        ]);
                        setGeoStatus(null);
                      },
                      () => {
                        setGeoStatus(
                          "Không lấy được vị trí. Hãy bật GPS và cho phép quyền truy cập vị trí."
                        );
                      },
                      { enableHighAccuracy: true, timeout: 10000 }
                    );
                  }}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
                  aria-label="Chia sẻ vị trí hiện tại"
                >
                  <MapPin size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => uploadInputRef.current?.click()}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
                  aria-label="Chọn ảnh"
                >
                  <ImagePlus size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
                  aria-label="Chụp ảnh"
                >
                  <Camera size={18} />
                </button>

                <div className="flex-1">
                  <input
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSend();
                    }}
                    placeholder="Nhắn tin..."
                    className="h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-[13px] text-white placeholder:text-white/40 outline-none focus:border-white/25"
                  />
                </div>

                <button
                  type="button"
                  onClick={onSend}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-[#e53935] text-white shadow-[0_14px_40px_-18px_rgba(229,57,53,0.9)] transition hover:bg-[#d32f2f] disabled:opacity-50"
                  aria-label="Gửi"
                  disabled={!composer.trim() && pendingAttachments.length === 0}
                >
                  <SendHorizontal size={18} />
                </button>
              </div>
              {geoStatus && (
                <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white/80">
                  {geoStatus}
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-[12px] text-white/60">
            Tip: Nhấn <b>Enter</b> để gửi tin nhắn nhanh.
          </p>
        </div>
      </main>
    </>
  );
}
