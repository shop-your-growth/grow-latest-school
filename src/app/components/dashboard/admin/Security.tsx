// ============================================================================
// DIVINE SECURITY PAGE - COSMIC SECURITY MANAGEMENT
// Complete security and compliance interface for admin dashboard
// ============================================================================

import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ADMIN_NAV_ITEMS } from '../constants';
import SecurityComplianceDashboard from './components/dashboard/SecurityComplianceDashboard';

// ============================================================================
// SECURITY PAGE COMPONENT
// ============================================================================

const SecurityPage: React.FC = () => {
  return (
    <DashboardLayout navItems={ADMIN_NAV_ITEMS} title="Security & Compliance">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Security & Compliance
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Monitor security threats, compliance status, and system vulnerabilities
              </p>
            </div>
          </div>
        </div>

        {/* Security Dashboard */}
        <SecurityComplianceDashboard />
      </div>
    </DashboardLayout>
  );
};

export default SecurityPage;
