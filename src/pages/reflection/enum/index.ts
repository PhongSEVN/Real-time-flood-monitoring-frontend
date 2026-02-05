// Loại sự cố   - Đường phố, hẻm, ngõ, cầu cống, cống thoát nước, hệ thống điện, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước
export enum EventType {
  RAIN = "RAIN", // Mưa
  TIDE = "TIDE", // Mực nước
  FLOOD = "FLOOD", // Lũ lụt
  DYKE_BREAK = "DYKE_BREAK", // Vỡ đập
  OTHER = "OTHER", // Loại khác
}

// Mức độ
export enum Severity {
  LOW = "LOW", // Thấp
  MEDIUM = "MEDIUM", // Trung bình
  HIGH = "HIGH", // Cao
}