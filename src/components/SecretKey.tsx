import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { KeyRound, ArrowLeft } from 'lucide-react';

interface SecretKeyProps {
  onUnlockSuccess: () => void;
  onBack: () => void;
}

export const SecretKey: React.FC<SecretKeyProps> = ({ onUnlockSuccess, onBack }) => {
  const [keyInput, setKeyInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalize = (val: string) => val.trim().toLowerCase();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = normalize(keyInput);

    const isMatch = birthdayContent.passwords.some(
      (pass) => normalize(pass) === cleanInput
    );

    if (isMatch) {
      setErrorFeedback(null);
      setIsSubmitting(true);
      window.dispatchEvent(new CustomEvent('play-birthday-music'));
      setTimeout(() => {
        onUnlockSuccess();
      }, 300);
    } else {
      setErrorFeedback('Not quite... think about us.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#1C0E15]/85 backdrop-blur-md overflow-hidden">
      {/* Soft floating atmospheric lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-[#D4AF37]/20 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-44 h-44 rounded-full bg-[#F8DCD4]/25 blur-3xl pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{
          opacity: isSubmitting ? 0 : 1,
          scale: isSubmitting ? 1.05 : 1,
          y: isSubmitting ? -12 : 0,
          x: isShaking ? [-6, 6, -4, 4, -2, 2, 0] : 0,
        }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-[320px] bg-[#FFFDF8] rounded-3xl border border-[#D4AF37]/35 shadow-[0_24px_60px_rgba(28,14,21,0.5)] p-6 sm:p-7 text-center flex flex-col items-center relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="self-start -mt-2 -ml-2 mb-2 p-2 rounded-full text-[#704455] hover:text-[#2D1822] hover:bg-[#FCEEE9] transition-colors"
          aria-label="Back to cover"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Small Key Icon in soft circular badge */}
        <div className="w-11 h-11 rounded-full bg-[#FCEEE9] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3 shadow-sm">
          <KeyRound className="w-5 h-5 opacity-90" />
        </div>

        {/* Eyebrow */}
        <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#D4AF37] mb-1 font-semibold">
          {birthdayContent.secretKey.eyebrow}
        </p>

        {/* Title: exactly "olunga password podu" */}
        <h2 className="text-2xl sm:text-[26px] font-serif text-[#2D1822] font-light leading-snug mb-1">
          {birthdayContent.secretKey.title}
        </h2>

        {/* Subtitle */}
        <p className="font-handwriting text-xl text-[#704455] mb-5">
          {birthdayContent.secretKey.subtitle}
        </p>

        {/* Handwritten Note Form Field */}
        <form onSubmit={handleUnlock} className="w-full flex flex-col items-center">
          <div className="w-full mb-3.5">
            <motion.input
              type="text"
              autoFocus
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                if (errorFeedback) setErrorFeedback(null);
              }}
              whileFocus={{ scale: 1.01 }}
              placeholder={birthdayContent.secretKey.placeholder}
              aria-label="Secret key input"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4AF37]/30 text-[#2D1822] placeholder-[#704455]/50 text-sm text-center font-serif focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40 focus:bg-[#FFFDF8] transition-all shadow-inner"
            />
          </div>

          <AnimatePresence>
            {errorFeedback && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs font-handwriting text-[#963842] text-lg mb-2 font-medium"
              >
                {errorFeedback}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-xl text-xs font-serif tracking-[0.2em] uppercase font-medium text-[#FFFDF8] bg-gradient-to-r from-[#D4AF37] to-[#B38E2A] hover:from-[#E5C07B] hover:to-[#D4AF37] transition-all shadow-[0_4px_16px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            {birthdayContent.secretKey.buttonText}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
