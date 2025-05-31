import {
    boolean,
    index,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar
} from "drizzle-orm/pg-core";

// ============================================================================
// ENUMS FOR TYPE SAFETY
// ============================================================================

export const userRoleEnum = pgEnum('user_role', [
  'ADMIN',
  'ADMINISTRATOR',
  'TEACHER',
  'STUDENT',
  'PARENT',
  'FINANCE',
  'MARKETING'
]);

export const subscriptionTierEnum = pgEnum('subscription_tier', [
  'FREE',
  'BASIC',
  'PREMIUM',
  'ENTERPRISE'
]);

export const auditActionEnum = pgEnum('audit_action', [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE',
  'LOGIN',
  'LOGOUT',
  'EXPORT',
  'IMPORT'
]);

export const notificationTypeEnum = pgEnum('notification_type', [
  'INFO',
  'SUCCESS',
  'WARNING',
  'ERROR',
  'SYSTEM'
]);

// ============================================================================
// TENANT MODEL - Multi-tenancy Foundation
// ============================================================================

export const tenantsTable = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  domain: varchar("domain", { length: 255 }),

  // Subscription & billing
  subscriptionTier: subscriptionTierEnum("subscription_tier").default('BASIC'),
  billingEmail: varchar("billing_email", { length: 255 }),
  maxUsers: integer("max_users").default(100),

  // Configuration
  settings: jsonb("settings").default({}),

  // Security
  dataRegion: varchar("data_region", { length: 50 }).default('us-east-1'),
  encryptionKeyId: varchar("encryption_key_id", { length: 255 }),

  // Status
  isActive: boolean("is_active").default(true),

  // Audit fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at")
}, (table) => ({
  slugIdx: uniqueIndex("tenants_slug_idx").on(table.slug),
  domainIdx: index("tenants_domain_idx").on(table.domain),
  createdAtIdx: index("tenants_created_at_idx").on(table.createdAt)
}));

// ============================================================================
// ENHANCED USER MODEL
// ============================================================================

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),

  // Additional fields for the application
  passwordHash: varchar("password_hash", { length: 255 }),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  displayName: varchar("display_name", { length: 200 }),
  role: varchar("role", { length: 50 }).default('STUDENT'),
  avatar: varchar("avatar", { length: 500 }),
  isActive: boolean("is_active").default(true),
  isVerified: boolean("is_verified").default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// SCHOOLS MODEL
// ============================================================================

export const schoolsTable = pgTable("schools", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenantsTable.id, { onDelete: 'cascade' }),

  // Basic information
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull(),
  description: text("description"),

  // Contact information
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 10 }).default('US'),
  postalCode: varchar("postal_code", { length: 20 }),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 255 }),

  // Academic configuration
  academicYear: varchar("academic_year", { length: 20 }).notNull(),
  timezone: varchar("timezone", { length: 50 }).default('UTC'),

  // Status
  isActive: boolean("is_active").default(true),

  // Audit fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at")
}, (table) => ({
  tenantIdIdx: index("schools_tenant_id_idx").on(table.tenantId),
  codeIdx: index("schools_code_idx").on(table.code),
  createdAtIdx: index("schools_created_at_idx").on(table.createdAt)
}));

// ============================================================================
// AUDIT LOG MODEL
// ============================================================================

export const auditLogsTable = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenantsTable.id, { onDelete: 'cascade' }),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: 'set null' }),

  // Action details
  action: auditActionEnum("action").notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: varchar("resource_id", { length: 255 }),

  // Context
  details: jsonb("details").default({}),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),

  // Timestamp
  createdAt: timestamp("created_at").defaultNow()
}, (table) => ({
  tenantIdIdx: index("audit_logs_tenant_id_idx").on(table.tenantId),
  userIdIdx: index("audit_logs_user_id_idx").on(table.userId),
  actionIdx: index("audit_logs_action_idx").on(table.action),
  resourceIdx: index("audit_logs_resource_idx").on(table.resource),
  createdAtIdx: index("audit_logs_created_at_idx").on(table.createdAt)
}));

// ============================================================================
// NOTIFICATIONS MODEL
// ============================================================================

export const notificationsTable = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenantsTable.id, { onDelete: 'cascade' }),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: 'cascade' }),

  // Content
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: notificationTypeEnum("type").default('INFO'),

  // Metadata
  data: jsonb("data").default({}),

  // Status
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),

  // Audit fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}, (table) => ({
  tenantIdIdx: index("notifications_tenant_id_idx").on(table.tenantId),
  userIdIdx: index("notifications_user_id_idx").on(table.userId),
  typeIdx: index("notifications_type_idx").on(table.type),
  isReadIdx: index("notifications_is_read_idx").on(table.isRead),
  createdAtIdx: index("notifications_created_at_idx").on(table.createdAt)
}));

// ============================================================================
// USER SESSIONS MODEL
// ============================================================================

export const userSessionsTable = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),

  // Session data
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  refreshToken: varchar("refresh_token", { length: 255 }),

  // Device & location
  deviceInfo: jsonb("device_info").default({}),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),

  // Timing
  expiresAt: timestamp("expires_at").notNull(),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),

  // Status
  isActive: boolean("is_active").default(true),

  // Audit fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}, (table) => ({
  userIdIdx: index("user_sessions_user_id_idx").on(table.userId),
  sessionTokenIdx: uniqueIndex("user_sessions_session_token_idx").on(table.sessionToken),
  expiresAtIdx: index("user_sessions_expires_at_idx").on(table.expiresAt),
  isActiveIdx: index("user_sessions_is_active_idx").on(table.isActive)
}));
