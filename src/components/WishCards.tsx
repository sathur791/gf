import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, type WishCardItem } from '../data/birthdayContent';
import { SparkleBurst } from './SparkleBurst';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

interface WishCardTheme {
  border: string;
  glow: string;
  badgeBg: string;
  badgeText: string;
  accent: string;
  personalFootnote: string;
}

const THEMES: Record<string, WishCardTheme> = {
  dreams: {
    border: 'border-[#E6C673]/50',
    glow: 'rgba(230, 198, 115, 0.25)',
    badgeBg: 'bg-[#FFF6D6]',
    badgeText: 'text-[#9A7416]',
    accent: '#D4AF37',
    personalFootnote: 'I believe in every dream you hold. Always behind you, always beside you.',
  },
  peace: {
    border: 'border-[#8ED4D6]/50',
    glow: 'rgba(142, 212, 214, 0.25)',
    badgeBg: 'bg-[#E5F7F3]',
    badgeText: 'text-[#0E6858]',
    accent: '#147C8A',
    personalFootnote: 'Whenever the world feels loud or heavy, remember you always have a home in me.',
  },
  smile: {
    border: 'border-[#F4A7B9]/50',
    glow: 'rgba(244, 167, 185, 0.25)',
    badgeBg: 'bg-[#FFEBEF]',
    badgeText: 'text-[#A02C48]',
    accent: '#D95874',
    personalFootnote: 'Your laughter is literally my favorite sound in this entire universe. Never lose that spark.',
  },
  ahead: {
    border: 'border-[#B8E7E5]/50',
    glow: 'rgba(184, 231, 229, 0.25)',
    badgeBg: 'bg-[#E8FAF8]',
    badgeText: 'text-[#0B6075]',
    accent: '#0B6075',
    personalFootnote: 'Every coming year, every little tomorrow — hand in hand, through it all.',
  },
};

export const WishCards: React.FC = () => {
  const { wishes } = birthdayContent;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lovedCards, setLovedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const toggleLove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLovedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="w-full py-28 sm:py-36 px-6 flex flex-col items-center relative select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full bg-radial from-[#8ED4D6]/15 via-[#DDF3E9]/8 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-lg text-center mb-16 space-y-2 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-xs font-sans tracking-[0.3em] uppercase text-[#DDF3E9] font-medium"
        >
          for your years ahead
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide drop-shadow-[0_2px_16px_rgba(255,253,248,0.4)]"
        >
          {wishes.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-[#B8E7E5] pt-1"
        >
          tap each keepsake to unfold my wishes
        </motion.p>
      </div>

      {/* Tactile Keepsake Paper Cards Stack */}
      <div className="w-full max-w-md flex flex-col gap-5 relative z-10">
        {wishes.cards.map((wish: WishCardItem) => {
          const isExpanded = expandedId === wish.id;
          const isLoved = lovedCards.has(wish.id);
          const theme = THEMES[wish.id] || THEMES.dreams;

          return (
            <motion.div
              key={wish.id}
              layout
              initial={{ opacity: 0, y: 18 }}
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
              style={{
                boxShadow: isExpanded
                  ? `0 24px 60px rgba(3, 27, 34, 0.35), 0 0 35px ${theme.glow}`
                  : '0 12px 32px rgba(3, 27, 34, 0.16)',
              }}
              className={`rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                isExpanded
                  ? `bg-[#FFFDF8] ${theme.border} ring-2 ring-white/50`
                  : 'bg-[#FFFDF8]/92 border-[#0B6075]/15 hover:bg-[#FFFDF8] hover:border-[#8ED4D6]/50'
              }`}
              aria-expanded={isExpanded}
              aria-label={wish.category}
            >
              {/* Sparkle burst upon opening */}
              {isExpanded && <SparkleBurst count={14} className="opacity-70" />}

              {/* Decorative paper texture watermark & top fold line */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <motion.span
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                    className={`w-10 h-10 rounded-2xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center text-base font-serif font-bold shadow-xs border border-white/60`}
                  >
                    {wish.symbol}
                  </motion.span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-sans tracking-[0.22em] uppercase font-semibold text-[#0B6075]">
                      {wish.category}
                    </h3>
                    <p className="text-[11px] font-serif italic text-[#147C8A]/70">
                      {isExpanded ? 'touch to fold' : 'touch to unfold'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Heart / Keep Close reaction */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => toggleLove(e, wish.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isLoved
                        ? 'bg-[#FFEBEF] text-[#E11D48] shadow-xs'
                        : 'bg-[#FAF6ED] text-[#147C8A]/50 hover:text-[#E11D48]'
                    }`}
                    title={isLoved ? 'Kept in heart' : 'Hold in heart'}
                    aria-label={isLoved ? 'Wish held in heart' : 'Hold wish in heart'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isLoved ? 'fill-current scale-110' : ''
                      }`}
                    />
                  </motion.button>

                  <ChevronDown
                    className={`w-4 h-4 text-[#147C8A] transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Unfolded Keepsake Parchment */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 18 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-[#0B6075]/10 pt-5 relative z-10"
                  >
                    {/* The Primary Wish Quote */}
                    <p className="font-serif italic text-base sm:text-lg text-[#123E45] leading-relaxed font-light mb-4">
                      &ldquo;{wish.message}&rdquo;
                    </p>

                    {/* Subtle personal dedication footnote */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF6ED]/90 border border-[#0B6075]/10 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#147C8A] shrink-0 mt-0.5" />
                      <p className="font-handwriting text-xl text-[#0B6075] leading-snug">
                        {theme.personalFootnote}
                      </p>
                    </div>

                    {isLoved && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 flex items-center justify-end gap-1.5 text-[11px] font-sans text-[#E11D48] font-medium"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Kept quietly in Kalai's heart</span>
                      </motion.div>
                    )}
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
