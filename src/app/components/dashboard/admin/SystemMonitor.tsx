// ============================================================================
// DIVINE SYSTEM MONITOR PAGE - COSMIC SYSTEM OVERSIGHT
// Complete system monitoring interface for admin dashboard
// ============================================================================

import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ADMIN_NAV_ITEMS } from '../constants';
import SystemMonitoringDashboard from './components/dashboard/SystemMonitoringDashboard';

// ============================================================================
// SYSTEM MONITOR PAGE COMPONENT
// ============================================================================

const SystemMonitorPage: React.FC = () => {
  return (
    <DashboardLayout navItems={ADMIN_NAV_ITEMS}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                System Monitor
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Real-time system performance, health monitoring, and infrastructure oversight
              </p>
            </div>
          </div>
        </div>

        {/* System Monitoring Dashboard */}
        <SystemMonitoringDashboard />
      </div>
    </DashboardLayout>
  );
};

export default SystemMonitorPage;
