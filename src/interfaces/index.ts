export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  role: string;
  priorityLevel: number;
  addressGroup: any | null;
  newUser: boolean;
  avatar?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
  };
  timestamp: string;
}