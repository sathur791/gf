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
    <section className="w-full py-20 sm:py-28 px-6 flex flex-col items-center relative select-none">
      {/* Narrative Opening */}
      <div className="w-full max-w-xl flex flex-col items-center text-center mb-14 sm:mb-18">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="font-handwriting text-2xl sm:text-3xl text-[#8ED4D6] mb-2 tracking-wide"
        >
          {childhood.intro}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FFFDF8] font-light tracking-wide max-w-md leading-relaxed"
        >
          {childhood.secondary}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#8ED4D6] to-transparent mt-5 origin-center"
        />
      </div>

      {/* Recovered Memory Sequence */}
      <div className="w-full max-w-md sm:max-w-lg flex flex-col items-center space-y-16 sm:space-y-22">
        {/* ========================================================== */}
        {/* PHOTO 1: childhood-01.jpg | "kutti karuvachi 😂"          */}
        {/* ========================================================== */}
        {photo1 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(photo1)}
              className="w-full bg-[#FFFDF8] p-5 sm:p-7 rounded-3xl border border-[#0B6075]/15 shadow-[0_22px_55px_rgba(3,27,34,0.3)] cursor-pointer group relative"
            >
              {/* Paper tape top-left */}
              <div className="absolute -top-3 left-8 w-16 h-6 bg-[#DDF3E9]/80 border border-[#B8E7E5]/50 rounded-sm -rotate-3 z-10 shadow-xs" />

              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 relative shadow-inner">
                <img
                  src={photo1.image}
                  alt="Kalai Childhood"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="px-1 text-left flex justify-between items-baseline">
                <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold">
                  {photo1.caption}
                </h3>
                <span className="text-xs font-serif italic text-[#147C8A]/70">
                  {photo1.date}
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Poetic Interlude 1 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="w-full text-center px-4"
        >
          <p className="font-serif italic text-lg sm:text-xl text-[#DDF3E9] max-w-sm mx-auto leading-relaxed drop-shadow-sm font-light">
            &ldquo;{childhood.interlude1}&rdquo;
          </p>
        </motion.div>

        {/* ========================================================== */}
        {/* PHOTO 2: childhood-02.jpg | Early Days                     */}
        {/* ========================================================== */}
        {photo2 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(photo2)}
              className="w-full bg-[#FAF6ED] p-5 sm:p-7 rounded-3xl border border-[#0B6075]/15 shadow-[0_22px_55px_rgba(3,27,34,0.3)] cursor-pointer group relative"
            >
              {/* Paper tape top-right */}
              <div className="absolute -top-3 right-8 w-16 h-6 bg-[#B8E7E5]/70 border border-[#8ED4D6]/50 rounded-sm rotate-2 z-10 shadow-xs" />

              <div className="w-full aspect-[3/2] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#0B6075]/10 mb-4 shadow-xs">
                <img
                  src={photo2.image}
                  alt="Kalai Early Days"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="px-1 text-left flex justify-between items-baseline">
                <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold">
                  {photo2.caption}
                </h3>
                <span className="text-xs font-serif italic text-[#147C8A]/70">
                  {photo2.date}
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Poetic Interlude 2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="w-full text-center px-4"
        >
          <p className="font-serif italic text-lg sm:text-xl text-[#B8E7E5] max-w-sm mx-auto leading-relaxed drop-shadow-sm font-light">
            &ldquo;{childhood.interlude2}&rdquo;
          </p>
        </motion.div>

        {/* ========================================================== */}
        {/* PHOTO 3: childhood-03.jpg | "little princess"              */}
        {/* ========================================================== */}
        {photo3 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(photo3)}
              className="w-full bg-[#FFFDF8] p-5 sm:p-7 rounded-3xl border border-[#0B6075]/15 shadow-[0_22px_55px_rgba(3,27,34,0.3)] cursor-pointer group relative"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 mb-4 shadow-xs">
                <img
                  src={photo3.image}
                  alt="Kalai Little Princess"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>

              <div className="px-1 text-left flex justify-between items-baseline">
                <h3 className="text-xl sm:text-2xl font-handwriting text-[#0B6075] font-semibold">
                  {photo3.caption}
                </h3>
                <span className="text-xs font-serif italic text-[#147C8A]/70">
                  {photo3.date}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChildhoodStory;
