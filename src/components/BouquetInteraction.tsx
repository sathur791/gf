import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type BouquetItem } from '../data/birthdayContent';

// Curated handwritten whisper lines for each flower
const flowerAnnotations: Record<string, string> = {
  jasmine: 'for the way your presence makes everything feel softer.',
  camellia: 'for your gentle devotion that holds my world together.',
  lotus: 'for your quiet strength that blooms gracefully in every season.',
  rose: 'for the love that keeps finding its way deeper into my heart.',
};

// Rich botanical SVG illustrations with distinct visual identities
const FlowerBotanicalArt: React.FC<{ id: string; isLarge?: boolean }> = ({ id, isLarge = false }) => {
  const sizeClass = isLarge ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-7 h-7 sm:w-8 sm:h-8';

  if (id === 'jasmine') {
    return (
      <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
        {/* Soft stem & leaves */}
        <path d="M32 60C32 48 30 38 32 32" stroke="#2D7A68" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 46C24 44 20 38 18 32C24 32 28 38 32 44" fill="#69B99E" opacity="0.8" />
        <path d="M32 42C40 40 44 34 46 28C40 28 36 34 32 40" fill="#69B99E" opacity="0.8" />
        {/* Jasmine 5 star petals */}
        <circle cx="32" cy="24" r="14" fill="#FFFDF8" opacity="0.9" />
        <path d="M32 10C34 16 38 20 44 22C38 24 34 28 32 34C30 28 26 24 20 22C26 20 30 16 32 10Z" fill="#FFFDF8" stroke="#D1E8E2" strokeWidth="1.5" />
        <path d="M24 14C28 19 31 21 37 20C33 24 31 27 27 31C27 25 24 21 21 19C24 17 25 15 24 14Z" fill="#F4FAF7" />
        {/* Golden pistil center */}
        <circle cx="32" cy="22" r="3" fill="#F6CE46" />
        <circle cx="32" cy="22" r="1.5" fill="#E5A922" />
      </svg>
    );
  }

  if (id === 'camellia') {
    return (
      <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
        {/* Deep emerald stem */}
        <path d="M32 60C32 50 33 42 32 34" stroke="#1D6352" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 48C40 46 45 40 46 32C38 34 34 42 32 48" fill="#4B9E86" opacity="0.85" />
        {/* Layered concentric camellia petals */}
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
        {/* Lotus pad & stem */}
        <path d="M32 60C32 50 32 40 32 34" stroke="#1E6B5C" strokeWidth="2.5" strokeLinecap="round" />
        {/* Outer petals */}
        <path d="M32 12C36 22 46 28 50 36C38 38 34 32 32 34C30 32 26 38 14 36C18 28 28 22 32 12Z" fill="#FDE047" opacity="0.25" />
        <path d="M32 14C37 23 44 28 47 35C38 36 34 30 32 32C30 30 26 36 17 35C20 28 27 23 32 14Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
        {/* Middle sacred petals */}
        <path d="M32 18C35 24 40 28 41 34C35 34 33 29 32 30C31 29 29 34 23 34C24 28 29 24 32 18Z" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="1" />
        {/* Core seed pod & inner golden bloom */}
        <circle cx="32" cy="28" r="4.5" fill="#FACC15" />
        <circle cx="30.5" cy="27" r="1" fill="#713F12" />
        <circle cx="33.5" cy="27" r="1" fill="#713F12" />
        <circle cx="32" cy="29.5" r="1" fill="#713F12" />
      </svg>
    );
  }

  // Rose
  return (
    <svg className={sizeClass} viewBox="0 0 64 64" fill="none">
      {/* Rose stem with subtle thorn */}
      <path d="M32 60C32 48 31 38 32 32" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 46C26 44 22 36 20 30C26 32 30 38 32 44" fill="#4B9B70" opacity="0.85" />
      {/* Voluptuous romantic rose petals */}
      <circle cx="32" cy="24" r="16" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1.2" />
      <path d="M22 20C25 15 35 14 41 18C44 24 40 32 34 34C26 34 20 28 22 20Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1" />
      <path d="M26 23C28 19 36 19 38 22C39 26 36 30 32 30C28 30 25 27 26 23Z" fill="#F43F5E" />
      <path d="M29 24C30 22 34 22 35 24C35 26 33 28 32 28C30 28 29 26 29 24Z" fill="#BE123C" />
    </svg>
  );
};

export const BouquetInteraction: React.FC = () => {
  const { bouquet } = birthdayContent;
  const [selectedFlower, setSelectedFlower] = useState<BouquetItem | null>(null);

  return (
    <section className="w-full py-24 sm:py-32 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Starlight & Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] rounded-full bg-radial from-[#8ED4D6]/15 via-[#DDF3E9]/8 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header with High Contrast Typography */}
      <div className="w-full max-w-lg text-center mb-12 sm:mb-16 relative z-10 space-y-2.5">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-xs font-sans tracking-[0.3em] uppercase text-[#DDF3E9] font-semibold drop-shadow-sm"
        >
          A DIGITAL BOUQUET
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#FFFDF8] font-light tracking-wide drop-shadow-[0_2px_16px_rgba(255,253,248,0.4)]"
        >
          Pick One
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.95 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#B8E7E5]"
        >
          Each flower holds a tender thought for you
        </motion.p>
      </div>

      {/* ============================================================ */}
      {/* TACTILE BOTANICAL FLOWER SELECTION ROW                       */}
      {/* ============================================================ */}
      <div className="w-full max-w-xl flex items-center justify-center gap-3.5 sm:gap-6 mb-12 flex-wrap relative z-10">
        {bouquet.map((item: BouquetItem) => {
          const isSelected = selectedFlower?.id === item.id;
          const isAnotherSelected = selectedFlower !== null && !isSelected;

          return (
            <motion.button
              key={item.id}
              onClick={() => setSelectedFlower(item)}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={
                isSelected
                  ? {
                      y: -10,
                      scale: 1.08,
                      opacity: 1,
                      transition: { type: 'spring', stiffness: 320, damping: 22 },
                    }
                  : isAnotherSelected
                  ? {
                      y: 0,
                      scale: 0.95,
                      opacity: 0.55,
                      transition: { duration: 0.35 },
                    }
                  : {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.35 },
                    }
              }
              className={`flex flex-col items-center p-3 sm:p-4 rounded-3xl border transition-all duration-400 min-w-[84px] sm:min-w-[102px] cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FFFDF8] to-[#EAF7F0] border-[#8ED4D6] shadow-[0_16px_40px_rgba(142,212,214,0.35)] ring-2 ring-[#8ED4D6]/70'
                  : 'bg-[#FFFDF8]/90 border-[#0B6075]/20 shadow-[0_8px_24px_rgba(7,63,77,0.12)] hover:border-[#8ED4D6]/60 hover:bg-[#FFFDF8]'
              }`}
              aria-label={`Pick ${item.flowerName}`}
            >
              {/* Petal Halo on selection */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.9, 0.6], scale: [0.6, 1.35, 1.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute -inset-1.5 rounded-[2rem] bg-radial from-[#8ED4D6]/35 to-transparent blur-md -z-10 pointer-events-none"
                />
              )}

              {/* Botanical SVG Illustration */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#FAF6ED] to-[#EAF7F0] flex items-center justify-center mb-2 shadow-xs border border-[#0B6075]/10">
                <FlowerBotanicalArt id={item.id} />
              </div>

              <span className={`text-[11px] sm:text-xs font-serif font-medium tracking-tight text-center ${
                isSelected ? 'text-[#0B6075] font-semibold' : 'text-[#147C8A]'
              }`}>
                {item.flowerName}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* ORGANIC PARCHMENT BOUQUET NOTE PANEL                         */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg min-h-[300px] flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {selectedFlower ? (
            <motion.div
              key={selectedFlower.id}
              initial={{ opacity: 0, y: 22, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F5ECE0] rounded-[2.25rem] p-7 sm:p-9 border border-[#0B6075]/18 shadow-[0_24px_65px_rgba(7,63,77,0.22)] text-center relative overflow-hidden"
            >
              {/* Soft decorative botanical pressed corner accents */}
              <div className="absolute top-3 left-4 text-[#8ED4D6]/50 select-none text-base">✦</div>
              <div className="absolute top-3 right-4 text-[#8ED4D6]/50 select-none text-base">✦</div>

              {/* Large Blooming Chosen Flower Visual */}
              <motion.div
                initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex justify-center mb-3"
              >
                <div className="p-3.5 rounded-full bg-radial from-white to-[#FAF6ED] shadow-[0_8px_24px_rgba(7,63,77,0.08)] border border-[#0B6075]/10">
                  <FlowerBotanicalArt id={selectedFlower.id} isLarge={true} />
                </div>
              </motion.div>

              {/* Meaning Eyebrow */}
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.24em] text-[#147C8A] font-bold block mb-1">
                SYMBOL OF {selectedFlower.meaning}
              </span>

              {/* Flower Name in Cormorant Garamond */}
              <h3 className="text-3xl sm:text-4xl font-serif text-[#0B6075] font-light mb-2">
                {selectedFlower.flowerName}
              </h3>

              {/* Small Handwritten Personal Annotation */}
              <p className="font-handwriting text-2xl text-[#8E3B46] mb-4">
                "{flowerAnnotations[selectedFlower.id] || 'picked especially for you.'}"
              </p>

              {/* Delicate Divider */}
              <div className="w-16 h-[1px] bg-[#8ED4D6]/50 mx-auto mb-4" />

              {/* Poetic Dedication Message */}
              <p className="font-serif italic text-base sm:text-lg text-[#123E45]/90 leading-relaxed font-light max-w-md mx-auto">
                "{selectedFlower.message}"
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#DDF3E9]/80 font-medium">
                Tap any flower above to pick your blossom
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BouquetInteraction;
