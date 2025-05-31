// ============================================================================
// VALIDATION SCHEMAS AND TYPES
// Zod schemas for runtime validation and type inference
// ============================================================================

import { z } from 'zod';

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const ApiSuccessSchema = z.object({
  success: z.literal(true),
  data: z.unknown().optional(),
  message: z.string().optional(),
  meta: z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    total: z.number().optional(),
    totalPages: z.number().optional()
  }).optional()
});

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.record(z.unknown()).optional()
});

// ============================================================================
// USER SCHEMAS
// ============================================================================

export const UserRoleSchema = z.enum([
  'Administrator',
  'Teacher', 
  'Student',
  'Parent',
  'Finance',
  'Marketing'
]);

export const UserCreateSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: UserRoleSchema,
  tenantId: z.string().uuid(),
  avatar: z.string().url().optional()
});

export const UserUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: UserRoleSchema.optional(),
  avatar: z.string().url().optional(),
  isActive: z.boolean().optional()
});

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: UserRoleSchema.optional()
});

export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: UserRoleSchema,
  tenantId: z.string().uuid(),
  avatar: z.string().url().optional(),
  lastLogin: z.string().datetime().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// ============================================================================
// TENANT SCHEMAS
// ============================================================================

export const TenantCreateSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  domain: z.string().optional(),
  settings: z.record(z.unknown()).default({})
});

export const TenantUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  domain: z.string().optional(),
  settings: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional()
});

export const TenantResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().optional(),
  settings: z.record(z.unknown()),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// ============================================================================
// SCHOOL SCHEMAS
// ============================================================================

export const SchoolCreateSchema = z.object({
  tenantId: z.string().uuid(),
  name: z.string().min(2).max(200),
  address: z.string().min(5).max(500),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  settings: z.record(z.unknown()).default({})
});

export const SchoolUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  address: z.string().min(5).max(500).optional(),
  phone: z.string().min(10).max(20).optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  settings: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional()
});

export const SchoolResponseSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  settings: z.record(z.unknown()),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// ============================================================================
// CLASS SCHEMAS
// ============================================================================

export const ClassCreateSchema = z.object({
  tenantId: z.string().uuid(),
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  grade: z.string().min(1).max(20),
  capacity: z.number().min(1).max(100),
  settings: z.record(z.unknown()).default({})
});

export const ClassUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  grade: z.string().min(1).max(20).optional(),
  capacity: z.number().min(1).max(100).optional(),
  settings: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional()
});

// ============================================================================
// NOTIFICATION SCHEMAS
// ============================================================================

export const NotificationCreateSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  type: z.enum(['info', 'warning', 'error', 'success']),
  userId: z.string().uuid().optional(),
  tenantId: z.string().uuid()
});

export const NotificationUpdateSchema = z.object({
  isRead: z.boolean()
});

// ============================================================================
// AUDIT LOG SCHEMAS
// ============================================================================

export const AuditLogCreateSchema = z.object({
  tenantId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  action: z.string().min(1).max(100),
  resource: z.string().min(1).max(100),
  resourceId: z.string().optional(),
  details: z.record(z.unknown()).default({}),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional()
});

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

export function safeValidateSchema<T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Pagination = z.infer<typeof PaginationSchema>;
export type ApiSuccess = z.infer<typeof ApiSuccessSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;

export type UserRole = z.infer<typeof UserRoleSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;

export type TenantCreate = z.infer<typeof TenantCreateSchema>;
export type TenantUpdate = z.infer<typeof TenantUpdateSchema>;
export type TenantResponse = z.infer<typeof TenantResponseSchema>;

export type SchoolCreate = z.infer<typeof SchoolCreateSchema>;
export type SchoolUpdate = z.infer<typeof SchoolUpdateSchema>;
export type SchoolResponse = z.infer<typeof SchoolResponseSchema>;

export type ClassCreate = z.infer<typeof ClassCreateSchema>;
export type ClassUpdate = z.infer<typeof ClassUpdateSchema>;

export type NotificationCreate = z.infer<typeof NotificationCreateSchema>;
export type NotificationUpdate = z.infer<typeof NotificationUpdateSchema>;

export type AuditLogCreate = z.infer<typeof AuditLogCreateSchema>;
