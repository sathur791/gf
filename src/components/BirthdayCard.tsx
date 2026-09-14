import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

export const BirthdayCard: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 px-6 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3 }}
        className="w-full max-w-md bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.18)] transition-all"
      >
        {/* Subtle Paper Grain & Soft Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#8ED4D6]/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-radial from-[#DDF3E9]/30 to-transparent rounded-full blur-xl pointer-events-none" />

        {/* Small Tagline */}
        <p className="text-[10.5px] font-sans tracking-[0.28em] uppercase text-[#147C8A] mb-4 font-semibold">
          10.10.2026
        </p>

        {/* HAPPY BIRTHDAY */}
        <h2 className="text-sm sm:text-base font-sans tracking-[0.3em] uppercase text-[#147C8A] font-medium mb-2">
          HAPPY BIRTHDAY
        </h2>

        {/* KALAI */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#0B6075] font-light tracking-wide mb-5">
          {birthdayContent.shortName.toUpperCase()}
        </h1>

        {/* Delicate divider */}
        <div className="w-12 h-[1.5px] bg-[#8ED4D6] mx-auto mb-5 rounded-full" />

        {/* Made especially for you. */}
        <p className="font-handwriting text-2xl sm:text-3xl text-[#123E45]/85">
          Made especially for you.
        </p>
      </motion.div>
    </section>
  );
};
