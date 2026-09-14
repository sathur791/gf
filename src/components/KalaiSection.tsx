import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';
import { Heart, X } from 'lucide-react';
import { FoldedNote } from './FoldedNote';

interface KalaiSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const KalaiSection: React.FC<KalaiSectionProps> = ({ onSelectMemory }) => {
  const { kalai } = birthdayContent;
  const [favoriteSecretOpen, setFavoriteSecretOpen] = useState(false);

  // Separate present-day photo for major cinematic climax transition
  const editorialPhotos = kalai.photos.filter((p) => p.id !== 'kalai-present');
  const presentPhoto = kalai.photos.find((p) => p.id === 'kalai-present') || {
    id: 'kalai-present',
    image: '/images/kalai-present.jpg',
    title: 'Look at you now',
    caption: 'The same girl. A whole different chapter.',
    date: 'Present Day',
    story: 'Somewhere along the way, that sweet little girl grew into the most incredible woman.',
    hiddenMessage: 'And I get to love you.',
    layoutType: 'full',
  };

  return (
    <section className="w-full py-24 sm:py-32 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Ambient background aqua glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-radial from-[#8ED4D6]/20 via-[#DDF3E9]/15 to-transparent blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* SECTION TITLE: "KALAI"                                       */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg text-center mb-16 sm:mb-20 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-3 overflow-hidden">
          {'KALAI'.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#0B6075] font-light tracking-[0.22em] inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          {kalai.subtitle}
        </motion.p>

        <p className="text-[10.5px] font-sans uppercase tracking-[0.2em] text-[#147C8A]/70 font-semibold">
          {kalai.hint}
        </p>
      </div>

      {/* ============================================================ */}
      {/* EDITORIAL PHOTO WORLD                                        */}
      {/* ============================================================ */}
      <div className="w-full max-w-3xl flex flex-col gap-14 sm:gap-20 relative z-10">
        {editorialPhotos.map((item: MemoryItem, idx: number) => {
          const isGown = item.id === 'kalai-gown';
          const isBlueDress = item.id === 'kalai-blue-dress';
          const isSaree = item.id === 'kalai-saree';
          const isFull = item.id === 'kalai-full';

          // Asymmetric editorial placement
          const alignmentClass = isGown
            ? 'sm:w-5/6 self-start'
            : isBlueDress
            ? 'sm:w-5/6 self-end sm:translate-x-4'
            : isSaree
            ? 'sm:w-4/5 self-start sm:-translate-x-2'
            : isFull
            ? 'sm:w-5/6 self-end'
            : 'sm:w-4/5 mx-auto';

          const rotation = idx % 2 === 0 ? -1.2 : 1.4;

          return (
            <React.Fragment key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 35, rotate: rotation * 1.5, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ rotate: 0, y: -4 }}
                onClick={() => onSelectMemory(item)}
                className={`w-full bg-[#FFFDF8] rounded-3xl p-5 sm:p-7 border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.14)] cursor-pointer group relative flex flex-col ${alignmentClass}`}
              >
                {/* Micro-Surprise on kalai-blue-dress: Tiny handwritten sticker */}
                {isBlueDress && (
                  <div className="absolute -top-3 right-6 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavoriteSecretOpen(true);
                      }}
                      className="px-3 py-1 rounded-full bg-[#FAF6ED] border border-[#0B6075]/25 text-[#0B6075] shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1 text-xs font-handwriting"
                      title="Tap secret note"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#A64B56] text-[#A64B56]" />
                      <span className="text-sm font-semibold">note</span>
                    </button>
                  </div>
                )}

                {/* Photograph Display with Pristine Color */}
                <div className="w-full aspect-[3/4] max-h-[520px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 relative shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Photo Meta & Caption */}
                <div className="flex items-center justify-between px-1 mb-1">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#147C8A]/70 font-semibold">
                    {item.date || 'Memory'}
                  </span>
                  <span className="text-xs font-serif italic text-[#147C8A]/60">
                    Tap to open
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#0B6075] font-light px-1 mb-1 text-left">
                  {item.title}
                </h3>

                {item.caption && (
                  <p className="font-handwriting text-xl text-[#147C8A] px-1 text-left">
                    "{item.caption}"
                  </p>
                )}
              </motion.div>

              {/* Tucked Interactive Folded Note */}
              {idx === 1 && birthdayContent.hiddenNotes[0] && (
                <div className="w-full flex justify-center -my-4">
                  <FoldedNote
                    teaser={birthdayContent.hiddenNotes[0].teaser}
                    title={birthdayContent.hiddenNotes[0].title}
                    message={birthdayContent.hiddenNotes[0].message}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 18. MAJOR TRANSITION: PRESENT-DAY KALAI                      */}
      {/* ============================================================ */}
      <div className="w-full max-w-xl mt-28 sm:mt-36 flex flex-col items-center text-center relative z-10">
        {/* "And then..." (pause) */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          whileInView={{ opacity: 0.9, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          And then...
        </motion.p>

        {/* "Look at you now." (pause) */}
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B6075] font-light tracking-wide mb-8"
        >
          Look at you now.
        </motion.h2>

        {/* Climax Portrait Reveal: kalai-present.jpg */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.3, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          onClick={() => onSelectMemory(presentPhoto)}
          className="w-full bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#0B6075]/20 shadow-[0_25px_60px_rgba(7,63,77,0.22)] cursor-pointer group relative"
        >
          {/* Subtle floral emblem outline */}
          <div className="w-full aspect-[3/4] max-h-[580px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 relative shadow-sm">
            <img
              src={presentPhoto.image}
              alt="Kalai Present Day"
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#147C8A]/70 font-semibold">
                PRESENT DAY
              </span>
              <p className="font-handwriting text-2xl text-[#0B6075] mt-0.5">
                {presentPhoto.caption || 'The same girl. A whole different chapter.'}
              </p>
            </div>
            <span className="text-xs font-serif italic text-[#147C8A]/60">
              Tap to open
            </span>
          </div>
        </motion.div>
      </div>

      {/* Secret Micro-Note Modal ("Still my favorite.") */}
      <AnimatePresence>
        {favoriteSecretOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#073F4D]/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 14 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-xs w-full bg-[#FFFDF8] p-6 rounded-3xl border border-[#0B6075]/20 shadow-2xl text-center"
            >
              <button
                onClick={() => setFavoriteSecretOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full text-[#147C8A] hover:bg-[#DDF3E9]/50"
                aria-label="Close note"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-9 h-9 rounded-full bg-[#DDF3E9] text-[#A64B56] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#147C8A] mb-1 font-semibold">
                JUST A THOUGHT
              </p>
              <p className="font-handwriting text-2xl text-[#0B6075] leading-snug">
                Still my favorite.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
