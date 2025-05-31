// ============================================================================
// CLIENT MANAGEMENT DASHBOARD
// Comprehensive educational institution management system
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  School,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  DollarSign,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  Globe,
  Phone,
  Mail,
  Star,
  Award,
  Target,
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface Client {
  id: string;
  name: string;
  type: 'university' | 'college' | 'school' | 'academy';
  status: 'active' | 'trial' | 'suspended' | 'churned';
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  subscription: {
    plan: 'basic' | 'professional' | 'enterprise';
    mrr: number;
    startDate: string;
    renewalDate: string;
  };
  metrics: {
    totalUsers: number;
    activeUsers: number;
    studentCount: number;
    teacherCount: number;
    parentCount: number;
    engagementScore: number;
    satisfactionScore: number;
  };
  contact: {
    primaryContact: string;
    email: string;
    phone: string;
  };
  onboardingProgress: number;
  lastActivity: string;
  riskScore: 'low' | 'medium' | 'high';
}

interface ClientStats {
  totalClients: number;
  activeClients: number;
  trialClients: number;
  totalMRR: number;
  avgEngagement: number;
  churnRate: number;
  growthRate: number;
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateMockClients = (): Client[] => [
  {
    id: '1',
    name: 'Harvard University',
    type: 'university',
    status: 'active',
    location: { city: 'Cambridge', country: 'USA', timezone: 'EST' },
    subscription: { plan: 'enterprise', mrr: 15000, startDate: '2023-01-15', renewalDate: '2024-01-15' },
    metrics: { totalUsers: 45000, activeUsers: 38000, studentCount: 35000, teacherCount: 2500, parentCount: 7500, engagementScore: 94, satisfactionScore: 92 },
    contact: { primaryContact: 'Dr. Sarah Johnson', email: 'sarah.johnson@harvard.edu', phone: '+1-617-495-1000' },
    onboardingProgress: 100,
    lastActivity: '2024-01-15T10:30:00Z',
    riskScore: 'low',
  },
  {
    id: '2',
    name: 'Oxford Academy',
    type: 'academy',
    status: 'trial',
    location: { city: 'Oxford', country: 'UK', timezone: 'GMT' },
    subscription: { plan: 'professional', mrr: 0, startDate: '2024-01-01', renewalDate: '2024-02-01' },
    metrics: { totalUsers: 1200, activeUsers: 980, studentCount: 800, teacherCount: 45, parentCount: 355, engagementScore: 87, satisfactionScore: 89 },
    contact: { primaryContact: 'Prof. James Wilson', email: 'j.wilson@oxfordacademy.edu', phone: '+44-1865-270000' },
    onboardingProgress: 75,
    lastActivity: '2024-01-14T16:45:00Z',
    riskScore: 'medium',
  },
  {
    id: '3',
    name: 'Tokyo International School',
    type: 'school',
    status: 'active',
    location: { city: 'Tokyo', country: 'Japan', timezone: 'JST' },
    subscription: { plan: 'professional', mrr: 3500, startDate: '2023-09-01', renewalDate: '2024-09-01' },
    metrics: { totalUsers: 2800, activeUsers: 2650, studentCount: 2200, teacherCount: 120, parentCount: 480, engagementScore: 91, satisfactionScore: 88 },
    contact: { primaryContact: 'Yuki Tanaka', email: 'y.tanaka@tis.edu.jp', phone: '+81-3-1234-5678' },
    onboardingProgress: 100,
    lastActivity: '2024-01-15T09:15:00Z',
    riskScore: 'low',
  },
  {
    id: '4',
    name: 'Berlin Technical College',
    type: 'college',
    status: 'suspended',
    location: { city: 'Berlin', country: 'Germany', timezone: 'CET' },
    subscription: { plan: 'basic', mrr: 1200, startDate: '2023-06-01', renewalDate: '2024-06-01' },
    metrics: { totalUsers: 1500, activeUsers: 0, studentCount: 1200, teacherCount: 80, parentCount: 220, engagementScore: 0, satisfactionScore: 45 },
    contact: { primaryContact: 'Dr. Klaus Mueller', email: 'k.mueller@btc.de', phone: '+49-30-1234567' },
    onboardingProgress: 60,
    lastActivity: '2023-12-20T14:30:00Z',
    riskScore: 'high',
  },
];

const generateClientStats = (): ClientStats => ({
  totalClients: 247,
  activeClients: 198,
  trialClients: 23,
  totalMRR: 1247000,
  avgEngagement: 87.5,
  churnRate: 3.2,
  growthRate: 12.8,
});

// ============================================================================
// CLIENT MANAGEMENT DASHBOARD COMPONENT
// ============================================================================

const ClientManagementDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setClients(generateMockClients());
      setStats(generateClientStats());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // ============================================================================
  // FILTERING AND SEARCH
  // ============================================================================

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.primaryContact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderStatsCard = (title: string, value: string | number, change: number, icon: React.ComponentType<any>, color: string) => {
    const Icon = icon;
    const isPositive = change > 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br from-white to-${color}-50 dark:from-slate-800 dark:to-${color}-900/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl shadow-lg`}>
            <Icon size={24} className="text-white" />
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderClientCard = (client: Client) => {
    const statusColors = {
      active: 'emerald',
      trial: 'blue',
      suspended: 'red',
      churned: 'gray',
    };

    const riskColors = {
      low: 'emerald',
      medium: 'yellow',
      high: 'red',
    };

    const planColors = {
      basic: 'slate',
      professional: 'blue',
      enterprise: 'purple',
    };

    return (
      <motion.div
        key={client.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6 cursor-pointer"
        onClick={() => setSelectedClient(client)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-br from-${statusColors[client.status]}-500 to-${statusColors[client.status]}-600 rounded-lg`}>
              <School size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{client.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{client.type}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusColors[client.status]}-100 text-${statusColors[client.status]}-800 dark:bg-${statusColors[client.status]}-900/30 dark:text-${statusColors[client.status]}-300 capitalize`}>
              {client.status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${planColors[client.subscription.plan]}-100 text-${planColors[client.subscription.plan]}-800 dark:bg-${planColors[client.subscription.plan]}-900/30 dark:text-${planColors[client.subscription.plan]}-300 capitalize`}>
              {client.subscription.plan}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {client.location.city}, {client.location.country}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {client.metrics.totalUsers.toLocaleString()} users
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              ${client.subscription.mrr.toLocaleString()}/mo
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Target size={16} className="text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {client.metrics.engagementScore}% engagement
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full bg-${riskColors[client.riskScore]}-500`}></div>
            <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {client.riskScore} risk
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {client.metrics.satisfactionScore}%
            </span>
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
            className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"
          >
            <Users size={32} className="text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading Client Data
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Fetching educational institution information...
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
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderStatsCard('Total Clients', stats.totalClients, 12.8, Users, 'blue')}
          {renderStatsCard('Active Clients', stats.activeClients, 8.5, CheckCircle, 'emerald')}
          {renderStatsCard('Monthly Revenue', `$${(stats.totalMRR / 1000).toFixed(0)}K`, 15.2, DollarSign, 'purple')}
          {renderStatsCard('Avg Engagement', `${stats.avgEngagement}%`, 5.3, TrendingUp, 'orange')}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
              <option value="churned">Churned</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors">
              <Plus size={16} />
              <span>Add Client</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map(renderClientCard)}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Clients Found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientManagementDashboard;
