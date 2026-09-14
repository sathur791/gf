import React from 'react';
import { motion } from 'framer-motion';

interface WhisperTextProps {
  text: string;
  subtext?: string;
}

export const WhisperText: React.FC<WhisperTextProps> = ({ text, subtext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 0.85, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full text-center py-8 select-none pointer-events-none relative z-10"
    >
      <span className="font-handwriting text-2xl sm:text-3xl text-[#2C636D]/90 block tracking-wide">
        "{text}"
      </span>
      {subtext && (
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#538A94] font-medium block mt-1">
          {subtext}
        </span>
      )}
    </motion.div>
  );
};
