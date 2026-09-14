import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

export const LoveLetter: React.FC = () => {
  const { letter } = birthdayContent;

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Transition Prelude */}
        <div className="text-center mb-12 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-handwriting text-2xl sm:text-3xl text-[#147C8A] mb-2"
          >
            One last thing...
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B6075] font-light tracking-wide"
          >
            Something I wanted to say properly.
          </motion.h2>
        </div>

        {/* Large Cream Paper Letter Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-[#0B6075]/15 shadow-[0_24px_70px_rgba(7,63,77,0.18)]"
        >
          {/* Paper texture and subtle background lines */}
          <div className="p-6 sm:p-10 bg-[#FAF6ED]/70 rounded-2xl border border-[#0B6075]/10">
            {/* Salutation */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="font-serif text-2xl sm:text-3xl text-[#0B6075] font-medium mb-6"
            >
              {letter.salutation}
            </motion.p>

            {/* Paragraphs with authentic human voice */}
            <div className="space-y-6 text-base sm:text-lg font-serif font-light leading-relaxed text-[#123E45]/90">
              {letter.paragraphs.map((para: string, idx: number) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Handwritten Signature: Always yours. Sathur */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-6 border-t border-[#0B6075]/12 flex flex-col items-end"
            >
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#147C8A] mb-1 font-semibold">
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
