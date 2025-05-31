// ============================================================================
// DIVINE ANALYTICS PAGE - COSMIC DATA INSIGHTS
// Complete analytics interface for admin dashboard
// ============================================================================

import React from 'react';
import DashboardLayout from '@/app/components/dashboard/admin/DashboardLayout';
import { ADMIN_NAV_ITEMS } from '@/app/constants';
import AnalyticsReportingDashboard from '@/app/components/dashboard/admin/AnalyticsReportingDashboard';

// ============================================================================
// ANALYTICS PAGE COMPONENT
// ============================================================================

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout navItems={ADMIN_NAV_ITEMS} title="Analytics & Reports">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Analytics & Reports
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Advanced analytics, insights, and reporting dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsReportingDashboard />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
