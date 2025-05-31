import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <motion.div
      className={`flex items-center space-x-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Logo Icon */}
      <motion.div
        className={`${sizeClasses[size]} relative overflow-hidden rounded-2xl shadow-lg`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Logo Image */}
        <div className="relative w-full h-full">
          <Image
            src="/assets/logo/logo.png"
            alt="GROW YouR NEED Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 32px, (max-width: 1024px) 48px, 64px"
          />
        </div>

        {/* Subtle Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 to-[#3C507D]/10 rounded-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.span
            className={`${textSizeClasses[size]} font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E0B58F] to-[#F5F0E9] leading-tight`}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            GROW
          </motion.span>
          <motion.span
            className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'} text-[#D9CBC2] font-medium -mt-1`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            YouR NEED
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;
