import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';

interface ChildhoodStoryProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const ChildhoodStory: React.FC<ChildhoodStoryProps> = ({ onSelectMemory }) => {
  const { childhood } = birthdayContent;
  const photo1 = childhood.photos[0];
  const photo2 = childhood.photos[1];
  const photo3 = childhood.photos[2];

  return (
    <section className="w-full py-24 sm:py-36 px-6 flex flex-col items-center relative">
      {/* Intro Typography: Gentle & Nostalgic */}
      <div className="w-full max-w-xl flex flex-col items-center text-center mb-16 sm:mb-24">
        {/* "Before I knew you," */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
        >
          {childhood.intro}
        </motion.p>

        {/* "there was already a little girl growing into the person I'd one day love." */}
        <motion.h2
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#0B6075] font-light tracking-wide max-w-md leading-relaxed"
        >
          {childhood.secondary}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-10 h-[1px] bg-[#8ED4D6] mt-4"
        />
      </div>

      {/* Narrative Scrapbook with generous breathing space */}
      <div className="w-full max-w-md flex flex-col items-center space-y-16 sm:space-y-24">
        {/* ========================================================== */}
        {/* PHOTO 1: childhood-01.jpg | "kutti karuvachi 😂"          */}
        {/* ========================================================== */}
        {photo1 && (
          <motion.div
            initial={{ opacity: 0, y: 22, rotate: -2, filter: 'blur(3px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -3 }}
            onClick={() => onSelectMemory(photo1)}
            className="w-full bg-[#FFFDF8] p-5 sm:p-6 rounded-3xl border border-[#0B6075]/12 shadow-[0_18px_45px_rgba(7,63,77,0.12)] cursor-pointer group relative"
          >
            {/* Paper tape top-left */}
            <div className="absolute -top-3 left-8 w-16 h-6 bg-[#DDF3E9]/80 border border-[#B8E7E5]/50 rounded-sm -rotate-3 z-10 shadow-xs" />

            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-3.5 relative shadow-inner">
              <img
                src={photo1.image}
                alt="Kalai Childhood"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center photo-enhanced group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>

            <div className="px-1 text-left">
              <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold">
                {photo1.caption}
              </h3>
            </div>
          </motion.div>
        )}

        {/* Poetic Interlude 1 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="font-serif italic text-base sm:text-lg text-[#147C8A] text-center max-w-sm leading-relaxed"
        >
          "{childhood.interlude1}"
        </motion.p>

        {/* ========================================================== */}
        {/* PHOTO 2: childhood-02.jpg | Early Days                     */}
        {/* ========================================================== */}
        {photo2 && (
          <motion.div
            initial={{ opacity: 0, y: 22, rotate: 2, filter: 'blur(3px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.4, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -3 }}
            onClick={() => onSelectMemory(photo2)}
            className="w-full sm:translate-x-2 bg-[#FAF6ED] p-4 sm:p-5 pb-6 rounded-3xl border border-[#0B6075]/12 shadow-[0_20px_50px_rgba(7,63,77,0.14)] cursor-pointer group relative"
          >
            <div className="absolute -top-3 right-8 w-16 h-6 bg-[#B8E7E5]/70 border border-[#8ED4D6]/50 rounded-sm rotate-2 z-10 shadow-xs" />

            <div className="w-full aspect-[3/2] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#0B6075]/10 mb-3.5 shadow-xs">
              <img
                src={photo2.image}
                alt="Kalai Early Days"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center photo-enhanced group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>

            <div className="px-2 text-left">
              <p className="font-handwriting text-lg sm:text-xl text-[#123E45]/85">
                {photo2.caption}
              </p>
            </div>
          </motion.div>
        )}

        {/* Poetic Interlude 2 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="font-serif italic text-base sm:text-lg text-[#123E45]/85 text-center max-w-sm leading-relaxed"
        >
          "{childhood.interlude2}"
        </motion.p>

        {/* ========================================================== */}
        {/* PHOTO 3: childhood-03.jpg | "little princess"              */}
        {/* ========================================================== */}
        {photo3 && (
          <motion.div
            initial={{ opacity: 0, y: 22, rotate: -2, filter: 'blur(3px)' }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -3 }}
            onClick={() => onSelectMemory(photo3)}
            className="w-full bg-[#FFFDF8] p-5 sm:p-6 rounded-3xl border border-[#0B6075]/12 shadow-[0_18px_45px_rgba(7,63,77,0.12)] cursor-pointer group relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#DDF3E9]/80 border border-[#B8E7E5]/50 rounded-sm -rotate-1 z-10 shadow-xs" />

            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-3.5 shadow-inner">
              <img
                src={photo3.image}
                alt="Kalai Childhood 3"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center photo-enhanced group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>

            <div className="px-1 text-left">
              <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold">
                {photo3.caption}
              </h3>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ChildhoodStory;
