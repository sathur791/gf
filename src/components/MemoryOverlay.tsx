import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import type { MemoryItem } from '../data/birthdayContent';

interface MemoryOverlayProps {
  memory: MemoryItem | null;
  onClose: () => void;
}

const MemoryCardContent: React.FC<{ memory: MemoryItem; onClose: () => void }> = ({
  memory,
  onClose,
}) => {
  const [showHidden, setShowHidden] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className="w-full max-w-lg bg-[#FFFDF8] border border-[#0B6075]/20 rounded-3xl shadow-[0_28px_70px_rgba(7,63,77,0.45)] overflow-hidden my-auto flex flex-col relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FFFDF8]/90 border border-[#0B6075]/15 flex items-center justify-center text-[#0B6075] hover:bg-[#DDF3E9] transition-colors"
        aria-label="Close memory modal"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Large Image Frame - High-definition clarity and depth */}
      <div className="relative w-full max-h-[52vh] sm:max-h-[58vh] min-h-[260px] bg-gradient-to-b from-[#FAF6ED] to-[#F5EFE3] overflow-hidden border-b border-[#0B6075]/10 flex items-center justify-center p-3 sm:p-4">
        <img
          src={memory.image}
          alt={memory.title}
          decoding="async"
          className="max-h-[50vh] sm:max-h-[55vh] w-auto max-w-full object-contain rounded-xl shadow-md photo-enhanced"
        />
      </div>

      {/* Details Section */}
      <div className="p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            {memory.number && (
              <span className="text-[10px] font-sans font-semibold tracking-wider text-[#147C8A]">
                {memory.number}
              </span>
            )}
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#147C8A]/70">
              {memory.date}
            </span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-[#0B6075] font-light mb-2">
          {memory.title}
        </h3>

        {memory.caption && (
          <p className="font-handwriting text-2xl text-[#147C8A] mb-4">
            "{memory.caption}"
          </p>
        )}

        <p className="font-serif text-sm sm:text-base leading-relaxed text-[#123E45]/90 font-light mb-6">
          {memory.story}
        </p>

        {/* Hidden Note Interaction */}
        {memory.hiddenMessage && (
          <div className="mt-2 pt-4 border-t border-[#0B6075]/10">
            {!showHidden ? (
              <button
                onClick={() => setShowHidden(true)}
                className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#147C8A] hover:text-[#0B6075] py-1 transition-colors group font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8ED4D6] group-hover:scale-110 transition-transform" />
                <span>There's something about this picture...</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[#EAF7F0] border border-[#B8E7E5] font-handwriting text-xl text-[#0B6075]"
              >
                "{memory.hiddenMessage}"
              </motion.div>
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6 pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-sans tracking-[0.16em] uppercase font-semibold text-[#0B6075] bg-[#DDF3E9] hover:bg-[#B8E7E5] transition-colors"
            >
              Keep looking
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export const MemoryOverlay: React.FC<MemoryOverlayProps> = ({ memory, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#073F4D]/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <MemoryCardContent key={memory.id} memory={memory} onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
};
