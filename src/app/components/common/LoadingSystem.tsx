'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'divine' | 'minimal' | 'pulse';
  color?: 'blue' | 'purple' | 'green' | 'gold';
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  color = 'blue',
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    gold: 'text-yellow-600'
  };

  if (variant === 'divine') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className={`${sizeClasses[size]} ${colorClasses[color]} relative`}>
            <Sparkles className="w-full h-full" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0"
            >
              <Zap className="w-full h-full text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm font-medium text-gray-600"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center space-x-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} ${colorClasses[color]}`}
        >
          <Loader2 className="w-full h-full" />
        </motion.div>
        {text && <span className="text-sm text-gray-600">{text}</span>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center space-y-3">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full bg-current opacity-20`}
        />
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm font-medium text-gray-600"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-col items-center space-y-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      {text && (
        <p className="text-sm font-medium text-gray-600">{text}</p>
      )}
    </div>
  );
}

interface FullPageLoadingProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'divine' | 'minimal';
}

export function FullPageLoading({ 
  title = "Loading...", 
  subtitle,
  variant = 'divine'
}: FullPageLoadingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <LoadingSpinner size="xl" variant={variant} color="gold" />
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mt-6 mb-2"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-purple-300"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave';
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse'
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${animationClasses[animation]} 
        ${className}
      `}
    />
  );
}

interface ProgressBarProps {
  progress: number;
  variant?: 'default' | 'divine' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  color?: 'blue' | 'purple' | 'green' | 'gold';
}

export function ProgressBar({ 
  progress, 
  variant = 'default',
  size = 'md',
  showPercentage = true,
  color = 'blue'
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    gold: 'bg-yellow-600'
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  if (variant === 'divine') {
    return (
      <div className="w-full">
        <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full relative`}
          >
            <motion.div
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white opacity-30 w-1/3"
            />
          </motion.div>
        </div>
        {showPercentage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600 mt-2 text-center"
          >
            {Math.round(clampedProgress)}%
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
        />
      </div>
      {showPercentage && (
        <p className="text-sm text-gray-600 mt-1 text-right">
          {Math.round(clampedProgress)}%
        </p>
      )}
    </div>
  );
}

// Loading states for different components
export const LoadingStates = {
  Button: ({ children, isLoading, ...props }: any) => (
    <button {...props} disabled={isLoading}>
      {isLoading ? (
        <LoadingSpinner size="sm" variant="minimal" />
      ) : (
        children
      )}
    </button>
  ),

  Card: ({ isLoading, children, ...props }: any) => (
    <div {...props}>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        children
      )}
    </div>
  ),

  Table: ({ isLoading, rows = 5, cols = 4 }: any) => (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
};
