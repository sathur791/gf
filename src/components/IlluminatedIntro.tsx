import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { StarField } from './StarField';

interface IlluminatedIntroProps {
  onOpen: () => void;
}

export const IlluminatedIntro: React.FC<IlluminatedIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio cue unlock
    window.dispatchEvent(new CustomEvent('play-birthday-music'));

    // Graceful cinematic transition timed with letter unfolding and light veil
    setTimeout(() => {
      onOpen();
    }, 1150);
  }, [isOpening, onOpen]);

  return (
    <div
      onClick={handleOpen}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 select-none overflow-hidden cursor-pointer bg-[#052831]"
      style={{
        background: 'radial-gradient(ellipse at center, #0B6075 0%, #073642 48%, #031B22 100%)',
      }}
    >
      {/* Background StarField */}
      <StarField count={45} />

      {/* Atmospheric Soft Radiant Halo (Aqua & Warm Candlelight) */}
      <div className="absolute w-[36rem] sm:w-[50rem] h-[36rem] sm:h-[50rem] rounded-full bg-radial from-[#8ED4D6]/20 via-[#0B6075]/20 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] rounded-full bg-radial from-[#FFE39E]/18 via-[#8ED4D6]/12 to-transparent blur-2xl pointer-events-none -z-0" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{
          opacity: isOpening ? [1, 1, 0] : 1,
          scale: isOpening ? [1, 1.03, 0.98] : 1,
          y: isOpening ? -10 : 0,
        }}
        transition={{
          duration: isOpening ? 1.15 : 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-md sm:max-w-lg flex flex-col items-center z-10"
      >
        {/* Poetic Title Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/10 border border-[#8ED4D6]/35 text-xs sm:text-[13px] font-serif tracking-[0.25em] uppercase text-[#EAF7F0] backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8ED4D6]" />
            A little universe, just for you
          </span>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* THE ILLUMINATED HANDCRAFTED ENVELOPE                               */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[16/10] perspective-1000 my-2"
          role="button"
          tabIndex={0}
          aria-label="Tap to open letter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpen();
          }}
        >
          {/* Inner ambient candle radiance behind the envelope */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#8ED4D6]/25 via-[#DDF3E9]/20 to-[#8ED4D6]/15 blur-xl pointer-events-none" />

          {/* Envelope Card Body */}
          <motion.div
            whileHover={!isOpening ? { y: -5, scale: 1.02 } : {}}
            whileTap={!isOpening ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full h-full rounded-2xl bg-[#FFFDF8] border border-[#0B6075]/15 shadow-[0_22px_55px_rgba(3,27,34,0.55)] overflow-hidden flex items-center justify-center"
          >
            {/* Soft textured warm cream interior */}
            <div className="absolute inset-0 bg-radial from-[#FAF6ED] to-[#F5EFEB] opacity-90" />

            {/* Back Flap Crease Fold Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 250 L200 135 L400 250 Z"
                fill="rgba(240, 235, 224, 0.45)"
                stroke="rgba(11, 96, 117, 0.2)"
                strokeWidth="1"
              />
              <path
                d="M0 0 L160 145 L0 250 Z"
                fill="rgba(250, 246, 237, 0.4)"
                stroke="rgba(11, 96, 117, 0.15)"
                strokeWidth="0.8"
              />
              <path
                d="M400 0 L240 145 L400 250 Z"
                fill="rgba(250, 246, 237, 0.4)"
                stroke="rgba(11, 96, 117, 0.15)"
                strokeWidth="0.8"
              />
            </svg>

            {/* Letter peek slipping upward upon open */}
            <motion.div
              initial={false}
              animate={{
                y: isOpening ? -85 : 0,
                opacity: isOpening ? 1 : 0.9,
                scale: isOpening ? 1.06 : 1,
              }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[86%] h-[74%] bg-[#FFFDF8] rounded-xl border border-[#0B6075]/15 shadow-md flex flex-col items-center justify-center p-4 z-10"
            >
              <Heart className="w-5 h-5 text-[#8ED4D6] mb-1.5 fill-[#8ED4D6]/20" />
              <p className="font-serif italic text-sm sm:text-base text-[#0B6075] text-center tracking-wide font-light">
                “For my favorite person in the whole world.”
              </p>
              <div className="w-12 h-px bg-[#8ED4D6]/40 mt-2" />
            </motion.div>

            {/* Animated 3D Top Flap */}
            <motion.div
              className="absolute top-0 inset-x-0 h-[56%] origin-top z-20"
              animate={{
                rotateX: isOpening ? 180 : 0,
                zIndex: isOpening ? 5 : 25,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg
                className="w-full h-full drop-shadow-sm filter"
                viewBox="0 0 400 140"
                preserveAspectRatio="none"
                fill="#FAF6ED"
              >
                <path
                  d="M0 0 L200 140 L400 0 Z"
                  stroke="rgba(11, 96, 117, 0.25)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Crimson Wax Seal on Flap Tip */}
              <AnimatePresence>
                {!isOpening ? (
                  <motion.div
                    key="wax-seal"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: [1, 1.3, 0],
                      opacity: [1, 0.8, 0],
                      filter: 'blur(2px)',
                    }}
                    transition={{ duration: 0.35 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#A83244] via-[#852333] to-[#611622] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-bold z-30 shadow-[0_4px_16px_rgba(97,22,34,0.4)] border-2 border-[#D4AF37]/50"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#FFFDF8] drop-shadow-xs">
                      K
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="seal-shimmer"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-12 h-12 rounded-full bg-[#8ED4D6]/40 blur-md pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Tactile Call-To-Action: "Tap to open" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 8 : 0 }}
          transition={{ duration: 0.5, delay: isOpening ? 0 : 0.35 }}
          className="mt-6 sm:mt-8 flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#8ED4D6]/50 backdrop-blur-md shadow-sm text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#FFFDF8] transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#8ED4D6] animate-ping" />
            <span className="font-medium">Tap to open</span>
            <Sparkles className="w-4 h-4 text-[#8ED4D6] group-hover:rotate-12 transition-transform" />
          </motion.div>

          <p className="mt-3 text-[11px] sm:text-xs font-sans tracking-widest text-[#B8E7E5]/75 uppercase">
            an intimate journey crafted with love
          </p>
        </motion.div>
      </motion.div>

      {/* Cinematic Ethereal Ocean Dissolve Flash on opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.95, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, times: [0, 0.3, 0.8, 1], ease: 'easeInOut' }}
            className="fixed inset-0 z-30 pointer-events-none bg-gradient-to-b from-[#0B6075] via-[#073642] to-[#031C23]"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IlluminatedIntro;
