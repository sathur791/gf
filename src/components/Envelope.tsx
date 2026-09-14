import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { Mail, ChevronDown } from 'lucide-react';

export const Envelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="w-full py-12 px-6 flex flex-col items-center justify-center relative">
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Envelope Container */}
        <div className="w-full flex flex-col items-center relative perspective-1000">
          <motion.div
            className="w-full max-w-md relative flex flex-col items-center cursor-pointer select-none"
            onClick={toggleEnvelope}
            whileHover={{ y: isOpen ? 0 : -3 }}
            transition={{ duration: 0.25 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleEnvelope();
              }
            }}
            aria-expanded={isOpen}
            aria-label="Open birthday letter envelope"
          >
            {/* The Envelope Body */}
            <div className="w-full h-56 sm:h-64 bg-[#FFFDF8] rounded-2xl border border-[#0B6075]/20 shadow-[0_16px_45px_rgba(7,63,77,0.18)] relative overflow-hidden flex flex-col items-center justify-between p-6">
              {/* Back Flap Creases (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 240"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 240 L160 120" stroke="rgba(11,96,117,0.1)" strokeWidth="1.2" />
                <path d="M400 240 L240 120" stroke="rgba(11,96,117,0.1)" strokeWidth="1.2" />
                <path
                  d="M0 240 L200 130 L400 240"
                  fill="rgba(221, 243, 233, 0.3)"
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
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg
                  className="w-full h-full drop-shadow-sm"
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                  fill="#FAF6ED"
                >
                  <path
                    d="M0 0 L200 120 L400 0 Z"
                    stroke="rgba(11,96,117,0.15)"
                    strokeWidth="1.2"
                  />
                </svg>

                {/* Wax Seal on Flap Tip */}
                {!isOpen && (
                  <motion.div
                    className="w-12 h-12 rounded-full bg-[#A64B56] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-medium absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30 shadow-md border border-white/20"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {birthdayContent.envelope.sealText}
                  </motion.div>
                )}
              </motion.div>

              {/* Envelope Front Header */}
              <div className="w-full flex items-center justify-between z-10 opacity-85">
                <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#147C8A] flex items-center gap-1.5 font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  FOR YOU
                </span>
                <span className="text-xs font-serif italic text-[#147C8A]">
                  {birthdayContent.birthday.displayDate}
                </span>
              </div>

              {/* Envelope Recipient Label */}
              <div className="my-auto z-10 text-center">
                <p className="text-[10px] font-sans tracking-[0.26em] uppercase text-[#147C8A]/70 mb-1 font-semibold">
                  SPECIAL DELIVERY
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#0B6075] tracking-wider font-light">
                  {birthdayContent.recipientName}
                </h3>
              </div>

              {/* Tap instruction */}
              <div className="z-10 text-center">
                <p className="text-xs font-handwriting text-[#147C8A] text-lg flex items-center justify-center gap-1.5">
                  {isOpen ? 'Tap to fold letter' : birthdayContent.envelope.hint}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0B6075]' : ''
                    }`}
                  />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Letter Rising Out of Envelope */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.96 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg mt-6 rounded-3xl p-7 sm:p-9 bg-[#FFFDF8] border border-[#0B6075]/15 shadow-[0_20px_50px_rgba(7,63,77,0.16)] relative z-30"
              >
                <div className="p-4 sm:p-6 bg-[#FAF6ED]/70 rounded-2xl border border-[#0B6075]/10">
                  {/* Letter Header */}
                  <div className="border-b border-[#0B6075]/12 pb-3.5 mb-5">
                    <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#147C8A] mb-1 font-semibold">
                      BIRTHDAY NOTE
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#0B6075] font-light italic">
                      {birthdayContent.envelope.heading}
                    </h3>
                  </div>

                  {/* Letter Salutation */}
                  <p className="font-serif text-lg text-[#0B6075] mb-3 font-medium">
                    {birthdayContent.envelope.salutation}
                  </p>

                  {/* Letter Body Paragraphs */}
                  <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-[#123E45] font-serif font-light">
                    {birthdayContent.envelope.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Handwritten Sign-off */}
                  <div className="mt-6 pt-3 border-t border-[#0B6075]/10 flex justify-between items-end">
                    <span className="text-xs font-sans text-[#147C8A] tracking-wider uppercase font-medium">
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
