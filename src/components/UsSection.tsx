import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';
import { FoldedNote } from './FoldedNote';

interface UsSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const UsSection: React.FC<UsSectionProps> = ({ onSelectMemory }) => {
  const { us, coupleQuotes } = birthdayContent;
  const p1 = us.photos[0]; // us-real-couple.png
  const p2 = us.photos[1]; // us-videocall-sleep.png
  const remainingPhotos = us.photos.slice(2);

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Intimate ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-radial from-[#F6E2B3]/20 via-[#F8DCD4]/15 to-transparent blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* PRELUDE: ALL THOSE LITTLE MOMENTS... SOMEHOW LED ME HERE    */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg text-center mb-16 sm:mb-24 relative z-10 space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-serif italic text-lg sm:text-xl text-[#704455]"
        >
          {us.prelude}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.95 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-handwriting text-3xl sm:text-4xl text-[#963842] pb-4"
        >
          {us.preludePause}
        </motion.p>

        {/* Section Heading: "US" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2D1822] font-light tracking-[0.24em]"
        >
          {us.title}
        </motion.h2>
      </div>

      {/* ============================================================ */}
      {/* COUPLE PHOTOS STREAM (LINE-BY-LINE POPUPS)                   */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center relative z-10 space-y-16 sm:space-y-24">
        {/* PHOTO 1: CINEMATIC REVEAL: "And then there was us." */}
        {p1 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectMemory(p1)}
              className="w-full max-w-2xl bg-[#FFFDF8] rounded-[2rem] sm:rounded-[2.5rem] p-3.5 sm:p-5 border border-[#D4AF37]/35 shadow-[0_28px_70px_rgba(45,24,34,0.14)] deckled-paper cursor-pointer group relative"
            >
              {/* Soft warm backlight glow */}
              <div className="absolute inset-0 bg-radial from-[#F6E2B3]/30 via-[#F8DCD4]/15 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none -z-10" />

              <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[540px] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#FAF7F0] border border-[#D4AF37]/20 shadow-xs mb-3 relative">
                <img
                  src={p1.image}
                  alt={p1.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center photo-enhanced group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="flex items-center justify-between px-2 pb-0.5">
                <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#D4AF37] font-semibold">
                  01 • {p1.date || 'Our Forever'}
                </span>
                <span className="text-xs font-serif italic text-[#704455]/75">
                  Tap to open
                </span>
              </div>
            </motion.div>

            {/* Emotional lines beneath first couple photo */}
            <div className="w-full max-w-md text-center mt-8 space-y-3.5 px-4">
              {/* Line 1: "And then there was us." */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-handwriting text-3xl sm:text-4xl text-[#963842] tracking-wide"
              >
                "And then there was us."
              </motion.p>

              {/* Line 2: "Maybe this is my favourite picture." */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="font-serif italic text-lg sm:text-xl text-[#704455] font-light"
              >
                "Maybe this is my favourite picture."
              </motion.p>

              {/* Line 3: "Not because it's perfect." */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="font-serif italic text-base sm:text-lg text-[#704455]/85 font-light"
              >
                Not because it's perfect.
              </motion.p>

              {/* Line 4: "But because it's us." */}
              <motion.p
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: 3.6 }}
                className="font-handwriting text-2xl sm:text-3xl text-[#2D1822] font-semibold pt-1"
              >
                "But because it's us."
              </motion.p>
            </div>
          </div>
        )}

        {/* PHOTO 2: VIDEO CALL / LATE NIGHT MOMENT ("I got to find you.") */}
        {p2 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectMemory(p2)}
              className="w-full bg-[#FAF7F0] rounded-3xl p-5 sm:p-7 border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(45,24,34,0.12)] deckled-paper cursor-pointer group relative"
            >
              <div className="w-full aspect-[4/3] max-h-[480px] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#D4AF37]/20 shadow-inner mb-3">
                <img
                  src={p2.image}
                  alt={p2.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center photo-enhanced group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  02 • {p2.date || 'Our Nights'}
                </span>
                <span className="text-xs font-serif italic text-[#704455]/75">
                  Tap to open
                </span>
              </div>
            </motion.div>

            {/* Emotional lines beneath second couple photo */}
            <div className="w-full max-w-md text-center mt-6 space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                className="font-serif italic text-base sm:text-lg text-[#704455] leading-relaxed"
              >
                "{us.secondCoupleLine}"
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.95, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-handwriting text-3xl sm:text-4xl text-[#963842]"
              >
                "{us.secondCoupleReflection}"
              </motion.p>
            </div>
          </div>
        )}

        {/* Tucked Interactive Secret Note */}
        {birthdayContent.hiddenNotes[1] && (
          <div className="w-full flex justify-center -my-3">
            <FoldedNote
              teaser={birthdayContent.hiddenNotes[1].teaser}
              title={birthdayContent.hiddenNotes[1].title}
              message={birthdayContent.hiddenNotes[1].message}
            />
          </div>
        )}

        {/* REMAINING COUPLE PHOTOS LINE BY LINE */}
        {remainingPhotos.map((item: MemoryItem, index: number) => {
          const rotation = index % 2 === 0 ? -1 : 1;
          const alignment = index % 2 === 0 ? 'sm:self-start sm:w-[94%]' : 'sm:self-end sm:w-[94%]';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, rotate: rotation * 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotation }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, y: -4 }}
              onClick={() => onSelectMemory(item)}
              className={`w-full bg-[#FFFDF8] rounded-3xl p-5 sm:p-7 border border-[#D4AF37]/35 shadow-[0_22px_55px_rgba(45,24,34,0.12)] deckled-paper cursor-pointer group relative flex flex-col ${alignment}`}
            >
              <div className="w-full aspect-[4/3] max-h-[460px] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#D4AF37]/20 mb-3.5 shadow-xs">
                <img
                  src={item.image}
                  alt={item.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center photo-enhanced group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>

              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  0{index + 3} • {item.date || 'Memory'}
                </span>
                <span className="text-xs font-serif italic text-[#704455]/75">
                  Tap to open
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#2D1822] font-light px-1 mb-1 text-left">
                {item.title}
              </h3>

              {item.caption && (
                <p className="font-handwriting text-lg sm:text-xl text-[#963842] px-1 text-left">
                  "{item.caption}"
                </p>
              )}
            </motion.div>
          );
        })}

        {/* ============================================================ */}
        {/* DEEP PROGRESSIVE COUPLE QUOTES                               */}
        {/* ============================================================ */}
        <div className="w-full flex flex-col items-center space-y-16 pt-12 sm:pt-16">
          {coupleQuotes.map((quote: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-md px-4"
            >
              <p className="font-serif italic text-base sm:text-lg text-[#2D1822]/90 leading-relaxed">
                "{quote}"
              </p>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsSection;
