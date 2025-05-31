import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import React, { useState, useRef } from 'react';

interface HeroVideoProps {
  className?: string;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#112250] to-[#2a3f6f] ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Background Placeholder */}
      <div className="relative w-full h-full lg:aspect-video bg-gradient-to-br from-[#112250] via-[#1a2d5a] to-[#2a3f6f] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#E0B58F]/20 rounded-full blur-2xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#3C507D]/30 rounded-full blur-xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E0B58F' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Video Content Simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Dashboard Preview */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-3 sm:p-6 max-w-xs sm:max-w-md mx-auto"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1 bg-white/20 rounded-lg h-6"></div>
              </div>

              {/* Simulated Dashboard Content */}
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-[#E0B58F]/30 rounded-xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#E0B58F] rounded-lg"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                    <div className="h-2 bg-white/20 rounded w-1/2"></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-12 bg-white/20 rounded-lg"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.h3
              className="text-lg sm:text-2xl font-bold text-[#F5F0E9]"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              See GROW YouR NEED in Action
            </motion.h3>
            <p className="text-sm sm:text-base text-[#D9CBC2] max-w-xs sm:max-w-sm mx-auto">
              Experience the future of educational management with our intuitive platform
            </p>
          </motion.div>
        </div>

        {/* Play Button Overlay - Hidden */}
        {/* <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={togglePlay}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center text-[#F5F0E9] hover:bg-white/30 transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={24} className="sm:w-8 sm:h-8 ml-1 group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div> */}
      </div>

      {/* Video Controls - Hidden */}
      {/* <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={togglePlay}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </motion.button>

            <motion.button
              onClick={toggleMute}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>
          </div>

          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize size={16} />
          </motion.button>
        </div>
      </motion.div> */}

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#E0B58F]/20 via-[#3C507D]/20 to-[#E0B58F]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </motion.div>
  );
};

export default HeroVideo;
