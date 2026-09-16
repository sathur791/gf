import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';
import { Heart, X } from 'lucide-react';
import { FoldedNote } from './FoldedNote';

interface KalaiSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const KalaiSection: React.FC<KalaiSectionProps> = ({ onSelectMemory }) => {
  const { kalai, romanticReflections } = birthdayContent;
  const [favoriteSecretOpen, setFavoriteSecretOpen] = useState(false);

  // Present-day photo for the climax reveal
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

  // Curated reflections to interlace between photos
  const interludes = [
    romanticReflections.long2,
    romanticReflections.short1,
    romanticReflections.long3,
    romanticReflections.short2,
    romanticReflections.long5,
  ];

  return (
    <section className="w-full py-24 sm:py-32 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-radial from-[#8ED4D6]/15 via-[#DDF3E9]/10 to-transparent blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* SECTION TITLE: "KALAI"                                       */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg text-center mb-16 sm:mb-20 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-3 overflow-hidden">
          {'KALAI'.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#0B6075] font-light tracking-[0.22em] inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          "{kalai.subtitle}"
        </motion.p>
      </div>

      {/* ============================================================ */}
      {/* PHOTO GALLERY (LINE-BY-LINE STREAM WITH POPUP ON SCROLL)     */}
      {/* ============================================================ */}
      <div className="w-full max-w-xl flex flex-col items-center space-y-16 sm:space-y-24 relative z-10">
        {editorialPhotos.map((item, idx) => {
          const rotation = idx % 2 === 0 ? -1.2 : 1.2;
          const alignmentClass =
            idx % 2 === 0 ? 'sm:self-start sm:w-[94%]' : 'sm:self-end sm:w-[94%]';
          const isBlueDress = item.id === 'kalai-blue-dress';

          return (
            <React.Fragment key={item.id}>
              {/* Interlaced Romantic Reflection between photos */}
              {idx > 0 && idx % 2 === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 0.9, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8 }}
                  className="w-full text-center py-2 px-4"
                >
                  <p className="font-serif italic text-sm sm:text-base text-[#147C8A]/90 max-w-md mx-auto font-light leading-relaxed">
                    "{interludes[(idx / 2 - 1) % interludes.length]}"
                  </p>
                </motion.div>
              )}

              {/* Individual Photo Card with Pop-Up Entrance */}
              <motion.div
                initial={{ opacity: 0, y: 35, rotate: rotation * 1.5, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
                      className="px-3.5 py-1 rounded-full bg-[#FAF6ED] border border-[#0B6075]/25 text-[#0B6075] shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-handwriting cursor-pointer"
                      title="Read quiet thought"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#8E3B46] text-[#8E3B46]" />
                      <span className="text-sm font-semibold">a thought</span>
                    </button>
                  </div>
                )}

                {/* Photograph Display */}
                <div className="w-full aspect-[3/4] max-h-[520px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 relative shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
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
                  <p className="font-handwriting text-xl sm:text-2xl text-[#147C8A] px-1 text-left">
                    "{item.caption}"
                  </p>
                )}
              </motion.div>

              {/* Tucked Interactive Folded Note */}
              {idx === 1 && birthdayContent.hiddenNotes[0] && (
                <div className="w-full flex justify-center -my-3">
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
      {/* PRESENT-DAY KALAI TRANSITION                                 */}
      {/* ============================================================ */}
      <div className="w-full max-w-xl mt-28 sm:mt-36 flex flex-col items-center text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          And then...
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B6075] font-light tracking-wide mb-8"
        >
          Look at you now.
        </motion.h2>

        {/* Climax Portrait Reveal: kalai-present.jpg */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          onClick={() => onSelectMemory(presentPhoto)}
          className="w-full bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#0B6075]/18 shadow-[0_25px_60px_rgba(7,63,77,0.2)] cursor-pointer group relative"
        >
          <div className="w-full aspect-[3/4] max-h-[580px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 relative shadow-xs">
            <img
              src={presentPhoto.image}
              alt="Kalai Present Day"
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#147C8A]/70 font-semibold">
                PRESENT DAY
              </span>
              <p className="font-handwriting text-2xl text-[#0B6075] mt-0.5">
                "{presentPhoto.caption || 'The same girl. A whole different chapter.'}"
              </p>
            </div>
            <span className="text-xs font-serif italic text-[#147C8A]/60">
              Tap to open
            </span>
          </div>
        </motion.div>
      </div>

      {/* Secret Micro-Note Modal */}
      <AnimatePresence>
        {favoriteSecretOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#073F4D]/85">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 14 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-xs w-full bg-[#FFFDF8] p-6 rounded-3xl border border-[#0B6075]/20 shadow-2xl text-center"
            >
              <button
                onClick={() => setFavoriteSecretOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full text-[#147C8A] hover:bg-[#DDF3E9]/50"
                aria-label="Close note"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-9 h-9 rounded-full bg-[#DDF3E9] text-[#8E3B46] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-4 h-4 fill-current" />
              </div>
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

export default KalaiSection;
