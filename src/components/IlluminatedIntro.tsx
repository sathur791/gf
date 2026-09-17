import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { FloatingHearts } from './FloatingHearts';

interface IlluminatedIntroProps {
  onOpen: () => void;
}

export const IlluminatedIntro: React.FC<IlluminatedIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Smooth, instant transition without artificial waiting
    setTimeout(() => {
      onOpen();
    }, 900);
  }, [isOpening, onOpen]);

  return (
    <div
      onClick={handleOpen}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 select-none overflow-hidden cursor-pointer"
      style={{
        background: 'radial-gradient(ellipse at center, #3D222E 0%, #25121C 55%, #160A10 100%)',
      }}
    >
      {/* Background Floating Hearts */}
      <FloatingHearts count={10} />

      {/* Atmospheric Soft Radiant Halo (blush & warm gold) */}
      <div className="absolute w-[32rem] sm:w-[45rem] h-[32rem] sm:h-[45rem] rounded-full bg-radial from-[#F6E2B3]/18 via-[#E29E92]/12 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute w-[22rem] sm:w-[28rem] h-[22rem] sm:h-[28rem] rounded-full bg-radial from-[#FFFDF8]/20 to-transparent blur-2xl pointer-events-none -z-0" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md sm:max-w-lg flex flex-col items-center z-10"
      >
        {/* Poetic Title Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/10 border border-[#D4AF37]/35 text-xs sm:text-[13px] font-serif tracking-[0.25em] uppercase text-[#F6E2B3] backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
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
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/25 via-[#F8DCD4]/20 to-[#D4AF37]/15 blur-xl pointer-events-none" />

          {/* Envelope Card Body */}
          <motion.div
            whileHover={!isOpening ? { y: -5, scale: 1.02 } : {}}
            whileTap={!isOpening ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full h-full rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(22,10,16,0.45)] overflow-hidden flex items-center justify-center"
          >
            {/* Soft textured interior lining */}
            <div className="absolute inset-0 bg-radial from-[#FAF7F0] to-[#F5EFEB] opacity-90" />

            {/* Back Flap Crease Fold Lines (Delicate Warm Gold SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Bottom fold triangles */}
              <path d="M0 250 L200 135 L400 250 Z" fill="rgba(252, 238, 233, 0.45)" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1.2" />
              <path d="M0 0 L160 145 L0 250 Z" fill="rgba(250, 247, 240, 0.4)" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
              <path d="M400 0 L240 145 L400 250 Z" fill="rgba(250, 247, 240, 0.4)" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
            </svg>

            {/* Letter peek slipping upward upon open */}
            <motion.div
              initial={false}
              animate={{
                y: isOpening ? -70 : 0,
                opacity: isOpening ? 1 : 0.9,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[86%] h-[72%] bg-[#FFFDF8] rounded-xl border border-[#D4AF37]/30 shadow-md flex flex-col items-center justify-center p-4 z-10"
            >
              <Heart className="w-5 h-5 text-[#D4AF37] mb-1.5 fill-[#D4AF37]/20" />
              <p className="font-serif italic text-sm sm:text-base text-[#2D1822] text-center tracking-wide font-light">
                “For my favorite person in the whole world.”
              </p>
              <div className="w-12 h-px bg-[#D4AF37]/35 mt-2" />
            </motion.div>

            {/* Animated 3D Top Flap */}
            <motion.div
              className="absolute top-0 inset-x-0 h-[56%] origin-top z-20"
              animate={{
                rotateX: isOpening ? 180 : 0,
                zIndex: isOpening ? 5 : 25,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg
                className="w-full h-full drop-shadow-sm filter"
                viewBox="0 0 400 140"
                preserveAspectRatio="none"
                fill="#FAF7F0"
              >
                <path
                  d="M0 0 L200 140 L400 0 Z"
                  stroke="rgba(212, 175, 55, 0.35)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Gilded Wax Seal on Flap Tip */}
              <AnimatePresence>
                {!isOpening ? (
                  <motion.div
                    key="wax-seal"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: [1, 1.25, 0],
                      opacity: [1, 0.8, 0],
                      filter: 'blur(2px)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#A83244] via-[#852333] to-[#611622] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-bold z-30 shadow-[0_4px_16px_rgba(97,22,34,0.45)] border-2 border-[#D4AF37]/60"
                  >
                    <span className="gold-shimmer-text font-serif text-base sm:text-lg">K</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="seal-shimmer"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] w-12 h-12 rounded-full bg-[#D4AF37]/35 blur-md pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Tactile Call-To-Action: "Tap to open" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 sm:mt-8 flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#FFFDF8]/15 to-[#D4AF37]/20 hover:from-[#D4AF37]/30 hover:to-[#D4AF37]/30 border border-[#D4AF37]/50 backdrop-blur-md shadow-[0_8px_24px_rgba(212,175,55,0.2)] text-sm sm:text-base font-serif tracking-[0.2em] uppercase text-[#FFFDF8] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-light">Tap to open</span>
            <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          </motion.div>

          <p className="mt-3 text-[11px] sm:text-xs font-sans tracking-widest text-[#F8DCD4]/65 uppercase">
            an intimate journey crafted with love
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
