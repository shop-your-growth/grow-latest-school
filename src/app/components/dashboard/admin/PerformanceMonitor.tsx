// ============================================================================
// DIVINE PERFORMANCE MONITOR - COSMIC SYSTEM OPTIMIZATION
// Real-time performance tracking with quantum-level precision
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  uptime: number;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: Date;
  metric: string;
  value: number;
  threshold: number;
}

// ============================================================================
// DIVINE PERFORMANCE MONITOR COMPONENT
// ============================================================================

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    uptime: 0
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [historicalData, setHistoricalData] = useState<PerformanceMetrics[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // COSMIC PERFORMANCE SIMULATION
  // ============================================================================

  const generateRealisticMetrics = (): PerformanceMetrics => {
    const baseTime = Date.now();
    const variation = Math.sin(baseTime / 10000) * 0.2 + 0.8;
    
    return {
      cpu: Math.max(5, Math.min(95, 25 + Math.random() * 30 * variation)),
      memory: Math.max(10, Math.min(90, 40 + Math.random() * 25 * variation)),
      disk: Math.max(5, Math.min(85, 15 + Math.random() * 20)),
      network: Math.max(1, Math.min(100, 30 + Math.random() * 40)),
      responseTime: Math.max(50, 150 + Math.random() * 200 * (2 - variation)),
      throughput: Math.max(100, 500 + Math.random() * 300 * variation),
      errorRate: Math.max(0, Math.random() * 2 * (2 - variation)),
      uptime: 99.5 + Math.random() * 0.5
    };
  };

  const checkForAlerts = (newMetrics: PerformanceMetrics) => {
    const newAlerts: PerformanceAlert[] = [];

    if (newMetrics.cpu > 80) {
      newAlerts.push({
        id: `cpu-${Date.now()}`,
        type: 'warning',
        message: 'High CPU usage detected',
        timestamp: new Date(),
        metric: 'CPU',
        value: newMetrics.cpu,
        threshold: 80
      });
    }

    if (newMetrics.memory > 85) {
      newAlerts.push({
        id: `memory-${Date.now()}`,
        type: 'critical',
        message: 'Memory usage critical',
        timestamp: new Date(),
        metric: 'Memory',
        value: newMetrics.memory,
        threshold: 85
      });
    }

    if (newMetrics.responseTime > 500) {
      newAlerts.push({
        id: `response-${Date.now()}`,
        type: 'warning',
        message: 'Slow response time detected',
        timestamp: new Date(),
        metric: 'Response Time',
        value: newMetrics.responseTime,
        threshold: 500
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
    }
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    if (isMonitoring) {
      intervalRef.current = setInterval(() => {
        const newMetrics = generateRealisticMetrics();
        setMetrics(newMetrics);
        checkForAlerts(newMetrics);
        
        setHistoricalData(prev => [...prev, newMetrics].slice(-50));
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMonitoring]);

  // ============================================================================
  // METRIC CARD COMPONENT
  // ============================================================================

  const MetricCard: React.FC<{
    title: string;
    value: number;
    unit: string;
    icon: React.ReactNode;
    color: string;
    threshold?: number;
  }> = ({ title, value, unit, icon, color, threshold }) => {
    const isWarning = threshold && value > threshold;
    
    return (
      <motion.div
        className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
          isWarning ? 'border-red-500' : `border-${color}-500`
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className={`text-2xl font-bold ${
              isWarning ? 'text-red-600' : `text-${color}-600`
            }`}>
              {value.toFixed(1)}{unit}
            </p>
          </div>
          <div className={`p-3 rounded-full ${
            isWarning ? 'bg-red-100' : `bg-${color}-100`
          }`}>
            <div className={isWarning ? 'text-red-600' : `text-${color}-600`}>
              {icon}
            </div>
          </div>
        </div>
        
        {threshold && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0</span>
              <span>Threshold: {threshold}</span>
              <span>100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  isWarning ? 'bg-red-500' : `bg-${color}-500`
                }`}
                style={{ width: `${Math.min(100, value)}%` }}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
          <p className="text-gray-600">Real-time system performance tracking</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isMonitoring
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </motion.button>
          
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
            }`} />
            <span className="text-sm font-medium">
              {isMonitoring ? 'Monitoring' : 'Stopped'}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="CPU Usage"
          value={metrics.cpu}
          unit="%"
          icon={<Cpu size={24} />}
          color="blue"
          threshold={80}
        />
        
        <MetricCard
          title="Memory Usage"
          value={metrics.memory}
          unit="%"
          icon={<MemoryStick size={24} />}
          color="purple"
          threshold={85}
        />
        
        <MetricCard
          title="Disk Usage"
          value={metrics.disk}
          unit="%"
          icon={<HardDrive size={24} />}
          color="green"
          threshold={90}
        />
        
        <MetricCard
          title="Network I/O"
          value={metrics.network}
          unit=" MB/s"
          icon={<Network size={24} />}
          color="orange"
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Response Time"
          value={metrics.responseTime}
          unit="ms"
          icon={<Clock size={24} />}
          color="indigo"
          threshold={500}
        />
        
        <MetricCard
          title="Throughput"
          value={metrics.throughput}
          unit=" req/s"
          icon={<TrendingUp size={24} />}
          color="teal"
        />
        
        <MetricCard
          title="Error Rate"
          value={metrics.errorRate}
          unit="%"
          icon={<AlertTriangle size={24} />}
          color="red"
          threshold={1}
        />
        
        <MetricCard
          title="Uptime"
          value={metrics.uptime}
          unit="%"
          icon={<CheckCircle size={24} />}
          color="emerald"
        />
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="text-orange-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {alerts.slice(0, 5).map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'critical'
                      ? 'bg-red-50 border-red-500'
                      : alert.type === 'warning'
                      ? 'bg-orange-50 border-orange-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${
                        alert.type === 'critical'
                          ? 'text-red-800'
                          : alert.type === 'warning'
                          ? 'text-orange-800'
                          : 'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-sm text-gray-600">
                        {alert.metric}: {alert.value.toFixed(1)} (threshold: {alert.threshold})
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
