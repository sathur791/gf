import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { QrCode } from 'lucide-react';
import { PrintableGiftQR } from './PrintableGiftQR';

interface OpeningSceneProps {
  onOpen: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onOpen }) => {
  const { opening } = birthdayContent;
  const [showQRModal, setShowQRModal] = useState(false);
  const [isUnsealing, setIsUnsealing] = useState(false);

  const handleOpen = React.useCallback(() => {
    if (isUnsealing) return;
    setIsUnsealing(true);
    window.dispatchEvent(new CustomEvent('play-birthday-music'));
    // 300ms camera focus pull before navigating to experience
    setTimeout(() => {
      onOpen();
    }, 300);
  }, [isUnsealing, onOpen]);

  // Allow scrolling or swiping down on the cover to begin the experience
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 25) {
        handleOpen();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchDiff = touchStartY - e.touches[0].clientY;
      if (touchDiff > 40) {
        handleOpen();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleOpen]);

  const titleLetters = 'KALAIVANI'.split('');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative px-3 sm:px-6 py-6 sm:py-10 select-none overflow-hidden bg-[#052831]">
      {/* ============================================================ */}
      {/* 1. AMBIENT ATMOSPHERIC BACKDROP WITH COVER GLOW              */}
      {/* ============================================================ */}
      {/* Deep Ocean Vignette Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031C23] via-[#073642] to-[#0A4755] pointer-events-none" />

      {/* Atmospheric blurred version of the cover creating radiant mood glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 sm:opacity-40">
        <img
          src={opening.coverImage || '/images/cover.jpg'}
          alt=""
          className="w-full h-full object-cover filter blur-[70px] sm:blur-[100px] scale-120 transform"
        />
      </div>

      {/* Soft starlight caustics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[#8ED4D6]/15 blur-[120px] pointer-events-none" />

      {/* Discreet Gift Card / QR Modal Trigger */}
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => setShowQRModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#B8E7E5]/90 hover:text-white transition-all text-[11px] font-sans tracking-widest border border-white/15 backdrop-blur-md shadow-lg"
          title="Print High-Res QR Card"
        >
          <QrCode className="w-3.5 h-3.5 text-[#8ED4D6]" />
          <span className="hidden sm:inline">QR Keepsake</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. STAGED REVEAL COVER POSTER                                */}
      {/* Stage 1: Candle area radial glow pulse (0–600ms)             */}
      {/* Stage 2: Atmospheric moon fades in (600–1200ms)              */}
      {/* Stage 3: Portrait crossfades blur(12px)→blur(0) (800–2000ms) */}
      {/* Stage 4: "KALAIVANI" handwritten title ink bleed             */}
      {/* Stage 5: Atmospheric drifting firefly affordance             */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={
          isUnsealing
            ? {
                scale: 0.98,
                filter: 'blur(4px)',
                opacity: 0,
              }
            : {
                scale: 1,
                filter: 'blur(0px)',
                opacity: 1,
              }
        }
        transition={{
          duration: isUnsealing ? 0.3 : 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-[390px] sm:max-w-[430px] md:max-w-[460px] flex flex-col items-center cursor-pointer group"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
        aria-label="Begin birthday experience"
      >
        {/* Ambient poster drop shadow with gentle breathing */}
        <div className="absolute -inset-2 bg-gradient-to-b from-[#8ED4D6]/20 via-[#0B6075]/30 to-[#031C23]/60 rounded-[2.5rem] blur-2xl transition-opacity duration-700 group-hover:opacity-100 opacity-70" />

        {/* Poster Frame Container */}
        <div className="relative w-full aspect-[2/3] rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden border border-[#8ED4D6]/30 shadow-[0_25px_60px_rgba(3,28,35,0.85)] bg-[#073642] transition-transform duration-500 group-hover:scale-[1.015]">
          {/* ================= STAGE 1: CANDLE AREA RADIAL GLOW PULSE (0–600ms) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: [0, 1, 0.85],
              scale: [0.7, 1.15, 1.0],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
            style={{
              background:
                'radial-gradient(circle at 50% 68%, rgba(255, 222, 153, 0.6) 0%, rgba(255, 179, 71, 0.35) 28%, rgba(11, 96, 117, 0.15) 55%, transparent 75%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Continual gentle candle flicker */}
          <motion.div
            animate={{
              opacity: [0.35, 0.55, 0.38, 0.6, 0.42],
              scale: [0.98, 1.03, 0.99, 1.04, 0.98],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                'radial-gradient(circle at 50% 68%, rgba(255, 230, 170, 0.4) 0%, rgba(255, 185, 90, 0.18) 32%, transparent 65%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* ================= STAGE 2: MOON ELEMENT FADES IN (600–1200ms) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -6 }}
            animate={{ opacity: 0.92, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: 'easeOut',
            }}
            className="absolute top-4 right-4 w-16 sm:w-20 aspect-square pointer-events-none z-20 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-[#FFFDF8]/30 blur-lg" />
            <div className="absolute inset-[-40%] rounded-full bg-[#8ED4D6]/25 blur-xl" />
            <img
              src="/images/moon-crescent-transparent.png"
              alt=""
              className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(255,253,248,0.7)]"
              style={{ mixBlendMode: 'screen' }}
            />
          </motion.div>

          {/* ================= STAGE 3: PORTRAIT CROSSFADES BLUR→SHARP (800–2000ms) ================= */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full"
          >
            <img
              src={opening.coverImage || '/images/cover.jpg'}
              alt="A Little World For You — Kalai"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center select-none"
            />
          </motion.div>

          {/* Delicate glass reflection sheen on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* ================= STAGE 5: ATMOSPHERIC FIREFLY AFFORDANCE (Guiding Particle) ================= */}
          <div className="absolute bottom-5 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-30">
            <motion.div
              animate={{
                y: [0, -8, -2, -10, 0],
                x: [0, 4, -3, 2, 0],
                opacity: [0.7, 1, 0.75, 1, 0.7],
                scale: [0.92, 1.08, 0.95, 1.1, 0.92],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              {/* Soft warm aura */}
              <div className="absolute w-8 h-8 rounded-full bg-[#FFE39E]/25 blur-md" />
              <div className="absolute w-14 h-14 rounded-full bg-[#8ED4D6]/20 blur-lg" />
              {/* Luminous Firefly core */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFF7D6] shadow-[0_0_12px_#FFE294,0_0_24px_rgba(255,226,148,0.6)]" />
            </motion.div>
          </div>
        </div>

        {/* ================= STAGE 4: HANDWRITTEN TITLE INK-BLEED "KALAIVANI" ================= */}
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center justify-center tracking-[0.25em] sm:tracking-[0.3em] font-script text-3xl sm:text-4xl text-[#FFFDF8] drop-shadow-[0_2px_12px_rgba(142,212,214,0.35)] pl-1">
            {titleLetters.map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, filter: 'blur(6px)', y: 6 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.3 + idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Quiet Whisper caption beneath the title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-1.5 font-sans-clean text-xs sm:text-sm text-[#DDF3E9]/80 tracking-widest uppercase text-center"
          >
            touch anywhere or scroll to enter
          </motion.p>
        </div>
      </motion.div>

      {/* Printable QR Keepsake Modal */}
      <PrintableGiftQR isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};

export default OpeningScene;
