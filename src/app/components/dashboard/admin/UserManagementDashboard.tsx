// ============================================================================
// USER MANAGEMENT DASHBOARD
// Comprehensive user administration and role management system
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  Crown,
  GraduationCap,
  Heart,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Settings,
  Download,
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'administrator' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  avatar?: string;
  lastLogin: string;
  createdAt: string;
  school?: {
    id: string;
    name: string;
  };
  permissions: string[];
  twoFactorEnabled: boolean;
  loginAttempts: number;
  isVerified: boolean;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  suspendedUsers: number;
  adminUsers: number;
  teacherUsers: number;
  studentUsers: number;
  parentUsers: number;
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateMockUsers = (): User[] => [
  {
    id: '1',
    email: 'admin@growyourneed.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-01-15T08:00:00Z',
    permissions: ['all'],
    twoFactorEnabled: true,
    loginAttempts: 0,
    isVerified: true,
  },
  {
    id: '2',
    email: 'principal@harvard.edu',
    firstName: 'Dr. Michael',
    lastName: 'Chen',
    role: 'administrator',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2023-02-20T10:30:00Z',
    school: { id: 'harvard', name: 'Harvard University' },
    permissions: ['school_admin', 'user_management', 'reports'],
    twoFactorEnabled: true,
    loginAttempts: 0,
    isVerified: true,
  },
  {
    id: '3',
    email: 'teacher@harvard.edu',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    role: 'teacher',
    status: 'active',
    lastLogin: '2024-01-15T08:45:00Z',
    createdAt: '2023-03-10T14:20:00Z',
    school: { id: 'harvard', name: 'Harvard University' },
    permissions: ['classroom_management', 'student_grades', 'attendance'],
    twoFactorEnabled: false,
    loginAttempts: 0,
    isVerified: true,
  },
  {
    id: '4',
    email: 'student@harvard.edu',
    firstName: 'Alex',
    lastName: 'Thompson',
    role: 'student',
    status: 'active',
    lastLogin: '2024-01-14T20:30:00Z',
    createdAt: '2023-09-01T12:00:00Z',
    school: { id: 'harvard', name: 'Harvard University' },
    permissions: ['view_grades', 'submit_assignments', 'access_resources'],
    twoFactorEnabled: false,
    loginAttempts: 0,
    isVerified: true,
  },
  {
    id: '5',
    email: 'parent@example.com',
    firstName: 'Maria',
    lastName: 'Garcia',
    role: 'parent',
    status: 'pending',
    lastLogin: '2024-01-10T16:20:00Z',
    createdAt: '2024-01-10T16:20:00Z',
    school: { id: 'harvard', name: 'Harvard University' },
    permissions: ['view_child_progress', 'communication'],
    twoFactorEnabled: false,
    loginAttempts: 1,
    isVerified: false,
  },
  {
    id: '6',
    email: 'suspended@example.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'teacher',
    status: 'suspended',
    lastLogin: '2023-12-15T14:30:00Z',
    createdAt: '2023-05-15T09:00:00Z',
    school: { id: 'oxford', name: 'Oxford Academy' },
    permissions: [],
    twoFactorEnabled: false,
    loginAttempts: 5,
    isVerified: true,
  },
];

const generateUserStats = (): UserStats => ({
  totalUsers: 47234,
  activeUsers: 43891,
  newUsersToday: 127,
  suspendedUsers: 89,
  adminUsers: 12,
  teacherUsers: 3456,
  studentUsers: 38902,
  parentUsers: 4864,
});

// ============================================================================
// USER MANAGEMENT DASHBOARD COMPONENT
// ============================================================================

const UserManagementDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setUsers(generateMockUsers());
      setStats(generateUserStats());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // ============================================================================
  // FILTERING AND SEARCH
  // ============================================================================

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.school?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderStatsCard = (title: string, value: string | number, icon: React.ComponentType<any>, color: string, change?: number) => {
    const Icon = icon;

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
          {change && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              change > 0 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              <span>{change > 0 ? '+' : ''}{change}%</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </motion.div>
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'administrator': return Shield;
      case 'teacher': return GraduationCap;
      case 'student': return Users;
      case 'parent': return Heart;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'purple';
      case 'administrator': return 'blue';
      case 'teacher': return 'emerald';
      case 'student': return 'orange';
      case 'parent': return 'pink';
      default: return 'slate';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'emerald';
      case 'inactive': return 'slate';
      case 'suspended': return 'red';
      case 'pending': return 'yellow';
      default: return 'slate';
    }
  };

  const renderUserCard = (user: User) => {
    const RoleIcon = getRoleIcon(user.role);
    const roleColor = getRoleColor(user.role);
    const statusColor = getStatusColor(user.status);

    return (
      <motion.div
        key={user.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-br from-${roleColor}-500 to-${roleColor}-600 rounded-lg`}>
              <RoleIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                {user.role}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusColor}-100 text-${statusColor}-800 dark:bg-${statusColor}-900/30 dark:text-${statusColor}-300 capitalize`}>
              {user.status}
            </span>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <MoreVertical size={16} className="text-slate-500" />
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Mail size={14} />
            <span>{user.email}</span>
          </div>
          {user.school && (
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <GraduationCap size={14} />
              <span>{user.school.name}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock size={14} />
            <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {user.twoFactorEnabled && (
              <div className="flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400">
                <Shield size={12} />
                <span>2FA</span>
              </div>
            )}
            {user.isVerified && (
              <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400">
                <CheckCircle size={12} />
                <span>Verified</span>
              </div>
            )}
            {user.loginAttempts > 0 && (
              <div className="flex items-center space-x-1 text-xs text-red-600 dark:text-red-400">
                <AlertTriangle size={12} />
                <span>{user.loginAttempts} attempts</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 hover:text-blue-600">
              <Eye size={14} />
            </button>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 hover:text-emerald-600">
              <Edit size={14} />
            </button>
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 hover:text-red-600">
              <Trash2 size={14} />
            </button>
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
            className="mx-auto mb-4 p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full"
          >
            <Users size={32} className="text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading User Data
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Fetching user accounts and permissions...
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
          {renderStatsCard('Total Users', stats.totalUsers, Users, 'blue', 8.5)}
          {renderStatsCard('Active Users', stats.activeUsers, UserCheck, 'emerald', 12.3)}
          {renderStatsCard('New Today', stats.newUsersToday, UserPlus, 'purple', 23.1)}
          {renderStatsCard('Suspended', stats.suspendedUsers, UserX, 'red', -5.2)}
        </div>
      )}

      {/* Role Distribution */}
      {stats && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            User Distribution by Role
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderStatsCard('Admins', stats.adminUsers, Crown, 'purple')}
            {renderStatsCard('Teachers', stats.teacherUsers, GraduationCap, 'emerald')}
            {renderStatsCard('Students', stats.studentUsers, Users, 'orange')}
            {renderStatsCard('Parents', stats.parentUsers, Heart, 'pink')}
          </div>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="administrator">Administrator</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors">
              <UserPlus size={16} />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map(renderUserCard)}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Users Found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagementDashboard;
