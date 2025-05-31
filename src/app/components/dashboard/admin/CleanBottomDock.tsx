// ============================================================================
// BOTTOM DOCK - QUICK ACCESS NAVIGATION DOCK
// Clean navigation interface with CSS animations
// ============================================================================

import {
  BarChart3,
  Bell,
  Brain,
  HelpCircle,
  LayoutDashboard,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

// ============================================================================
// INTERFACES
// ============================================================================

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive?: boolean;
  badge?: number;
  color: string;
  onClick?: () => void;
}

interface BottomDockProps {
  className?: string;
  onItemClick?: (itemId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const BottomDock: React.FC<BottomDockProps> = ({
  className = '',
  onItemClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // ============================================================================
  // DOCK ITEMS
  // ============================================================================

  const dockItems: DockItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      isActive: true,
      color: 'blue',
      onClick: () => onItemClick?.('dashboard')
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      badge: 3,
      color: 'green',
      onClick: () => onItemClick?.('users')
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'purple',
      onClick: () => onItemClick?.('analytics')
    },
    {
      id: 'ai',
      label: 'AI Assistant',
      icon: Brain,
      color: 'pink',
      onClick: () => onItemClick?.('ai')
    }
  ];

  const utilityItems: DockItem[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: 5,
      color: 'yellow',
      onClick: () => onItemClick?.('notifications')
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      color: 'gray',
      onClick: () => onItemClick?.('search')
    },
    {
      id: 'add',
      label: 'Add New',
      icon: Plus,
      color: 'green',
      onClick: () => onItemClick?.('add')
    }
  ];

  // ============================================================================
  // RENDER DOCK ITEM
  // ============================================================================

  const renderDockItem = (item: DockItem, _index: number) => {
    const Icon = item.icon;

    return (
      <div
        key={item.id}
        className="relative group cursor-pointer"
        onClick={item.onClick}
      >
        <div
          className={`
            relative p-3 rounded-2xl transition-all duration-300 transform
            ${item.isActive
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:scale-110 hover:shadow-lg'
            }
            backdrop-blur-sm border border-white/20 dark:border-slate-700/20
            hover:bg-gradient-to-br hover:text-white
          `}
        >
          <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />

          {/* Badge */}
          {item.badge && item.badge > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              {item.badge > 99 ? '99+' : item.badge}
            </div>
          )}

          {/* Active Indicator */}
          {item.isActive && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          )}
        </div>

        {/* Tooltip */}
        {isExpanded && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 text-xs font-medium rounded-lg backdrop-blur-sm whitespace-nowrap">
            {item.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="relative">
        {/* Main Dock Container */}
        <div className="relative bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center space-x-3">
            {/* Main Items */}
            <div className="flex items-center space-x-2">
              {dockItems.map((item, index) => renderDockItem(item, index))}
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent" />

            {/* Utility Items */}
            <div className="flex items-center space-x-2">
              {utilityItems.map((item, index) => renderDockItem(item, index + dockItems.length))}
            </div>

            {/* Expand Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <HelpCircle size={16} />
              </div>
            </button>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10" />
      </div>

      {/* Keyboard Shortcut Hint */}
      {!isExpanded && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-900/80 dark:bg-slate-100/80 text-white dark:text-slate-900 text-xs font-medium rounded-lg backdrop-blur-sm">
          Press Ctrl+Tab for labels
        </div>
      )}
    </div>
  );
};

export default BottomDock;
