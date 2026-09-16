import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface FoldedNoteProps {
  teaser?: string;
  title?: string;
  message: string;
  className?: string;
}

export const FoldedNote: React.FC<FoldedNoteProps> = ({
  teaser = "wait...",
  title = "A little thought",
  message,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative z-20 select-none my-4 ${className}`}>
      {/* Folded Paper Pill / Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-sm border border-[rgba(20,125,138,0.22)] shadow-[0_4px_16px_rgba(11,95,115,0.12)] hover:border-[rgba(20,125,138,0.4)] transition-all duration-300 text-[#083B4A]"
        aria-expanded={isOpen}
      >
        {/* Stationery Tape Accent */}
        <span className="absolute -top-1.5 left-4 w-7 h-2.5 bg-[#BFE8EA]/50 border border-white/40 -rotate-3 rounded-sm pointer-events-none" />

        <Sparkles className="w-3.5 h-3.5 text-[#0B6075] group-hover:rotate-12 transition-transform duration-300" />

        <span className="font-handwriting text-lg text-[#0B6075] group-hover:text-[#073F4D] transition-colors font-medium">
          {teaser}
        </span>

        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-[#147C8A]" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-[#147C8A]" />
        )}
      </motion.button>

      {/* Unfolded Stationery Paper Note */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-2.5 max-w-sm"
          >
            <div className="p-4 sm:p-5 rounded-xl bg-[#FFFBF5] border border-[rgba(20,125,138,0.24)] shadow-[0_12px_32px_rgba(11,95,115,0.15)] relative">
              {/* Paper Washi Tape Visual */}
              <div className="w-10 h-3 bg-[#CFEBDD]/60 border border-white/50 absolute -top-1.5 right-6 rotate-2 rounded-xs shadow-xs pointer-events-none" />

              <h5 className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#147D8A] font-semibold mb-1">
                {title}
              </h5>

              <p className="font-handwriting text-xl text-[#083B4A] leading-relaxed mb-2">
                "{message}"
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-sans uppercase text-[#538A94] hover:text-[#083B4A] transition-colors font-medium text-right w-full block"
              >
                Fold back ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
