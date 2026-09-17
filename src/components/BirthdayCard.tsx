import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

export const BirthdayCard: React.FC = () => {
  const nameLetters = birthdayContent.recipientName.split('');

  return (
    <section className="w-full py-16 sm:py-24 px-6 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        whileHover={{ y: -4, transition: { duration: 0.35 } }}
        className="w-full max-w-lg bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden border border-[#D4AF37]/35 shadow-[0_24px_60px_rgba(45,24,34,0.12)] deckled-paper"
      >
        {/* Soft Organic Blush & Gold Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-radial from-[#F6E2B3]/30 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-radial from-[#F8DCD4]/35 to-transparent rounded-full blur-xl pointer-events-none" />

        {/* Ambient floating gold sparkle accents */}
        {[
          { top: '12%', left: '8%', delay: 0 },
          { top: '18%', right: '10%', delay: 1.2 },
          { bottom: '15%', left: '15%', delay: 0.6 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37] pointer-events-none"
            style={pos}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.3, 0.8],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: pos.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* KALAIVANI — letter stagger reveal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D1822] font-light tracking-[0.24em] uppercase mb-3 flex justify-center flex-wrap">
          {nameLetters.map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.05, ease: EASE_OUT_EXPO }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Delicate gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT_EXPO }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4 origin-center"
        />

        {/* A little world of ours */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="font-handwriting text-2xl sm:text-3xl text-[#704455] mb-3"
        >
          {birthdayContent.hero.heading}
        </motion.p>

        {/* For all the little moments that became us */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-serif italic text-xs sm:text-sm text-[#963842]/85 leading-relaxed max-w-sm mx-auto"
        >
          &ldquo;{birthdayContent.hero.quote}&rdquo;
        </motion.p>
      </motion.div>
    </section>
  );
};

export default BirthdayCard;
