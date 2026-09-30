import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, RotateCcw, Heart } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { SparkleBurst } from './SparkleBurst';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

interface BalloonItemData {
  id: string;
  color: string;
  label: string;
  message: string;
}

export const FloatingBalloons: React.FC = () => {
  const [poppedBalloon, setPoppedBalloon] = useState<BalloonItemData | null>(null);
  const [poppedIds, setPoppedIds] = useState<Set<string>>(new Set());
  const [poppingId, setPoppingId] = useState<string | null>(null);

  const balloonColors: Record<
    string,
    { body: string; highlight: string; border: string; glow: string; text: string }
  > = {
    aqua: {
      body: 'radial-gradient(circle at 35% 30%, #E0F8F9 0%, #8ED4D6 55%, #147C8A 100%)',
      highlight: '#FFFFFF',
      border: 'rgba(20,124,138,0.35)',
      glow: 'rgba(142,212,214,0.35)',
      text: '#0B6075',
    },
    mint: {
      body: 'radial-gradient(circle at 35% 30%, #F4FCF7 0%, #B8E7D5 55%, #3D8872 100%)',
      highlight: '#FFFFFF',
      border: 'rgba(61,136,114,0.35)',
      glow: 'rgba(184,231,213,0.35)',
      text: '#0E5C4B',
    },
    cream: {
      body: 'radial-gradient(circle at 35% 30%, #FFFDF5 0%, #F5DEB3 55%, #A6804A 100%)',
      highlight: '#FFFFFF',
      border: 'rgba(166,128,74,0.35)',
      glow: 'rgba(245,222,179,0.35)',
      text: '#7A5B28',
    },
  };

  const handlePop = (balloon: BalloonItemData) => {
    if (poppingId) return;
    setPoppingId(balloon.id);
    setTimeout(() => {
      setPoppedIds((prev) => new Set(prev).add(balloon.id));
      setPoppedBalloon(balloon);
      setPoppingId(null);
    }, 380);
  };

  const handleResetBalloons = () => {
    setPoppedIds(new Set());
    setPoppedBalloon(null);
  };

  const allPopped = poppedIds.size === birthdayContent.balloons.length;

  return (
    <section className="w-full py-24 sm:py-32 px-6 flex flex-col items-center relative select-none">
      {/* Soft Ambient Light Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full bg-radial from-[#8ED4D6]/15 via-[#DDF3E9]/8 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-lg text-center mb-12 sm:mb-16 relative z-10 space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-xs font-sans tracking-[0.3em] uppercase text-[#DDF3E9] font-medium"
        >
          floating memories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide drop-shadow-[0_2px_16px_rgba(255,253,248,0.4)]"
        >
          A few floating thoughts.
        </motion.h2>

        <p className="font-handwriting text-xl sm:text-2xl text-[#B8E7E5] pt-1">
          tap each balloon to pop open the secret inside
        </p>
      </div>

      {/* Interactive Balloon Garden */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-center gap-8 sm:gap-14 relative z-10 py-6 min-h-[220px]">
        {birthdayContent.balloons.map((balloon, index) => {
          const isPopped = poppedIds.has(balloon.id);
          const isPopping = poppingId === balloon.id;
          const color = balloonColors[balloon.color] || balloonColors.aqua;

          // Gentle staggered vertical float
          const yOffset = index === 1 ? -16 : 8;
          const duration = 5.5 + index * 0.8;

          if (isPopped) {
            return (
              <motion.div
                key={balloon.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setPoppedBalloon(balloon)}
                role="button"
                tabIndex={0}
                aria-label={`Read popped thought: ${balloon.label}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FFFDF8]/90 border border-[#8ED4D6]/40 shadow-sm flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform">
                  <span className="text-lg">✨</span>
                  <span className="text-[9px] font-sans tracking-wider uppercase text-[#147C8A] font-semibold">
                    opened
                  </span>
                </div>
                <span className="text-[11px] font-serif italic text-[#FFFDF8]/80 mt-2 max-w-[90px] text-center truncate">
                  {balloon.label}
                </span>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={balloon.id}
              animate={
                isPopping
                  ? { scale: [1, 1.35, 0], opacity: [1, 0.9, 0], rotate: [0, 15, -10] }
                  : {
                      y: [yOffset, yOffset - 22, yOffset],
                      rotate: [-2.5, 2.5, -2.5],
                    }
              }
              transition={
                isPopping
                  ? { duration: 0.38, ease: EASE_OUT_EXPO }
                  : { duration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }
              }
              whileHover={!isPopping ? { scale: 1.12, y: yOffset - 8 } : {}}
              onClick={() => handlePop(balloon)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePop(balloon);
                }
              }}
              className="cursor-pointer group flex flex-col items-center select-none relative focus:outline-hidden"
              aria-label={`Tap balloon to reveal secret: ${balloon.label}`}
            >
              {/* Pop sparkle burst on tap */}
              {isPopping && <SparkleBurst count={20} className="z-50" />}

              {/* Balloon Body */}
              <div
                className="w-18 h-22 sm:w-22 sm:h-28 rounded-[50%_50%_50%_50%_/_42%_42%_58%_58%] relative shadow-[0_16px_36px_rgba(3,27,34,0.3)] transition-transform"
                style={{
                  background: color.body,
                  border: `1.5px solid ${color.border}`,
                  boxShadow: `0 16px 36px rgba(3,27,34,0.3), 0 0 24px ${color.glow}`,
                }}
              >
                {/* Curved Glossy Highlight */}
                <div className="absolute top-2.5 left-3 w-4.5 h-8 rounded-[50%] bg-white/60 blur-[0.5px] -rotate-25 pointer-events-none" />

                {/* Inner Sparkle */}
                <Sparkles className="w-4 h-4 text-white/90 absolute bottom-3 right-3 animate-pulse pointer-events-none" />
              </div>

              {/* Balloon Knot */}
              <div
                className="w-3 h-2 -mt-0.5 rounded-xs"
                style={{ background: color.text }}
              />

              {/* Fluttering String */}
              <motion.svg
                width="24"
                height="50"
                viewBox="0 0 24 50"
                fill="none"
                className="opacity-70 -mt-0.5"
                animate={{ rotate: [-4, 4, -4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M12 0 C7 12, 17 25, 12 36 C9 42, 15 46, 12 50"
                  stroke="#8ED4D6"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 2.5"
                />
              </motion.svg>

              {/* Hover Pill "pop me" */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1 text-[11px] font-sans uppercase tracking-widest text-[#0B6075] bg-[#FFFDF8] px-3 py-1 rounded-full border border-[#8ED4D6]/50 shadow-md">
                pop me ✨
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Celebration reset banner if all balloons popped */}
      <AnimatePresence>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-[#FFFDF8]/90 border border-[#8ED4D6]/40 shadow-md text-center z-10"
          >
            <div className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#0B6075] font-semibold">
              <Heart className="w-4 h-4 text-[#E11D48] fill-current animate-pulse" />
              <span>You popped all 3! Every thought is yours, Kalai</span>
            </div>
            <button
              onClick={handleResetBalloons}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans text-[#147C8A] hover:bg-[#DDF3E9] transition-colors cursor-pointer border border-[#8ED4D6]/30 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Pop again</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop Surprise Modal Overlay */}
      <AnimatePresence>
        {poppedBalloon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#031C23]/80 backdrop-blur-md"
            onClick={() => setPoppedBalloon(null)}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 30, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#FFFDF8] border border-[#8ED4D6]/40 rounded-3xl p-7 text-center relative overflow-hidden shadow-[0_28px_70px_rgba(3,27,34,0.6)]"
              style={{ perspective: 800 }}
            >
              {/* Celebration sparkles in modal */}
              <SparkleBurst count={16} className="opacity-60" />

              {/* Close Button */}
              <button
                onClick={() => setPoppedBalloon(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF6ED] flex items-center justify-center text-[#0B6075] hover:bg-white hover:shadow-xs transition-all z-10 cursor-pointer"
                aria-label="Close balloon message"
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
                className="flex justify-center mb-2 relative z-10"
              >
                <span className="text-3xl">🎈</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#147C8A] font-semibold block mb-2 relative z-10"
              >
                {poppedBalloon.label}
              </motion.span>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="font-handwriting text-2xl sm:text-3xl text-[#0B6075] leading-relaxed mb-6 relative z-10"
              >
                &ldquo;{poppedBalloon.message}&rdquo;
              </motion.p>

              <button
                onClick={() => setPoppedBalloon(null)}
                className="text-xs font-sans tracking-[0.18em] uppercase text-[#147C8A] hover:text-[#0B6075] transition-colors font-semibold relative z-10 px-5 py-2 rounded-full bg-[#DDF3E9]/80 hover:bg-[#DDF3E9] cursor-pointer"
              >
                Keep reading →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FloatingBalloons;
