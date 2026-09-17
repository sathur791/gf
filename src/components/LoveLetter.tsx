import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

export const LoveLetter: React.FC = () => {
  const { letter } = birthdayContent;

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Transition Prelude: Poetic & Natural */}
        <div className="text-center mb-12 sm:mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-serif italic text-lg sm:text-xl text-[#704455]"
          >
            {letter.introLine1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.95 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-handwriting text-3xl sm:text-4xl text-[#963842]"
          >
            {letter.introLine2}
          </motion.p>
        </div>

        {/* Large Cream Paper Letter Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#FFFDF8] rounded-3xl p-7 sm:p-12 relative overflow-hidden border border-[#D4AF37]/35 shadow-[0_24px_70px_rgba(45,24,34,0.14)] deckled-paper"
        >
          <div className="p-6 sm:p-10 bg-[#FAF7F0]/85 rounded-2xl border border-[#D4AF37]/20">
            {/* Delicate Header: "for the things I never say enough..." */}
            <p className="font-handwriting text-xl sm:text-2xl text-[#963842] mb-5">
              {letter.heading}
            </p>

            {/* Salutation */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="font-serif text-2xl sm:text-3xl text-[#2D1822] font-medium mb-5"
            >
              {letter.salutation}
            </motion.p>

            {/* Paragraphs with authentic human voice */}
            <div className="space-y-5 text-base sm:text-lg font-serif font-light leading-relaxed text-[#2D1822]/90">
              {letter.paragraphs.map((para: string, idx: number) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Handwritten Signature: Always yours. Sathur */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 pt-5 border-t border-[#D4AF37]/25 flex flex-col items-end"
            >
              <span className="text-xs font-serif italic text-[#704455] mb-1">
                {letter.signaturePrefix}
              </span>
              <span className="font-handwriting text-3xl sm:text-4xl text-[#963842]">
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
