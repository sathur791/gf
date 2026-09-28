import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';

interface UsSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const UsSection: React.FC<UsSectionProps> = ({ onSelectMemory }) => {
  const { us } = birthdayContent;
  const p1 = us.photos[0]; // us-real-couple.png
  const p2 = us.photos[1]; // us-videocall-sleep.png
  const p3 = us.photos[2]; // us-stars.png
  const p4 = us.photos[3]; // us-signature.jpg

  return (
    <section className="w-full py-32 sm:py-48 px-6 flex flex-col items-center relative select-none">
      {/* ============================================================ */}
      {/* PRELUDE: THE EMOTIONAL TURNING POINT (YOU -> US)             */}
      {/* ============================================================ */}
      <div className="w-full max-w-xl text-center mb-28 sm:mb-40 relative z-10 space-y-3">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-serif italic text-lg sm:text-xl text-[#B8E7E5]"
        >
          {us.prelude}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-handwriting text-3xl sm:text-5xl text-[#FFFDF8] tracking-wide pb-4 drop-shadow-[0_2px_20px_rgba(255,253,248,0.5)]"
        >
          {us.preludePause}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFFDF8] font-light tracking-[0.26em]"
        >
          {us.title}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8ED4D6] to-transparent mx-auto mt-6 origin-center"
        />
      </div>

      {/* ============================================================ */}
      {/* COUPLE PHOTOGRAPHS: CINEMATIC REVEALS                        */}
      {/* ============================================================ */}
      <div className="w-full max-w-3xl flex flex-col items-center relative z-10 space-y-36 sm:space-y-48">
        {/* ------------------------------------------------------------ */}
        {/* PHOTO 1: THE TURNING POINT HERO COUPLE REVEAL               */}
        {/* ------------------------------------------------------------ */}
        {p1 && (
          <div className="w-full flex flex-col items-center">
            {/* Darkened surroundings with soft moonlight aura */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(p1)}
              className="w-full max-w-2xl group cursor-pointer relative"
            >
              {/* Soft warm moonlight halo */}
              <div className="absolute -inset-6 bg-radial from-[#8ED4D6]/25 via-[#DDF3E9]/10 to-transparent rounded-[2.5rem] blur-3xl pointer-events-none -z-10" />

              {/* Large Cinematic Photograph Frame */}
              <div className="w-full p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFFDF8]/95 border border-[#8ED4D6]/30 shadow-[0_32px_80px_rgba(3,27,34,0.45)] backdrop-blur-xs">
                <div className="w-full aspect-[16/9] max-h-[560px] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#FAF6ED] relative shadow-inner">
                  <img
                    src={p1.image}
                    alt={p1.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="pt-3 pb-1 px-3 flex justify-between items-baseline">
                  <span className="text-xs font-serif italic text-[#147C8A]/80 tracking-wide">
                    {p1.caption}
                  </span>
                  <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#0B6075]/70 font-semibold">
                    {p1.date || 'Our Forever'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Paced Emotional Cadence Under First Couple Photo */}
            <div className="w-full max-w-lg text-center mt-12 space-y-4 px-4">
              {/* Beat 1: "And then there was us." (0.4s) */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.4 }}
                className="font-handwriting text-3xl sm:text-5xl text-[#FFFDF8] tracking-wide drop-shadow-[0_2px_16px_rgba(255,253,248,0.5)]"
              >
                &ldquo;And then there was us.&rdquo;
              </motion.p>

              {/* Beat 2: "Maybe this is my favourite picture." (1.6s) */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.95, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 1.6 }}
                className="font-serif italic text-lg sm:text-2xl text-[#DDF3E9] font-light"
              >
                &ldquo;Maybe this is my favourite picture.&rdquo;
              </motion.p>

              {/* Beat 3: "Not because it's perfect." (2.8s) */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 2.8 }}
                className="font-serif italic text-base sm:text-xl text-[#B8E7E5] font-light"
              >
                Not because it's perfect.
              </motion.p>

              {/* Beat 4: "But because it's us." (4.0s) */}
              <motion.p
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.95, delay: 4.0 }}
                className="font-handwriting text-2xl sm:text-4xl text-[#FFFDF8] font-normal pt-1"
              >
                &ldquo;But because it's us.&rdquo;
              </motion.p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PHOTO 2: LATE NIGHT VIDEO CALL MOMENT                        */}
        {/* ------------------------------------------------------------ */}
        {p2 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(p2)}
              className="w-full max-w-xl group cursor-pointer relative"
            >
              <div className="w-full p-3 sm:p-4 rounded-3xl bg-[#FFFDF8]/95 border border-[#8ED4D6]/25 shadow-[0_24px_65px_rgba(3,27,34,0.35)] backdrop-blur-xs">
                <div className="w-full aspect-[4/3] max-h-[500px] rounded-2xl overflow-hidden bg-[#FAF6ED] relative shadow-inner">
                  <img
                    src={p2.image}
                    alt={p2.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="pt-3 pb-1 px-3 flex justify-between items-baseline">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#0B6075]">
                    {p2.caption}
                  </p>
                  <span className="text-[11px] font-serif italic text-[#147C8A]/70">
                    {p2.date}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Emotional lines beneath late night photo */}
            <div className="w-full max-w-lg text-center mt-8 space-y-3 px-4">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className="font-serif italic text-base sm:text-xl text-[#B8E7E5] leading-relaxed font-light"
              >
                &ldquo;{us.secondCoupleLine}&rdquo;
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8]"
              >
                &ldquo;{us.secondCoupleReflection}&rdquo;
              </motion.p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* ARTIFACTS: WRITTEN IN THE STARS & SATHUR + KALAI MONOGRAM     */}
        {/* ------------------------------------------------------------ */}
        {(p3 || p4) && (
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {p3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9 }}
                onClick={() => onSelectMemory(p3)}
                className="bg-[#FFFDF8]/95 p-3 rounded-3xl border border-[#8ED4D6]/25 shadow-[0_20px_50px_rgba(3,27,34,0.3)] cursor-pointer group"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] mb-3">
                  <img
                    src={p3.image}
                    alt={p3.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <p className="font-handwriting text-xl text-[#0B6075] px-1">
                  {p3.caption}
                </p>
              </motion.div>
            )}

            {p4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.15 }}
                onClick={() => onSelectMemory(p4)}
                className="bg-[#FFFDF8]/95 p-3 rounded-3xl border border-[#8ED4D6]/25 shadow-[0_20px_50px_rgba(3,27,34,0.3)] cursor-pointer group"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF6ED] mb-3">
                  <img
                    src={p4.image}
                    alt={p4.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <p className="font-handwriting text-xl text-[#0B6075] px-1">
                  {p4.caption}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UsSection;
