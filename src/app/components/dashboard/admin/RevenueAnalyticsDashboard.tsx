// ============================================================================
// REVENUE ANALYTICS DASHBOARD
// Comprehensive financial performance tracking and insights
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  Calendar,
  Target,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Award,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface RevenueMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
  period: string;
}

interface RevenueBreakdown {
  category: string;
  amount: number;
  percentage: number;
  change: number;
  color: string;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  growth: number;
  newClients: number;
  churn: number;
}

interface PlanMetrics {
  plan: string;
  subscribers: number;
  mrr: number;
  arpu: number;
  churnRate: number;
  color: string;
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateRevenueMetrics = (): RevenueMetric[] => [
  {
    id: 'mrr',
    title: 'Monthly Recurring Revenue',
    value: '$1.24M',
    change: 15.2,
    trend: 'up',
    icon: DollarSign,
    color: 'emerald',
    period: 'vs last month',
  },
  {
    id: 'arr',
    title: 'Annual Recurring Revenue',
    value: '$14.9M',
    change: 23.8,
    trend: 'up',
    icon: TrendingUp,
    color: 'blue',
    period: 'vs last year',
  },
  {
    id: 'arpu',
    title: 'Average Revenue Per User',
    value: '$127',
    change: 8.5,
    trend: 'up',
    icon: Users,
    color: 'purple',
    period: 'per month',
  },
  {
    id: 'ltv',
    title: 'Customer Lifetime Value',
    value: '$3,240',
    change: 12.3,
    trend: 'up',
    icon: Target,
    color: 'orange',
    period: 'average',
  },
];

const generateRevenueBreakdown = (): RevenueBreakdown[] => [
  { category: 'Enterprise Plans', amount: 742000, percentage: 59.7, change: 18.5, color: 'purple' },
  { category: 'Professional Plans', amount: 372000, percentage: 29.9, change: 12.3, color: 'blue' },
  { category: 'Basic Plans', amount: 93000, percentage: 7.5, change: -2.1, color: 'slate' },
  { category: 'Add-ons & Services', amount: 37000, percentage: 2.9, change: 45.2, color: 'emerald' },
];

const generateMonthlyRevenue = (): MonthlyRevenue[] => [
  { month: 'Jul 2023', revenue: 980000, growth: 8.2, newClients: 12, churn: 3 },
  { month: 'Aug 2023', revenue: 1050000, growth: 7.1, newClients: 15, churn: 2 },
  { month: 'Sep 2023', revenue: 1120000, growth: 6.7, newClients: 18, churn: 4 },
  { month: 'Oct 2023', revenue: 1180000, growth: 5.4, newClients: 14, churn: 1 },
  { month: 'Nov 2023', revenue: 1210000, growth: 2.5, newClients: 11, churn: 3 },
  { month: 'Dec 2023', revenue: 1240000, growth: 2.5, newClients: 16, churn: 2 },
];

const generatePlanMetrics = (): PlanMetrics[] => [
  { plan: 'Enterprise', subscribers: 89, mrr: 742000, arpu: 8337, churnRate: 1.2, color: 'purple' },
  { plan: 'Professional', subscribers: 156, mrr: 372000, arpu: 2385, churnRate: 2.8, color: 'blue' },
  { plan: 'Basic', subscribers: 312, mrr: 93000, arpu: 298, churnRate: 5.4, color: 'slate' },
];

// ============================================================================
// REVENUE ANALYTICS DASHBOARD COMPONENT
// ============================================================================

const RevenueAnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<RevenueMetric[]>([]);
  const [breakdown, setBreakdown] = useState<RevenueBreakdown[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyRevenue[]>([]);
  const [planMetrics, setPlanMetrics] = useState<PlanMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setMetrics(generateRevenueMetrics());
      setBreakdown(generateRevenueBreakdown());
      setMonthlyData(generateMonthlyRevenue());
      setPlanMetrics(generatePlanMetrics());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderMetricCard = (metric: RevenueMetric) => {
    const Icon = metric.icon;
    const isPositive = metric.trend === 'up';
    const isNeutral = metric.trend === 'stable';

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
            isPositive 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
              : isNeutral
              ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {isPositive ? <ArrowUpRight size={12} /> : isNeutral ? <TrendingUp size={12} className="rotate-90" /> : <ArrowDownRight size={12} />}
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
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {metric.period}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderBreakdownCard = (item: RevenueBreakdown) => {
    const isPositive = item.change > 0;

    return (
      <motion.div
        key={item.category}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">
              {item.category}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {item.percentage}% of total revenue
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-semibold text-slate-900 dark:text-white">
            ${(item.amount / 1000).toFixed(0)}K
          </p>
          <div className={`flex items-center space-x-1 text-xs ${
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(item.change)}%</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPlanMetric = (plan: PlanMetrics) => {
    return (
      <motion.div
        key={plan.plan}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`bg-gradient-to-br from-white to-${plan.color}-50 dark:from-slate-800 dark:to-${plan.color}-900/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {plan.plan}
          </h3>
          <div className={`px-3 py-1 bg-${plan.color}-100 dark:bg-${plan.color}-900/30 text-${plan.color}-800 dark:text-${plan.color}-300 rounded-full text-sm font-medium`}>
            {plan.subscribers} clients
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Monthly Revenue</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              ${(plan.mrr / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">ARPU</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              ${plan.arpu.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Churn Rate</p>
            <p className={`text-lg font-semibold ${
              plan.churnRate < 3 ? 'text-emerald-600 dark:text-emerald-400' : 
              plan.churnRate < 5 ? 'text-yellow-600 dark:text-yellow-400' : 
              'text-red-600 dark:text-red-400'
            }`}>
              {plan.churnRate}%
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Health Score</p>
            <div className="flex items-center space-x-1">
              {plan.churnRate < 3 ? (
                <CheckCircle size={16} className="text-emerald-500" />
              ) : plan.churnRate < 5 ? (
                <AlertTriangle size={16} className="text-yellow-500" />
              ) : (
                <AlertTriangle size={16} className="text-red-500" />
              )}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {plan.churnRate < 3 ? 'Excellent' : plan.churnRate < 5 ? 'Good' : 'At Risk'}
              </span>
            </div>
          </div>
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
            className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full"
          >
            <DollarSign size={32} className="text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading Revenue Data
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Analyzing financial performance metrics...
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
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(renderMetricCard)}
      </div>

      {/* Revenue Breakdown and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                <PieChart size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Revenue Breakdown
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  By subscription plan
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {breakdown.map(renderBreakdownCard)}
          </div>
        </div>

        {/* Monthly Growth Chart Placeholder */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Growth Trends
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Monthly revenue progression
                </p>
              </div>
            </div>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="12m">Last 12 months</option>
            </select>
          </div>
          
          <div className="text-center py-8">
            <BarChart3 size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Interactive Chart
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Revenue growth visualization will be implemented here
            </p>
          </div>
        </div>
      </div>

      {/* Plan Performance */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Plan Performance
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Subscription tier analytics and health metrics
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planMetrics.map(renderPlanMetric)}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Key Revenue Insights
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI-powered financial analysis
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl">
            <CheckCircle size={20} className="text-emerald-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                Strong Enterprise Growth
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enterprise plans showing 18.5% growth, driving 60% of total revenue
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl">
            <TrendingUp size={20} className="text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                ARPU Improvement
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Average revenue per user increased 8.5% through plan upgrades
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl">
            <Target size={20} className="text-purple-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                Low Churn Rate
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Overall churn rate remains healthy at 2.8% across all plans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalyticsDashboard;
