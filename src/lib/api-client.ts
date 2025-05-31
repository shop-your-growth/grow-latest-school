// ============================================================================
// ENTERPRISE API CLIENT WITH REAL-TIME TYPE SAFETY
// Cross-references frontend/backend with auto-generated TypeScript interfaces
// ============================================================================

import {
  ApiErrorSchema,
  ApiSuccessSchema,
  AuditLogCreateSchema,
  ClassCreateSchema,
  ClassUpdateSchema,
  safeValidateSchema,
  SchoolCreateSchema,
  SchoolUpdateSchema,
  TenantCreateSchema,
  TenantUpdateSchema,
  UserCreateSchema,
  UserLoginSchema,
  UserUpdateSchema,
  type ApiError,
  type ApiSuccess,
  type AuditLogCreate,
  type ClassCreate,
  type ClassUpdate,
  type Pagination,
  type SchoolCreate,
  type SchoolUpdate,
  type TenantCreate,
  type TenantUpdate,
  type UserCreate,
  type UserLogin,
  type UserUpdate
} from '@/types/validation';
import { z } from 'zod';

// ============================================================================
// API CLIENT CONFIGURATION
// ============================================================================

interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  tenantId?: string;
  authToken?: string;
}

const DEFAULT_CONFIG: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000, // 30 seconds
  retries: 3,
};

// ============================================================================
// TYPE-SAFE HTTP CLIENT
// ============================================================================

class TypeSafeApiClient {
  private config: ApiClientConfig;
  private abortController: AbortController;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.abortController = new AbortController();
  }

  // Update configuration
  updateConfig(updates: Partial<ApiClientConfig>) {
    this.config = { ...this.config, ...updates };
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.config.authToken = token;
  }

  // Set tenant context
  setTenantId(tenantId: string) {
    this.config.tenantId = tenantId;
  }

  // Abort all pending requests
  abort() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }

  // ============================================================================
  // CORE HTTP METHODS WITH TYPE SAFETY
  // ============================================================================

  private async request<TResponse, TRequest = unknown>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: TRequest,
    responseSchema?: z.ZodSchema<TResponse>,
    requestSchema?: z.ZodSchema<TRequest>
  ): Promise<TResponse> {
    // Validate request data if schema provided
    if (requestSchema && data !== undefined) {
      const validation = safeValidateSchema(requestSchema, data);
      if (!validation.success) {
        throw new Error(`Request validation failed: ${validation.error.errors.map(e => e.message).join(', ')}`);
      }
    }

    const url = `${this.config.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Add authentication header
    if (this.config.authToken) {
      headers['Authorization'] = `Bearer ${this.config.authToken}`;
    }

    // Add tenant header for multi-tenancy
    if (this.config.tenantId) {
      headers['X-Tenant-ID'] = this.config.tenantId;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      signal: this.abortController.signal,
    };

    if (data && method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
    }

    let lastError: Error;

    // Retry logic
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const apiError = safeValidateSchema(ApiErrorSchema, errorData);

          if (apiError.success) {
            throw new ApiClientError(apiError.data.error, response.status, apiError.data);
          } else {
            throw new ApiClientError(`HTTP ${response.status}: ${response.statusText}`, response.status);
          }
        }

        const responseData = await response.json();

        // Validate response if schema provided
        if (responseSchema) {
          const validation = safeValidateSchema(responseSchema, responseData);
          if (!validation.success) {
            throw new Error(`Response validation failed: ${validation.error.errors.map(e => e.message).join(', ')}`);
          }
          return validation.data;
        }

        return responseData;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');

        // Don't retry on validation errors or client errors (4xx)
        if (error instanceof ApiClientError && error.status < 500) {
          throw error;
        }

        // Don't retry on abort
        if (error instanceof Error && error.name === 'AbortError') {
          throw error;
        }

        // Wait before retry (exponential backoff)
        if (attempt < this.config.retries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError!;
  }

  // GET request with type safety
  async get<TResponse>(
    endpoint: string,
    responseSchema?: z.ZodSchema<TResponse>
  ): Promise<TResponse> {
    return this.request('GET', endpoint, undefined, responseSchema);
  }

  // POST request with type safety
  async post<TResponse, TRequest = unknown>(
    endpoint: string,
    data: TRequest,
    responseSchema?: z.ZodSchema<TResponse>,
    requestSchema?: z.ZodSchema<TRequest>
  ): Promise<TResponse> {
    return this.request('POST', endpoint, data, responseSchema, requestSchema);
  }

  // PUT request with type safety
  async put<TResponse, TRequest = unknown>(
    endpoint: string,
    data: TRequest,
    responseSchema?: z.ZodSchema<TResponse>,
    requestSchema?: z.ZodSchema<TRequest>
  ): Promise<TResponse> {
    return this.request('PUT', endpoint, data, responseSchema, requestSchema);
  }

  // PATCH request with type safety
  async patch<TResponse, TRequest = unknown>(
    endpoint: string,
    data: TRequest,
    responseSchema?: z.ZodSchema<TResponse>,
    requestSchema?: z.ZodSchema<TRequest>
  ): Promise<TResponse> {
    return this.request('PATCH', endpoint, data, responseSchema, requestSchema);
  }

  // DELETE request with type safety
  async delete<TResponse>(
    endpoint: string,
    responseSchema?: z.ZodSchema<TResponse>
  ): Promise<TResponse> {
    return this.request('DELETE', endpoint, undefined, responseSchema);
  }

  // ============================================================================
  // TYPED API ENDPOINTS
  // ============================================================================

  // Authentication endpoints
  auth = {
    login: (data: UserLogin) =>
      this.post('/auth/login', data, ApiSuccessSchema, UserLoginSchema),

    logout: () =>
      this.post('/auth/logout', {}, ApiSuccessSchema),

    refresh: () =>
      this.post('/auth/refresh', {}, ApiSuccessSchema),

    me: () =>
      this.get('/auth/me', ApiSuccessSchema),
  };

  // User management endpoints
  users = {
    list: (params?: Pagination) =>
      this.get(`/users${params ? `?${new URLSearchParams(params as any)}` : ''}`, ApiSuccessSchema),

    get: (id: string) =>
      this.get(`/users/${id}`, ApiSuccessSchema),

    create: (data: UserCreate) =>
      this.post('/users', data, ApiSuccessSchema, UserCreateSchema),

    update: (id: string, data: UserUpdate) =>
      this.patch(`/users/${id}`, data, ApiSuccessSchema, UserUpdateSchema),

    delete: (id: string) =>
      this.delete(`/users/${id}`, ApiSuccessSchema),
  };

  // Tenant management endpoints
  tenants = {
    list: (params?: Pagination) =>
      this.get(`/tenants${params ? `?${new URLSearchParams(params as any)}` : ''}`, ApiSuccessSchema),

    get: (id: string) =>
      this.get(`/tenants/${id}`, ApiSuccessSchema),

    create: (data: TenantCreate) =>
      this.post('/tenants', data, ApiSuccessSchema, TenantCreateSchema),

    update: (id: string, data: TenantUpdate) =>
      this.patch(`/tenants/${id}`, data, ApiSuccessSchema, TenantUpdateSchema),

    delete: (id: string) =>
      this.delete(`/tenants/${id}`, ApiSuccessSchema),
  };

  // School management endpoints
  schools = {
    list: (params?: Pagination) =>
      this.get(`/schools${params ? `?${new URLSearchParams(params as any)}` : ''}`, ApiSuccessSchema),

    get: (id: string) =>
      this.get(`/schools/${id}`, ApiSuccessSchema),

    create: (data: SchoolCreate) =>
      this.post('/schools', data, ApiSuccessSchema, SchoolCreateSchema),

    update: (id: string, data: SchoolUpdate) =>
      this.patch(`/schools/${id}`, data, ApiSuccessSchema, SchoolUpdateSchema),

    delete: (id: string) =>
      this.delete(`/schools/${id}`, ApiSuccessSchema),
  };

  // Class management endpoints
  classes = {
    list: (params?: Pagination) =>
      this.get(`/classes${params ? `?${new URLSearchParams(params as any)}` : ''}`, ApiSuccessSchema),

    get: (id: string) =>
      this.get(`/classes/${id}`, ApiSuccessSchema),

    create: (data: ClassCreate) =>
      this.post('/classes', data, ApiSuccessSchema, ClassCreateSchema),

    update: (id: string, data: ClassUpdate) =>
      this.patch(`/classes/${id}`, data, ApiSuccessSchema, ClassUpdateSchema),

    delete: (id: string) =>
      this.delete(`/classes/${id}`, ApiSuccessSchema),
  };

  // Audit log endpoints
  auditLogs = {
    list: (params?: Pagination) =>
      this.get(`/audit-logs${params ? `?${new URLSearchParams(params as any)}` : ''}`, ApiSuccessSchema),

    get: (id: string) =>
      this.get(`/audit-logs/${id}`, ApiSuccessSchema),

    create: (data: AuditLogCreate) =>
      this.post('/audit-logs', data, ApiSuccessSchema, AuditLogCreateSchema),
  };
}

// ============================================================================
// CUSTOM ERROR CLASS
// ============================================================================

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public apiError?: ApiError
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const apiClient = new TypeSafeApiClient();

// Export types and utilities
export { TypeSafeApiClient };
export type { ApiError, ApiSuccess, Pagination };

