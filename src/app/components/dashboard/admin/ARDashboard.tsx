// ============================================================================
// AR DASHBOARD - AUGMENTED REALITY ANALYTICS VIEW
// Transcendent reality manipulation interface with cosmic consciousness
// ============================================================================

import { motion } from 'framer-motion';
import {
  Activity,
  Camera,
  DollarSign,
  Eye,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Scan,
  Settings,
  Shield,
  Users
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// ============================================================================
// COSMIC INTERFACES
// ============================================================================

interface ARMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  position: { x: number; y: number; z: number };
  color: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  type: '3d-bar' | '3d-pie' | '3d-line' | 'hologram';
}

interface ARScene {
  id: string;
  name: string;
  description: string;
  metrics: ARMetric[];
  cameraPosition: { x: number; y: number; z: number };
  isActive: boolean;
}

interface ARControls {
  isPlaying: boolean;
  rotationSpeed: number;
  zoom: number;
  perspective: 'overview' | 'detailed' | 'immersive';
}

// ============================================================================
// AR DASHBOARD COMPONENT
// ============================================================================

const ARDashboard: React.FC = () => {
  const [arScenes, setArScenes] = useState<ARScene[]>([]);
  const [activeScene, setActiveScene] = useState<string>('overview');
  const [controls, setControls] = useState<ARControls>({
    isPlaying: true,
    rotationSpeed: 1,
    zoom: 1,
    perspective: 'overview',
  });
  const [isARSupported, setIsARSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ============================================================================
  // COSMIC DATA GENERATION
  // ============================================================================

  const generateARMetrics = (): ARMetric[] => [
    {
      id: 'revenue-3d',
      title: 'Revenue Flow',
      value: '$2.84M',
      change: 12.5,
      position: { x: 0, y: 0, z: 0 },
      color: 'emerald',
      icon: DollarSign,
      type: '3d-bar',
    },
    {
      id: 'users-hologram',
      title: 'User Engagement',
      value: '87.3%',
      change: 8.7,
      position: { x: 2, y: 1, z: -1 },
      color: 'blue',
      icon: Users,
      type: 'hologram',
    },
    {
      id: 'performance-line',
      title: 'System Performance',
      value: '99.7%',
      change: 2.1,
      position: { x: -2, y: 0.5, z: 1 },
      color: 'purple',
      icon: Activity,
      type: '3d-line',
    },
    {
      id: 'security-pie',
      title: 'Security Status',
      value: 'Optimal',
      change: 0.3,
      position: { x: 1, y: -1, z: 2 },
      color: 'red',
      icon: Shield,
      type: '3d-pie',
    },
  ];

  const generateARScenes = (): ARScene[] => [
    {
      id: 'overview',
      name: 'Cosmic Overview',
      description: 'Complete platform analytics in 3D space',
      metrics: generateARMetrics(),
      cameraPosition: { x: 0, y: 2, z: 5 },
      isActive: true,
    },
    {
      id: 'financial',
      name: 'Financial Dimension',
      description: 'Revenue and financial metrics visualization',
      metrics: generateARMetrics().filter(m => m.id.includes('revenue')),
      cameraPosition: { x: 2, y: 1, z: 3 },
      isActive: false,
    },
    {
      id: 'performance',
      name: 'Performance Realm',
      description: 'System performance and monitoring',
      metrics: generateARMetrics().filter(m => m.id.includes('performance')),
      cameraPosition: { x: -1, y: 3, z: 4 },
      isActive: false,
    },
  ];

  // ============================================================================
  // COSMIC EFFECTS
  // ============================================================================

  useEffect(() => {
    const initializeAR = async () => {
      setIsLoading(true);

      // Check AR support
      if ('xr' in navigator) {
        try {
          const isSupported = await (navigator as any).xr?.isSessionSupported('immersive-ar');
          setIsARSupported(isSupported || false);
        } catch (error) {
          setIsARSupported(false);
        }
      } else {
        setIsARSupported(false);
      }

      // Initialize scenes
      setArScenes(generateARScenes());

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    initializeAR();
  }, []);

  useEffect(() => {
    if (!controls.isPlaying) return;

    const interval = setInterval(() => {
      // Update AR metrics with new data
      setArScenes(prev => prev.map(scene => ({
        ...scene,
        metrics: scene.metrics.map(metric => ({
          ...metric,
          value: typeof metric.value === 'number'
            ? metric.value + (Math.random() - 0.5) * 10
            : metric.value,
          change: metric.change + (Math.random() - 0.5) * 2,
        })),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [controls.isPlaying]);

  // ============================================================================
  // AR HANDLERS
  // ============================================================================

  const handleSceneChange = (sceneId: string) => {
    setActiveScene(sceneId);
    setArScenes(prev => prev.map(scene => ({
      ...scene,
      isActive: scene.id === sceneId,
    })));
  };

  const handleControlChange = (key: keyof ARControls, value: any) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const startARSession = async () => {
    if (!isARSupported) {
      alert('AR is not supported on this device');
      return;
    }

    try {
      // This would initialize actual AR session in production
      console.log('Starting AR session...');
      alert('AR session would start here (requires AR-capable device)');
    } catch (error) {
      console.error('Failed to start AR session:', error);
    }
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderARMetric = (metric: ARMetric, index: number) => {
    const Icon = metric.icon;

    return (
      <motion.div
        key={metric.id}
        initial={{ opacity: 0, scale: 0, rotateY: -180 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: 0,
          x: metric.position.x * 50,
          y: metric.position.y * 30,
          z: metric.position.z * 20,
        }}
        transition={{
          delay: index * 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{
          scale: 1.1,
          rotateY: 15,
          transition: { duration: 0.3 }
        }}
        className={`relative transform-gpu perspective-1000 cursor-pointer group`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `
            translateX(${metric.position.x * 50}px)
            translateY(${metric.position.y * 30}px)
            translateZ(${metric.position.z * 20}px)
            rotateY(${controls.isPlaying ? index * 10 : 0}deg)
            scale(${controls.zoom})
          `,
        }}
      >
        {/* 3D Metric Card */}
        <div className={`relative w-48 h-32 bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/30 backdrop-blur-xl rounded-2xl border border-${metric.color}-400/30 shadow-2xl group-hover:shadow-${metric.color}-500/25 transition-all duration-500`}>

          {/* Holographic Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Content */}
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className={`p-2 bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 rounded-lg shadow-lg`}>
                <Icon size={20} className="text-white" />
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${metric.color}-100/80 text-${metric.color}-800 dark:bg-${metric.color}-900/30 dark:text-${metric.color}-300`}>
                {metric.type.toUpperCase()}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/90 mb-1">
                {metric.title}
              </h3>
              <p className="text-xl font-bold text-white">
                {metric.value}
              </p>
              <p className={`text-xs ${
                metric.change > 0 ? 'text-emerald-300' : 'text-red-300'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* 3D Depth Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-600/10 to-${metric.color}-700/20 rounded-2xl transform translate-x-1 translate-y-1 -z-10`} />
          <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-700/5 to-${metric.color}-800/15 rounded-2xl transform translate-x-2 translate-y-2 -z-20`} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-${metric.color}-400 rounded-full`}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 25}%`,
                top: `${60 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  const renderARControls = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
        <Settings size={20} />
        <span>AR Controls</span>
      </h3>

      <div className="space-y-4">
        {/* Playback Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleControlChange('isPlaying', !controls.isPlaying)}
            className={`p-2 rounded-lg transition-colors ${
              controls.isPlaying
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-600 text-slate-300'
            }`}
          >
            {controls.isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={() => handleControlChange('rotationSpeed', 1)}
            className="p-2 rounded-lg bg-slate-600 text-slate-300 hover:bg-slate-500 transition-colors"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={startARSession}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
          >
            <Camera size={16} />
            <span>Start AR</span>
          </button>
        </div>

        {/* Zoom Control */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Zoom: {controls.zoom.toFixed(1)}x</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={controls.zoom}
            onChange={(e) => handleControlChange('zoom', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Perspective Control */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Perspective</label>
          <select
            value={controls.perspective}
            onChange={(e) => handleControlChange('perspective', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed</option>
            <option value="immersive">Immersive</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Initializing AR Reality</h2>
          <p className="text-purple-300">Materializing cosmic dimensions...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
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
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl">
                <Eye size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                  AR Analytics Dashboard
                </h1>
                <p className="text-purple-300 mt-1">
                  Transcendent reality visualization • {isARSupported ? 'AR Ready' : 'AR Not Supported'}
                </p>
              </div>
            </div>

            {/* Scene Selector */}
            <div className="flex items-center space-x-2">
              {arScenes.map((scene) => (
                <motion.button
                  key={scene.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSceneChange(scene.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    scene.isActive
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {scene.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main AR Viewport */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* AR Scene */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[600px] bg-gradient-to-br from-black/20 to-purple-900/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* AR Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />

              {/* 3D Metrics Display */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  {arScenes.find(s => s.isActive)?.metrics.map((metric, index) =>
                    renderARMetric(metric, index)
                  )}
                </div>
              </div>

              {/* AR Overlay UI */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg">
                  <Scan size={16} className="text-green-400 animate-pulse" />
                  <span className="text-white text-sm">AR Tracking Active</span>
                </div>

                <div className="flex items-center space-x-2 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg">
                  <Layers size={16} className="text-blue-400" />
                  <span className="text-white text-sm">{arScenes.find(s => s.isActive)?.metrics.length} Objects</span>
                </div>
              </div>

              {/* Cosmic Grid */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* AR Controls Panel */}
          <div className="space-y-6">
            {renderARControls()}

            {/* Scene Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Scene Information</h3>
              {arScenes.find(s => s.isActive) && (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-white/60">Active Scene</p>
                    <p className="text-white font-medium">{arScenes.find(s => s.isActive)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Description</p>
                    <p className="text-white/80 text-sm">{arScenes.find(s => s.isActive)?.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Metrics Count</p>
                    <p className="text-white font-medium">{arScenes.find(s => s.isActive)?.metrics.length}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARDashboard;
