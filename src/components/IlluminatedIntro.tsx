import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from './StarField';
import { birthdayContent } from '../data/birthdayContent';

interface IlluminatedIntroProps {
  onOpen: () => void;
}

export const IlluminatedIntro: React.FC<IlluminatedIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio cue unlock for birthday world
    window.dispatchEvent(new CustomEvent('play-birthday-music'));

    // Smooth transition timed with physical letter sliding out
    setTimeout(() => {
      onOpen();
    }, 1250);
  }, [isOpening, onOpen]);

  return (
    <div
      onClick={handleOpen}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 select-none overflow-hidden cursor-pointer bg-[#052831]"
      style={{
        background: 'radial-gradient(ellipse at center, #0B6075 0%, #073642 50%, #031B22 100%)',
      }}
    >
      {/* Background Starfield */}
      <StarField count={35} />

      {/* Atmospheric Soft Radiant Moon in the distance */}
      <div className="absolute top-8 right-6 sm:right-16 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none opacity-80 select-none">
        <div
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 253, 248, 0.3) 0%, rgba(142, 212, 214, 0.15) 45%, transparent 75%)',
            filter: 'blur(14px)',
          }}
        />
        <img
          src={birthdayContent.moon.image}
          alt="Moon"
          className="w-full h-full object-contain filter brightness-105 contrast-105"
          style={{
            mixBlendMode: 'screen',
            maskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
          }}
        />
      </div>

      {/* Soft atmospheric breathing light that blooms warmly when opened */}
      <motion.div
        animate={{
          scale: isOpening ? 1.25 : [1, 1.06, 1],
          opacity: isOpening ? 0.35 : [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: isOpening ? 1.2 : 5,
          repeat: isOpening ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[40rem] sm:w-[52rem] h-[40rem] sm:h-[52rem] rounded-full bg-radial from-[#FFE39E] via-[#8ED4D6]/20 to-transparent blur-3xl pointer-events-none"
      />

      {/* ============================================================ */}
      {/* CINEMATIC SCRIPTED OPENING SEQUENCE                          */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: isOpening ? [1, 1, 0] : 1,
          scale: isOpening ? [1, 1.02, 0.98] : 1,
          y: isOpening ? -8 : 0,
        }}
        transition={{ duration: isOpening ? 1.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg flex flex-col items-center text-center z-10 my-auto py-8"
      >
        {/* Beat 1: "for Kalai" (0.4s) */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#DDF3E9] mb-3 tracking-wide"
        >
          for Kalai
        </motion.p>

        {/* Beat 2: "I kept a little piece of my heart here for you." (1.6s) */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="font-serif italic text-base sm:text-lg text-[#B8E7E5] max-w-md mx-auto mb-2 leading-relaxed"
        >
          &ldquo;I kept a little piece of my heart here for you.&rdquo;
        </motion.p>

        {/* Beat 3: "Come closer." (3.0s) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="text-xs font-sans tracking-[0.28em] uppercase text-[#8ED4D6] mb-6"
        >
          Come closer.
        </motion.p>

        {/* Beat 4: "Happy Birthday, Kalai." (4.2s) — The only prominent birthday greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide mb-10 drop-shadow-[0_2px_24px_rgba(255,253,248,0.7)]"
        >
          Happy Birthday, Kalai.
        </motion.h1>

        {/* ============================================================ */}
        {/* THE PHYSICAL TACTILE ENVELOPE                                */}
        {/* ============================================================ */}
        <div
          className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[16/10] my-2 select-none"
          role="button"
          tabIndex={0}
          aria-label="Touch the letter to open"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpen();
          }}
        >
          {/* Subtle warm halo behind envelope */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#8ED4D6]/20 via-[#FFE39E]/15 to-transparent blur-xl pointer-events-none" />

          {/* Envelope Body */}
          <motion.div
            whileHover={!isOpening ? { y: -4, scale: 1.015 } : {}}
            whileTap={!isOpening ? { scale: 0.985 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full h-full rounded-2xl bg-[#FFFDF8] border border-[#0B6075]/15 shadow-[0_22px_55px_rgba(3,27,34,0.55)] overflow-hidden flex items-center justify-center p-6"
          >
            {/* Fine Paper Texture Interior */}
            <div className="absolute inset-0 bg-radial from-[#FAF6ED] to-[#F5EFEB] opacity-95" />

            {/* Back Flap Crease Fold Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 250 L200 135 L400 250 Z"
                fill="rgba(240, 235, 224, 0.45)"
                stroke="rgba(11, 96, 117, 0.18)"
                strokeWidth="1"
              />
              <path
                d="M0 0 L160 145 L0 250 Z"
                fill="rgba(250, 246, 237, 0.4)"
                stroke="rgba(11, 96, 117, 0.12)"
                strokeWidth="0.8"
              />
              <path
                d="M400 0 L240 145 L400 250 Z"
                fill="rgba(250, 246, 237, 0.4)"
                stroke="rgba(11, 96, 117, 0.12)"
                strokeWidth="0.8"
              />
            </svg>

            {/* Paper Sheet Gliding Outward upon Tap */}
            <motion.div
              initial={false}
              animate={{
                y: isOpening ? -45 : 0,
                opacity: isOpening ? 1 : 0.9,
              }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[86%] h-[78%] bg-[#FAF6ED] rounded-xl border border-[#0B6075]/12 shadow-sm flex flex-col justify-between p-4 z-10"
            >
              <div className="flex justify-between items-center text-[10px] font-serif text-[#147C8A]/70 italic">
                <span>10.10.2026</span>
                <span>for you</span>
              </div>
              <div className="text-center">
                <p className="font-handwriting text-2xl text-[#0B6075]">Dear Kalai,</p>
              </div>
              <div className="w-10 h-[1px] bg-[#8ED4D6]/50 mx-auto" />
            </motion.div>

            {/* Physical Flap */}
            <motion.div
              initial={false}
              animate={{
                clipPath: isOpening
                  ? 'polygon(0 0, 100% 0, 100% 0%, 0 0%)'
                  : 'polygon(0 0, 100% 0, 50% 55%, 50% 55%)',
                opacity: isOpening ? 0 : 1,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[#F4EFE6] border-b border-[#0B6075]/15 z-20 pointer-events-none"
            />

            {/* Burgundy Wax Seal */}
            <AnimatePresence>
              {!isOpening ? (
                <motion.div
                  key="wax-seal"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{
                    scale: [1, 1.15, 0.85],
                    opacity: [1, 0.8, 0],
                    filter: 'blur(4px)',
                  }}
                  transition={{ duration: 0.35 }}
                  className="w-13 h-13 rounded-full bg-[#8E3B46] text-[#FFFDF8] flex items-center justify-center font-serif text-xl font-medium absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 shadow-[0_6px_20px_rgba(142,59,70,0.45)] border border-white/30"
                >
                  <span className="drop-shadow-xs">K</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Discreet Prompt Beneath Envelope */}
        <p className="font-handwriting text-xl text-[#B8E7E5] mt-4 opacity-80">
          touch the seal to open
        </p>
      </motion.div>
    </div>
  );
};

export default IlluminatedIntro;
