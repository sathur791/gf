import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { Sparkles } from 'lucide-react';
import { SparkleBurst } from './SparkleBurst';
import { StarField } from './StarField';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

interface GiftOpeningProps {
  onComplete: () => void;
}

export const GiftOpening: React.FC<GiftOpeningProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1C515F] via-[#133F4B] via-45% via-[#0C2B34] to-[#071E25]">
      {/* Ambient Radial Spotlight & Deep Vignette matching reference */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(28, 81, 95, 0.45) 0%, rgba(12, 43, 52, 0.7) 65%, rgba(7, 30, 37, 0.95) 100%)',
        }}
      />

      {/* Subtle Ethereal Starlight Dust */}
      <StarField count={32} />

      {/* ============================================================ */}
      {/* 1. EXPANDING RADIANT CELESTIAL LIGHT                         */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.75, 0.25], scale: [0.3, 2.2, 4] }}
        transition={{ duration: 1.4, delay: 0.8, ease: EASE_OUT_EXPO }}
        className="absolute w-[46rem] h-[46rem] rounded-full bg-radial from-[#C8EFEA]/50 via-[#1C5968]/45 via-50% to-transparent blur-3xl pointer-events-none"
      />

      {/* Secondary warm gold halo ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.45, 0], scale: [0.5, 2.2, 3.2] }}
        transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
        className="absolute w-96 h-96 rounded-full border border-[#D4AF37]/35 pointer-events-none"
      />

      {/* Sparkle burst on seal break */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <SparkleBurst count={24} />
      </motion.div>

      {/* Floating Stardust Burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 2.8], rotate: [0, 45, 90] }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-8 text-[#FFFDF8]"
        >
          <Sparkles className="w-8 h-8 text-[#F5D895]" />
          <Sparkles className="w-12 h-12 text-[#8ED4D6]" />
          <Sparkles className="w-8 h-8 text-[#FFE39E]" />
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. PHYSICAL ENVELOPE UNSEALS & LETTER RISES                  */}
      {/* ============================================================ */}
      <div className="relative flex flex-col items-center perspective-1000">
        {/* Rising Paper Letter from inside */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.88, rotateX: 15 }}
          animate={{
            y: [-20, -85],
            opacity: [0, 1, 1],
            scale: [0.88, 1.05, 1.12],
            rotateX: [15, 0, -5],
          }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-64 sm:w-76 bg-gradient-to-b from-[#FFFDF9] to-[#F7F3EA] rounded-2xl border border-[#D4AF37]/45 shadow-[0_25px_60px_rgba(3,18,23,0.7)] p-5 sm:p-6 text-center z-20 mb-[-80px] relative overflow-hidden shimmer-surface"
        >
          {/* Subtle gold hairline inner frame */}
          <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/25 pointer-events-none" />

          {/* Soft gold ambient corner tint */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#D4AF37]/15 to-transparent rounded-full blur-lg pointer-events-none" />

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#8C6D23] font-semibold mb-1 relative z-10"
          >
            FOR KALAIVANI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT_EXPO }}
            className="text-xl sm:text-2xl font-serif text-[#0E353F] font-light italic relative z-10"
          >
            A little world for you.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-2 relative z-10"
          />
        </motion.div>

        {/* Envelope Body - Elegant Deep Peacock Teal & Gold Foil */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{
            scale: [0.9, 1.02, 1.06, 1.12],
            y: [20, 0, 8, 20],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2.4, times: [0, 0.15, 0.7, 1], ease: EASE_OUT_EXPO }}
          className="relative w-72 sm:w-84 h-44 sm:h-46 rounded-2xl border border-[#D4AF37]/40 shadow-[0_28px_65px_rgba(3,18,23,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden z-10 bg-gradient-to-b from-[#184F5C] via-[#123943] to-[#0A262E]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle gold foil geometric envelope creases */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            viewBox="0 0 340 190"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 190 L135 95" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
            <path d="M340 190 L205 95" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
            <path
              d="M0 190 L170 105 L340 190"
              fill="rgba(14, 47, 56, 0.45)"
              stroke="rgba(212,175,55,0.25)"
              strokeWidth="0.8"
            />
          </svg>

          {/* Envelope Flap Unfolding */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: [0, 180] }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 inset-x-0 h-24 origin-top z-20"
          >
            <svg
              className="w-full h-full drop-shadow-md"
              viewBox="0 0 340 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="openingFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1E5C6B" />
                  <stop offset="100%" stopColor="#123B44" />
                </linearGradient>
              </defs>
              <path
                d="M0 0 L170 100 L340 0 Z"
                fill="url(#openingFlapGrad)"
                stroke="rgba(212,175,55,0.5)"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>

          {/* 3D Wax Seal Breaking - Royal Molten Gold */}
          <motion.div
            initial={{ scale: 1, rotate: 0, opacity: 1 }}
            animate={{ scale: [1, 1.3, 0], rotate: [0, -12, 30], opacity: [1, 1, 0] }}
            transition={{ duration: 0.55, times: [0, 0.35, 1], delay: 0 }}
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#F5D895] via-[#C99E42] to-[#8C6B1B] text-[#0A262E] flex items-center justify-center font-serif text-lg font-bold shadow-[0_8px_20px_rgba(0,0,0,0.45),0_0_18px_rgba(212,175,55,0.4)] z-30 border-2 border-[#FFEBB3]/60 cursor-pointer"
          >
            <span className="drop-shadow-xs italic text-base">
              {birthdayContent.envelope.sealText}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Atmospheric Dissolve Flash - Deep Celestial Veil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.92, 0] }}
        transition={{ duration: 2.4, times: [0, 0.65, 0.8, 0.92, 1] }}
        className="absolute inset-0 bg-gradient-to-b from-[#1C515F] via-[#113741] to-[#071E25] pointer-events-none z-40"
      />
    </div>
  );
};

export default GiftOpening;
