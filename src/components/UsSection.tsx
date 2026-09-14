import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';
import { FoldedNote } from './FoldedNote';

interface UsSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const UsSection: React.FC<UsSectionProps> = ({ onSelectMemory }) => {
  const { us } = birthdayContent;
  const p1 = us.photos[0]; // us-real-couple.png
  const p2 = us.photos[1]; // us-stars.png
  const p3 = us.photos[2]; // us-signature.jpg
  const p4 = us.photos[3]; // us-01.jpg

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Intimate ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-radial from-[#8ED4D6]/20 via-[#DDF3E9]/15 to-transparent blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* TRANSITION PRELUDE: "And then... there was us."              */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg text-center mb-16 sm:mb-24 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          whileInView={{ opacity: 0.95, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          {us.transitionIntro}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs font-sans tracking-[0.3em] uppercase text-[#147C8A] mb-8 font-medium"
        >
          {us.transitionSecondary}
        </motion.p>

        {/* Section Heading: "US" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.45 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#0B6075] font-light tracking-[0.24em] mb-3"
        >
          {us.title}
        </motion.h2>

        {/* Subtitle: "Just us." */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          "{us.subtitle}"
        </motion.p>

        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#147C8A]/60 font-semibold">
          {us.hint}
        </p>
      </div>

      {/* ============================================================ */}
      {/* CINEMATIC SEQUENCE OF US (Photo 1 -> 2 -> 3 -> 4)            */}
      {/* ============================================================ */}
      <div className="w-full max-w-3xl flex flex-col items-center relative z-10 space-y-20 sm:space-y-28">
        {/* ------------------------------------------------------------ */}
        {/* PHOTO 1: Large Centerpiece (us-real-couple.png)              */}
        {/* ------------------------------------------------------------ */}
        {p1 && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.015 }}
            onClick={() => onSelectMemory(p1)}
            className="w-full max-w-2xl bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#0B6075]/20 shadow-[0_24px_60px_rgba(7,63,77,0.18)] cursor-pointer group relative"
          >
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[520px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 shadow-sm">
              <img
                src={p1.image}
                alt={p1.title}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#147C8A]/70 font-semibold">
                  01 • {p1.date || 'Our Forever'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light mt-0.5">
                  {p1.title}
                </h3>
                <p className="font-handwriting text-lg sm:text-xl text-[#147C8A] mt-0.5">
                  "{p1.caption}"
                </p>
              </div>
              <span className="text-xs font-serif italic text-[#147C8A]/60">
                Tap to open
              </span>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PHOTO 2: Overlapping & Intimate (us-stars.png)               */}
        {/* ------------------------------------------------------------ */}
        {p2 && (
          <div className="w-full flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30, rotate: 2, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 1.2, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
              onClick={() => onSelectMemory(p2)}
              className="w-full sm:w-[85%] bg-[#FAF6ED] rounded-3xl p-5 sm:p-7 border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.16)] cursor-pointer group relative sm:-mt-10 z-20"
            >
              <div className="w-full aspect-[4/3] max-h-[460px] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#0B6075]/10 mb-4 shadow-inner">
                <img
                  src={p2.image}
                  alt={p2.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#147C8A]/70 font-semibold">
                    02 • {p2.date || 'Constellation'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light mt-0.5">
                    {p2.title}
                  </h3>
                  <p className="font-handwriting text-lg sm:text-xl text-[#147C8A] mt-0.5">
                    "{p2.caption}"
                  </p>
                </div>
                <span className="text-xs font-serif italic text-[#147C8A]/60">
                  Tap to open
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tucked Interactive Secret Note */}
        {birthdayContent.hiddenNotes[1] && (
          <div className="w-full flex justify-center -my-2">
            <FoldedNote
              teaser={birthdayContent.hiddenNotes[1].teaser}
              title={birthdayContent.hiddenNotes[1].title}
              message={birthdayContent.hiddenNotes[1].message}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* NEW PHOTO 03: Reveals Later (us-signature.jpg / monogram)    */}
        {/* ------------------------------------------------------------ */}
        {p3 && (
          <div className="w-full flex justify-start">
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30, rotate: -2, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -1.2, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
              onClick={() => onSelectMemory(p3)}
              className="w-full sm:w-[85%] bg-[#FFFDF8] rounded-3xl p-5 sm:p-7 border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.16)] cursor-pointer group relative z-10"
            >
              <div className="w-full aspect-[4/3] max-h-[460px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 shadow-sm">
                <img
                  src={p3.image}
                  alt={p3.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#147C8A]/70 font-semibold">
                    03 • {p3.date || 'Handwritten Forever'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light mt-0.5">
                    {p3.title}
                  </h3>
                  <p className="font-handwriting text-lg sm:text-xl text-[#147C8A] mt-0.5">
                    "{p3.caption}"
                  </p>
                </div>
                <span className="text-xs font-serif italic text-[#147C8A]/60">
                  Tap to open
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* NEW PHOTO 04: Emotional Lead-in (us-01.jpg)                  */}
        {/* ------------------------------------------------------------ */}
        {p4 && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.015 }}
            onClick={() => onSelectMemory(p4)}
            className="w-full max-w-2xl bg-[#FAF6ED] rounded-3xl p-6 sm:p-8 border border-[#0B6075]/20 shadow-[0_24px_60px_rgba(7,63,77,0.18)] cursor-pointer group relative z-10"
          >
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[500px] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#0B6075]/10 mb-4 shadow-inner">
              <img
                src={p4.image}
                alt={p4.title}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#147C8A]/70 font-semibold">
                  04 • {p4.date || 'Our Journey'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light mt-0.5">
                  {p4.title}
                </h3>
                <p className="font-handwriting text-lg sm:text-xl text-[#147C8A] mt-0.5">
                  "{p4.caption}"
                </p>
              </div>
              <span className="text-xs font-serif italic text-[#147C8A]/60">
                Tap to open
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
