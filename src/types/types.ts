// ============================================================================
// CORE TYPE DEFINITIONS
// Comprehensive type system for the entire application
// ============================================================================

export enum UserRole {
  Administrator = 'Administrator',
  Teacher = 'Teacher',
  Student = 'Student',
  Parent = 'Parent',
  Finance = 'Finance',
  Marketing = 'Marketing'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  permissions?: string[];
}

export interface AuthContextType {
  user: User | null;
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  refreshUser?: () => Promise<void>;
  updateUser?: (userData: Partial<User>) => void;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  settings: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  userId?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemMetrics {
  id: string;
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  requestsPerMinute: number;
  responseTime: number;
  diskUsage?: number;
  networkIO?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface School {
  id: string;
  tenantId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  settings: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Theme and UI Types
export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    sans: string[];
    mono: string[];
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

export interface UserPreferences {
  theme: string;
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dashboard: {
    layout: string;
    widgets: string[];
  };
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
  roles?: UserRole[];
  isActive?: boolean;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: Record<string, unknown>;
  options?: { label: string; value: string }[];
}

// Dashboard Types
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'list' | 'custom';
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  data?: unknown;
  config?: Record<string, unknown>;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
}

// API Client Types
export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Feature Flag Types
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  conditions?: Record<string, unknown>;
  rolloutPercentage?: number;
}

// Export all types - removed duplicate exports to fix conflicts
