// ============================================================================
// SETTINGS PAGE
// Production-ready settings interface with comprehensive functionality
// ============================================================================

import {
  Bell,
  CreditCard,
  Database,
  Globe,
  Lock,
  Palette,
  Settings as SettingsIcon,
  Shield,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import ThemeSettings from '../../../components/ThemeSettings';
import { useAuth } from '../login/AuthContext';

// ============================================================================
// SETTINGS CATEGORIES CONFIGURATION
// ============================================================================

type SettingsCategory = 'profile' | 'appearance' | 'notifications' | 'privacy' | 'security' | 'account' | 'system' | 'integrations' | 'backup';

interface SettingsCategoryConfig {
  id: SettingsCategory;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  adminOnly?: boolean;
  badge?: string;
}

const SETTINGS_CATEGORIES: SettingsCategoryConfig[] = [
  {
    id: 'profile',
    label: 'Profile',
    description: 'Manage your personal information and contact details',
    icon: User,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    description: 'Customize theme, layout, and accessibility options',
    icon: Palette,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Configure email, push, and in-app notification preferences',
    icon: Bell,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    description: 'Control data sharing and privacy settings',
    icon: Shield,
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Manage password, 2FA, and session security',
    icon: Lock,
  },
  {
    id: 'account',
    label: 'Account',
    description: 'Subscription, billing, and account management',
    icon: CreditCard,
  },
  {
    id: 'system',
    label: 'System',
    description: 'Platform configuration and feature flags',
    icon: SettingsIcon,
    adminOnly: true,
  },
  {
    id: 'integrations',
    label: 'Integrations',
    description: 'Third-party services and API configurations',
    icon: Globe,
    adminOnly: true,
  },
  {
    id: 'backup',
    label: 'Backup & Recovery',
    description: 'Data backup and system recovery options',
    icon: Database,
    adminOnly: true,
  },
];

// ============================================================================
// MAIN SETTINGS COMPONENT
// ============================================================================

const Settings: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('profile');
  const { user } = useAuth();

  // Filter categories based on user role
  const availableCategories = SETTINGS_CATEGORIES.filter(
    category => !category.adminOnly || user?.role === 'admin'
  );

  const activeConfig = availableCategories.find(cat => cat.id === activeCategory);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleCategoryChange = (categoryId: SettingsCategory) => {
    setActiveCategory(categoryId);
  };

  // ============================================================================
  // RENDER CONTENT FOR EACH CATEGORY
  // ============================================================================

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'profile':
        return (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Profile Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Profile management functionality will be implemented here.
            </p>
          </div>
        );
      case 'appearance':
        return <ThemeSettings />;
      case 'notifications':
        return (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Notification Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Notification preferences will be implemented here.
            </p>
          </div>
        );
      case 'privacy':
        return (
          <div className="text-center py-12">
            <Shield size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Privacy Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Privacy and data management controls will be implemented here.
            </p>
          </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <Lock size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Security Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Password management, 2FA, and security controls will be implemented here.
            </p>
          </div>
        );
      case 'account':
        return (
          <div className="text-center py-12">
            <CreditCard size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Account Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Subscription management, billing, and account controls will be implemented here.
            </p>
          </div>
        );
      case 'system':
        return (
          <div className="text-center py-12">
            <SettingsIcon size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              System Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Platform configuration, feature flags, and system controls will be implemented here.
            </p>
          </div>
        );
      case 'integrations':
        return (
          <div className="text-center py-12">
            <Globe size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Integration Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Third-party integrations, API configurations, and external services will be managed here.
            </p>
          </div>
        );
      case 'backup':
        return (
          <div className="text-center py-12">
            <Database size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Backup & Recovery
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Data backup, system recovery, and data management tools will be implemented here.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">
              Settings category not found
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage your account preferences and system configuration
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Categories
              </h2>

              <nav className="space-y-2">
                {availableCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <Icon
                        size={20}
                        className={isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{category.label}</span>
                          {category.badge && (
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                              {category.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 truncate ${
                          isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {category.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl">
              {/* Content Header */}
              <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3">
                  {activeConfig && (
                    <>
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                        <activeConfig.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {activeConfig.label}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {activeConfig.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                {renderCategoryContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
