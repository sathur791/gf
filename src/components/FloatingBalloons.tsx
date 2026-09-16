import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
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

  const balloonColors: Record<string, { body: string; highlight: string; border: string }> = {
    aqua: {
      body: 'radial-gradient(circle at 35% 30%, #D4F4F5 0%, #75C9D0 50%, #147D8A 100%)',
      highlight: '#FFFFFF',
      border: 'rgba(20,125,138,0.3)',
    },
    mint: {
      body: 'radial-gradient(circle at 35% 30%, #F0FAF5 0%, #B2E5D0 50%, #4D9A80 100%)',
      highlight: '#FFFFFF',
      border: 'rgba(77,154,128,0.3)',
    },
    cream: {
      body: 'radial-gradient(circle at 35% 30%, #FFFFFB 0%, #F5E9D8 50%, #C4A57E 100%)',
      highlight: '#FFFFFF',
      border: 'rgba(196,165,126,0.3)',
    },
  };

  const positions = [
    { left: '6%', top: '22%', delay: 0, duration: 8, xOffset: 12 },
    { right: '8%', top: '48%', delay: 2, duration: 9.5, xOffset: -14 },
    { left: '10%', top: '75%', delay: 1, duration: 8.5, xOffset: 10 },
  ];

  const handlePop = (balloon: BalloonItemData) => {
    if (poppingId) return;
    setPoppingId(balloon.id);
    setTimeout(() => {
      setPoppedIds((prev) => new Set(prev).add(balloon.id));
      setPoppedBalloon(balloon);
      setPoppingId(null);
    }, 400);
  };

  return (
    <>
      {/* Drifting Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
        {birthdayContent.balloons.map((balloon, index) => {
          if (poppedIds.has(balloon.id)) return null;

          const pos = positions[index % positions.length];
          const color = balloonColors[balloon.color] || balloonColors.aqua;
          const isPopping = poppingId === balloon.id;

          return (
            <motion.div
              key={balloon.id}
              style={{
                position: 'absolute',
                left: pos.left,
                right: pos.right,
                top: pos.top,
              }}
              animate={
                isPopping
                  ? { scale: [1, 1.3, 0], opacity: [1, 0.8, 0], rotate: [0, 15, -10] }
                  : {
                      y: [0, -28, 0],
                      x: [0, pos.xOffset, 0],
                      rotate: [-2, 3, -2],
                    }
              }
              transition={
                isPopping
                  ? { duration: 0.4, ease: EASE_OUT_EXPO }
                  : { duration: pos.duration, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }
              }
              className="pointer-events-auto cursor-pointer group flex flex-col items-center select-none"
              onClick={() => handlePop(balloon)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePop(balloon);
                }
              }}
              aria-label={`Tap balloon to reveal secret: ${balloon.label}`}
            >
              {/* Pop sparkle burst */}
              {isPopping && <SparkleBurst count={14} className="z-50" />}

              {/* Balloon Body */}
              <motion.div
                whileHover={{ scale: 1.12, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-14 h-18 sm:w-16 sm:h-20 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] relative shadow-[0_12px_28px_rgba(11,95,115,0.18)]"
                style={{
                  background: color.body,
                  border: `1px solid ${color.border}`,
                }}
              >
                {/* Glossy Curved Highlight */}
                <div className="absolute top-2 left-2.5 w-3.5 h-6 rounded-[50%] bg-white/50 blur-[0.5px] -rotate-25 pointer-events-none" />

                {/* Tiny Sparkle Indicator */}
                <Sparkles className="w-3 h-3 text-white/80 absolute bottom-3 right-3 animate-pulse pointer-events-none" />
              </motion.div>

              {/* Balloon Knot */}
              <div
                className="w-2.5 h-1.5 -mt-0.5 rounded-sm"
                style={{ background: color.body }}
              />

              {/* Delicate Fluttering String */}
              <motion.svg
                width="20"
                height="42"
                viewBox="0 0 20 42"
                fill="none"
                className="opacity-60 -mt-0.5"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M10 0 C6 10, 14 20, 10 30 C8 35, 12 38, 10 42"
                  stroke="#147D8A"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </motion.svg>

              {/* Hover Tooltip: "tap me" */}
              <span className="opacity-0 group-hover:opacity-90 transition-opacity duration-300 -mt-1 text-[10px] font-sans uppercase tracking-widest text-[#083B4A] bg-[#FFF9F0]/90 px-2 py-0.5 rounded-full border border-[rgba(20,125,138,0.2)] shadow-xs">
                tap me
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Pop Surprise Modal Overlay */}
      <AnimatePresence>
        {poppedBalloon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0B5F73]/70 backdrop-blur-sm"
            onClick={() => setPoppedBalloon(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30, rotateX: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#FFFDF9] border border-[rgba(20,125,138,0.25)] rounded-2xl p-6 sm:p-7 shadow-[0_24px_60px_rgba(6,64,78,0.4)] text-center relative overflow-hidden"
              style={{ perspective: 800 }}
            >
              {/* Celebration sparkles in modal */}
              <SparkleBurst count={12} className="opacity-60" />

              {/* Close Button */}
              <button
                onClick={() => setPoppedBalloon(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FAF4E8] flex items-center justify-center text-[#083B4A] hover:bg-white transition-colors z-10"
                aria-label="Close balloon message"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
                className="flex justify-center mb-2 relative z-10"
              >
                <span className="text-xl">✨</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#147D8A] font-semibold block mb-2 relative z-10"
              >
                {poppedBalloon.label}
              </motion.span>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-handwriting text-2xl text-[#083B4A] leading-relaxed mb-4 relative z-10"
              >
                &ldquo;{poppedBalloon.message}&rdquo;
              </motion.p>

              <button
                onClick={() => setPoppedBalloon(null)}
                className="text-xs font-sans tracking-wider uppercase text-[#538A94] hover:text-[#083B4A] transition-colors font-medium relative z-10"
              >
                Keep reading →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
