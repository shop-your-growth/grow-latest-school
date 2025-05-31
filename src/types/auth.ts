// ============================================================================
// AUTHENTICATION TYPES
// Type definitions for authentication, authorization, and user management
// ============================================================================

// ============================================================================
// USER ROLES
// ============================================================================

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest'
}

// ============================================================================
// USER INTERFACE
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId?: string;
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// AUTH CONTEXT TYPES
// ============================================================================

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// ============================================================================
// TOKEN TYPES
// ============================================================================

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  tenantId: string;
  iat: number;
  exp: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ============================================================================
// LOGIN/REGISTER TYPES
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  tenantId?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  message?: string;
  error?: string;
}

export interface UserResponse {
  success: boolean;
  data?: {
    user: User;
  };
  message?: string;
  error?: string;
}

// ============================================================================
// PERMISSION TYPES
// ============================================================================

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// ============================================================================
// SESSION TYPES
// ============================================================================

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  lastAccessedAt: Date;
}

// ============================================================================
// SECURITY TYPES
// ============================================================================

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  trustedDevices: string[];
}

// ============================================================================
// AUDIT TYPES
// ============================================================================

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export type LoginMethod = 'email' | 'google' | 'github' | 'microsoft';

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================================================
// FORM VALIDATION TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  errors: ValidationError[];
  touched: Record<string, boolean>;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ============================================================================
// ALL TYPES EXPORTED ABOVE
// ============================================================================
