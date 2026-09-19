import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';
import { StarField } from './StarField';

interface IlluminatedIntroProps {
  onOpen: () => void;
}

export const IlluminatedIntro: React.FC<IlluminatedIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Smooth transition into secret key
    setTimeout(() => {
      onOpen();
    }, 900);
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

      {/* Atmospheric Soft Radiant Halo (Aqua & Royal Gold) */}
      <div className="absolute w-[36rem] sm:w-[50rem] h-[36rem] sm:h-[50rem] rounded-full bg-radial from-[#8ED4D6]/18 via-[#0B6075]/20 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] rounded-full bg-radial from-[#D4AF37]/22 via-[#8ED4D6]/10 to-transparent blur-2xl pointer-events-none -z-0" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md sm:max-w-lg flex flex-col items-center z-10"
      >
        {/* Royal Crest Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#031C23]/65 border border-[#D4AF37]/50 text-xs sm:text-[13px] font-serif tracking-[0.28em] uppercase text-[#F6E2B3] backdrop-blur-md shadow-[0_4px_24px_rgba(212,175,55,0.25)]">
            <Crown className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>ROYAL INVITATION • FOR KALAIVANI</span>
          </span>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* THE ROYAL HANDCRAFTED ENVELOPE                                    */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="relative w-full max-w-[340px] sm:max-w-[430px] aspect-[16/10] perspective-1000 my-2"
          role="button"
          tabIndex={0}
          aria-label="Tap to open royal letter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpen();
          }}
        >
          {/* Inner ambient royal candle radiance behind the envelope */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 via-[#8ED4D6]/20 to-[#D4AF37]/20 blur-xl pointer-events-none" />

          {/* Envelope Card Body */}
          <motion.div
            whileHover={!isOpening ? { y: -5, scale: 1.02 } : {}}
            whileTap={!isOpening ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full h-full rounded-2xl bg-[#FFFDF8] border-2 border-[#D4AF37]/60 shadow-[0_25px_65px_rgba(3,27,34,0.75)] overflow-hidden flex items-center justify-center"
          >
            {/* Soft textured warm cream interior */}
            <div className="absolute inset-0 bg-radial from-[#FAF6ED] to-[#F5EFEB] opacity-95" />

            {/* Subtle Royal Gold filigree border outline */}
            <div className="absolute inset-2 border border-[#D4AF37]/25 rounded-xl pointer-events-none" />

            {/* Back Flap Crease Fold Lines (Royal Gold SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 250 L200 135 L400 250 Z"
                fill="rgba(245, 238, 225, 0.45)"
                stroke="rgba(212, 175, 55, 0.3)"
                strokeWidth="1.2"
              />
              <path
                d="M0 0 L160 145 L0 250 Z"
                fill="rgba(250, 246, 237, 0.4)"
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="1"
              />
              <path
                d="M400 0 L240 145 L400 250 Z"
                fill="rgba(250, 246, 237, 0.4)"
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="1"
              />
            </svg>

            {/* Royal Letter peek slipping upward upon open */}
            <motion.div
              initial={false}
              animate={{
                y: isOpening ? -72 : 0,
                opacity: isOpening ? 1 : 0.95,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[86%] h-[74%] bg-[#FFFDF8] rounded-xl border border-[#D4AF37]/45 shadow-lg flex flex-col items-center justify-center p-4 z-10"
            >
              <Crown className="w-5 h-5 text-[#D4AF37] mb-1.5 fill-[#D4AF37]/20" />
              <p className="font-serif italic text-sm sm:text-base text-[#0B6075] text-center tracking-wide font-light">
                “To my Queen, my favorite person in the whole world.”
              </p>
              <div className="w-14 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
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
                fill="#FAF6ED"
              >
                <path
                  d="M0 0 L200 140 L400 0 Z"
                  stroke="rgba(212, 175, 55, 0.5)"
                  strokeWidth="1.4"
                />
              </svg>

              {/* Gilded Imperial Crimson Wax Seal with Molten Gold Trim */}
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
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#A83244] via-[#852333] to-[#5A141F] text-[#FFFDF8] flex items-center justify-center font-serif text-xl font-bold z-30 shadow-[0_6px_20px_rgba(90,20,31,0.5),0_0_16px_rgba(212,175,55,0.4)] border-2 border-[#F6E2B3]"
                  >
                    <span className="gold-shimmer-text font-serif text-lg sm:text-xl drop-shadow-sm">
                      K
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="seal-shimmer"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] w-14 h-14 rounded-full bg-[#D4AF37]/50 blur-lg pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Tactile Royal Call-To-Action: "OPEN THE ROYAL GIFT" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 sm:mt-8 flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#B38E2A] hover:brightness-105 border border-[#FFE8B2]/60 shadow-[0_8px_32px_rgba(212,175,55,0.35)] text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-[#072F3A] font-bold transition-all cursor-pointer"
          >
            <Crown className="w-4 h-4 text-[#072F3A]" />
            <span>OPEN THE ROYAL GIFT</span>
            <Sparkles className="w-4 h-4 text-[#072F3A] group-hover:rotate-12 transition-transform" />
          </motion.div>

          <p className="mt-3.5 text-[11px] sm:text-xs font-serif tracking-[0.2em] text-[#B8E7E5]/75 uppercase italic">
            A little universe created for royalty
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IlluminatedIntro;
