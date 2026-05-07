export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  // Doctor-specific
  specialty?: string;
  licenseNumber?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresAt: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
}

export enum UserRole {
  Patient = 'Patient',
  Doctor = 'Doctor',
  Manager = 'Manager'
}