// ============================================================================
// ANALYTICS & REPORTING DASHBOARD
// Advanced data analytics and comprehensive reporting system
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Eye,
  Share,
  Settings,
  RefreshCw,
  FileText,
  Database,
  Users,
  DollarSign,
  Activity,
  Globe,
  Clock,
  Target,
  Zap,
  Brain,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreVertical,
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface AnalyticsMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
  period: string;
  target?: number;
}

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'financial' | 'user_engagement' | 'performance' | 'security' | 'compliance' | 'custom';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'on_demand';
  lastGenerated: string;
  nextScheduled?: string;
  status: 'ready' | 'generating' | 'scheduled' | 'failed';
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'dashboard';
}

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'external';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  recordCount: number;
  health: number;
}

interface CustomChart {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  dataSource: string;
  metrics: string[];
  timeframe: string;
  filters: any[];
  createdBy: string;
  createdAt: string;
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateAnalyticsMetrics = (): AnalyticsMetric[] => [
  {
    id: 'total_revenue',
    title: 'Total Revenue',
    value: '$2.4M',
    change: 15.2,
    trend: 'up',
    icon: DollarSign,
    color: 'emerald',
    period: 'This month',
    target: 2500000,
  },
  {
    id: 'active_users',
    title: 'Active Users',
    value: '47.2K',
    change: 8.7,
    trend: 'up',
    icon: Users,
    color: 'blue',
    period: 'Last 30 days',
    target: 50000,
  },
  {
    id: 'engagement_rate',
    title: 'Engagement Rate',
    value: '87.3%',
    change: 3.2,
    trend: 'up',
    icon: Activity,
    color: 'purple',
    period: 'This week',
    target: 90,
  },
  {
    id: 'conversion_rate',
    title: 'Conversion Rate',
    value: '12.8%',
    change: -2.1,
    trend: 'down',
    icon: Target,
    color: 'orange',
    period: 'This month',
    target: 15,
  },
  {
    id: 'avg_session',
    title: 'Avg Session Duration',
    value: '24m 32s',
    change: 12.5,
    trend: 'up',
    icon: Clock,
    color: 'indigo',
    period: 'Last 7 days',
  },
  {
    id: 'churn_rate',
    title: 'Churn Rate',
    value: '3.2%',
    change: -15.8,
    trend: 'up',
    icon: TrendingDown,
    color: 'red',
    period: 'This quarter',
    target: 2.5,
  },
];

const generateReports = (): Report[] => [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    description: 'Comprehensive monthly financial performance analysis',
    type: 'financial',
    frequency: 'monthly',
    lastGenerated: '2024-01-01T09:00:00Z',
    nextScheduled: '2024-02-01T09:00:00Z',
    status: 'ready',
    recipients: ['cfo@growyourneed.com', 'finance@growyourneed.com'],
    format: 'pdf',
  },
  {
    id: '2',
    name: 'User Engagement Analytics',
    description: 'Weekly user behavior and engagement metrics',
    type: 'user_engagement',
    frequency: 'weekly',
    lastGenerated: '2024-01-08T10:00:00Z',
    nextScheduled: '2024-01-15T10:00:00Z',
    status: 'generating',
    recipients: ['product@growyourneed.com', 'analytics@growyourneed.com'],
    format: 'dashboard',
  },
  {
    id: '3',
    name: 'Security Compliance Report',
    description: 'Quarterly security posture and compliance status',
    type: 'security',
    frequency: 'quarterly',
    lastGenerated: '2023-10-01T14:00:00Z',
    nextScheduled: '2024-01-01T14:00:00Z',
    status: 'scheduled',
    recipients: ['security@growyourneed.com', 'compliance@growyourneed.com'],
    format: 'pdf',
  },
  {
    id: '4',
    name: 'Platform Performance Metrics',
    description: 'Daily system performance and uptime analysis',
    type: 'performance',
    frequency: 'daily',
    lastGenerated: '2024-01-15T06:00:00Z',
    nextScheduled: '2024-01-16T06:00:00Z',
    status: 'ready',
    recipients: ['devops@growyourneed.com', 'engineering@growyourneed.com'],
    format: 'excel',
  },
];

const generateDataSources = (): DataSource[] => [
  {
    id: '1',
    name: 'Primary Database',
    type: 'database',
    status: 'connected',
    lastSync: '2024-01-15T10:30:00Z',
    recordCount: 2847392,
    health: 98,
  },
  {
    id: '2',
    name: 'Analytics API',
    type: 'api',
    status: 'connected',
    lastSync: '2024-01-15T10:25:00Z',
    recordCount: 156789,
    health: 95,
  },
  {
    id: '3',
    name: 'Payment Gateway',
    type: 'external',
    status: 'connected',
    lastSync: '2024-01-15T10:20:00Z',
    recordCount: 45632,
    health: 92,
  },
  {
    id: '4',
    name: 'User Feedback System',
    type: 'api',
    status: 'error',
    lastSync: '2024-01-14T18:45:00Z',
    recordCount: 12847,
    health: 45,
  },
];

// ============================================================================
// ANALYTICS REPORTING DASHBOARD COMPONENT
// ============================================================================

const AnalyticsReportingDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setMetrics(generateAnalyticsMetrics());
      setReports(generateReports());
      setDataSources(generateDataSources());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderAnalyticsMetric = (metric: AnalyticsMetric) => {
    const Icon = metric.icon;
    const isPositive = metric.trend === 'up';
    const isNegative = metric.trend === 'down';

    // Special handling for metrics where decrease is good (like churn rate)
    const isGoodChange = metric.id === 'churn_rate' ? metric.change < 0 : metric.change > 0;

    return (
      <motion.div
        key={metric.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`bg-gradient-to-br from-white to-${metric.color}-50 dark:from-slate-800 dark:to-${metric.color}-900/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 rounded-xl shadow-lg`}>
            <Icon size={24} className="text-white" />
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isGoodChange 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {isPositive ? <ArrowUpRight size={12} /> : isNegative ? <ArrowDownRight size={12} /> : <TrendingUp size={12} className="rotate-90" />}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {metric.title}
          </h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {metric.value}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {metric.period}
            </p>
            {metric.target && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target: {typeof metric.target === 'number' && metric.target > 1000 
                  ? `${(metric.target / 1000).toFixed(0)}K` 
                  : `${metric.target}${metric.id.includes('rate') ? '%' : ''}`}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderReport = (report: Report) => {
    const typeColors = {
      financial: 'emerald',
      user_engagement: 'blue',
      performance: 'purple',
      security: 'red',
      compliance: 'orange',
      custom: 'indigo',
    };

    const statusColors = {
      ready: 'emerald',
      generating: 'blue',
      scheduled: 'yellow',
      failed: 'red',
    };

    const frequencyIcons = {
      daily: Clock,
      weekly: Calendar,
      monthly: Calendar,
      quarterly: Calendar,
      on_demand: Zap,
    };

    const FrequencyIcon = frequencyIcons[report.frequency];

    return (
      <motion.div
        key={report.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-br from-${typeColors[report.type]}-500 to-${typeColors[report.type]}-600 rounded-lg`}>
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {report.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {report.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusColors[report.status]}-100 text-${statusColors[report.status]}-800 dark:bg-${statusColors[report.status]}-900/30 dark:text-${statusColors[report.status]}-300`}>
              {report.status}
            </span>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <MoreVertical size={16} className="text-slate-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <FrequencyIcon size={14} />
            <span className="capitalize">{report.frequency}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <FileText size={14} />
            <span className="uppercase">{report.format}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock size={14} />
            <span>Last: {new Date(report.lastGenerated).toLocaleDateString()}</span>
          </div>
          {report.nextScheduled && (
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Calendar size={14} />
              <span>Next: {new Date(report.nextScheduled).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Users size={12} />
            <span>{report.recipients.length} recipients</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 hover:text-blue-600">
              <Eye size={14} />
            </button>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 hover:text-emerald-600">
              <Download size={14} />
            </button>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 hover:text-purple-600">
              <Share size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderDataSource = (source: DataSource) => {
    const statusColors = {
      connected: 'emerald',
      disconnected: 'slate',
      error: 'red',
    };

    const typeIcons = {
      database: Database,
      api: Globe,
      file: FileText,
      external: Globe,
    };

    const TypeIcon = typeIcons[source.type];

    return (
      <motion.div
        key={source.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <TypeIcon size={20} className={`text-${statusColors[source.status]}-500`} />
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">
              {source.name}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
              {source.type} • {source.recordCount.toLocaleString()} records
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-${statusColors[source.status]}-100 text-${statusColors[source.status]}-800 dark:bg-${statusColors[source.status]}-900/30 dark:text-${statusColors[source.status]}-300 mb-1`}>
            <div className={`w-2 h-2 rounded-full bg-${statusColors[source.status]}-500`}></div>
            <span className="capitalize">{source.status}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Health: {source.health}%
          </p>
        </div>
      </motion.div>
    );
  };

  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-4 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"
          >
            <BarChart3 size={32} className="text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading Analytics Data
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Generating reports and analyzing metrics...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Analytics & Reporting
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive data analysis and automated reporting
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors">
            <Plus size={16} />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {metrics.map(renderAnalyticsMetric)}
      </div>

      {/* Reports and Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Reports */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Scheduled Reports
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Automated reporting and distribution
                </p>
              </div>
            </div>
            
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Manage All
            </button>
          </div>
          
          <div className="space-y-4">
            {reports.map(renderReport)}
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                <Database size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Data Sources
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Connected data streams and APIs
                </p>
              </div>
            </div>
            
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Add Source
            </button>
          </div>
          
          <div className="space-y-4">
            {dataSources.map(renderDataSource)}
          </div>
        </div>
      </div>

      {/* Custom Charts Placeholder */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Custom Analytics
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Build custom charts and visualizations
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center py-8">
          <div className="flex justify-center space-x-4 mb-6">
            <BarChart3 size={32} className="text-blue-500" />
            <PieChart size={32} className="text-purple-500" />
            <LineChart size={32} className="text-indigo-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Interactive Chart Builder
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Drag-and-drop chart creation with real-time data visualization
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportingDashboard;
