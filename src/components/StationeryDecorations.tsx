import React from 'react';
import { motion } from 'framer-motion';

export const StationeryDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Water Caustic Light Source in Aqua-Mint */}
      <div className="absolute top-[-10%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-radial from-[#BFE8EA]/45 via-[#75C9D0]/25 to-transparent blur-[90px] animate-caustics pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-radial from-[#CFEBDD]/40 via-[#4EA8DE]/20 to-transparent blur-[100px] animate-caustics pointer-events-none" style={{ animationDuration: '32s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[48rem] h-[48rem] rounded-full bg-radial from-[#DFF3EE]/50 via-[#75C9D0]/20 to-transparent blur-[110px] pointer-events-none" />

      {/* Floating Sea-Glass Sparkle 1 */}
      <motion.div
        className="absolute top-[14%] left-[8%] w-8 h-8 text-[#147D8A] opacity-35"
        animate={{
          y: [0, -22, 0],
          rotate: [0, 12, -6, 0],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8 7 9.5 0-3.5 1-6.5 3-9.5 2-3 5-4.5 8-5-1-3-4-5-8-5z" />
          <path d="M9 21.5c.5-4 2-7 5-9.5" />
        </svg>
      </motion.div>

      {/* Floating Mint Leaf with sway */}
      <motion.div
        className="absolute top-[32%] right-[7%] w-9 h-9 text-[#2A7B6B] opacity-30"
        animate={{
          y: [0, 24, 0],
          rotate: [-8, 16, -8],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M21 3C11.5 3.5 4 11 4 20.5 8.5 20.5 16 13 21 3z" />
          <path d="M4 20.5C9 15.5 14 10.5 21 3" />
        </svg>
      </motion.div>

      {/* Drifting Aqua Pearl Bubble */}
      <motion.div
        className="absolute top-[56%] left-[5%] w-7 h-7 text-[#75C9D0] opacity-40"
        animate={{
          y: [0, -18, 0],
          x: [0, 10, 0],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" opacity="0.35" />
          <circle cx="9" cy="9" r="2.5" fill="white" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Blue Shimmer Star */}
      <motion.div
        className="absolute top-[72%] right-[9%] w-6 h-6 text-[#4EA8DE] opacity-45"
        animate={{
          scale: [0.8, 1.25, 0.8],
          opacity: [0.25, 0.65, 0.25],
          rotate: [0, 45, 90],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4z" />
        </svg>
      </motion.div>

      {/* Jasmine Blossom Outline in soft mint */}
      <motion.div
        className="absolute top-[86%] left-[9%] w-8 h-8 text-[#2A7B6B] opacity-30"
        animate={{
          y: [0, -14, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.8,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 4c1 2.5 1 4.5 0 5.5-1-1-1-3 0-5.5z" />
          <path d="M12 20c1-2.5 1-4.5 0-5.5-1 1-1 3 0 5.5z" />
          <path d="M4 12c2.5 1 4.5 1 5.5 0-1-1-3-1-5.5 0z" />
          <path d="M21 12c-2.5 1-4.5 1-5.5 0 1-1 3-1 5.5 0z" />
        </svg>
      </motion.div>
    </div>
  );
};
