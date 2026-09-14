import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { RotateCcw } from 'lucide-react';

interface CoupleClimaxProps {
  onReplay: () => void;
}

export const CoupleClimax: React.FC<CoupleClimaxProps> = ({ onReplay }) => {
  const { final, moon } = birthdayContent;

  return (
    <section className="w-full min-h-screen py-32 sm:py-44 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0B6075]/80 via-[#073F4D] to-[#042831]">
      {/* ============================================================ */}
      {/* 33. FINAL NIGHT SKY & GLOWING PROMINENT MOON                 */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.95, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute top-12 sm:top-20 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none select-none z-0"
      >
        {/* Deep Moon Glow & Haze */}
        <div className="absolute inset-0 rounded-full bg-[#FFFDF8]/25 blur-3xl scale-125 pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-[#8ED4D6]/20 blur-4xl scale-150 pointer-events-none" />

        <img
          src={moon.image}
          alt="Final Moon"
          className="w-full h-full object-contain filter drop-shadow-[0_0_45px_rgba(255,253,248,0.55)] opacity-90"
          style={{
            maskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ============================================================ */}
      {/* 36. FINAL BALLOON MOMENT (3–5 Elegant Background Balloons)   */}
      {/* Positioned on the sides, behind typography & couple photo     */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Balloon 1: Far Left - Soft Ocean Aqua */}
        <motion.div
          className="absolute left-[4%] sm:left-[8%] bottom-0 w-10 h-14 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br from-[#FFFDF8] via-[#8ED4D6] to-[#0B6075] opacity-40 shadow-sm"
          animate={{ y: [0, -900], x: [0, 16, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />

        {/* Balloon 2: Far Right - Soft Cream */}
        <motion.div
          className="absolute right-[5%] sm:right-[9%] bottom-0 w-12 h-16 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br from-[#FFFDF8] via-[#FAF6ED] to-[#DDF3E9] opacity-35 shadow-sm"
          animate={{ y: [0, -1000], x: [0, -18, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear', delay: 4 }}
        />

        {/* Balloon 3: Mid-Left Deep - Mint */}
        <motion.div
          className="absolute left-[12%] sm:left-[16%] bottom-[-80px] w-9 h-13 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br from-[#FFFDF8] via-[#DDF3E9] to-[#147C8A] opacity-30 shadow-sm"
          animate={{ y: [0, -850], x: [0, 12, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear', delay: 8 }}
        />

        {/* Balloon 4: Mid-Right Deep - Soft Cyan */}
        <motion.div
          className="absolute right-[14%] sm:right-[18%] bottom-[-60px] w-10 h-14 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br from-[#FFFDF8] via-[#B8E7E5] to-[#0B6075] opacity-30 shadow-sm"
          animate={{ y: [0, -920], x: [0, -14, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 12 }}
        />
      </div>

      {/* ============================================================ */}
      {/* 32. FINAL SILENCE & TEXT TRANSITION                          */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center relative z-10 pt-36 sm:pt-48">
        <motion.p
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          whileInView={{ opacity: 0.9, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#8ED4D6] mb-2"
        >
          And after everything...
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.95 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-xs sm:text-sm font-sans tracking-[0.32em] uppercase text-[#FFFDF8] mb-14 sm:mb-16 font-medium"
        >
          there is us.
        </motion.p>

        {/* ============================================================ */}
        {/* 34. FINAL COUPLE PHOTOGRAPH: couple-final.png REVEAL         */}
        {/* Soft background -> tiny light -> blur -> sharp -> full reveal*/}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl relative mb-14 flex flex-col items-center select-none"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute inset-0 bg-radial from-[#8ED4D6]/25 via-[#0B6075]/15 to-transparent rounded-3xl blur-3xl scale-110 -z-10 pointer-events-none" />

          {/* Clean Cinematic Frame without generic card border */}
          <div className="w-full p-2 sm:p-3 rounded-3xl bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#042831] relative">
              <img
                src={final.couplePhoto}
                alt="Sathur and Kalaivani"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 35. FINAL BIRTHDAY MESSAGE & SIGNATURE                       */}
        {/* ============================================================ */}
        {/* 10.10.2026 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9 }}
          className="text-xs font-sans tracking-[0.34em] uppercase text-[#8ED4D6] mb-3 font-semibold"
        >
          {final.date}
        </motion.p>

        {/* HAPPY BIRTHDAY */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl sm:text-2xl font-sans tracking-[0.26em] uppercase text-[#FFFDF8] font-light mb-2"
        >
          {final.birthdayTitle}
        </motion.h3>

        {/* KALAIVANI */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFFDF8] font-light tracking-[0.16em] mb-6"
        >
          {final.name}
        </motion.h2>

        {/* Personal Final Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="font-serif italic text-lg sm:text-xl text-[#FFFDF8]/90 max-w-lg leading-relaxed mb-6 font-light"
        >
          "{final.message}"
        </motion.p>

        {/* Always yours. Sathur */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mb-8 text-center flex flex-col items-center"
        >
          <span className="text-xs font-sans tracking-[0.24em] uppercase text-[#8ED4D6] mb-1 font-semibold">
            Always yours.
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8]">
            Sathur
          </span>
        </motion.div>

        {/* Until our next memory. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="text-xs font-sans tracking-[0.26em] uppercase text-[#B8E7E5] mb-14 font-medium"
        >
          {final.closing}
        </motion.p>

        {/* ============================================================ */}
        {/* 38. REPLAY: "Open it again"                                  */}
        {/* Smooth scroll to beginning without page reload               */}
        {/* ============================================================ */}
        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="px-8 py-3 rounded-full bg-[#FFFDF8] text-[#0B6075] hover:bg-[#FAF6ED] font-sans font-semibold text-xs tracking-[0.22em] uppercase shadow-[0_12px_30px_rgba(0,0,0,0.3)] flex items-center gap-2.5 group transition-all"
          aria-label="Open the birthday gift again"
        >
          <RotateCcw className="w-3.5 h-3.5 opacity-70 group-hover:-rotate-90 transition-transform duration-300" />
          <span>{final.replayText}</span>
        </motion.button>
      </div>
    </section>
  );
};
