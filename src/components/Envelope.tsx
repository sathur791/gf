import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { ChevronDown } from 'lucide-react';

export const Envelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="w-full py-12 px-6 flex flex-col items-center justify-center relative">
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Envelope Container */}
        <div className="w-full flex flex-col items-center relative" style={{ perspective: '1200px' }}>
          <motion.div
            className="w-full max-w-md relative flex flex-col items-center cursor-pointer select-none rounded-2xl"
            onClick={toggleEnvelope}
            whileHover={!isOpen ? { y: -6, boxShadow: '0 28px 60px rgba(7,63,77,0.22)' } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleEnvelope();
              }
            }}
            aria-expanded={isOpen}
            aria-label="Open letter envelope"
          >
            {/* The Envelope Body */}
            <div className="w-full h-56 sm:h-64 bg-[#FFFDF8] rounded-2xl border border-[#0B6075]/15 shadow-[0_16px_45px_rgba(7,63,77,0.16)] relative overflow-hidden flex flex-col items-center justify-between p-6">
              {/* Back Flap Creases (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 240 L160 120" stroke="rgba(11,96,117,0.1)" strokeWidth="1.2" />
                <path d="M400 240 L240 120" stroke="rgba(11,96,117,0.1)" strokeWidth="1.2" />
                <path
                  d="M0 240 L200 130 L400 240"
                  fill="rgba(221, 243, 233, 0.25)"
                  stroke="rgba(11,96,117,0.08)"
                  strokeWidth="1"
                />
              </svg>

              {/* Animated Top Flap (3D Flip) */}
              <motion.div
                className="absolute top-0 inset-x-0 h-28 origin-top z-20"
                animate={{
                  rotateX: isOpen ? 180 : 0,
                  zIndex: isOpen ? 5 : 20,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.9 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg
                  className="w-full h-full drop-shadow-xs"
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                  fill="#FAF6ED"
                >
                  <path
                    d="M0 0 L200 120 L400 0 Z"
                    stroke="rgba(11,96,117,0.12)"
                    strokeWidth="1.2"
                  />
                </svg>

                {/* Wax Seal on Flap Tip with Break Animation */}
                <AnimatePresence>
                  {!isOpen ? (
                    <motion.div
                      key="wax-seal"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{
                        scale: [1, 1.15, 0.8],
                        opacity: [1, 0.8, 0],
                        filter: 'blur(3px)',
                      }}
                      transition={{ duration: 0.35 }}
                      className="w-12 h-12 rounded-full bg-[#8E3B46] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-medium absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30 shadow-md border border-white/25 cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                    >
                      {birthdayContent.envelope.sealText}
                    </motion.div>
                  ) : (
                    /* Delicate cracked wax remnants parting */
                    <motion.div
                      key="wax-cracked"
                      initial={{ opacity: 0.9, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.25 }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 pointer-events-none z-30 flex items-center gap-1"
                    >
                      <motion.div
                        animate={{ x: -14, rotate: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-6 h-12 bg-[#8E3B46] rounded-l-full shadow-sm"
                      />
                      <motion.div
                        animate={{ x: 14, rotate: 20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-6 h-12 bg-[#8E3B46] rounded-r-full shadow-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Top Spacing */}
              <div className="w-full flex items-center justify-end z-10 opacity-75">
                <span className="text-xs font-serif italic text-[#147C8A]/80">
                  {birthdayContent.birthday.displayDate}
                </span>
              </div>

              {/* Envelope Recipient Label */}
              <div className="my-auto z-10 text-center">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#0B6075] tracking-wider font-light">
                  {birthdayContent.recipientName}
                </h3>
              </div>

              {/* Quiet Hint */}
              <div className="z-10 text-center">
                <p className="text-sm font-handwriting text-[#147C8A] flex items-center justify-center gap-1.5">
                  {isOpen ? 'fold letter' : 'unfold'}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0B6075]' : ''
                    }`}
                  />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Letter Rising & Unfolding in 3D */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -35, scale: 0.9, rotateX: -35 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.94, rotateX: -20 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16, mass: 1 }}
                style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                className="w-full max-w-lg mt-6 rounded-3xl p-6 sm:p-9 bg-[#FFFDF8] border border-[#0B6075]/15 shadow-[0_24px_55px_rgba(7,63,77,0.16)] relative z-30"
              >
                <div className="p-5 sm:p-8 bg-[#FAF6ED]/80 rounded-2xl border border-[#0B6075]/10 shadow-xs">
                  {/* Letter Salutation */}
                  <p className="font-serif text-xl text-[#0B6075] mb-4 font-medium">
                    {birthdayContent.envelope.salutation}
                  </p>

                  {/* Letter Body Paragraphs */}
                  <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#123E45]/90 font-serif font-light">
                    {birthdayContent.envelope.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Handwritten Sign-off */}
                  <div className="mt-8 pt-4 border-t border-[#0B6075]/10 flex justify-between items-end">
                    <span className="text-xs font-serif italic text-[#147C8A]/70">
                      {birthdayContent.birthday.displayDate}
                    </span>
                    <span className="font-handwriting text-2xl text-[#0B6075]">
                      {birthdayContent.senderName}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Envelope;
