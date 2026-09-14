import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';

interface UsSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const UsSection: React.FC<UsSectionProps> = ({ onSelectMemory }) => {
  const { us, coupleQuotes } = birthdayContent;
  const p1 = us.photos[0]; // us-real-couple.png
  const p2 = us.photos[1]; // us-videocall-sleep.png

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Intimate ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-radial from-[#8ED4D6]/15 via-[#DDF3E9]/10 to-transparent blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* 7. PRELUDE: ALL THOSE LITTLE MOMENTS... SOMEHOW LED ME HERE  */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg text-center mb-16 sm:mb-24 relative z-10 space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-serif italic text-lg sm:text-xl text-[#147C8A]"
        >
          {us.prelude}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.95 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-handwriting text-3xl sm:text-4xl text-[#0B6075] pb-4"
        >
          {us.preludePause}
        </motion.p>

        {/* Section Heading: "US" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#0B6075] font-light tracking-[0.24em]"
        >
          {us.title}
        </motion.h2>
      </div>

      {/* ============================================================ */}
      {/* FIRST COUPLE PHOTO: "And then there was us."                 */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center relative z-10 space-y-16 sm:space-y-20">
        {p1 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectMemory(p1)}
              className="w-full bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#0B6075]/18 shadow-[0_24px_60px_rgba(7,63,77,0.16)] cursor-pointer group relative"
            >
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[520px] rounded-2xl overflow-hidden bg-[#FAF6ED] border border-[#0B6075]/10 shadow-xs">
                <img
                  src={p1.image}
                  alt={p1.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>
            </motion.div>

            {/* Emotional lines beneath first couple photo */}
            <div className="w-full max-w-md text-center mt-6 space-y-2.5">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7 }}
                className="font-handwriting text-3xl sm:text-4xl text-[#0B6075]"
              >
                {us.firstCoupleLine}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-serif italic text-base sm:text-lg text-[#147C8A] leading-relaxed"
              >
                "{us.firstCoupleReflection}"
              </motion.p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECOND COUPLE PHOTO: "I got to find you."                    */}
        {/* ============================================================ */}
        {p2 && (
          <div className="w-full flex flex-col items-center pt-6 sm:pt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectMemory(p2)}
              className="w-full bg-[#FAF6ED] rounded-3xl p-5 sm:p-7 border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.15)] cursor-pointer group relative"
            >
              <div className="w-full aspect-[4/3] max-h-[480px] rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#0B6075]/10 shadow-inner">
                <img
                  src={p2.image}
                  alt={p2.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>
            </motion.div>

            {/* Emotional lines beneath second couple photo */}
            <div className="w-full max-w-md text-center mt-6 space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                className="font-serif italic text-base sm:text-lg text-[#147C8A] leading-relaxed"
              >
                "{us.secondCoupleLine}"
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.95, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-handwriting text-3xl sm:text-4xl text-[#0B6075]"
              >
                "{us.secondCoupleReflection}"
              </motion.p>
            </div>
          </div>
        )}

        {/* Intimate Keepsakes & Memories Grid */}
        {us.photos.length > 2 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-6">
            {us.photos.slice(2).map((item: MemoryItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectMemory(item)}
                className="bg-[#FFFDF8] rounded-3xl p-4 border border-[#0B6075]/12 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-2.5 bg-[#FAF6ED]">
                  <img
                    src={item.image}
                    alt={item.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="px-1 text-center">
                  <p className="font-handwriting text-lg sm:text-xl text-[#0B6075]">
                    "{item.caption}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* 8. DEEP PROGRESSIVE COUPLE QUOTES                            */}
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
              <p className="font-serif italic text-base sm:text-lg text-[#0B6075]/90 leading-relaxed">
                "{quote}"
              </p>
              <div className="w-8 h-[1px] bg-[#8ED4D6]/40 mx-auto mt-3.5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsSection;
