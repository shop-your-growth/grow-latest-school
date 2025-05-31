// ============================================================================
// SYSTEM MONITORING DASHBOARD
// Ultra-advanced platform health and performance monitoring with cosmic design
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bug,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  HardDrive,
  Layers,
  Lock,
  Monitor,
  PieChart,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// ============================================================================
// INTERFACES
// ============================================================================

interface SystemMetric {
  id: string;
  title: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'critical';
  change: number;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  color: string;
  unit?: string;
}

interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  region: string;
}

interface SecurityAlert {
  id: string;
  type: 'security' | 'performance' | 'error' | 'warning';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  resolved: boolean;
}

interface PerformanceMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateSystemMetrics = (): SystemMetric[] => [
  {
    id: 'uptime',
    title: 'System Uptime',
    value: '99.97%',
    status: 'healthy',
    change: 0.02,
    icon: CheckCircle,
    color: 'emerald',
  },
  {
    id: 'response',
    title: 'Avg Response Time',
    value: 127,
    status: 'healthy',
    change: -8.5,
    icon: Zap,
    color: 'blue',
    unit: 'ms',
  },
  {
    id: 'active_users',
    title: 'Active Users',
    value: '47.2K',
    status: 'healthy',
    change: 12.3,
    icon: Users,
    color: 'purple',
  },
  {
    id: 'cpu_usage',
    title: 'CPU Usage',
    value: 68,
    status: 'warning',
    change: 15.2,
    icon: Cpu,
    color: 'orange',
    unit: '%',
  },
  {
    id: 'memory',
    title: 'Memory Usage',
    value: 72,
    status: 'warning',
    change: 8.1,
    icon: HardDrive,
    color: 'yellow',
    unit: '%',
  },
  {
    id: 'database',
    title: 'Database Health',
    value: '98.5%',
    status: 'healthy',
    change: 1.2,
    icon: Database,
    color: 'indigo',
  },
];

const generateServiceStatus = (): ServiceStatus[] => [
  {
    id: 'api',
    name: 'API Gateway',
    status: 'online',
    uptime: 99.97,
    responseTime: 89,
    lastCheck: '2024-01-15T10:30:00Z',
    region: 'US-East',
  },
  {
    id: 'auth',
    name: 'Authentication Service',
    status: 'online',
    uptime: 99.95,
    responseTime: 156,
    lastCheck: '2024-01-15T10:30:00Z',
    region: 'US-East',
  },
  {
    id: 'database',
    name: 'Primary Database',
    status: 'online',
    uptime: 99.99,
    responseTime: 23,
    lastCheck: '2024-01-15T10:30:00Z',
    region: 'US-East',
  },
  {
    id: 'cdn',
    name: 'Content Delivery Network',
    status: 'degraded',
    uptime: 98.2,
    responseTime: 245,
    lastCheck: '2024-01-15T10:30:00Z',
    region: 'Global',
  },
  {
    id: 'storage',
    name: 'File Storage',
    status: 'online',
    uptime: 99.8,
    responseTime: 67,
    lastCheck: '2024-01-15T10:30:00Z',
    region: 'US-West',
  },
  {
    id: 'email',
    name: 'Email Service',
    status: 'online',
    uptime: 99.6,
    responseTime: 134,
    lastCheck: '2024-01-15T10:30:00Z',
    region: 'EU-West',
  },
];

const generateSecurityAlerts = (): SecurityAlert[] => [
  {
    id: '1',
    type: 'security',
    title: 'Unusual Login Pattern Detected',
    description: 'Multiple failed login attempts from IP 192.168.1.100',
    severity: 'medium',
    timestamp: '2024-01-15T09:45:00Z',
    resolved: false,
  },
  {
    id: '2',
    type: 'performance',
    title: 'High CPU Usage Alert',
    description: 'Server cluster experiencing sustained high CPU usage (>80%)',
    severity: 'high',
    timestamp: '2024-01-15T08:30:00Z',
    resolved: true,
  },
  {
    id: '3',
    type: 'error',
    title: 'Database Connection Timeout',
    description: 'Intermittent database connection timeouts in EU region',
    severity: 'medium',
    timestamp: '2024-01-15T07:15:00Z',
    resolved: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'SSL Certificate Expiring',
    description: 'SSL certificate for api.growyourneed.com expires in 30 days',
    severity: 'low',
    timestamp: '2024-01-15T06:00:00Z',
    resolved: false,
  },
];

// ============================================================================
// SYSTEM MONITORING DASHBOARD COMPONENT
// ============================================================================

const SystemMonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedMetric] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // ============================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================================================

  const filteredServices = useMemo(() => {
    if (filterStatus === 'all') return services;
    return services.filter(service => service.status === filterStatus);
  }, [services, filterStatus]);

  const criticalAlerts = useMemo(() => {
    return alerts.filter(alert => !alert.resolved && alert.severity === 'critical');
  }, [alerts]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMetrics(generateSystemMetrics());
    setServices(generateServiceStatus());
    setAlerts(generateSecurityAlerts());
    setLastUpdate(new Date());
    setIsLoading(false);
  }, []);

  const refreshData = useCallback(() => {
    setMetrics(generateSystemMetrics());
    setServices(generateServiceStatus());
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    loadData();

    // Auto-refresh every 30 seconds
    const interval = autoRefresh ? setInterval(refreshData, 30000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, loadData, refreshData]);

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderSystemMetric = useCallback((metric: SystemMetric, index: number) => {
    const Icon = metric.icon;
    const statusColors = {
      healthy: 'emerald',
      warning: 'yellow',
      critical: 'red',
    };

    const isPositive = metric.change > 0;
    const changeColor = metric.id === 'response' ? !isPositive : isPositive;

    return (
      <motion.div
        key={metric.id}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: 1.02,
          y: -4,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => console.log('Selected metric:', metric.id)}
        className={`group relative cursor-pointer overflow-hidden bg-gradient-to-br from-white/90 via-white/80 to-${metric.color}-50/80 dark:from-slate-800/90 dark:via-slate-800/80 dark:to-${metric.color}-900/20 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6`}
      >
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-500/5 to-${metric.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-${metric.color}-400/30 rounded-full`}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${60 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`p-3 bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={24} className="text-white" />
            </motion.div>

            <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium bg-${statusColors[metric.status]}-100/80 text-${statusColors[metric.status]}-800 dark:bg-${statusColors[metric.status]}-900/30 dark:text-${statusColors[metric.status]}-300 backdrop-blur-sm border border-${statusColors[metric.status]}-200/50 dark:border-${statusColors[metric.status]}-700/50`}>
              <motion.div
                className={`w-2 h-2 rounded-full bg-${statusColors[metric.status]}-500`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="capitalize">{metric.status}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
              {metric.title}
            </h3>

            <motion.p
              className="text-2xl font-bold text-slate-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {metric.value}{metric.unit}
            </motion.p>

            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                changeColor ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <motion.div
                  animate={{ rotate: changeColor ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {changeColor ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                </motion.div>
                <span>{Math.abs(metric.change)}% vs last hour</span>
              </div>

              {/* Performance Indicator */}
              <div className="flex items-center space-x-1">
                <div className={`w-1 h-4 rounded-full bg-gradient-to-t ${
                  metric.status === 'healthy' ? 'from-emerald-400 to-emerald-600' :
                  metric.status === 'warning' ? 'from-yellow-400 to-yellow-600' :
                  'from-red-400 to-red-600'
                }`} />
                <div className={`w-1 h-3 rounded-full bg-gradient-to-t ${
                  metric.status === 'healthy' ? 'from-emerald-300 to-emerald-500' :
                  metric.status === 'warning' ? 'from-yellow-300 to-yellow-500' :
                  'from-red-300 to-red-500'
                } opacity-70`} />
                <div className={`w-1 h-2 rounded-full bg-gradient-to-t ${
                  metric.status === 'healthy' ? 'from-emerald-200 to-emerald-400' :
                  metric.status === 'warning' ? 'from-yellow-200 to-yellow-400' :
                  'from-red-200 to-red-400'
                } opacity-40`} />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${metric.color}-400/10 to-${metric.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      </motion.div>
    );
  }, []);

  const renderServiceStatus = (service: ServiceStatus) => {
    const statusColors = {
      online: 'emerald',
      degraded: 'yellow',
      offline: 'red',
    };

    const statusIcons = {
      online: CheckCircle,
      degraded: AlertTriangle,
      offline: AlertTriangle,
    };

    const StatusIcon = statusIcons[service.status];

    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <StatusIcon size={20} className={`text-${statusColors[service.status]}-500`} />
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">
              {service.name}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {service.region} • {service.uptime}% uptime
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {service.responseTime}ms
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            response time
          </p>
        </div>
      </motion.div>
    );
  };

  const renderSecurityAlert = (alert: SecurityAlert) => {
    const typeColors = {
      security: 'red',
      performance: 'orange',
      error: 'red',
      warning: 'yellow',
    };

    const typeIcons = {
      security: Lock,
      performance: Activity,
      error: Bug,
      warning: AlertTriangle,
    };

    const severityColors = {
      low: 'blue',
      medium: 'yellow',
      high: 'orange',
      critical: 'red',
    };

    const TypeIcon = typeIcons[alert.type];

    return (
      <motion.div
        key={alert.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 border-l-4 border-${typeColors[alert.type]}-500 bg-white dark:bg-slate-800 rounded-r-xl ${
          alert.resolved ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <TypeIcon size={20} className={`text-${typeColors[alert.type]}-500 mt-0.5`} />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className={`font-medium ${alert.resolved ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                  {alert.title}
                </h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${severityColors[alert.severity]}-100 text-${severityColors[alert.severity]}-800 dark:bg-${severityColors[alert.severity]}-900/30 dark:text-${severityColors[alert.severity]}-300`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {alert.description}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          </div>

          {alert.resolved && (
            <CheckCircle size={16} className="text-emerald-500" />
          )}
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
            className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"
          >
            <Shield size={32} className="text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading System Status
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Checking platform health and performance...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-all duration-500">
      <div className="space-y-8 p-6 max-w-[1920px] mx-auto">
        {/* Enhanced Header with Advanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-8"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  System Health Command Center
                </motion.h1>
                <motion.div
                  className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>Live Monitoring Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity size={14} />
                    <span>{criticalAlerts.length} Critical Alerts</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* View Mode Selector */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
                  {(['grid', 'list', 'compact'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                        viewMode === mode
                          ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {mode === 'grid' && <Monitor size={14} />}
                      {mode === 'list' && <Layers size={14} />}
                      {mode === 'compact' && <Smartphone size={14} />}
                    </button>
                  ))}
                </div>

                {/* Filter Dropdown */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="all">All Services</option>
                  <option value="online">Online Only</option>
                  <option value="degraded">Degraded</option>
                  <option value="offline">Offline</option>
                </select>

                {/* Auto Refresh Toggle */}
                <motion.button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    autoRefresh
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 shadow-lg'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <RefreshCw size={16} className={autoRefresh ? 'animate-spin' : ''} />
                  <span className="text-sm font-medium">Auto Refresh</span>
                </motion.button>

                {/* Settings Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                >
                  <Settings size={16} />
                  <span className="text-sm font-medium">Configure</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Ultra-Responsive System Metrics Grid with Quantum Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`grid gap-4 sm:gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
              : viewMode === 'list'
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
              : 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'
          }`}
        >
          <AnimatePresence mode="wait">
            {metrics.map((metric, index) => renderSystemMetric(metric, index))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Services and Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* Services and Alerts Content */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              System Services
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Service monitoring and alerts will be implemented here
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Security Alerts
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Security monitoring and incident tracking will be implemented here
            </p>
          </div>
        </motion.div>
        {/* Service Status */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                <Server size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Service Status
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Core platform services
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {services.map(renderServiceStatus)}
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                <Bell size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Recent Alerts
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Security and system notifications
                </p>
              </div>
            </div>

            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              View All
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map(renderSecurityAlert)}
          </div>
        </div>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Performance Metrics
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time system performance data
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="flex justify-center space-x-4 mb-6">
            <Activity size={32} className="text-blue-500" />
            <BarChart3 size={32} className="text-purple-500" />
            <PieChart size={32} className="text-indigo-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Real-time Performance Charts
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive performance monitoring charts will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoringDashboard;
