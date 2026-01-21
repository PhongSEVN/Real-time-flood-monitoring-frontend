export enum DamageType {
    PROPERTY = "PROPERTY", // Thiệt hại vật dụng
    AGRICULTURE = "AGRICULTURE", // Thiệt hại nông sản
    INFRASTRUCTURE = "INFRASTRUCTURE", // Thiệt hại công trình
    OTHER = "OTHER", // Thiệt hại khác
}

export enum DamageSeverityLevel {
    LOW = "LOW", // Mức độ nghiêm trọng thấp
    MEDIUM = "MEDIUM", // Mức độ nghiêm trọng trung bình
    HIGH = "HIGH", // Mức độ nghiêm trọng cao
    CRITICAL = "CRITICAL", // Mức độ nghiêm trọng rất cao
}

export enum DamageStatus {
    RECEIVED = "RECEIVED", // Đã nhận
    VERIFIED = "VERIFIED", // Đã xác nhận
    APPROVED = "APPROVED", // Đã phê duyệt
    REJECTED = "REJECTED", // Đã từ chối
}

export enum ObjectType {
    HOUSEHOLD = "HOUSEHOLD", // Hộ dân
    BUSINESS = "BUSINESS", // Doanh nghiệp
    INFRASTRUCTURE = "INFRASTRUCTURE", // Công trình
    OTHER = "OTHER", // Khác
}