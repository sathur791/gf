import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

export const BirthdayCard: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 px-6 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#0B6075]/12 shadow-[0_20px_50px_rgba(7,63,77,0.15)] transition-all"
      >
        {/* Soft Organic Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-[#8ED4D6]/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-[#DDF3E9]/30 to-transparent rounded-full blur-xl pointer-events-none" />

        {/* KALAIVANI */}
        <h1 className="text-3xl sm:text-4xl font-serif text-[#0B6075] font-light tracking-[0.18em] mb-3">
          {birthdayContent.recipientName}
        </h1>

        {/* Delicate divider */}
        <div className="w-8 h-[1px] bg-[#8ED4D6] mx-auto mb-4 rounded-full" />

        {/* A little world of ours */}
        <p className="font-handwriting text-2xl sm:text-3xl text-[#123E45]/90 mb-2">
          {birthdayContent.hero.heading}
        </p>

        {/* For all the little moments that became us */}
        <p className="font-serif italic text-xs sm:text-sm text-[#147C8A]/85 leading-relaxed">
          "{birthdayContent.hero.quote}"
        </p>
      </motion.div>
    </section>
  );
};

export default BirthdayCard;
