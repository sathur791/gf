import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

export const BirthdayCard: React.FC = () => {
  const nameLetters = birthdayContent.recipientName.split('');

  return (
    <section className="w-full py-16 sm:py-24 px-6 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94, rotateX: 8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        whileHover={{ y: -4, transition: { duration: 0.35 } }}
        className="w-full max-w-md bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#0B6075]/12 shadow-[0_20px_50px_rgba(7,63,77,0.15)] animate-card-glow shimmer-surface"
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      >
        {/* Soft Organic Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-[#8ED4D6]/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-radial from-[#DDF3E9]/30 to-transparent rounded-full blur-xl pointer-events-none" />

        {/* Ambient floating sparkle accents */}
        {[
          { top: '12%', left: '8%', delay: 0 },
          { top: '20%', right: '10%', delay: 1.2 },
          { bottom: '15%', left: '15%', delay: 0.6 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#8ED4D6] pointer-events-none"
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
        <h1 className="text-3xl sm:text-4xl font-serif text-[#0B6075] font-light tracking-[0.18em] mb-3 flex justify-center flex-wrap">
          {nameLetters.map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.06, ease: EASE_OUT_EXPO }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Delicate divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT_EXPO }}
          className="w-8 h-[1px] bg-[#8ED4D6] mx-auto mb-4 rounded-full origin-center"
        />

        {/* A little world of ours */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="font-handwriting text-2xl sm:text-3xl text-[#123E45]/90 mb-2"
        >
          {birthdayContent.hero.heading}
        </motion.p>

        {/* For all the little moments that became us */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-serif italic text-xs sm:text-sm text-[#147C8A]/85 leading-relaxed"
        >
          &ldquo;{birthdayContent.hero.quote}&rdquo;
        </motion.p>
      </motion.div>
    </section>
  );
};

export default BirthdayCard;
