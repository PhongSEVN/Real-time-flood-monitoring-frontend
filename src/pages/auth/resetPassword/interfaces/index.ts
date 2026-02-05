export interface ResetPasswordRequest {
    phoneNumber: string;
    otp: string;
    newPassword: string;
}

