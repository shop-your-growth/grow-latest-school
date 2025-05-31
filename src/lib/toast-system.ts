/**
 * 🔥 DIVINE TOAST NOTIFICATION SYSTEM 🔥
 * Advanced notification management with animations and persistence
 */

import { toast as sonnerToast } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'divine';

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  id?: string;
  dismissible?: boolean;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

class ToastSystem {
  private toasts: Map<string, any> = new Map();

  // Success toast with divine styling
  success(message: string, options?: ToastOptions) {
    const toastId = options?.id || `success-${Date.now()}`;
    
    const toast = sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      id: toastId,
      dismissible: options?.dismissible !== false,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      } : undefined,
      style: {
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        border: '1px solid #065F46',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      },
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Error toast with enhanced styling
  error(message: string, options?: ToastOptions) {
    const toastId = options?.id || `error-${Date.now()}`;
    
    const toast = sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration || 6000,
      id: toastId,
      dismissible: options?.dismissible !== false,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      } : undefined,
      style: {
        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        border: '1px solid #991B1B',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
      },
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Warning toast
  warning(message: string, options?: ToastOptions) {
    const toastId = options?.id || `warning-${Date.now()}`;
    
    const toast = sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      id: toastId,
      dismissible: options?.dismissible !== false,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      } : undefined,
      style: {
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        border: '1px solid #92400E',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
      },
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Info toast
  info(message: string, options?: ToastOptions) {
    const toastId = options?.id || `info-${Date.now()}`;
    
    const toast = sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      id: toastId,
      dismissible: options?.dismissible !== false,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      } : undefined,
      style: {
        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        border: '1px solid #1D4ED8',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      },
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Loading toast
  loading(message: string, options?: ToastOptions) {
    const toastId = options?.id || `loading-${Date.now()}`;
    
    const toast = sonnerToast.loading(message, {
      description: options?.description,
      duration: options?.duration || Infinity,
      id: toastId,
      dismissible: options?.dismissible !== false,
      style: {
        background: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
        border: '1px solid #374151',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(107, 114, 128, 0.3)',
      },
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Divine toast with special effects
  divine(message: string, options?: ToastOptions) {
    const toastId = options?.id || `divine-${Date.now()}`;
    
    const toast = sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      id: toastId,
      dismissible: options?.dismissible !== false,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      } : undefined,
      style: {
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
        border: '2px solid #5B21B6',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
        animation: 'divine-glow 2s ease-in-out infinite alternate',
      },
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Promise toast for async operations
  promise<T>(
    promise: Promise<T>,
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
      ...options
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    } & ToastOptions
  ) {
    const toastId = options?.id || `promise-${Date.now()}`;
    
    return sonnerToast.promise(promise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
      id: toastId,
      duration: options?.duration,
      dismissible: options?.dismissible !== false,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
      cancel: options?.cancel ? {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      } : undefined,
    });
  }

  // Custom toast with full control
  custom(content: React.ReactNode, options?: ToastOptions) {
    const toastId = options?.id || `custom-${Date.now()}`;
    
    const toast = sonnerToast.custom(content, {
      duration: options?.duration || 4000,
      id: toastId,
      dismissible: options?.dismissible !== false,
    });

    this.toasts.set(toastId, toast);
    return toastId;
  }

  // Dismiss specific toast
  dismiss(toastId?: string) {
    if (toastId) {
      sonnerToast.dismiss(toastId);
      this.toasts.delete(toastId);
    } else {
      sonnerToast.dismiss();
      this.toasts.clear();
    }
  }

  // Dismiss all toasts
  dismissAll() {
    sonnerToast.dismiss();
    this.toasts.clear();
  }

  // Update existing toast
  update(toastId: string, message: string, options?: ToastOptions) {
    this.dismiss(toastId);
    return this.info(message, { ...options, id: toastId });
  }

  // Get active toasts count
  getActiveCount(): number {
    return this.toasts.size;
  }

  // Check if toast exists
  exists(toastId: string): boolean {
    return this.toasts.has(toastId);
  }
}

// Export singleton instance
export const toast = new ToastSystem();

// Convenience methods for common patterns
export const toastHelpers = {
  // API response handlers
  apiSuccess: (message = 'Operation completed successfully') => 
    toast.success(message),
  
  apiError: (error: any) => {
    const message = error?.response?.data?.message || error?.message || 'An error occurred';
    return toast.error(message);
  },

  // Form validation
  validationError: (message = 'Please check your input') =>
    toast.warning(message),

  // Authentication
  loginSuccess: (username?: string) =>
    toast.divine(`Welcome back${username ? `, ${username}` : ''}! 🎉`),
  
  logoutSuccess: () =>
    toast.info('You have been logged out successfully'),

  // File operations
  fileUploadSuccess: (filename?: string) =>
    toast.success(`File ${filename ? `"${filename}" ` : ''}uploaded successfully`),
  
  fileUploadError: (error?: string) =>
    toast.error(`Upload failed: ${error || 'Unknown error'}`),

  // Network status
  networkError: () =>
    toast.error('Network error. Please check your connection.'),
  
  networkRestored: () =>
    toast.success('Connection restored'),

  // Permissions
  permissionDenied: () =>
    toast.error('You do not have permission to perform this action'),

  // Data operations
  saveSuccess: () =>
    toast.success('Changes saved successfully'),
  
  deleteSuccess: (item?: string) =>
    toast.success(`${item || 'Item'} deleted successfully`),
  
  deleteConfirm: (item: string, onConfirm: () => void) =>
    toast.warning(`Delete ${item}?`, {
      action: {
        label: 'Delete',
        onClick: onConfirm
      },
      cancel: {
        label: 'Cancel'
      }
    }),
};

// Export types
export type { ToastOptions };
export { ToastSystem };
