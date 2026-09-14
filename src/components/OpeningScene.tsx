import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { QrCode } from 'lucide-react';
import { PrintableGiftQR } from './PrintableGiftQR';

interface OpeningSceneProps {
  onOpen: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onOpen }) => {
  const { opening, envelope, moon } = birthdayContent;
  const [showQRModal, setShowQRModal] = useState(false);
  const [isUnsealing, setIsUnsealing] = useState(false);

  const handleOpen = () => {
    if (isUnsealing) return;
    setIsUnsealing(true);
    window.dispatchEvent(new CustomEvent('play-birthday-music'));
    setTimeout(() => {
      onOpen();
    }, 320);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-12 select-none overflow-hidden bg-[#073642]">
      {/* ============================================================ */}
      {/* 1. ATMOSPHERIC CINEMATIC NIGHT & SUBTLE MOON                 */}
      {/* ============================================================ */}
      {/* Soft ocean-blue / muted aqua film atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#052831] via-[#09414F] to-[#0D5564] pointer-events-none" />

      {/* Subtle organic light gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full bg-[#8ED4D6]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] rounded-full bg-[#B8E7E5]/10 blur-[130px] pointer-events-none" />

      {/* Subtle Companion Moon (Quiet in the distance) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-8 sm:top-14 right-6 sm:right-16 w-24 h-24 sm:w-36 sm:h-36 pointer-events-none select-none z-0"
      >
        <div className="absolute inset-0 rounded-full bg-[#FFFDF8]/15 blur-2xl transform scale-125" />
        <img
          src={moon.image}
          alt="Moon"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(255,253,248,0.4)] opacity-90"
          style={{
            maskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Discreet Gift Card / QR Modal Trigger (Minimalist) */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowQRModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#B8E7E5]/75 hover:text-white transition-all text-[11px] font-sans tracking-widest border border-white/10 backdrop-blur-xs"
          title="Print High-Res QR Card"
        >
          <QrCode className="w-3 h-3 text-[#B8E7E5]/70" />
          <span className="hidden sm:inline">QR Keepsake</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. POETIC SCRIPT REVEAL (WRITTEN NATURALLY)                  */}
      {/* ============================================================ */}
      <div className="w-full max-w-lg flex flex-col items-center text-center z-10 space-y-3 sm:space-y-4">
        {/* "for Kalai" (Delicate handwritten style) */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="font-handwriting text-3xl sm:text-4xl text-[#DDF3E9] tracking-wide"
        >
          {opening.firstLine}
        </motion.p>

        {/* "I kept a little piece of my heart here for you." */}
        <motion.p
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 0.9, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
          className="font-serif italic text-base sm:text-lg text-[#B8E7E5] font-light max-w-sm leading-relaxed"
        >
          "{opening.secondLine}"
        </motion.p>

        {/* "Come closer." */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 1.15, ease: 'easeOut' }}
          className="font-handwriting text-xl sm:text-2xl text-[#8ED4D6] pt-1"
        >
          {opening.invitation}
        </motion.p>

        {/* Main Title: "Happy Birthday, Kalai." (The ONE prominent birthday greeting) */}
        <motion.h1
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide pt-2 pb-6 leading-tight drop-shadow-[0_2px_20px_rgba(142,212,214,0.25)]"
        >
          {opening.title}
        </motion.h1>

        {/* ============================================================ */}
        {/* 3. PHYSICAL CREAM STATIONERY ENVELOPE WITH WAX SEAL          */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: isUnsealing ? 1.03 : 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center pt-2"
        >
          <div
            onClick={handleOpen}
            className="relative w-52 sm:w-56 h-36 sm:h-38 cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpen();
            }}
            aria-label="Open the envelope"
          >
            {/* Soft Shadow */}
            <div className="absolute inset-0 translate-y-3 bg-[#052831]/70 rounded-2xl blur-xl transition-all group-hover:blur-2xl group-hover:translate-y-4" />

            {/* Handcrafted Envelope Body */}
            <div className="relative w-full h-full bg-[#FFFDF8] border border-[#0B6075]/15 rounded-2xl shadow-[0_16px_45px_rgba(5,40,49,0.35)] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
              {/* Subtle Crease Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
                viewBox="0 0 224 152"
                fill="none"
              >
                <path
                  d="M0 0 L112 80 L224 0"
                  stroke="rgba(11, 96, 117, 0.14)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M0 152 L80 68"
                  stroke="rgba(11, 96, 117, 0.08)"
                  strokeWidth="1.2"
                />
                <path
                  d="M224 152 L144 68"
                  stroke="rgba(11, 96, 117, 0.08)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Embossed Crimson Wax Seal "K" */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-13 h-13 rounded-full bg-[#8E3B46] text-[#FFFDF8] flex items-center justify-center font-serif text-xl font-medium shadow-[0_4px_16px_rgba(142,59,70,0.4)] z-10 border border-white/25 relative"
              >
                <span className="font-serif italic text-amber-100 drop-shadow-xs">
                  {envelope.sealText}
                </span>
                <span className="absolute -inset-1 rounded-full border border-amber-200/30 animate-ping pointer-events-none opacity-30" />
              </motion.div>

              {/* Whisper text */}
              <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none">
                <span className="font-handwriting text-base text-[#147C8A]/80 tracking-wide">
                  touch to unseal
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Printable QR Keepsake Modal */}
      <PrintableGiftQR isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};

export default OpeningScene;
