import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

interface GiftOpeningProps {
  onComplete: () => void;
}

export const GiftOpening: React.FC<GiftOpeningProps> = ({ onComplete }) => {
  useEffect(() => {
    // 2.2 second cinematic choreography
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0B6075]">
      {/* ============================================================ */}
      {/* 1. EXPANDING RADIANT LIGHT & ATMOSPHERE                      */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{
          opacity: [0, 0.6, 0.9, 0.3],
          scale: [0.2, 0.8, 1.6, 3.2],
        }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[46rem] h-[46rem] rounded-full bg-radial from-[#FFFDF8] via-[#8ED4D6]/60 to-transparent blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.2, times: [0, 0.6, 1] }}
        className="absolute inset-0 bg-[#147C8A]/30 pointer-events-none"
      />

      {/* ============================================================ */}
      {/* 2. PAPER ENVELOPE RESPONDS & RISES                           */}
      {/* ============================================================ */}
      <div className="relative flex flex-col items-center">
        {/* Rising Paper Letter from inside */}
        <motion.div
          initial={{ y: 25, opacity: 0, scale: 0.9 }}
          animate={{
            y: [25, 20, -40, -60],
            opacity: [0, 0.2, 1, 0.9],
            scale: [0.9, 0.95, 1.05, 1.15],
          }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-60 sm:w-72 bg-[#FFFDF8] rounded-2xl border border-[#0B6075]/20 shadow-[0_20px_50px_rgba(7,63,77,0.4)] p-6 text-center z-20 mb-[-90px]"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 1.4, delay: 0.8 }}
            className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#147C8A] font-medium mb-1"
          >
            FOR KALAIVANI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 1.4, delay: 1 }}
            className="text-2xl sm:text-3xl font-serif text-[#0B6075] font-light"
          >
            Happy Birthday
          </motion.h2>
        </motion.div>

        {/* Envelope Body */}
        <motion.div
          initial={{ scale: 0.92, y: 15, opacity: 0 }}
          animate={{
            scale: [0.92, 1.02, 1.05, 1.12],
            y: [15, 0, 5, 20],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-72 sm:w-80 h-48 bg-[#FAF6ED] rounded-2xl border border-[#0B6075]/15 shadow-[0_24px_60px_rgba(7,63,77,0.45)] flex items-center justify-center overflow-hidden z-10"
        >
          {/* Envelope Flap Animation */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: [0, 0, 180, 180] }}
            transition={{ duration: 2.2, times: [0, 0.35, 0.75, 1], ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 inset-x-0 h-24 bg-[#FFFDF8] border-b border-[#0B6075]/15 shadow-sm"
          />

          {/* Wax Seal Breaking */}
          <motion.div
            initial={{ scale: 1, rotate: 0, opacity: 1 }}
            animate={{
              scale: [1, 1, 1.25, 0],
              rotate: [0, 0, 20, 45],
              opacity: [1, 1, 0.9, 0],
            }}
            transition={{ duration: 1.6, times: [0, 0.4, 0.65, 1] }}
            className="w-13 h-13 rounded-full bg-[#A64B56] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-medium shadow-lg z-30 border border-white/25"
          >
            {birthdayContent.envelope.sealText}
          </motion.div>

          {/* Light gleam sweep */}
          <motion.div
            initial={{ x: '-120%' }}
            animate={{ x: '240%' }}
            transition={{ duration: 1.4, delay: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Atmospheric Dissolve Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.9, 0] }}
        transition={{ duration: 2.2, times: [0, 0.7, 0.85, 0.95, 1] }}
        className="absolute inset-0 bg-[#EAF7F0] pointer-events-none z-40"
      />
    </div>
  );
};
