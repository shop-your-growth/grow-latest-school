// ============================================================================
// DIVINE USER ACTIVITY TRACKER - COSMIC BEHAVIOR ANALYSIS
// Advanced user behavior tracking with quantum-level insights
// ============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Clock,
  MousePointer,
  Eye,
  MapPin,
  Smartphone,
  Monitor,
  Activity,
  TrendingUp,
  Calendar,
  Globe,
  Zap
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  page: string;
  timestamp: Date;
  device: 'desktop' | 'mobile' | 'tablet';
  location: string;
  sessionDuration: number;
  isActive: boolean;
}

interface UserSession {
  userId: string;
  userName: string;
  userAvatar: string;
  startTime: Date;
  lastActivity: Date;
  pageViews: number;
  device: 'desktop' | 'mobile' | 'tablet';
  location: string;
  currentPage: string;
  isActive: boolean;
}

interface ActivityStats {
  totalUsers: number;
  activeUsers: number;
  avgSessionDuration: number;
  topPages: { page: string; views: number }[];
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
}

// ============================================================================
// USER ACTIVITY TRACKER COMPONENT
// ============================================================================

const UserActivityTracker: React.FC = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [activeSessions, setActiveSessions] = useState<UserSession[]>([]);
  const [stats, setStats] = useState<ActivityStats>({
    totalUsers: 0,
    activeUsers: 0,
    avgSessionDuration: 0,
    topPages: [],
    deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 }
  });
  const [isTracking, setIsTracking] = useState(true);

  // ============================================================================
  // DATA GENERATION
  // ============================================================================

  const generateUserActivity = (): UserActivity => {
    const users = [
      { id: '1', name: 'Alice Johnson', avatar: '👩‍💼' },
      { id: '2', name: 'Bob Smith', avatar: '👨‍💻' },
      { id: '3', name: 'Carol Davis', avatar: '👩‍🎓' },
      { id: '4', name: 'David Wilson', avatar: '👨‍🔬' },
      { id: '5', name: 'Emma Brown', avatar: '👩‍🎨' },
      { id: '6', name: 'Frank Miller', avatar: '👨‍🏫' },
      { id: '7', name: 'Grace Lee', avatar: '👩‍⚕️' },
      { id: '8', name: 'Henry Taylor', avatar: '👨‍🎯' }
    ];

    const actions = [
      'Viewed page',
      'Clicked button',
      'Downloaded file',
      'Submitted form',
      'Searched for',
      'Updated profile',
      'Logged in',
      'Logged out'
    ];

    const pages = [
      '/dashboard',
      '/profile',
      '/settings',
      '/analytics',
      '/reports',
      '/users',
      '/courses',
      '/assignments'
    ];

    const devices: ('desktop' | 'mobile' | 'tablet')[] = ['desktop', 'mobile', 'tablet'];
    const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Toronto, CA'];

    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const page = pages[Math.floor(Math.random() * pages.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return {
      id: `activity-${Date.now()}-${Math.random()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      action,
      page,
      timestamp: new Date(),
      device,
      location,
      sessionDuration: Math.floor(Math.random() * 3600),
      isActive: Math.random() > 0.3
    };
  };

  const generateUserSession = (): UserSession => {
    const users = [
      { id: '1', name: 'Alice Johnson', avatar: '👩‍💼' },
      { id: '2', name: 'Bob Smith', avatar: '👨‍💻' },
      { id: '3', name: 'Carol Davis', avatar: '👩‍🎓' },
      { id: '4', name: 'David Wilson', avatar: '👨‍🔬' },
      { id: '5', name: 'Emma Brown', avatar: '👩‍🎨' }
    ];

    const pages = ['/dashboard', '/profile', '/settings', '/analytics', '/reports'];
    const devices: ('desktop' | 'mobile' | 'tablet')[] = ['desktop', 'mobile', 'tablet'];
    const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU'];

    const user = users[Math.floor(Math.random() * users.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const currentPage = pages[Math.floor(Math.random() * pages.length)];

    const now = new Date();
    const startTime = new Date(now.getTime() - Math.random() * 3600000);

    return {
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      startTime,
      lastActivity: new Date(now.getTime() - Math.random() * 300000),
      pageViews: Math.floor(Math.random() * 20) + 1,
      device,
      location,
      currentPage,
      isActive: Math.random() > 0.2
    };
  };

  const updateStats = (activities: UserActivity[], sessions: UserSession[]) => {
    const activeUsers = sessions.filter(s => s.isActive).length;
    const totalUsers = sessions.length;
    const avgSessionDuration = sessions.reduce((acc, s) => acc + (Date.now() - s.startTime.getTime()), 0) / sessions.length / 1000 / 60;

    const pageViews = activities.reduce((acc, activity) => {
      const existing = acc.find(p => p.page === activity.page);
      if (existing) {
        existing.views++;
      } else {
        acc.push({ page: activity.page, views: 1 });
      }
      return acc;
    }, [] as { page: string; views: number }[]);

    const topPages = pageViews.sort((a, b) => b.views - a.views).slice(0, 5);

    const deviceCounts = sessions.reduce((acc, session) => {
      acc[session.device]++;
      return acc;
    }, { desktop: 0, mobile: 0, tablet: 0 });

    setStats({
      totalUsers,
      activeUsers,
      avgSessionDuration,
      topPages,
      deviceBreakdown: deviceCounts
    });
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        const newActivity = generateUserActivity();
        setActivities(prev => [newActivity, ...prev].slice(0, 50));

        // Update sessions occasionally
        if (Math.random() > 0.7) {
          const newSession = generateUserSession();
          setActiveSessions(prev => {
            const existing = prev.find(s => s.userId === newSession.userId);
            if (existing) {
              return prev.map(s => s.userId === newSession.userId ? newSession : s);
            } else {
              return [newSession, ...prev].slice(0, 20);
            }
          });
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isTracking]);

  useEffect(() => {
    updateStats(activities, activeSessions);
  }, [activities, activeSessions]);

  // ============================================================================
  // COMPONENTS
  // ============================================================================

  const ActivityItem: React.FC<{ activity: UserActivity }> = ({ activity }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border"
    >
      <div className="text-2xl">{activity.userAvatar}</div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{activity.userName}</span>
          <span className="text-gray-500">•</span>
          <span className="text-sm text-gray-600">{activity.action}</span>
          <span className="text-blue-600 font-medium">{activity.page}</span>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            {activity.device === 'desktop' ? <Monitor size={12} /> : 
             activity.device === 'mobile' ? <Smartphone size={12} /> : <Smartphone size={12} />}
            <span>{activity.device}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin size={12} />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{activity.timestamp.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full ${activity.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
    </motion.div>
  );

  const SessionItem: React.FC<{ session: UserSession }> = ({ session }) => {
    const sessionDuration = Math.floor((Date.now() - session.startTime.getTime()) / 1000 / 60);
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
      >
        <div className="flex items-center space-x-3">
          <div className="text-xl">{session.userAvatar}</div>
          <div>
            <div className="font-medium text-gray-900">{session.userName}</div>
            <div className="text-sm text-gray-600">{session.currentPage}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">{sessionDuration}m</div>
          <div className="text-xs text-gray-500">{session.pageViews} pages</div>
        </div>
        <div className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
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
          <h2 className="text-2xl font-bold text-gray-900">User Activity Tracker</h2>
          <p className="text-gray-600">Real-time user behavior and session monitoring</p>
        </div>
        
        <motion.button
          onClick={() => setIsTracking(!isTracking)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isTracking
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <User size={24} />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Now</p>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
            <Activity size={24} />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg. Session</p>
              <p className="text-2xl font-bold">{stats.avgSessionDuration.toFixed(0)}m</p>
            </div>
            <Clock size={24} />
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Top Page Views</p>
              <p className="text-2xl font-bold">{stats.topPages[0]?.views || 0}</p>
            </div>
            <Eye size={24} />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isTracking ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isTracking ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`} />
              <span className="text-sm font-medium">
                {isTracking ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {activities.slice(0, 10).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activeSessions.filter(s => s.isActive).map((session) => (
              <SessionItem key={session.userId} session={session} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Visited Pages</h3>
        <div className="space-y-3">
          {stats.topPages.map((page, index) => (
            <div key={page.page} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-700">{page.page}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{page.views}</span>
                <span className="text-sm text-gray-500">views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserActivityTracker;
