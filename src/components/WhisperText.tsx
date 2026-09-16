import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

interface WhisperTextProps {
  text: string;
  subtext?: string;
}

export const WhisperText: React.FC<WhisperTextProps> = ({ text, subtext }) => {
  const chars = text.split('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="w-full text-center py-12 sm:py-16 select-none pointer-events-none relative z-10"
    >
      {/* Layered ambient lighting for high natural contrast */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-80 h-32 rounded-full bg-radial from-[#8ED4D6]/25 via-[#DDF3E9]/12 to-transparent blur-3xl" />
      </div>

      <p className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#FFFDF8] tracking-wider relative inline-block drop-shadow-[0_2px_18px_rgba(255,253,248,0.5)]">
        <span className="opacity-75 text-[#DDF3E9]">&ldquo;</span>
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.5,
              delay: idx * 0.035,
              ease: EASE_OUT_EXPO,
            }}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char}
          </motion.span>
        ))}
        <span className="opacity-75 text-[#DDF3E9]">&rdquo;</span>
      </p>

      {subtext && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: chars.length * 0.035 + 0.15, ease: EASE_OUT_EXPO }}
          className="text-xs sm:text-sm font-sans uppercase tracking-[0.32em] text-[#DDF3E9] font-medium block mt-3 drop-shadow-[0_1px_8px_rgba(7,63,77,0.4)]"
        >
          {subtext}
        </motion.span>
      )}

      {/* Decorative starlight shimmer line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.8 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: chars.length * 0.035 + 0.3, ease: EASE_OUT_EXPO }}
        className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFFDF8] to-transparent mx-auto mt-4 origin-center drop-shadow-[0_0_8px_rgba(255,253,248,0.6)]"
      />
    </motion.div>
  );
};
