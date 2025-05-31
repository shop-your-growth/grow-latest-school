// ============================================================================
// REAL USER MANAGEMENT - DIVINE USER CONTROL INTERFACE
// God-tier user management with real CRUD operations and live updates
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Crown,
  DollarSign,
  Edit,
  Eye,
  EyeOff,
  GraduationCap,
  Heart,
  Megaphone,
  Plus,
  Save,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { useRealUsers } from '../hooks/useRealData';

// ============================================================================
// COSMIC INTERFACES
// ============================================================================

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Teacher' | 'Student' | 'Parent' | 'Finance' | 'Marketing';
  tenantId: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  tenantId: string;
}

// ============================================================================
// REAL USER MANAGEMENT COMPONENT
// ============================================================================

const RealUserManagement: React.FC = () => {
  const { users, loading, error, loadUsers, createUser, updateUser, deleteUser, toggleUserStatus } = useRealUsers();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'Student',
    tenantId: 'default-tenant',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ============================================================================
  // DIVINE HANDLERS
  // ============================================================================

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadUsers({ search: query, role: roleFilter !== 'all' ? roleFilter : undefined });
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    loadUsers({ search: searchQuery, role: role !== 'all' ? role : undefined });
  };

  const handleCreateUser = async () => {
    setFormErrors({});

    // Validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password.trim()) errors.password = 'Password is required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setActionLoading('create');
    try {
      await createUser(formData);
      setShowCreateModal(false);
      setFormData({ name: '', email: '', password: '', role: 'Student', tenantId: 'default-tenant' });
    } catch (err) {
      console.error('Failed to create user:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    setFormErrors({});

    // Validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setActionLoading('edit');
    try {
      await updateUser(selectedUser.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role as any,
      });
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Failed to update user:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) return;

    setActionLoading(`delete-${user.id}`);
    try {
      await deleteUser(user.id);
    } catch (err) {
      console.error('Failed to delete user:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (user: User) => {
    setActionLoading(`toggle-${user.id}`);
    try {
      await toggleUserStatus(user.id, !user.isActive);
    } catch (err) {
      console.error('Failed to toggle user status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      tenantId: user.tenantId,
    });
    setShowEditModal(true);
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Administrator': return Crown;
      case 'Teacher': return GraduationCap;
      case 'Student': return Users;
      case 'Parent': return Heart;
      case 'Finance': return DollarSign;
      case 'Marketing': return Megaphone;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator': return 'gold';
      case 'Teacher': return 'blue';
      case 'Student': return 'green';
      case 'Parent': return 'purple';
      case 'Finance': return 'emerald';
      case 'Marketing': return 'orange';
      default: return 'slate';
    }
  };

  const renderUserCard = (user: User, index: number) => {
    const RoleIcon = getRoleIcon(user.role);
    const roleColor = getRoleColor(user.role);

    return (
      <motion.div
        key={user.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group ${
          !user.isActive ? 'opacity-60' : ''
        }`}
      >
        {/* Status Indicator */}
        <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
          user.isActive ? 'bg-emerald-500' : 'bg-red-500'
        } animate-pulse`} />

        {/* User Avatar */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={user.avatar || `https://picsum.photos/seed/${user.id}/60/60`}
              alt={user.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 p-1 bg-${roleColor}-500 rounded-lg shadow-lg`}>
              <RoleIcon size={12} className="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {user.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Role</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${roleColor}-100 text-${roleColor}-800 dark:bg-${roleColor}-900/30 dark:text-${roleColor}-300`}>
              {user.role}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">Status</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              user.isActive
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          {user.lastLogin && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Last Login</span>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {new Date(user.lastLogin).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openEditModal(user)}
            disabled={actionLoading === `edit-${user.id}`}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>

          <button
            onClick={() => handleToggleStatus(user)}
            disabled={actionLoading === `toggle-${user.id}`}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
              user.isActive
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
            }`}
          >
            {user.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{user.isActive ? 'Disable' : 'Enable'}</span>
          </button>

          <button
            onClick={() => handleDeleteUser(user)}
            disabled={actionLoading === `delete-${user.id}`}
            className="p-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Loading Overlay */}
        {(actionLoading === `delete-${user.id}` || actionLoading === `toggle-${user.id}`) && (
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        )}
      </motion.div>
    );
  };

  const renderUserModal = (isEdit: boolean = false) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => isEdit ? setShowEditModal(false) : setShowCreateModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {isEdit ? 'Edit User' : 'Create New User'}
          </h2>
          <button
            onClick={() => isEdit ? setShowEditModal(false) : setShowCreateModal(false)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                formErrors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter full name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                formErrors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter email address"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password Field (only for create) */}
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                  formErrors.password ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Enter password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
              )}
            </div>
          )}

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={() => isEdit ? setShowEditModal(false) : setShowCreateModal(false)}
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleEditUser : handleCreateUser}
            disabled={actionLoading === (isEdit ? 'edit' : 'create')}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {actionLoading === (isEdit ? 'edit' : 'create') ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Save size={16} />
                <span>{isEdit ? 'Update User' : 'Create User'}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Real User Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage users with real database operations • {users.length} total users
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => handleRoleFilter(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="Administrator">Administrator</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Connection Status */}
      <div className="flex items-center space-x-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
        <span className="text-slate-600 dark:text-slate-400">
          {loading ? 'Loading...' : 'Real-time connection active'}
        </span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Users Grid */}
      {loading && users.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {users.length === 0 ? 'Get started by creating your first user.' : 'Try adjusting your search or filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredUsers.map((user, index) => renderUserCard(user, index))}
          </AnimatePresence>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && renderUserModal(false)}
        {showEditModal && renderUserModal(true)}
      </AnimatePresence>
    </div>
  );
};

export default RealUserManagement;
