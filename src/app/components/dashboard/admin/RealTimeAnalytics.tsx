// ============================================================================
// DIVINE REAL-TIME ANALYTICS - COSMIC DATA VISUALIZATION
// Advanced analytics with quantum-level insights
// ============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Eye,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface AnalyticsData {
  timestamp: Date;
  users: number;
  pageViews: number;
  revenue: number;
  conversions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

interface DeviceStats {
  desktop: number;
  mobile: number;
  tablet: number;
}

interface GeographicData {
  country: string;
  users: number;
  percentage: number;
}

// ============================================================================
// REAL-TIME ANALYTICS COMPONENT
// ============================================================================

const RealTimeAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [currentUsers, setCurrentUsers] = useState(0);
  const [deviceStats, setDeviceStats] = useState<DeviceStats>({
    desktop: 0,
    mobile: 0,
    tablet: 0
  });
  const [geoData, setGeoData] = useState<GeographicData[]>([]);
  const [isLive, setIsLive] = useState(true);

  // ============================================================================
  // DATA GENERATION
  // ============================================================================

  const generateAnalyticsData = (): AnalyticsData => {
    const baseTime = Date.now();
    const timeVariation = Math.sin(baseTime / 30000) * 0.3 + 0.7;
    
    return {
      timestamp: new Date(),
      users: Math.floor(150 + Math.random() * 100 * timeVariation),
      pageViews: Math.floor(500 + Math.random() * 300 * timeVariation),
      revenue: Math.floor(1000 + Math.random() * 500 * timeVariation),
      conversions: Math.floor(20 + Math.random() * 15 * timeVariation),
      bounceRate: 25 + Math.random() * 20,
      avgSessionDuration: 180 + Math.random() * 120
    };
  };

  const generateDeviceStats = (): DeviceStats => {
    const total = 100;
    const desktop = 45 + Math.random() * 20;
    const mobile = 35 + Math.random() * 15;
    const tablet = total - desktop - mobile;
    
    return { desktop, mobile, tablet };
  };

  const generateGeoData = (): GeographicData[] => {
    const countries = ['United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Australia', 'Japan', 'Brazil'];
    return countries.map(country => ({
      country,
      users: Math.floor(Math.random() * 100),
      percentage: Math.random() * 25
    })).sort((a, b) => b.users - a.users).slice(0, 5);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        const newData = generateAnalyticsData();
        setAnalyticsData(prev => [...prev, newData].slice(-20));
        setCurrentUsers(newData.users);
        setDeviceStats(generateDeviceStats());
        setGeoData(generateGeoData());
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const latestData = useMemo(() => {
    return analyticsData[analyticsData.length - 1] || {
      timestamp: new Date(),
      users: 0,
      pageViews: 0,
      revenue: 0,
      conversions: 0,
      bounceRate: 0,
      avgSessionDuration: 0
    };
  }, [analyticsData]);

  const trends = useMemo(() => {
    if (analyticsData.length < 2) return { users: 0, pageViews: 0, revenue: 0 };
    
    const current = analyticsData[analyticsData.length - 1];
    const previous = analyticsData[analyticsData.length - 2];
    
    return {
      users: ((current.users - previous.users) / previous.users) * 100,
      pageViews: ((current.pageViews - previous.pageViews) / previous.pageViews) * 100,
      revenue: ((current.revenue - previous.revenue) / previous.revenue) * 100
    };
  }, [analyticsData]);

  // ============================================================================
  // METRIC CARD COMPONENT
  // ============================================================================

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    trend?: number;
    icon: React.ReactNode;
    color: string;
    prefix?: string;
    suffix?: string;
  }> = ({ title, value, trend, icon, color, prefix = '', suffix = '' }) => (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {trend !== undefined && (
            <div className={`flex items-center mt-2 ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp size={16} className={trend < 0 ? 'rotate-180' : ''} />
              <span className="text-sm font-medium ml-1">
                {Math.abs(trend).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <div className={`text-${color}-600`}>
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ============================================================================
  // DEVICE CHART COMPONENT
  // ============================================================================

  const DeviceChart: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
      <div className="space-y-4">
        {[
          { name: 'Desktop', value: deviceStats.desktop, icon: <Monitor size={20} />, color: 'blue' },
          { name: 'Mobile', value: deviceStats.mobile, icon: <Smartphone size={20} />, color: 'green' },
          { name: 'Tablet', value: deviceStats.tablet, icon: <Tablet size={20} />, color: 'purple' }
        ].map((device) => (
          <div key={device.name} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${device.color}-100`}>
              <div className={`text-${device.color}-600`}>
                {device.icon}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{device.name}</span>
                <span className="text-sm text-gray-600">{device.value.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-${device.color}-500`}
                  initial={{ width: 0 }}
                  animate={{ width: `${device.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================================================
  // GEOGRAPHIC DATA COMPONENT
  // ============================================================================

  const GeographicData: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
      <div className="space-y-3">
        {geoData.map((country, index) => (
          <motion.div
            key={country.country}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Globe size={16} className="text-white" />
              </div>
              <span className="font-medium text-gray-700">{country.country}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{country.users}</p>
              <p className="text-sm text-gray-600">{country.percentage.toFixed(1)}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Analytics</h2>
          <p className="text-gray-600">Live performance metrics and insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isLive
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLive ? 'Stop Live Updates' : 'Start Live Updates'}
          </motion.button>
          
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isLive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
            }`} />
            <span className="text-sm font-medium">
              {isLive ? 'Live' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Current Users */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
        animate={{ scale: isLive ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 2, repeat: isLive ? Infinity : 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Users Online Now</p>
            <p className="text-3xl font-bold">{currentUsers.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-full bg-white bg-opacity-20">
            <Activity size={32} />
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Page Views"
          value={latestData.pageViews}
          trend={trends.pageViews}
          icon={<Eye size={24} />}
          color="blue"
        />
        
        <MetricCard
          title="Revenue"
          value={latestData.revenue}
          trend={trends.revenue}
          icon={<DollarSign size={24} />}
          color="green"
          prefix="$"
        />
        
        <MetricCard
          title="Conversions"
          value={latestData.conversions}
          icon={<MousePointer size={24} />}
          color="purple"
        />
        
        <MetricCard
          title="Avg. Session"
          value={Math.floor(latestData.avgSessionDuration / 60)}
          icon={<Clock size={24} />}
          color="orange"
          suffix="m"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Bounce Rate"
          value={latestData.bounceRate.toFixed(1)}
          icon={<TrendingUp size={24} />}
          color="red"
          suffix="%"
        />
        
        <DeviceChart />
        <GeographicData />
      </div>

      {/* Live Activity Feed */}
      {isLive && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Activity</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {analyticsData.slice(-5).reverse().map((data, index) => (
                <motion.div
                  key={data.timestamp.getTime()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-700">
                      {data.users} users, {data.pageViews} page views
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {data.timestamp.toLocaleTimeString()}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeAnalytics;
