// src/app/models/session.models.ts

export interface UserSessionDto {
  id: number;
  refreshToken: string;
  expiresAt: string;
  isRevoked: boolean;
  revokedAt?: string;
  deviceInfo?: string;
}

export interface UpdateSessionDto {
  refreshToken?: string;
  expiresAt?: string;
  isRevoked?: boolean;
  revokedAt?: string;
  deviceInfo?: string;
}
