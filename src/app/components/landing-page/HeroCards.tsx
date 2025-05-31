import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroCards: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="hero-cards-wrapper">
        {/* Card 1 - AI Education */}
        <div className="hero-card card-1">
          <img
            src="/assets/logo/logo2.png"
            alt="AI-powered learning platform interface"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'none',
              zIndex: 5,
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Card 2 - Students */}
        <div className="hero-card card-2">
          <img
            src="/assets/logo/logo3.png"
            alt="Educational platform and course management"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'none',
              zIndex: 5,
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Card 3 - Education */}
        <div className="hero-card card-3">
          <img
            src="/assets/logo/logo4.png"
            alt="Student growth and progress tracking"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'none',
              zIndex: 5,
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Gradient definitions */}
        <svg style={{ visibility: 'hidden', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="gradient-full" x1="0%" y1="0%" x2="120%" y2="120%">
              <stop offset="0%" stopColor="#F5F0E9" />
              <stop offset="100%" stopColor="#F5F0E900" />
            </linearGradient>
            <linearGradient id="gradient-half" x1="-50%" y1="-50%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0B58F" />
              <stop offset="100%" stopColor="#E0B58F00" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated lines */}
        <div className="hero-lines">
          <div className="hero-line"></div>
          <div className="hero-line"></div>
        </div>
      </div>

      <style jsx>{`
        .hero-cards-wrapper {
          position: relative;
          overflow: visible;
          width: 100%;
          height: 240px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 8px;
          margin: 0 auto;
          padding: 0 20px 40px 20px;
        }

        .hero-card {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: visible;
          animation: heroRotating 12s ease-in-out infinite 0s, neonPulse 4s ease-in-out infinite;
          border-radius: 16px;
          width: 90px;
          height: 140px;
          padding: 0;
          transform-origin: center;
          flex-shrink: 0;
          border: 1px solid var(--neon-color, #fff);
          box-shadow:
            0 0 3px var(--neon-color, #fff),
            0 0 6px var(--neon-color, #fff),
            0 0 9px var(--neon-color, #fff);
          background: none !important;
          z-index: 10;
        }

        /* Desktop styles */
        @media (min-width: 768px) {
          .hero-cards-wrapper {
            gap: 20px;
            padding: 0 0 60px 0;
            overflow: visible;
            height: 300px;
            align-items: flex-end;
          }

          .hero-card {
            width: 120px;
            height: 180px;
          }
        }



        .card-1 {
          background: none !important;
          --delay: 4.3s;
          animation-delay: 0s;
          transform: rotate(-5deg) translateY(-5px);
          --neon-gradient: linear-gradient(45deg,
            #ff6b35, #ff8c42, #ffa726, #ffb74d,
            #ff6b35, #ff8c42, #ffa726, #ffb74d);
        }

        .card-2 {
          background: none !important;
          --delay: 7.3s;
          animation-delay: 3s;
          transform: rotate(0deg);
          --neon-gradient: linear-gradient(45deg,
            #00bcd4, #26c6da, #4dd0e1, #80deea,
            #00bcd4, #26c6da, #4dd0e1, #80deea);
        }

        .card-3 {
          background: none !important;
          --delay: 10.3s;
          animation-delay: 6s;
          transform: rotate(5deg) translateY(-5px);
          --neon-gradient: linear-gradient(45deg,
            #e91e63, #f06292, #f48fb1, #f8bbd9,
            #e91e63, #f06292, #f48fb1, #f8bbd9);
        }

        /* Desktop card rotations */
        @media (min-width: 768px) {
          .card-1 {
            transform: rotate(-10deg) translateY(-10px);
          }

          .card-3 {
            transform: rotate(10deg) translateY(-10px);
          }
        }

        @keyframes heroOpacity {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes heroRotating {
          0%, 100% {
            transform: translateY(0px) rotate(var(--initial-rotation, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(calc(var(--initial-rotation, 0deg) + 5deg));
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            box-shadow:
              0 0 3px var(--neon-color, #fff),
              0 0 6px var(--neon-color, #fff),
              0 0 9px var(--neon-color, #fff);
            border-color: var(--neon-color, #fff);
            opacity: 0.8;
          }
          50% {
            box-shadow:
              0 0 5px var(--neon-color, #fff),
              0 0 10px var(--neon-color, #fff),
              0 0 15px var(--neon-color, #fff);
            border-color: var(--neon-color, #fff);
            opacity: 1;
          }
        }

        .card-1 {
          --initial-rotation: -10deg;
          --neon-color: #ff6b35;
        }

        .card-2 {
          --initial-rotation: 0deg;
          --neon-color: #00bcd4;
        }

        .card-3 {
          --initial-rotation: 10deg;
          --neon-color: #e91e63;
        }

        .hero-lines {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }

        .hero-lines::after {
          content: "";
          width: 100%;
          height: 0px;
          position: absolute;
          z-index: 2;
          background: rgba(17, 34, 80, 0.1);
          mask-image: radial-gradient(50% 200px at top, transparent 20%, rgba(17, 34, 80, 0.1));
        }

        .hero-line {
          position: absolute;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-line::before,
        .hero-line::after {
          content: "";
          position: absolute;
          background: linear-gradient(to right, transparent, #E0B58F, transparent);
          height: 2px;
        }

        .hero-line:nth-child(1)::before {
          filter: blur(4px);
          width: 100%;
          height: 5px;
        }

        .hero-line:nth-child(1)::after {
          width: 100%;
          height: 1px;
        }

        .hero-line:nth-child(2)::before {
          filter: blur(4px);
          width: 50%;
          height: 5px;
        }

        .hero-line:nth-child(2)::after {
          width: 50%;
          height: 1px;
        }
      `}</style>
    </motion.div>
  );
};

export default HeroCards;
