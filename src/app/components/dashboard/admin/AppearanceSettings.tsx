// ============================================================================
// APPEARANCE SETTINGS COMPONENT
// Theme, layout, and accessibility customization
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Sun,
  Moon,
  Monitor,
  Type,
  Eye,
  Palette,
  Layout,
  Sidebar,
  Save,
  CheckCircle,
  AlertCircle,
  Zap,
  Contrast,
} from 'lucide-react';
import { useSettings, useTheme } from '@/contexts/SettingsContext';
import { AppearanceSettingsSchema, type AppearanceSettings } from '@/types/settings';

// ============================================================================
// THEME OPTIONS
// ============================================================================

const THEME_OPTIONS = [
  {
    value: 'light' as const,
    label: 'Light',
    description: 'Clean and bright interface',
    icon: Sun,
    preview: 'bg-gradient-to-br from-white to-slate-50',
  },
  {
    value: 'dark' as const,
    label: 'Dark',
    description: 'Easy on the eyes in low light',
    icon: Moon,
    preview: 'bg-gradient-to-br from-slate-800 to-slate-900',
  },
  {
    value: 'auto' as const,
    label: 'Auto',
    description: 'Matches your system preference',
    icon: Monitor,
    preview: 'bg-gradient-to-br from-slate-400 to-slate-600',
  },
];

const FONT_SIZE_OPTIONS = [
  { value: 'small' as const, label: 'Small', description: 'Compact text size', size: 'text-sm' },
  { value: 'medium' as const, label: 'Medium', description: 'Default text size', size: 'text-base' },
  { value: 'large' as const, label: 'Large', description: 'Larger text for better readability', size: 'text-lg' },
];

const COLOR_BLIND_OPTIONS = [
  { value: undefined, label: 'None', description: 'Standard colors' },
  { value: 'protanopia' as const, label: 'Protanopia', description: 'Red-blind friendly' },
  { value: 'deuteranopia' as const, label: 'Deuteranopia', description: 'Green-blind friendly' },
  { value: 'tritanopia' as const, label: 'Tritanopia', description: 'Blue-blind friendly' },
];

// ============================================================================
// COMPONENT
// ============================================================================

const AppearanceSettings: React.FC = () => {
  const { state, updatePreferences } = useSettings();
  const { theme, setTheme } = useTheme();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<AppearanceSettings>({
    resolver: zodResolver(AppearanceSettingsSchema),
    defaultValues: {
      theme: state.preferences?.theme || 'light',
      fontSize: state.preferences?.fontSize || 'medium',
      reducedMotion: state.preferences?.reducedMotion || false,
      highContrast: state.preferences?.highContrast || false,
      colorBlindMode: state.preferences?.colorBlindMode,
      compactMode: state.preferences?.compactMode || false,
      sidebarCollapsed: state.preferences?.sidebarCollapsed || false,
    },
  });

  const watchedTheme = watch('theme');
  const watchedFontSize = watch('fontSize');

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const onSubmit = async (data: AppearanceSettings) => {
    try {
      setSaveStatus('saving');
      await updatePreferences(data);
      setSaveStatus('saved');
      reset(data);
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Failed to update appearance settings:', error);
    }
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'auto') => {
    setValue('theme', newTheme, { shouldDirty: true });
    await setTheme(newTheme);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Palette className="mr-2" size={20} />
            Theme
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Choose your preferred color scheme. Auto mode will match your system preference.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = watchedTheme === option.value;
              
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleThemeChange(option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${option.preview}`}>
                      <Icon size={20} className="text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {option.label}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Theme Preview */}
                  <div className={`h-16 rounded-lg ${option.preview} border border-slate-200 dark:border-slate-700`}>
                    <div className="p-2 h-full flex items-center justify-center">
                      <div className="w-full h-2 bg-white/20 dark:bg-black/20 rounded-full">
                        <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle size={16} className="text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Type className="mr-2" size={20} />
            Font Size
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Adjust the text size for better readability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FONT_SIZE_OPTIONS.map((option) => {
              const isSelected = watchedFontSize === option.value;
              
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => setValue('fontSize', option.value, { shouldDirty: true })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {option.label}
                    </h4>
                    {isSelected && (
                      <CheckCircle size={16} className="text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {option.description}
                  </p>
                  <div className={`${option.size} text-slate-700 dark:text-slate-300`}>
                    Sample text in {option.label.toLowerCase()} size
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Accessibility Options */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Eye className="mr-2" size={20} />
            Accessibility
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Customize the interface for better accessibility and comfort.
          </p>
          
          <div className="space-y-4">
            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Zap size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Reduced Motion
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Minimize animations and transitions
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register('reducedMotion')}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Contrast size={20} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    High Contrast
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Increase contrast for better visibility
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register('highContrast')}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Color Blind Support */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                Color Blind Support
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COLOR_BLIND_OPTIONS.map((option) => (
                  <label
                    key={option.value || 'none'}
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                  >
                    <input
                      {...register('colorBlindMode')}
                      type="radio"
                      value={option.value || ''}
                      className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                    />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Layout Options */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Layout className="mr-2" size={20} />
            Layout
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Customize the layout and navigation preferences.
          </p>
          
          <div className="space-y-4">
            {/* Compact Mode */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Layout size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Compact Mode
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Reduce spacing for more content on screen
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register('compactMode')}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Sidebar Collapsed */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Sidebar size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Collapsed Sidebar
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Start with sidebar collapsed by default
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  {...register('sidebarCollapsed')}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            {saveStatus === 'saved' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 text-green-600 dark:text-green-400"
              >
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Appearance settings updated</span>
              </motion.div>
            )}
            
            {saveStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 text-red-600 dark:text-red-400"
              >
                <AlertCircle size={16} />
                <span className="text-sm font-medium">Failed to update settings</span>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isDirty || saveStatus === 'saving'}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saving' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save size={16} />
            )}
            <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppearanceSettings;
