import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';
import { Sparkles } from 'lucide-react';

interface ChildhoodStoryProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const ChildhoodStory: React.FC<ChildhoodStoryProps> = ({ onSelectMemory }) => {
  const { childhood } = birthdayContent;
  const photo1 = childhood.photos[0];
  const photo2 = childhood.photos[1];
  const photo3 = childhood.photos[2];

  return (
    <section className="w-full py-20 sm:py-28 px-6 flex flex-col items-center relative">
      {/* Intro Typography with pauses */}
      <div className="w-full max-w-xl flex flex-col items-center text-center mb-16 sm:mb-20">
        {/* "Before there was us." */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          whileInView={{ opacity: 0.9, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          {childhood.intro}
        </motion.p>

        {/* "There was you." */}
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B6075] font-light tracking-wide mb-4"
        >
          {childhood.secondary}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-12 h-[1px] bg-[#8ED4D6]"
        />
      </div>

      {/* ============================================================ */}
      {/* PHYSICAL SCRAPBOOK ALBUM COMPOSITIONS                        */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg flex flex-col items-center space-y-20 sm:space-y-24">
        {/* ========================================================== */}
        {/* PHOTO 1: childhood-01.jpg | "kutti karuvachi 😂"          */}
        {/* ========================================================== */}
        {photo1 && (
          <motion.div
            initial={{ opacity: 0, y: 35, rotate: -3, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -4 }}
            onClick={() => onSelectMemory(photo1)}
            className="w-full max-w-md bg-[#FFFDF8] p-5 sm:p-6 rounded-3xl border border-[#0B6075]/15 shadow-[0_18px_45px_rgba(7,63,77,0.14)] cursor-pointer group relative"
          >
            {/* Delicate paper tape top-left */}
            <div className="absolute -top-3 left-8 w-16 h-6 bg-[#DDF3E9]/80 border border-[#B8E7E5]/50 rounded-sm -rotate-3 z-10 backdrop-blur-xs shadow-xs" />

            {/* Pristine photograph display */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 relative shadow-inner">
              <img
                src={photo1.image}
                alt="Kalai Childhood 1"
                decoding="async"
                loading="eager"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Handwritten Caption: "kutti karuvachi 😂" with graceful reveal */}
            <div className="flex items-center justify-between px-1">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col text-left"
              >
                <span className="text-[10px] font-sans font-semibold tracking-wider text-[#147C8A]/70 uppercase">
                  01 • Childhood
                </span>
                <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold mt-0.5">
                  {photo1.caption}
                </h3>
              </motion.div>

              <span className="text-xs font-serif italic text-[#147C8A]/60">
                Tap to open
              </span>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* PHOTO 2: childhood-02.jpg | Distinct Polar-Offset Layout    */}
        {/* ========================================================== */}
        {photo2 && (
          <motion.div
            initial={{ opacity: 0, y: 35, rotate: 3, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -4 }}
            onClick={() => onSelectMemory(photo2)}
            className="w-full max-w-md sm:translate-x-3 bg-[#FAF6ED] p-4 sm:p-5 pb-8 rounded-3xl border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.16)] cursor-pointer group relative"
          >
            {/* Washi tape right */}
            <div className="absolute -top-3 right-8 w-16 h-6 bg-[#B8E7E5]/70 border border-[#8ED4D6]/50 rounded-sm rotate-2 z-10 shadow-xs" />

            {/* Portrait framed window */}
            <div className="w-full aspect-[3/2] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#0B6075]/10 mb-4 shadow-sm">
              <img
                src={photo2.image}
                alt="Kalai Childhood 2"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-sans font-semibold tracking-wider text-[#147C8A]/70 uppercase">
                  02 • Early Days
                </span>
                <p className="font-handwriting text-lg sm:text-xl text-[#123E45] mt-0.5">
                  A gentle early chapter.
                </p>
              </div>
              <span className="text-xs font-serif italic text-[#147C8A]/60">
                Memory
              </span>
            </div>
          </motion.div>
        )}

        {/* ========================================================== */}
        {/* PHOTO 3: childhood-03.jpg | "little princess"              */}
        {/* ========================================================== */}
        {photo3 && (
          <motion.div
            initial={{ opacity: 0, y: 35, rotate: -2.5, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -4 }}
            onClick={() => onSelectMemory(photo3)}
            className="w-full max-w-md bg-[#FFFDF8] p-5 sm:p-6 rounded-3xl border border-[#0B6075]/15 shadow-[0_18px_45px_rgba(7,63,77,0.14)] cursor-pointer group relative"
          >
            {/* Center Washi Stamp */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#DDF3E9]/80 border border-[#B8E7E5]/50 rounded-sm -rotate-1 z-10 shadow-xs" />

            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 shadow-inner">
              <img
                src={photo3.image}
                alt="Kalai Childhood 3"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Gentle reveal: "little princess" */}
            <div className="flex items-center justify-between px-1">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="flex flex-col text-left"
              >
                <span className="text-[10px] font-sans font-semibold tracking-wider text-[#147C8A]/70 uppercase">
                  03 • The Beginning
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold">
                    {photo3.caption}
                  </h3>
                  <Sparkles className="w-3.5 h-3.5 text-[#8ED4D6]" />
                </div>
              </motion.div>

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
