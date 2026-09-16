import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type BouquetItem } from '../data/birthdayContent';

export const BouquetInteraction: React.FC = () => {
  const { bouquet } = birthdayContent;
  const [selectedFlower, setSelectedFlower] = useState<BouquetItem | null>(null);

  return (
    <section className="w-full py-20 px-6 flex flex-col items-center relative">
      <div className="w-full max-w-lg text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-xs font-sans tracking-[0.25em] uppercase text-[#2C636D] mb-2 font-semibold"
        >
          A DIGITAL BOUQUET
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#083B4A] font-light tracking-wide mb-3"
        >
          Pick One
        </motion.h2>

        <p className="font-handwriting text-2xl text-[#2C636D]">
          Each flower holds a tender thought for you
        </p>
      </div>

      {/* Flower Tokens Row */}
      <div className="w-full max-w-md flex items-center justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
        {bouquet.map((item: BouquetItem, idx: number) => {
          const isSelected = selectedFlower?.id === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setSelectedFlower(item)}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.94 }}
              className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 min-w-[76px] sm:min-w-[88px] ${
                isSelected
                  ? 'bg-[#CFEBDD] border-[#147D8A] shadow-[0_12px_32px_rgba(11,95,115,0.2)] ring-2 ring-[#75C9D0]/50'
                  : 'bg-white/85 border-[rgba(20,125,138,0.18)] shadow-sm hover:border-[#147D8A]/40'
              }`}
              aria-label={`Select ${item.flowerName}`}
            >
              {/* Botanical SVG Icon with Stem Bending Reaction */}
              <motion.div
                animate={
                  isSelected
                    ? {
                        rotate: [0, -18, 14, -8, 4, 0],
                        y: [0, -6, 2, -3, 0],
                        scale: [1, 1.22, 0.95, 1.05, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.85, ease: 'easeOut' }}
                style={{ transformOrigin: 'bottom center' }}
                className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  isSelected ? 'bg-[#75C9D0]/50 text-[#083B4A]' : 'bg-[#EAF7F0] text-[#147D8A]'
                }`}
              >
                {idx === 0 && (
                  // Jasmine
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <circle cx="12" cy="12" r="2.5" />
                    <path d="M12 3c1 2.5 1 4.5 0 5.5-1-1-1-3 0-5.5z" />
                    <path d="M12 21c1-2.5 1-4.5 0-5.5-1 1-1 3 0 5.5z" />
                    <path d="M3 12c2.5 1 4.5 1 5.5 0-1-1-3-1-5.5 0z" />
                    <path d="M21 12c-2.5 1-4.5 1-5.5 0 1-1 3-1 5.5 0z" />
                  </svg>
                )}
                {idx === 1 && (
                  // Camellia
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2a5 5 0 0 1 5 5c0 3-5 7-5 7s-5-4-5-7a5 5 0 0 1 5-5z" />
                    <path d="M22 12a5 5 0 0 1-5 5c-3 0-7-5-7-5s4-5 7-5a5 5 0 0 1 5 5z" />
                  </svg>
                )}
                {idx === 2 && (
                  // Lotus
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M12 3c-2 4-3 8-3 12 2 1 4 1 6 0 0-4-1-8-3-12z" />
                    <path d="M9 15c-3-1-5-4-6-8 3 1 6 3 8 6" />
                    <path d="M15 15c3-1 5-4 6-8-3 1-6 3-8 6" />
                  </svg>
                )}
                {idx === 3 && (
                  // Rose
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 8c2-2 5-1 5 1s-3 3-5 3" />
                    <path d="M12 16c-2 2-5 1-5-1s3-3 5-3" />
                    <path d="M12 4v4" />
                  </svg>
                )}
              </motion.div>

              <span className="text-[11px] font-sans font-semibold text-[#083B4A] tracking-tight">
                {item.flowerName}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Revealed Flower Meaning & Wish */}
      <AnimatePresence mode="wait">
        {selectedFlower ? (
          <motion.div
            key={selectedFlower.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mint-blue-card p-6 sm:p-7 border border-[rgba(20,125,138,0.22)] shadow-[0_16px_45px_rgba(11,95,115,0.14)] text-center relative overflow-hidden"
          >
            {/* Subtle floral petal glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#75C9D0]/35 to-transparent rounded-full blur-xl pointer-events-none" />

            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#147D8A] font-bold block mb-1">
              Symbol of {selectedFlower.meaning}
            </span>
            <h3 className="text-2xl font-serif text-[#083B4A] font-light mb-3">
              {selectedFlower.flowerName}
            </h3>
            <p className="font-serif italic text-base sm:text-lg text-[#083B4A]/95 leading-relaxed font-light">
              "{selectedFlower.message}"
            </p>
          </motion.div>
        ) : (
          <p className="text-xs font-sans tracking-wider uppercase text-[#538A94] font-medium">
            Select any flower to reveal its meaning
          </p>
        )}
      </AnimatePresence>
    </section>
  );
};
