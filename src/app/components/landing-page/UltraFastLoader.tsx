import { motion } from 'framer-motion';
import React from 'react';

interface UltraFastLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  className?: string;
}

const UltraFastLoader: React.FC<UltraFastLoaderProps> = ({ 
  size = 'md', 
  color = '#E0B58F', 
  text = 'Loading...',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Ultra-fast spinning loader */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`${sizeClasses[size]} border-2 border-transparent rounded-full`}
          style={{ 
            borderTopColor: color,
            borderRightColor: `${color}40`
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className={`absolute inset-1 border-2 border-transparent rounded-full`}
          style={{ 
            borderBottomColor: color,
            borderLeftColor: `${color}60`
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
          />
        </motion.div>
      </div>

      {/* Loading text */}
      {text && (
        <motion.p 
          className={`${textSizeClasses[size]} font-medium`}
          style={{ color }}
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}

      {/* Progress dots */}
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: `${color}60` }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Inline loader for buttons
export const InlineLoader: React.FC<{ size?: number; color?: string }> = ({ 
  size = 16, 
  color = '#ffffff' 
}) => (
  <motion.div
    className="inline-block border-2 border-transparent rounded-full"
    style={{ 
      width: size,
      height: size,
      borderTopColor: color,
      borderRightColor: `${color}40`
    }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Page loader overlay
export const PageLoader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#112250]/95 via-[#1a2d5a]/95 to-[#2a3f6f]/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <UltraFastLoader 
          size="lg" 
          text="Signing you in..." 
          className="text-[#F5F0E9]"
        />
      </motion.div>
    </motion.div>
  );
};

export default UltraFastLoader;
