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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#073F4D]">
      <StarField count={30} />

      {/* ============================================================ */}
      {/* 1. EXPANDING RADIANT CELESTIAL LIGHT                         */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.9, 0.35], scale: [0.3, 2.2, 4] }}
        transition={{ duration: 1.4, delay: 0.8, ease: EASE_OUT_EXPO }}
        className="absolute w-[46rem] h-[46rem] rounded-full bg-radial from-[#FFFDF8] via-[#8ED4D6]/70 to-transparent blur-3xl pointer-events-none"
      />

      {/* Secondary warm glow ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.5, 2.5, 3.5] }}
        transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
        className="absolute w-96 h-96 rounded-full border-2 border-[#FFE39E]/30 pointer-events-none"
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
          <Sparkles className="w-8 h-8 text-amber-200" />
          <Sparkles className="w-12 h-12 text-[#8ED4D6]" />
          <Sparkles className="w-8 h-8 text-[#B8E7E5]" />
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. PHYSICAL ENVELOPE UNSEALS & LETTER RISES                  */}
      {/* ============================================================ */}
      <div className="relative flex flex-col items-center perspective-1000">
        {/* Rising Paper Letter from inside */}
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.88, rotateX: 15 }}
          animate={{ y: [-20, -80], opacity: [0, 1, 1], scale: [0.88, 1.05, 1.12], rotateX: [15, 0, -5] }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-60 sm:w-72 bg-[#FFFDF8] rounded-2xl border border-[#B8E7E5]/40 shadow-[0_20px_50px_rgba(5,44,54,0.4)] p-5 text-center z-20 mb-[-80px] shimmer-surface"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#147C8A] font-semibold mb-1"
          >
            FOR KALAIVANI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT_EXPO }}
            className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light italic"
          >
            A little world for you.
          </motion.h2>
        </motion.div>

        {/* Envelope Body */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{
            scale: [0.9, 1.02, 1.06, 1.12],
            y: [20, 0, 8, 20],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2.4, times: [0, 0.15, 0.7, 1], ease: EASE_OUT_EXPO }}
          className="relative w-72 sm:w-80 h-44 bg-[#FAF6ED] rounded-2xl border border-[#0B6075]/20 shadow-[0_24px_60px_rgba(5,44,54,0.45)] flex items-center justify-center overflow-hidden z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Envelope Flap Unfolding */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: [0, 180] }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 inset-x-0 h-22 bg-[#FFFDF8] border-b border-[#0B6075]/15 shadow-sm"
          />

          {/* 3D Wax Seal Breaking with crack shards */}
          <motion.div
            initial={{ scale: 1, rotate: 0, opacity: 1 }}
            animate={{ scale: [1, 1.3, 0], rotate: [0, -12, 30], opacity: [1, 1, 0] }}
            transition={{ duration: 0.55, times: [0, 0.35, 1], delay: 0 }}
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#B85460] via-[#943B45] to-[#742831] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-medium shadow-lg z-30 border border-white/30"
          >
            {birthdayContent.envelope.sealText}
          </motion.div>
        </motion.div>
      </div>

      {/* Atmospheric Dissolve Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.9, 0] }}
        transition={{ duration: 2.4, times: [0, 0.65, 0.8, 0.92, 1] }}
        className="absolute inset-0 bg-[#EAF7F0] pointer-events-none z-40"
      />
    </div>
  );
};

export default GiftOpening;
