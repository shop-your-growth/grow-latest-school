// ============================================================================
// SETTINGS CONTEXT
// Production-ready settings state management with persistence
// ============================================================================

import type { ProfileSettings, UserPreferences } from '@/types/settings';
import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface SettingsState {
  profile: ProfileSettings | null;
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
}

type SettingsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROFILE'; payload: ProfileSettings }
  | { type: 'SET_PREFERENCES'; payload: UserPreferences }
  | { type: 'RESET_SETTINGS' };

interface SettingsContextType {
  state: SettingsState;
  updateProfile: (updates: Partial<ProfileSettings>) => Promise<void>;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  resetSettings: () => Promise<void>;
  exportSettings: () => Promise<Blob>;
  importSettings: (file: File) => Promise<void>;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: SettingsState = {
  profile: null,
  preferences: null,
  loading: false,
  error: null,
};

// ============================================================================
// REDUCER
// ============================================================================

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, loading: false, error: null };
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.payload, loading: false, error: null };
    case 'RESET_SETTINGS':
      return initialState;
    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // ============================================================================
  // MOCK API FUNCTIONS (Replace with real API calls)
  // ============================================================================

  const updateProfile = async (updates: Partial<ProfileSettings>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const currentProfile = state.profile || {
        firstName: '',
        lastName: '',
        email: '',
        timezone: 'UTC',
        language: 'en',
        dateFormat: 'MM/DD/YYYY' as const,
        timeFormat: '12h' as const,
      };

      const updatedProfile = { ...currentProfile, ...updates };
      dispatch({ type: 'SET_PROFILE', payload: updatedProfile });

      // Persist to localStorage
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update profile' });
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const currentPrefs = state.preferences || {
        version: '1.0.0',
        lastUpdated: new Date(),
      };

      const updatedPrefs = { ...currentPrefs, ...updates, lastUpdated: new Date() };
      dispatch({ type: 'SET_PREFERENCES', payload: updatedPrefs });

      // Persist to localStorage
      localStorage.setItem('user_preferences', JSON.stringify(updatedPrefs));

      // Apply theme if changed
      if (updates.theme) {
        applyTheme(updates.theme);
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update preferences' });
    }
  };

  const uploadAvatar = async (file: File) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock URL generation
      const mockUrl = `https://picsum.photos/seed/${file.name}/60/60`;

      if (state.profile) {
        const updatedProfile = { ...state.profile, avatar: mockUrl };
        dispatch({ type: 'SET_PROFILE', payload: updatedProfile });
        localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to upload avatar' });
    }
  };

  const resetSettings = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch({ type: 'RESET_SETTINGS' });

      // Clear localStorage
      localStorage.removeItem('user_profile');
      localStorage.removeItem('user_preferences');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to reset settings' });
    }
  };

  const exportSettings = async (): Promise<Blob> => {
    const settingsData = {
      profile: state.profile,
      preferences: state.preferences,
      exportedAt: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(settingsData, null, 2);
    return new Blob([jsonString], { type: 'application/json' });
  };

  const importSettings = async (file: File) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.profile) {
        dispatch({ type: 'SET_PROFILE', payload: data.profile });
        localStorage.setItem('user_profile', JSON.stringify(data.profile));
      }

      if (data.preferences) {
        dispatch({ type: 'SET_PREFERENCES', payload: data.preferences });
        localStorage.setItem('user_preferences', JSON.stringify(data.preferences));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to import settings' });
    }
  };

  // ============================================================================
  // THEME APPLICATION
  // ============================================================================

  const applyTheme = (theme: any) => {
    if (theme?.mode) {
      const root = document.documentElement;

      if (theme.mode === 'dark') {
        root.classList.add('dark');
      } else if (theme.mode === 'light') {
        root.classList.remove('dark');
      } else {
        // System preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Load settings from localStorage on mount
    const loadSettings = () => {
      try {
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          dispatch({ type: 'SET_PROFILE', payload: profile });
        }

        const savedPreferences = localStorage.getItem('user_preferences');
        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences);
          dispatch({ type: 'SET_PREFERENCES', payload: preferences });
          applyTheme(preferences.theme);
        }
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
      }
    };

    loadSettings();
  }, []);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: SettingsContextType = {
    state,
    updateProfile,
    updatePreferences,
    uploadAvatar,
    resetSettings,
    exportSettings,
    importSettings,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// ============================================================================
// THEME HOOK
// ============================================================================

export function useTheme() {
  const { state, updatePreferences } = useSettings();

  const setTheme = async (theme: 'light' | 'dark' | 'system') => {
    await updatePreferences({
      theme: {
        mode: theme,
        primaryColor: state.preferences?.theme?.primaryColor || '#3b82f6',
        accentColor: state.preferences?.theme?.accentColor || '#8b5cf6',
        fontSize: state.preferences?.theme?.fontSize || 'medium',
        fontFamily: state.preferences?.theme?.fontFamily || 'inter',
        borderRadius: state.preferences?.theme?.borderRadius || 'medium',
        animations: state.preferences?.theme?.animations ?? true,
        reducedMotion: state.preferences?.theme?.reducedMotion ?? false,
        highContrast: state.preferences?.theme?.highContrast ?? false,
      }
    });
  };

  return {
    theme: state.preferences?.theme?.mode || 'system',
    setTheme,
    resolvedTheme: state.preferences?.theme?.mode === 'system'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : (state.preferences?.theme?.mode || 'light')
  };
}

// ============================================================================
// EXPORT
// ============================================================================

export default SettingsContext;
