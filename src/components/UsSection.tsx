import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';
import { Moon } from 'lucide-react';

interface UsSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const UsSection: React.FC<UsSectionProps> = ({ onSelectMemory }) => {
  const { us } = birthdayContent;
  const p1 = us.photos[0]; // us-real-couple.png
  const p2 = us.photos[1]; // us-videocall-sleep.png
  const pStars = us.photos[2]; // us-stars.png
  const pSignature = us.photos[3]; // us-signature.jpg
  const pTemple = us.photos[4]; // us-temple.jpg

  return (
    <section className="w-full py-20 sm:py-28 px-6 flex flex-col items-center relative select-none">
      {/* ============================================================ */}
      {/* PRELUDE: THE EMOTIONAL TURNING POINT (YOU -> US)             */}
      {/* ============================================================ */}
      <div className="w-full max-w-xl text-center mb-16 sm:mb-24 relative z-10 space-y-3">
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
      <div className="w-full max-w-3xl flex flex-col items-center relative z-10 space-y-20 sm:space-y-28">
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
              <div className="w-full p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFFDF8]/95 border border-[#8ED4D6]/35 shadow-[0_32px_80px_rgba(3,27,34,0.45)] backdrop-blur-xs">
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[560px] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#FAF6ED] relative shadow-inner">
                  <img
                    src={p1.image}
                    alt={p1.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="pt-3 pb-1 px-3 flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm font-serif italic text-[#147C8A]/90 tracking-wide">
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
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.3 }}
                className="font-handwriting text-3xl sm:text-5xl text-[#FFFDF8] tracking-wide drop-shadow-[0_2px_16px_rgba(255,253,248,0.5)]"
              >
                &ldquo;And then there was us.&rdquo;
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.95, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.9 }}
                className="font-serif italic text-base sm:text-lg text-[#DDF3E9] font-light leading-relaxed max-w-md mx-auto"
              >
                &ldquo;{us.firstCoupleReflection}&rdquo;
              </motion.p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PHOTO 2: LATE NIGHT VIDEO CALL MOMENT (Full Phone Screen)    */}
        {/* ------------------------------------------------------------ */}
        {p2 && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(p2)}
              className="w-full max-w-sm sm:max-w-md group cursor-pointer relative"
            >
              {/* Soft screen glow */}
              <div className="absolute -inset-4 bg-radial from-[#8ED4D6]/20 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none -z-10" />

              <div className="w-full p-3 sm:p-4 rounded-[2rem] bg-[#FFFDF8]/95 border border-[#8ED4D6]/30 shadow-[0_24px_65px_rgba(3,27,34,0.35)] backdrop-blur-xs">
                {/* Phone Call Screen Frame — preserves the whole screenshot without cropping */}
                <div className="w-full aspect-[9/16] max-h-[540px] rounded-2xl overflow-hidden bg-[#031C23] relative shadow-inner border border-[#8ED4D6]/20 flex items-center justify-center">
                  <img
                    src={p2.image}
                    alt={p2.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-contain object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                  />
                  {/* Subtle top indicator overlay */}
                  <div className="absolute top-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-sans text-white/70 pointer-events-none">
                    <span className="flex items-center gap-1 font-mono">
                      <Moon className="w-3 h-3 text-[#8ED4D6]" />
                      <span>Late Night Peace</span>
                    </span>
                    <span className="text-[#8ED4D6] text-xs">✦</span>
                  </div>
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
        {/* PHOTO 3: TEMPLE WALK MOMENT (Ghibli Artwork)                 */}
        {/* ------------------------------------------------------------ */}
        {pTemple && (
          <div className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectMemory(pTemple)}
              className="w-full max-w-md sm:max-w-lg group cursor-pointer relative"
            >
              {/* Soft warm golden temple glow */}
              <div className="absolute -inset-4 bg-radial from-[#FFE39E]/25 via-[#8ED4D6]/15 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none -z-10" />

              <div className="w-full p-3 sm:p-4 rounded-3xl bg-[#FFFDF8]/95 border border-[#FFE39E]/40 shadow-[0_24px_65px_rgba(3,27,34,0.35)] backdrop-blur-xs">
                <div className="w-full aspect-[2/3] max-h-[540px] rounded-2xl overflow-hidden bg-[#FAF6ED] relative shadow-inner border border-[#0B6075]/10">
                  <img
                    src={pTemple.image}
                    alt={pTemple.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="pt-3 pb-1 px-3 flex justify-between items-baseline">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#0B6075]">
                    {pTemple.caption}
                  </p>
                  <span className="text-[11px] font-serif italic text-[#147C8A]/70">
                    {pTemple.date}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.95, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md text-center mt-6 px-4"
            >
              <p className="font-serif italic text-base sm:text-lg text-[#DDF3E9] font-light leading-relaxed">
                &ldquo;In every quiet corridor and every little step, having you beside me is my greatest blessing.&rdquo;
              </p>
            </motion.div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* ARTIFACTS: WRITTEN IN THE STARS & SATHUR + KALAI MONOGRAM     */}
        {/* ------------------------------------------------------------ */}
        {(pStars || pSignature) && (
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {/* Written in the Stars — proper aspect ratio so stars are never cut off */}
            {pStars && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9 }}
                onClick={() => onSelectMemory(pStars)}
                className="bg-[#FFFDF8]/95 p-3 rounded-3xl border border-[#8ED4D6]/30 shadow-[0_20px_50px_rgba(3,27,34,0.3)] cursor-pointer group flex flex-col"
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF6ED] mb-3 flex items-center justify-center p-1 border border-[#0B6075]/10">
                  <img
                    src={pStars.image}
                    alt={pStars.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="px-1 flex justify-between items-baseline">
                  <p className="font-handwriting text-xl text-[#0B6075]">
                    {pStars.caption}
                  </p>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#147C8A]/70">
                    Constellation
                  </span>
                </div>
              </motion.div>
            )}

            {/* Hand-drawn S & Kalai Monogram Sketch */}
            {pSignature && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.15 }}
                onClick={() => onSelectMemory(pSignature)}
                className="bg-[#FFFDF8]/95 p-3 rounded-3xl border border-[#8ED4D6]/30 shadow-[0_20px_50px_rgba(3,27,34,0.3)] cursor-pointer group flex flex-col"
              >
                <div className="w-full aspect-[3/4] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF6ED] mb-3 flex items-center justify-center p-2 border border-[#0B6075]/10">
                  <img
                    src={pSignature.image}
                    alt={pSignature.title}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="px-1 flex justify-between items-baseline">
                  <p className="font-handwriting text-xl text-[#0B6075]">
                    {pSignature.caption}
                  </p>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#147C8A]/70">
                    Forever
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UsSection;
