// ============================================================================
// AR GLOBE VIEW - AUGMENTED REALITY GEOGRAPHICAL VISUALIZATION
// Cosmic geographical consciousness with multidimensional awareness
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import {
  Compass,
  Globe,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Satellite,
  Search,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// COSMIC INTERFACES
// ============================================================================

interface GeoLocation {
  id: string;
  name: string;
  country: string;
  coordinates: { lat: number; lng: number };
  metrics: {
    users: number;
    revenue: number;
    growth: number;
    activity: number;
  };
  status: 'active' | 'growing' | 'stable' | 'declining';
  color: string;
}

interface GlobeControls {
  rotation: { x: number; y: number; z: number };
  zoom: number;
  isRotating: boolean;
  viewMode: 'globe' | 'flat' | 'satellite';
  showMetrics: boolean;
  showConnections: boolean;
}

interface DataConnection {
  from: string;
  to: string;
  strength: number;
  type: 'data' | 'revenue' | 'users';
  animated: boolean;
}

// ============================================================================
// AR GLOBE VIEW COMPONENT
// ============================================================================

const ARGlobeView: React.FC = () => {
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [connections, setConnections] = useState<DataConnection[]>([]);
  const [controls, setControls] = useState<GlobeControls>({
    rotation: { x: 0, y: 0, z: 0 },
    zoom: 1,
    isRotating: true,
    viewMode: 'globe',
    showMetrics: true,
    showConnections: true,
  });
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const globeRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // COSMIC DATA GENERATION
  // ============================================================================

  const generateLocations = (): GeoLocation[] => [
    {
      id: 'usa-ny',
      name: 'New York',
      country: 'United States',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      metrics: { users: 15420, revenue: 284750, growth: 12.5, activity: 94.2 },
      status: 'growing',
      color: 'emerald',
    },
    {
      id: 'uk-london',
      name: 'London',
      country: 'United Kingdom',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      metrics: { users: 8930, revenue: 156890, growth: 8.7, activity: 87.3 },
      status: 'active',
      color: 'blue',
    },
    {
      id: 'japan-tokyo',
      name: 'Tokyo',
      country: 'Japan',
      coordinates: { lat: 35.6762, lng: 139.6503 },
      metrics: { users: 12340, revenue: 198450, growth: 15.2, activity: 91.8 },
      status: 'growing',
      color: 'purple',
    },
    {
      id: 'australia-sydney',
      name: 'Sydney',
      country: 'Australia',
      coordinates: { lat: -33.8688, lng: 151.2093 },
      metrics: { users: 5670, revenue: 89320, growth: 6.4, activity: 82.1 },
      status: 'stable',
      color: 'orange',
    },
    {
      id: 'brazil-sao-paulo',
      name: 'São Paulo',
      country: 'Brazil',
      coordinates: { lat: -23.5505, lng: -46.6333 },
      metrics: { users: 7890, revenue: 112340, growth: 18.9, activity: 88.7 },
      status: 'growing',
      color: 'green',
    },
    {
      id: 'india-mumbai',
      name: 'Mumbai',
      country: 'India',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      metrics: { users: 11230, revenue: 145670, growth: 22.3, activity: 89.4 },
      status: 'growing',
      color: 'indigo',
    },
  ];

  const generateConnections = (): DataConnection[] => [
    { from: 'usa-ny', to: 'uk-london', strength: 85, type: 'data', animated: true },
    { from: 'uk-london', to: 'japan-tokyo', strength: 72, type: 'revenue', animated: true },
    { from: 'japan-tokyo', to: 'australia-sydney', strength: 68, type: 'users', animated: true },
    { from: 'usa-ny', to: 'brazil-sao-paulo', strength: 79, type: 'data', animated: true },
    { from: 'india-mumbai', to: 'usa-ny', strength: 91, type: 'revenue', animated: true },
  ];

  // ============================================================================
  // COSMIC EFFECTS
  // ============================================================================

  useEffect(() => {
    const initializeGlobe = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLocations(generateLocations());
      setConnections(generateConnections());
      setIsLoading(false);
    };

    initializeGlobe();
  }, []);

  useEffect(() => {
    if (!controls.isRotating) return;

    const interval = setInterval(() => {
      setControls(prev => ({
        ...prev,
        rotation: {
          ...prev.rotation,
          y: (prev.rotation.y + 1) % 360,
        },
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [controls.isRotating]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(selectedLocation === locationId ? null : locationId);
  };

  const handleControlChange = (key: keyof GlobeControls, value: any) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderGlobeLocation = (location: GeoLocation, index: number) => {
    const isSelected = selectedLocation === location.id;
    const statusColors = {
      active: 'blue',
      growing: 'emerald',
      stable: 'yellow',
      declining: 'red',
    };

    // Convert lat/lng to 3D coordinates (simplified)
    const phi = (90 - location.coordinates.lat) * (Math.PI / 180);
    const theta = (location.coordinates.lng + 180) * (Math.PI / 180);
    const radius = 200;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return (
      <motion.div
        key={location.id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: isSelected ? 1.5 : 1,
          x: x * controls.zoom,
          y: y * controls.zoom,
          z: z * controls.zoom,
        }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.2 }}
        onClick={() => handleLocationClick(location.id)}
        className="absolute cursor-pointer transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transform: `
            rotateX(${controls.rotation.x}deg)
            rotateY(${controls.rotation.y}deg)
            rotateZ(${controls.rotation.z}deg)
            translateX(${x * controls.zoom}px)
            translateY(${y * controls.zoom}px)
            translateZ(${z * controls.zoom}px)
          `,
        }}
      >
        {/* Location Pin */}
        <div className={`relative w-6 h-6 bg-gradient-to-br from-${statusColors[location.status]}-500 to-${statusColors[location.status]}-600 rounded-full shadow-lg border-2 border-white group`}>
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 bg-${statusColors[location.status]}-400 rounded-full opacity-50`}
          />

          {/* Pulse Effect */}
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`absolute inset-0 bg-${statusColors[location.status]}-400 rounded-full`}
          />
        </div>

        {/* Location Info Card */}
        <AnimatePresence>
          {(isSelected || controls.showMetrics) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-4 z-10"
            >
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {location.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {location.country}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Users</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {location.metrics.users.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Revenue</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      ${(location.metrics.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Growth</p>
                    <p className={`font-medium ${
                      location.metrics.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      +{location.metrics.growth}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Activity</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {location.metrics.activity}%
                    </p>
                  </div>
                </div>

                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-${statusColors[location.status]}-100 text-${statusColors[location.status]}-800 dark:bg-${statusColors[location.status]}-900/30 dark:text-${statusColors[location.status]}-300`}>
                  <div className={`w-2 h-2 rounded-full bg-${statusColors[location.status]}-500`} />
                  <span className="capitalize">{location.status}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderGlobeControls = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
        <Compass size={20} />
        <span>Globe Controls</span>
      </h3>

      <div className="space-y-4">
        {/* Rotation Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleControlChange('isRotating', !controls.isRotating)}
            className={`p-2 rounded-lg transition-colors ${
              controls.isRotating
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-600 text-slate-300'
            }`}
          >
            {controls.isRotating ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={() => handleControlChange('rotation', { x: 0, y: 0, z: 0 })}
            className="p-2 rounded-lg bg-slate-600 text-slate-300 hover:bg-slate-500 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* View Mode */}
        <div>
          <label className="block text-sm text-white/80 mb-2">View Mode</label>
          <select
            value={controls.viewMode}
            onChange={(e) => handleControlChange('viewMode', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="globe">3D Globe</option>
            <option value="flat">Flat Map</option>
            <option value="satellite">Satellite View</option>
          </select>
        </div>

        {/* Zoom Control */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Zoom: {controls.zoom.toFixed(1)}x</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={controls.zoom}
            onChange={(e) => handleControlChange('zoom', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Display Options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={controls.showMetrics}
              onChange={(e) => handleControlChange('showMetrics', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-white/80">Show Metrics</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={controls.showConnections}
              onChange={(e) => handleControlChange('showConnections', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-white/80">Show Connections</span>
          </label>
        </div>
      </div>
    </motion.div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Materializing Globe</h2>
          <p className="text-blue-300">Rendering cosmic geographical data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
                <Globe size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                  AR Globe View
                </h1>
                <p className="text-blue-300 mt-1">
                  Cosmic geographical visualization • {locations.length} Active Locations
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/60"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Globe View */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Globe Container */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              ref={globeRef}
              className="relative h-[700px] bg-gradient-to-br from-black/20 to-blue-900/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Globe Sphere */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotateY: controls.isRotating ? 360 : controls.rotation.y,
                  }}
                  transition={{
                    duration: controls.isRotating ? 20 : 0,
                    repeat: controls.isRotating ? Infinity : 0,
                    ease: "linear",
                  }}
                  className="relative w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-800/30 border border-blue-400/30 shadow-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `scale(${controls.zoom})`,
                  }}
                >
                  {/* Globe Grid */}
                  <div className="absolute inset-0 rounded-full opacity-30">
                    <svg className="w-full h-full">
                      <defs>
                        <pattern id="globeGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <circle cx="50%" cy="50%" r="48%" fill="url(#globeGrid)" />
                    </svg>
                  </div>

                  {/* Locations */}
                  <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                    {locations.map((location, index) => renderGlobeLocation(location, index))}
                  </div>

                  {/* Globe Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent animate-pulse" />
                </motion.div>
              </div>

              {/* Data Connections */}
              {controls.showConnections && (
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    {connections.map((connection, index) => (
                      <motion.line
                        key={`${connection.from}-${connection.to}`}
                        x1="20%"
                        y1="30%"
                        x2="80%"
                        y2="70%"
                        stroke="rgba(59,130,246,0.6)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
                    ))}
                  </svg>
                </div>
              )}

              {/* AR Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg">
                  <Satellite size={16} className="text-blue-400 animate-pulse" />
                  <span className="text-white text-sm">Global Tracking Active</span>
                </div>

                <div className="flex items-center space-x-2 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg">
                  <MapPin size={16} className="text-green-400" />
                  <span className="text-white text-sm">{locations.length} Locations</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {renderGlobeControls()}

            {/* Location Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Global Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total Users</span>
                  <span className="text-white font-medium">
                    {locations.reduce((sum, loc) => sum + loc.metrics.users, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total Revenue</span>
                  <span className="text-white font-medium">
                    ${(locations.reduce((sum, loc) => sum + loc.metrics.revenue, 0) / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Avg Growth</span>
                  <span className="text-emerald-400 font-medium">
                    +{(locations.reduce((sum, loc) => sum + loc.metrics.growth, 0) / locations.length).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Active Regions</span>
                  <span className="text-white font-medium">{locations.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARGlobeView;
