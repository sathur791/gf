import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

export const LoveLetter: React.FC = () => {
  const { letter } = birthdayContent;

  return (
    <section className="w-full py-32 sm:py-44 px-6 flex flex-col items-center relative select-none">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Intimate Prelude (Natural Emotional Writing, No Giant Titles) */}
        <div className="text-center mb-14 sm:mb-20 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-serif italic text-lg sm:text-xl text-[#B8E7E5]"
          >
            There are some things I don't always know how to say...
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.95, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8]"
          >
            so I'm leaving them here.
          </motion.p>
        </div>

        {/* Large Textured Parchment Letter Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#FFFDF8] rounded-3xl p-7 sm:p-14 relative overflow-hidden border border-[#0B6075]/15 shadow-[0_28px_75px_rgba(3,27,34,0.35)]"
        >
          {/* Subtle parchment interior with faint fold crease */}
          <div className="p-6 sm:p-10 bg-[#FAF6ED] rounded-2xl border border-[#0B6075]/10 relative shadow-inner">
            {/* Soft Botanical Leaf Watermark in Corner */}
            <svg
              className="absolute top-4 right-4 w-16 h-16 text-[#0B6075]/10 pointer-events-none"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              <path d="M32 4C20 18 12 34 16 52C28 50 44 42 52 28C56 16 44 6 32 4Z" />
            </svg>

            {/* Handwritten Salutation */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="font-serif text-2xl sm:text-3xl text-[#0B6075] font-normal mb-6"
            >
              {letter.salutation}
            </motion.p>

            {/* Heartfelt Paragraphs with Authentic Voice */}
            <div className="space-y-6 text-base sm:text-lg font-serif font-light leading-relaxed text-[#123E45]/90">
              {letter.paragraphs.map((para: string, idx: number) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.75, delay: idx * 0.12 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Handwritten Sign-off */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-6 border-t border-[#0B6075]/12 flex flex-col items-end"
            >
              <span className="text-xs font-serif italic text-[#147C8A]/80 mb-1">
                {letter.signaturePrefix}
              </span>
              <span className="font-handwriting text-3xl sm:text-4xl text-[#0B6075]">
                {letter.signatureName}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
