// ============================================================================
// SIMPLIFIED API CLIENT FOR IMMEDIATE USE
// ============================================================================

import { toast } from "sonner";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  showToast?: boolean;
}

// ============================================================================
// SIMPLE API CLIENT
// ============================================================================

class SimpleApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  setTenant(tenantId: string) {
    this.defaultHeaders['X-Tenant-ID'] = tenantId;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 30000,
      showToast = true
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      signal: AbortSignal.timeout(timeout),
    };

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        if (showToast) {
          toast.error(data.message || `HTTP ${response.status}`);
        }

        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
          statusCode: response.status,
          data: data
        };
      }

      if (showToast && method !== 'GET' && data.message) {
        toast.success(data.message);
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
        statusCode: response.status
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      
      if (showToast) {
        toast.error(errorMessage);
      }

      return {
        success: false,
        error: errorMessage,
        statusCode: 0
      };
    }
  }

  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// ============================================================================
// SINGLETON INSTANCE & API METHODS
// ============================================================================

export const apiClient = new SimpleApiClient();

export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    logout: () => apiClient.post('/auth/logout'),
    register: (userData: any) => apiClient.post('/auth/register', userData),
    me: () => apiClient.get('/auth/me'),
  },

  users: {
    list: (params?: any) => apiClient.get('/users', { headers: params }),
    get: (id: string) => apiClient.get(`/users/${id}`),
    create: (userData: any) => apiClient.post('/users', userData),
    update: (id: string, userData: any) => apiClient.put(`/users/${id}`, userData),
    delete: (id: string) => apiClient.delete(`/users/${id}`),
  },

  tenants: {
    list: () => apiClient.get('/tenants'),
    get: (id: string) => apiClient.get(`/tenants/${id}`),
    create: (tenantData: any) => apiClient.post('/tenants', tenantData),
    update: (id: string, tenantData: any) => apiClient.put(`/tenants/${id}`, tenantData),
  },

  schools: {
    list: () => apiClient.get('/schools'),
    get: (id: string) => apiClient.get(`/schools/${id}`),
    create: (schoolData: any) => apiClient.post('/schools', schoolData),
    update: (id: string, schoolData: any) => apiClient.put(`/schools/${id}`, schoolData),
  },

  analytics: {
    dashboard: () => apiClient.get('/analytics/dashboard'),
    users: () => apiClient.get('/analytics/users'),
    revenue: () => apiClient.get('/analytics/revenue'),
  },

  notifications: {
    list: () => apiClient.get('/notifications'),
    markAsRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.patch('/notifications/read-all'),
  },

  system: {
    health: () => apiClient.get('/system/health'),
    metrics: () => apiClient.get('/system/metrics'),
  },
};

export default apiClient;
