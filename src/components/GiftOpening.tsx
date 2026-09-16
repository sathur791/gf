import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { Sparkles } from 'lucide-react';

interface GiftOpeningProps {
  onComplete: () => void;
}

export const GiftOpening: React.FC<GiftOpeningProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // give the moment room to breathe
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#073F4D]">
      {/* ============================================================ */}
      {/* 1. EXPANDING RADIANT CELESTIAL LIGHT                         */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.8, 0.3], scale: [0.3, 2, 3.5] }}
        transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[46rem] h-[46rem] rounded-full bg-radial from-[#FFFDF8] via-[#8ED4D6]/70 to-transparent blur-3xl pointer-events-none"
      />

      {/* Floating Stardust Burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 2.4] }}
          transition={{ duration: 1.0, delay: 0.7, ease: 'easeOut' }}
          className="flex items-center gap-6 text-[#FFFDF8]"
        >
          <Sparkles className="w-8 h-8 text-amber-200" />
          <Sparkles className="w-10 h-10 text-[#8ED4D6]" />
          <Sparkles className="w-8 h-8 text-[#B8E7E5]" />
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 2. PHYSICAL ENVELOPE UNSEALS & LETTER RISES                  */}
      {/* ============================================================ */}
      <div className="relative flex flex-col items-center">
        {/* Rising Paper Letter from inside */}
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.92 }}
          animate={{ y: [20, -60], opacity: [0, 1], scale: [0.92, 1.1] }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-60 sm:w-72 bg-[#FFFDF8] rounded-2xl border border-[#B8E7E5]/40 shadow-[0_20px_50px_rgba(5,44,54,0.4)] p-5 text-center z-20 mb-[-80px]"
        >
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#147C8A] font-semibold mb-1">
            FOR KALAIVANI
          </p>
          <h2 className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light italic">
            A little world for you.
          </h2>
        </motion.div>

        {/* Envelope Body */}
        <motion.div
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{
            scale: [0.95, 1.02, 1.05, 1.1],
            y: [10, 0, 5, 15],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2.0, times: [0, 0.2, 0.75, 1], ease: [0.16, 1, 0.3, 1] }}
          className="relative w-72 sm:w-80 h-44 bg-[#FAF6ED] rounded-2xl border border-[#0B6075]/20 shadow-[0_24px_60px_rgba(5,44,54,0.45)] flex items-center justify-center overflow-hidden z-10"
        >
          {/* Envelope Flap Unfolding */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: [0, 180] }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 inset-x-0 h-22 bg-[#FFFDF8] border-b border-[#0B6075]/15 shadow-sm"
          />

          {/* 3D Wax Seal Breaking */}
          <motion.div
            initial={{ scale: 1, rotate: 0, opacity: 1 }}
            animate={{ scale: [1, 1.25, 0], rotate: [0, -8, 25], opacity: [1, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.4, 1], delay: 0 }}
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#B85460] via-[#943B45] to-[#742831] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-medium shadow-lg z-30 border border-white/30"
          >
            {birthdayContent.envelope.sealText}
          </motion.div>
        </motion.div>
      </div>

      {/* Atmospheric Dissolve Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.85, 0] }}
        transition={{ duration: 2.0, times: [0, 0.7, 0.85, 0.95, 1] }}
        className="absolute inset-0 bg-[#EAF7F0] pointer-events-none z-40"
      />
    </div>
  );
};

export default GiftOpening;
