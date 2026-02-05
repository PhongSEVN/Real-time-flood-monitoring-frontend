// Loại sự cố   - Đường phố, hẻm, ngõ, cầu cống, cống thoát nước, hệ thống điện, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước, hệ thống thoát nước
export enum EventType {
  RAIN = "rain", // Mưa
  TIDE = "tide", // Mực nước
  FLOOD = "flood", // Lũ lụt
  DYKE_BREAK = "dyke_break", // Vỡ đập
  OTHER = "other", // Loại khác
}

// Mức độ
export enum Severity {
  LOW = "LOW", // Thấp
  MEDIUM = "MEDIUM", // Trung bình
  HIGH = "HIGH", // Cao
}