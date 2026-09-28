import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type WishCardItem } from '../data/birthdayContent';

export const WishCards: React.FC = () => {
  const { wishes } = birthdayContent;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative select-none">
      <div className="w-full max-w-lg text-center mb-16 space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-xs font-sans tracking-[0.28em] uppercase text-[#DDF3E9] font-medium"
        >
          for your years ahead
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide"
        >
          {wishes.title}
        </motion.h2>

        <p className="font-handwriting text-xl text-[#B8E7E5] opacity-80 pt-1">
          tap to unfold
        </p>
      </div>

      {/* Tactile Paper Cards Stack */}
      <div className="w-full max-w-md flex flex-col gap-5 relative z-10">
        {wishes.cards.map((wish: WishCardItem) => {
          const isExpanded = expandedId === wish.id;

          return (
            <motion.div
              key={wish.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => toggleCard(wish.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleCard(wish.id);
                }
              }}
              className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                isExpanded
                  ? 'bg-[#FAF6ED] border-[#8ED4D6] shadow-[0_20px_50px_rgba(3,27,34,0.35)] ring-1 ring-[#8ED4D6]/40'
                  : 'bg-[#FFFDF8]/90 border-[#0B6075]/15 hover:bg-[#FFFDF8] shadow-[0_10px_30px_rgba(3,27,34,0.15)]'
              }`}
              aria-expanded={isExpanded}
              aria-label={wish.category}
            >
              {/* Paper Fold Crease Line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-[#DDF3E9] text-[#0B6075] flex items-center justify-center text-sm font-serif font-bold shadow-xs">
                    {wish.symbol}
                  </span>
                  <h3 className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold text-[#0B6075]">
                    {wish.category}
                  </h3>
                </div>

                <span className="font-handwriting text-lg text-[#147C8A]">
                  {isExpanded ? 'close' : 'open'}
                </span>
              </div>

              {/* Unfolded Keepsake Note */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-[#0B6075]/10 pt-4"
                  >
                    <p className="font-serif italic text-base sm:text-lg text-[#123E45]/90 leading-relaxed font-light">
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WishCards;
