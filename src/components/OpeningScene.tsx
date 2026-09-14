import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { QrCode, ChevronDown } from 'lucide-react';
import { PrintableGiftQR } from './PrintableGiftQR';

interface OpeningSceneProps {
  onOpen: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onOpen }) => {
  const { opening } = birthdayContent;
  const [showQRModal, setShowQRModal] = useState(false);
  const [isUnsealing, setIsUnsealing] = useState(false);

  const handleOpen = () => {
    if (isUnsealing) return;
    setIsUnsealing(true);
    window.dispatchEvent(new CustomEvent('play-birthday-music'));
    setTimeout(() => {
      onOpen();
    }, 450);
  };

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
  }, [isUnsealing]);

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
      {/* 2. THE OFFICIAL COVER PICTURE FOR THE WEBSITE                */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{
          opacity: isUnsealing ? 0 : 1,
          scale: isUnsealing ? 1.04 : 1,
          y: isUnsealing ? -20 : 0,
        }}
        transition={{ duration: isUnsealing ? 0.45 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[390px] sm:max-w-[430px] md:max-w-[460px] flex flex-col items-center cursor-pointer group"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
        aria-label="Begin birthday experience"
      >
        {/* Ambient poster drop shadow */}
        <div className="absolute -inset-2 bg-gradient-to-b from-[#8ED4D6]/20 via-[#0B6075]/30 to-[#031C23]/60 rounded-[2.5rem] blur-2xl transition-opacity duration-700 group-hover:opacity-100 opacity-70" />

        {/* Poster Frame Container */}
        <div className="relative w-full aspect-[2/3] rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden border border-[#8ED4D6]/30 shadow-[0_25px_60px_rgba(3,28,35,0.85)] bg-[#073642] transition-transform duration-500 group-hover:scale-[1.015]">
          {/* Main Cover Photograph */}
          <img
            src={opening.coverImage || '/images/cover.jpg'}
            alt="A Little World For You — Kalai"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center select-none"
          />

          {/* Delicate glass reflection sheen on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Interactive touch pulse overlay over the "SCROLL TO BEGIN" zone */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              animate={{ y: [0, 5, 0], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1"
            >
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg group-hover:bg-black/45 transition-colors">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFDF8]" />
              </span>
            </motion.div>
          </div>
        </div>

        {/* Quiet Whisper caption beneath the cover */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-3.5 sm:mt-4 font-handwriting text-lg sm:text-xl text-[#DDF3E9] tracking-wider text-center"
        >
          touch anywhere or scroll to enter
        </motion.p>
      </motion.div>

      {/* Printable QR Keepsake Modal */}
      <PrintableGiftQR isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};

export default OpeningScene;
