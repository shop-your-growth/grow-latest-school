import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import NextImage from 'next/image';
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  image?: string;
  gradient: string;
  delay?: number;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  gradient,
  delay = 0,
  onClick
}) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        whileHover={{
          scale: 1.02,
          y: -8,
          rotateX: 5,
          rotateY: 5
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={onClick}
      >
        {/* Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Floating Particles */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-[#E0B58F] rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 0.5
          }}
        />

        {/* Image/Visual Section */}
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <div className="relative w-full h-full">
              <NextImage
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-20 relative`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/15 rounded-full blur-lg"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 15, 0],
                    scale: [1, 0.8, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={32} className="text-[#E0B58F]" />
                </motion.div>
              </div>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Floating Badge */}
          <motion.div
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 flex items-center space-x-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
          >
            <Sparkles size={12} className="text-[#E0B58F]" />
            <span className="text-xs text-white font-medium">New</span>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 space-y-4">
          {/* Title */}
          <motion.h3
            className="text-xl font-semibold text-[#F5F0E9] group-hover:text-[#E0B58F] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p className="text-[#D9CBC2] text-sm leading-relaxed group-hover:text-[#F5F0E9] transition-colors duration-300">
            {description}
          </p>

          {/* Action Button */}
          <motion.div
            className="flex items-center justify-between pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          >
            <motion.button
              className="flex items-center space-x-2 text-[#E0B58F] hover:text-[#F5F0E9] transition-colors group/btn"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-sm font-medium">Learn More</span>
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>

            {/* Progress Indicator */}
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-[#E0B58F]/30 rounded-full"
                  animate={{
                    backgroundColor: [
                      "rgba(224, 181, 143, 0.3)",
                      "rgba(224, 181, 143, 0.8)",
                      "rgba(224, 181, 143, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#E0B58F]/10 via-transparent to-[#3C507D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        />

        {/* Border Glow */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#E0B58F]/20 via-[#3C507D]/20 to-[#E0B58F]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"
        />
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
