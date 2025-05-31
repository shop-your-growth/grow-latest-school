// ============================================================================
// SETTINGS TYPES AND SCHEMAS
// Type definitions for user preferences and application settings
// ============================================================================

import { z } from 'zod';

// ============================================================================
// PROFILE SETTINGS
// ============================================================================

export const ProfileSettingsSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  timezone: z.string().default('UTC'),
  language: z.string().default('en'),
  dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']).default('MM/DD/YYYY'),
  timeFormat: z.enum(['12h', '24h']).default('12h')
});

export type ProfileSettings = z.infer<typeof ProfileSettingsSchema>;

// ============================================================================
// NOTIFICATION SETTINGS
// ============================================================================

export const NotificationSettingsSchema = z.object({
  // Email notifications
  emailEnabled: z.boolean().default(true),
  emailDigest: z.boolean().default(true),
  emailMarketing: z.boolean().default(false),
  emailSecurity: z.boolean().default(true),

  // Push notifications
  pushEnabled: z.boolean().default(true),
  pushMessages: z.boolean().default(true),
  pushUpdates: z.boolean().default(true),
  pushMarketing: z.boolean().default(false),

  // SMS notifications
  smsEnabled: z.boolean().default(false),
  smsSecurityAlerts: z.boolean().default(false),
  smsImportantUpdates: z.boolean().default(false),

  // In-app notifications
  inAppEnabled: z.boolean().default(true),
  inAppSound: z.boolean().default(true),
  inAppDesktop: z.boolean().default(true),

  // Frequency settings
  digestFrequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
  quietHoursEnabled: z.boolean().default(false),
  quietHoursStart: z.string().default('22:00'),
  quietHoursEnd: z.string().default('08:00')
});

export type NotificationSettings = z.infer<typeof NotificationSettingsSchema>;

// ============================================================================
// PRIVACY SETTINGS
// ============================================================================

export const PrivacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'contacts']).default('private'),
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
  showLastSeen: z.boolean().default(true),
  allowSearchByEmail: z.boolean().default(false),
  allowSearchByPhone: z.boolean().default(false),
  dataProcessingConsent: z.boolean().default(false),
  marketingConsent: z.boolean().default(false),
  analyticsConsent: z.boolean().default(true),
  cookieConsent: z.boolean().default(true)
});

export type PrivacySettings = z.infer<typeof PrivacySettingsSchema>;

// ============================================================================
// SECURITY SETTINGS
// ============================================================================

export const SecuritySettingsSchema = z.object({
  twoFactorEnabled: z.boolean().default(false),
  twoFactorMethod: z.enum(['sms', 'email', 'app']).default('app'),
  sessionTimeout: z.number().min(15).max(1440).default(60), // minutes
  passwordChangeRequired: z.boolean().default(false),
  loginNotifications: z.boolean().default(true),
  suspiciousActivityAlerts: z.boolean().default(true),
  deviceManagement: z.boolean().default(true),
  apiKeyAccess: z.boolean().default(false)
});

export type SecuritySettings = z.infer<typeof SecuritySettingsSchema>;

// ============================================================================
// THEME SETTINGS
// ============================================================================

export const ThemeSettingsSchema = z.object({
  mode: z.enum(['light', 'dark', 'system']).default('system'),
  primaryColor: z.string().default('#3b82f6'),
  accentColor: z.string().default('#8b5cf6'),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  fontFamily: z.enum(['inter', 'roboto', 'system']).default('inter'),
  borderRadius: z.enum(['none', 'small', 'medium', 'large']).default('medium'),
  animations: z.boolean().default(true),
  reducedMotion: z.boolean().default(false),
  highContrast: z.boolean().default(false)
});

export type ThemeSettings = z.infer<typeof ThemeSettingsSchema>;

// Alias for compatibility
export type AppearanceSettings = ThemeSettings;
export const AppearanceSettingsSchema = ThemeSettingsSchema;

// ============================================================================
// DASHBOARD SETTINGS
// ============================================================================

export const DashboardSettingsSchema = z.object({
  layout: z.enum(['grid', 'list', 'compact']).default('grid'),
  widgetsPerRow: z.number().min(1).max(6).default(3),
  showWelcomeMessage: z.boolean().default(true),
  showQuickActions: z.boolean().default(true),
  showRecentActivity: z.boolean().default(true),
  showNotifications: z.boolean().default(true),
  autoRefresh: z.boolean().default(true),
  refreshInterval: z.number().min(30).max(300).default(60), // seconds
  defaultView: z.string().default('overview'),
  pinnedWidgets: z.array(z.string()).default([])
});

export type DashboardSettings = z.infer<typeof DashboardSettingsSchema>;

// ============================================================================
// INTEGRATION SETTINGS
// ============================================================================

export const IntegrationSettingsSchema = z.object({
  googleEnabled: z.boolean().default(false),
  googleCalendarSync: z.boolean().default(false),
  googleDriveSync: z.boolean().default(false),

  microsoftEnabled: z.boolean().default(false),
  outlookSync: z.boolean().default(false),
  oneDriveSync: z.boolean().default(false),

  slackEnabled: z.boolean().default(false),
  slackNotifications: z.boolean().default(false),

  webhooksEnabled: z.boolean().default(false),
  webhookUrl: z.string().url().optional(),

  apiAccess: z.boolean().default(false),
  apiRateLimit: z.number().min(100).max(10000).default(1000)
});

export type IntegrationSettings = z.infer<typeof IntegrationSettingsSchema>;

// ============================================================================
// USER PREFERENCES (COMBINED)
// ============================================================================

export const UserPreferencesSchema = z.object({
  profile: ProfileSettingsSchema.optional(),
  notifications: NotificationSettingsSchema.optional(),
  privacy: PrivacySettingsSchema.optional(),
  security: SecuritySettingsSchema.optional(),
  theme: ThemeSettingsSchema.optional(),
  dashboard: DashboardSettingsSchema.optional(),
  integrations: IntegrationSettingsSchema.optional(),

  // Metadata
  version: z.string().default('1.0.0'),
  lastUpdated: z.date().default(() => new Date()),
  updatedBy: z.string().optional()
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

// ============================================================================
// SYSTEM SETTINGS
// ============================================================================

export const SystemSettingsSchema = z.object({
  siteName: z.string().default('GROW YouR NEED'),
  siteDescription: z.string().default('Educational Management Platform'),
  siteUrl: z.string().url().default('https://growyourneed.com'),
  logoUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional(),

  // Features
  registrationEnabled: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  maintenanceMessage: z.string().optional(),

  // Limits
  maxUsersPerTenant: z.number().default(1000),
  maxFileSize: z.number().default(10485760), // 10MB in bytes
  maxStoragePerTenant: z.number().default(1073741824), // 1GB in bytes

  // Security
  passwordMinLength: z.number().min(6).max(32).default(8),
  sessionTimeout: z.number().min(15).max(1440).default(60),
  maxLoginAttempts: z.number().min(3).max(10).default(5),

  // Email
  emailFromName: z.string().default('GROW YouR NEED'),
  emailFromAddress: z.string().email().default('noreply@growyourneed.com'),
  emailReplyTo: z.string().email().optional(),

  // Analytics
  analyticsEnabled: z.boolean().default(true),
  trackingId: z.string().optional(),

  // Backup
  backupEnabled: z.boolean().default(true),
  backupFrequency: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
  backupRetention: z.number().min(7).max(365).default(30) // days
});

export type SystemSettings = z.infer<typeof SystemSettingsSchema>;

// ============================================================================
// SETTINGS VALIDATION UTILITIES
// ============================================================================

export function validateSettings<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

export function safeValidateSettings<T>(
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
// DEFAULT SETTINGS
// ============================================================================

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    timezone: 'UTC',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  },
  notifications: {
    emailEnabled: true,
    emailDigest: true,
    emailMarketing: false,
    emailSecurity: true,
    pushEnabled: true,
    pushMessages: true,
    pushUpdates: true,
    pushMarketing: false,
    smsEnabled: false,
    smsSecurityAlerts: false,
    smsImportantUpdates: false,
    inAppEnabled: true,
    inAppSound: true,
    inAppDesktop: true,
    digestFrequency: 'weekly',
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  },
  theme: {
    mode: 'system',
    primaryColor: '#3b82f6',
    accentColor: '#8b5cf6',
    fontSize: 'medium',
    fontFamily: 'inter',
    borderRadius: 'medium',
    animations: true,
    reducedMotion: false,
    highContrast: false
  },
  version: '1.0.0',
  lastUpdated: new Date()
};
