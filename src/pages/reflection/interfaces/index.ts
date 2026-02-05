import type { EventType, Severity } from "../enum";

export interface Reflection {
  title: string; // Tiêu đề
  description: string; // Mô tả

  eventType: EventType; // Loại sự cố
  severity: Severity; // Mức độ
  images: string[]; // Ảnh
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status?: string;
  // Compatibility fields
  lat?: number;
  lng?: number;
  address?: string;
}