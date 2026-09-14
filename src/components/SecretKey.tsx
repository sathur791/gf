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
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#073F4D]/80 backdrop-blur-md overflow-hidden">
      {/* Soft floating atmospheric lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-[#8ED4D6]/20 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-44 h-44 rounded-full bg-[#B8E7E5]/20 blur-3xl pointer-events-none"
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
        className="w-full max-w-[320px] bg-[#FFFDF8] rounded-3xl border border-[#0B6075]/20 shadow-[0_24px_60px_rgba(7,63,77,0.4)] p-6 sm:p-7 text-center flex flex-col items-center relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="self-start -mt-2 -ml-2 mb-2 p-2 rounded-full text-[#147C8A] hover:text-[#0B6075] hover:bg-[#DDF3E9]/50 transition-colors"
          aria-label="Back to cover"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Small Key Icon in soft circular badge */}
        <div className="w-11 h-11 rounded-full bg-[#DDF3E9] border border-[#0B6075]/15 flex items-center justify-center text-[#0B6075] mb-3 shadow-sm">
          <KeyRound className="w-5 h-5 opacity-90" />
        </div>

        {/* Eyebrow */}
        <p className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#147C8A] mb-1 font-semibold">
          {birthdayContent.secretKey.eyebrow}
        </p>

        {/* Title: exactly "olunga password podu" */}
        <h2 className="text-2xl sm:text-[26px] font-serif text-[#0B6075] font-light leading-snug mb-1">
          {birthdayContent.secretKey.title}
        </h2>

        {/* Subtitle */}
        <p className="font-handwriting text-xl text-[#1D8994] mb-5">
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
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6ED] border border-[#0B6075]/25 text-[#123E45] placeholder-[#147C8A]/50 text-sm text-center font-serif focus:outline-none focus:border-[#0B6075] focus:ring-2 focus:ring-[#8ED4D6]/60 focus:bg-[#FFFDF8] transition-all shadow-inner"
            />
          </div>

          <AnimatePresence>
            {errorFeedback && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs font-handwriting text-[#A64B56] text-lg mb-2 font-medium"
              >
                {errorFeedback}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-xl text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#FFFDF8] bg-[#0B6075] hover:bg-[#147C8A] transition-all shadow-[0_4px_14px_rgba(11,96,117,0.25)]"
          >
            {birthdayContent.secretKey.buttonText}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
