import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type WishCardItem } from '../data/birthdayContent';
import { ChevronDown } from 'lucide-react';

export const WishCards: React.FC = () => {
  const { wishes } = birthdayContent;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="w-full py-20 sm:py-28 px-6 flex flex-col items-center relative">
      <div className="w-full max-w-lg text-center mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-[10px] font-sans tracking-[0.28em] uppercase text-[#147C8A] mb-2 font-semibold"
        >
          FROM MY HEART
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B6075] font-light tracking-wide mb-3"
        >
          A few little wishes for you.
        </motion.h2>

        <p className="font-handwriting text-2xl text-[#147C8A]">
          Tap each card to open its wish
        </p>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {wishes.cards.map((wish: WishCardItem, index: number) => {
          const isExpanded = expandedId === wish.id;

          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              layout
              onClick={() => toggleCard(wish.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleCard(wish.id);
                }
              }}
              className={`bg-[#FFFDF8] p-5 sm:p-6 rounded-2xl border border-[#0B6075]/15 cursor-pointer select-none transition-all duration-300 ${
                isExpanded
                  ? 'shadow-[0_20px_50px_rgba(7,63,77,0.16)] ring-1 ring-[#8ED4D6]/50 bg-[#FFFDF8]'
                  : 'shadow-[0_10px_25px_rgba(7,63,77,0.08)] hover:border-[#147C8A]/30'
              }`}
              aria-expanded={isExpanded}
              aria-label={`Wish: ${wish.category}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#DDF3E9] text-[#0B6075] flex items-center justify-center text-sm font-bold shadow-xs">
                    {wish.symbol}
                  </span>
                  <h3 className="text-xs sm:text-sm font-sans tracking-[0.16em] uppercase font-bold text-[#0B6075]">
                    {wish.category}
                  </h3>
                </div>

                <div className="text-[#147C8A] flex items-center gap-1.5">
                  <span className="text-[11px] font-sans uppercase tracking-wider hidden sm:inline opacity-70 font-medium">
                    {isExpanded ? 'Close' : 'Open'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-[#0B6075]' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Origami Paper Foldout expansion */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, rotateX: -12 }}
                    animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
                    exit={{ opacity: 0, height: 0, rotateX: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-[#0B6075]/10 pt-4 mt-4"
                  >
                    <p className="font-serif text-base sm:text-lg leading-relaxed text-[#123E45]/90 font-light">
                      {wish.message}
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
