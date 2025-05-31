// ============================================================================
// INTEGRATION SETTINGS COMPONENT
// Third-party services and API configurations (Admin only)
// ============================================================================

import { Globe } from 'lucide-react';
import React from 'react';

const IntegrationSettings: React.FC = () => {

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <Globe size={48} className="mx-auto text-slate-400 mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Integration Settings
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Third-party integrations, API configurations, and external services will be managed here.
        </p>
      </div>
    </div>
  );
};

export default IntegrationSettings;
