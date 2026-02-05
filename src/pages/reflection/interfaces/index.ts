import type { EventType, Severity } from "../enum";

export interface Reflection {
  title: string; // Tiêu đề
  description: string; // Mô tả

  eventType: EventType; // Loại sự cố
  severity: Severity; // Mức độ
  images: string[]; // Ảnh
  lat: number;
  lng: number;
  address: string;
}