import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type BouquetItem } from '../data/birthdayContent';
import { SparkleBurst } from './SparkleBurst';
import { Heart, Sparkles } from 'lucide-react';

// Rich botanical SVG illustrations with distinct visual identities
const FlowerBotanicalArt: React.FC<{ id: string; isLarge?: boolean }> = ({ id, isLarge = false }) => {
  const sizeClass = isLarge ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-8 h-8 sm:w-10 sm:h-10';

  if (id === 'jasmine') {
    return (
      <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
        <path d="M32 60C32 48 30 38 32 32" stroke="#2D7A68" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 46C24 44 20 38 18 32C24 32 28 38 32 44" fill="#69B99E" opacity="0.8" />
        <path d="M32 42C40 40 44 34 46 28C40 28 36 34 32 40" fill="#69B99E" opacity="0.8" />
        <circle cx="32" cy="24" r="14" fill="#FFFDF8" opacity="0.95" />
        <path d="M32 10C34 16 38 20 44 22C38 24 34 28 32 34C30 28 26 24 20 22C26 20 30 16 32 10Z" fill="#FFFDF8" stroke="#D1E8E2" strokeWidth="1.5" />
        <path d="M24 14C28 19 31 21 37 20C33 24 31 27 27 31C27 25 24 21 21 19C24 17 25 15 24 14Z" fill="#F4FAF7" />
        <circle cx="32" cy="22" r="3" fill="#F6CE46" />
      </svg>
    );
  }

  if (id === 'camellia') {
    return (
      <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
        <path d="M32 60C32 50 33 42 32 34" stroke="#1D6352" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 48C40 46 45 40 46 32C38 34 34 42 32 48" fill="#4B9E86" opacity="0.85" />
        <circle cx="32" cy="26" r="17" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.2" />
        <circle cx="32" cy="26" r="12.5" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
        <circle cx="32" cy="26" r="8" fill="#FECDD3" stroke="#F43F5E" strokeWidth="0.8" />
        <path d="M28 22C32 20 36 20 38 24C36 28 32 28 28 26C26 24 26 23 28 22Z" fill="#F43F5E" opacity="0.75" />
        <circle cx="32" cy="25" r="2.5" fill="#F59E0B" />
      </svg>
    );
  }

  if (id === 'lotus') {
    return (
      <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
        <path d="M32 60C32 50 32 40 32 34" stroke="#1E6B5C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 12C36 22 46 28 50 36C38 38 34 32 32 34C30 32 26 38 14 36C18 28 28 22 32 12Z" fill="#FDE047" opacity="0.3" />
        <path d="M32 14C37 23 44 28 47 35C38 36 34 30 32 32C30 30 26 36 17 35C20 28 27 23 32 14Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
        <circle cx="32" cy="28" r="4.5" fill="#FACC15" />
      </svg>
    );
  }

  // Rose
  return (
    <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
      <path d="M32 60C32 48 31 38 32 32" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 46C26 44 22 36 20 30C26 32 30 38 32 44" fill="#4B9B70" opacity="0.85" />
      <circle cx="32" cy="24" r="16" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1.2" />
      <path d="M22 20C25 15 35 14 41 18C44 24 40 32 34 34C26 34 20 28 22 20Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1" />
      <path d="M26 23C28 19 36 19 38 22C39 26 36 30 32 30C28 30 25 27 26 23Z" fill="#F43F5E" />
    </svg>
  );
};

export const BouquetInteraction: React.FC = () => {
  const { bouquet } = birthdayContent;
  const [selectedFlower, setSelectedFlower] = useState<BouquetItem | null>(null);
  const [gatheredFlowerIds, setGatheredFlowerIds] = useState<Set<string>>(new Set());

  const handlePickFlower = (flower: BouquetItem) => {
    setSelectedFlower((current) => (current?.id === flower.id ? null : flower));
    setGatheredFlowerIds((prev) => new Set(prev).add(flower.id));
  };

  const allGathered = gatheredFlowerIds.size === bouquet.length;

  return (
    <section className="w-full py-32 sm:py-44 px-6 flex flex-col items-center relative select-none">
      {/* Soft Ambient Light Halo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] rounded-full bg-radial from-[#8ED4D6]/15 via-[#DDF3E9]/8 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="w-full max-w-lg text-center mb-16 sm:mb-20 relative z-10 space-y-2.5">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-xs font-sans tracking-[0.3em] uppercase text-[#DDF3E9] font-medium"
        >
          picked for you
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide drop-shadow-[0_2px_16px_rgba(255,253,248,0.4)]"
        >
          A few flowers, for everything you are.
        </motion.h2>

        <p className="font-handwriting text-xl sm:text-2xl text-[#B8E7E5] opacity-85 pt-1">
          pick each bloom to hold its meaning
        </p>
      </div>

      {/* Flower Selection Row */}
      <div className="w-full max-w-lg flex flex-col items-center relative z-10">
        <div className="w-full flex justify-center items-end gap-3 sm:gap-6 py-6 mb-4">
          {bouquet.map((flower) => {
            const isSelected = selectedFlower?.id === flower.id;
            const isGathered = gatheredFlowerIds.has(flower.id);

            return (
              <motion.button
                key={flower.id}
                onClick={() => handlePickFlower(flower)}
                animate={{
                  y: isSelected ? -16 : 0,
                  scale: isSelected ? 1.12 : selectedFlower ? 0.95 : 1,
                  opacity: selectedFlower && !isSelected ? 0.55 : 1,
                }}
                whileHover={{ y: isSelected ? -18 : -6, scale: isSelected ? 1.14 : 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative flex flex-col items-center cursor-pointer group focus:outline-hidden"
                aria-label={`Pick ${flower.flowerName}`}
              >
                {/* Luminous glow ring when selected */}
                {isSelected && (
                  <motion.div
                    layoutId="flower-glow-ring"
                    className="absolute -inset-2.5 rounded-3xl bg-[#8ED4D6]/30 blur-md pointer-events-none"
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  />
                )}

                {/* Botanical Tile */}
                <div
                  className={`w-16 h-22 sm:w-20 sm:h-26 rounded-2xl flex flex-col items-center justify-center p-2 transition-all border relative ${
                    isSelected
                      ? 'bg-[#FFFDF8] border-[#8ED4D6] shadow-[0_12px_32px_rgba(142,212,214,0.45)] ring-2 ring-white/60'
                      : isGathered
                      ? 'bg-[#FFFDF8]/90 border-[#8ED4D6]/40 shadow-xs'
                      : 'bg-[#FFFDF8]/70 border-[#0B6075]/15 hover:bg-[#FFFDF8]'
                  }`}
                >
                  <FlowerBotanicalArt id={flower.id} />
                  <span className="text-[10px] sm:text-[11px] font-serif text-[#0B6075] mt-1.5 truncate max-w-[62px] text-center font-medium">
                    {flower.flowerName.split(' ')[0]}
                  </span>

                  {isGathered && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8ED4D6] text-[#031C23] text-[9px] flex items-center justify-center font-bold">
                      ✓
                    </span>
                  )}
                </div>

                {/* Tiny drifting petal when picked */}
                {isSelected && (
                  <motion.span
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -26, scale: 1.3, x: 8 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute -top-3 text-xs text-[#8ED4D6] pointer-events-none"
                  >
                    ✦
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Gathering Status Ribbon */}
        {gatheredFlowerIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2 text-xs font-sans text-[#DDF3E9] bg-[#073F4D]/50 px-4 py-1.5 rounded-full border border-[#8ED4D6]/25 backdrop-blur-xs"
          >
            <Heart className="w-3.5 h-3.5 text-[#F4A7B9] fill-current" />
            <span>
              {allGathered
                ? "You've gathered your complete bouquet for today and forever ♡"
                : `${gatheredFlowerIds.size} of 4 blooms gathered in your hands`}
            </span>
          </motion.div>
        )}

        {/* Botanical Specimen Note */}
        <div className="w-full min-h-[190px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            {selectedFlower ? (
              <motion.div
                key={selectedFlower.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-3xl p-6 sm:p-8 bg-[#FAF6ED] border border-[#0B6075]/15 shadow-[0_20px_55px_rgba(3,27,34,0.3)] relative overflow-hidden"
              >
                <SparkleBurst count={12} className="opacity-40" />

                {/* Botanical Watermark Accent */}
                <div className="absolute top-2 right-2 opacity-15 pointer-events-none scale-150">
                  <FlowerBotanicalArt id={selectedFlower.id} isLarge />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFFDF8] border border-[#0B6075]/15 flex items-center justify-center shadow-xs">
                    <FlowerBotanicalArt id={selectedFlower.id} />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#0B6075] font-light">
                      {selectedFlower.flowerName}
                    </h3>
                    <p className="text-xs font-sans tracking-[0.24em] uppercase text-[#147C8A] font-semibold mt-0.5">
                      {selectedFlower.meaning}
                    </p>
                  </div>

                  <div className="w-12 h-[1px] bg-[#8ED4D6]/50 my-1" />

                  <p className="font-serif italic text-base sm:text-lg text-[#123E45]/90 max-w-sm leading-relaxed">
                    &ldquo;{selectedFlower.message}&rdquo;
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-3xl p-8 border border-dashed border-[#8ED4D6]/35 bg-[#FAF6ED]/5 backdrop-blur-xs flex flex-col items-center justify-center text-center space-y-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFFDF8]/10 border border-[#8ED4D6]/20 flex items-center justify-center text-xs text-[#8ED4D6]">
                  <Sparkles className="w-4 h-4 text-[#8ED4D6]" />
                </div>
                <p className="font-handwriting text-xl sm:text-2xl text-[#DDF3E9]/90">
                  tap any flower above to see what it whispers for you
                </p>
                <p className="text-xs font-sans text-[#B8E7E5]/60 tracking-wider">
                  each bloom carries its own dedication
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BouquetInteraction;
