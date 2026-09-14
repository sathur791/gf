import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { QrCode, Sparkles } from 'lucide-react';
import { PrintableGiftQR } from './PrintableGiftQR';

interface OpeningSceneProps {
  onOpen: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onOpen }) => {
  const { opening, envelope, moon } = birthdayContent;
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-12 select-none overflow-hidden bg-[#0B6075]">
      {/* ============================================================ */}
      {/* 1. ATMOSPHERIC OCEAN-BLUE ENVIRONMENT & BLENDED MOON         */}
      {/* ============================================================ */}

      {/* Deep Ocean Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#073F4D] via-[#0B6075] to-[#147C8A] pointer-events-none" />

      {/* Soft moving light caustics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[45rem] h-[45rem] rounded-full bg-[#8ED4D6]/20 blur-[120px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] rounded-full bg-[#B8E7E5]/15 blur-[140px] pointer-events-none" />

      {/* Blended Companion Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 0.88, scale: 1, y: 0 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute top-8 sm:top-12 right-6 sm:right-16 w-32 h-32 sm:w-52 sm:h-52 pointer-events-none select-none z-0"
      >
        {/* Soft Moon Glow */}
        <div className="absolute inset-0 rounded-full bg-[#FFFDF8]/20 blur-2xl transform scale-125" />
        <div className="absolute inset-0 rounded-full bg-[#8ED4D6]/25 blur-3xl transform scale-150" />

        {/* Real Moon Image with atmospheric masking and soft edge blur */}
        <img
          src={moon.image}
          alt="Moon"
          className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(255,253,248,0.45)]"
          style={{
            maskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
          }}
        />

        {/* Subtle moon haze */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0B6075]/30 to-transparent mix-blend-overlay pointer-events-none" />
      </motion.div>

      {/* Gentle Floating Atmospheric Water Particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[22%] left-[18%] w-2 h-2 rounded-full bg-[#FFFDF8]/40 blur-[0.6px]"
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[40%] right-[22%] w-2.5 h-2.5 rounded-full bg-[#B8E7E5]/50 blur-[0.8px]"
          animate={{ y: [0, -24, 0], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-[24%] left-[26%] w-1.5 h-1.5 rounded-full bg-[#FFFDF8]/45 blur-[0.5px]"
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Discreet QR & NFC Gift Card Trigger (For printing physical card) */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowQRModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF8]/15 hover:bg-[#FFFDF8]/25 text-[#FFFDF8] backdrop-blur-md border border-[#FFFDF8]/20 transition-all text-xs font-sans tracking-wider"
          title="Print High-Res QR Card or configure NFC"
        >
          <QrCode className="w-3.5 h-3.5 text-[#B8E7E5]" />
          <span className="hidden sm:inline">Gift Card & QR</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. SEQUENTIAL CINEMATIC TYPOGRAPHY                           */}
      {/* ============================================================ */}
      <div className="w-full max-w-md flex flex-col items-center text-center z-10">
        {/* Step 1: "FOR KALAI" (pause before next) */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/10 border border-[#B8E7E5]/30 text-xs font-sans tracking-[0.32em] uppercase text-[#B8E7E5] font-medium backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#B8E7E5]" />
            {opening.eyebrow}
          </span>
        </motion.div>

        {/* Step 2: "Something I wanted you to keep." (pause before next) */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide mb-5 leading-tight"
        >
          {opening.title}
        </motion.h1>

        {/* Step 3: "10.10.2026" (pause before next) */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 0.85, letterSpacing: '0.28em' }}
          transition={{ duration: 1.2, delay: 2.9, ease: 'easeOut' }}
          className="text-xs sm:text-sm font-sans tracking-[0.28em] uppercase text-[#8ED4D6] mb-5 font-medium"
        >
          {opening.date}
        </motion.p>

        {/* Step 4: "Open when you're ready." */}
        <motion.p
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 0.95, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 4.1, ease: 'easeOut' }}
          className="font-handwriting text-2xl sm:text-3xl text-[#EAF7F0] mb-10"
        >
          {opening.subtitle}
        </motion.p>

        {/* Step 5: Physical Cream Stationery Envelope + "OPEN" Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 5.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Subtle Handmade Stationery Card Envelope Preview */}
          <div
            onClick={() => {
              window.dispatchEvent(new CustomEvent('play-birthday-music'));
              onOpen();
            }}
            className="relative w-52 h-36 mb-6 cursor-pointer group"
          >
            {/* Soft Shadow */}
            <div className="absolute inset-0 translate-y-3 bg-[#073F4D]/50 rounded-2xl blur-xl transition-all group-hover:blur-2xl group-hover:translate-y-4" />

            {/* Envelope Body */}
            <div className="relative w-full h-full bg-[#FFFDF8] border border-[#0B6075]/15 rounded-2xl shadow-[0_16px_40px_rgba(7,63,77,0.3)] flex items-center justify-center transition-transform group-hover:-translate-y-1">
              {/* Envelope Crease lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 208 144"
                fill="none"
              >
                <path
                  d="M0 0 L104 80 L208 0"
                  stroke="rgba(11, 96, 117, 0.12)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M0 144 L76 64"
                  stroke="rgba(11, 96, 117, 0.08)"
                  strokeWidth="1.2"
                />
                <path
                  d="M208 144 L132 64"
                  stroke="rgba(11, 96, 117, 0.08)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Wax Seal "K" */}
              <div className="w-12 h-12 rounded-full bg-[#A64B56] text-[#FFFDF8] flex items-center justify-center font-serif text-lg font-medium shadow-md group-hover:scale-105 transition-transform z-10 border border-white/20">
                {envelope.sealText}
              </div>
            </div>
          </div>

          {/* OPEN Button */}
          <motion.button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('play-birthday-music'));
              onOpen();
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-3 rounded-full bg-[#FFFDF8] text-[#0B6075] hover:bg-[#FAF6ED] font-sans font-semibold text-xs tracking-[0.24em] uppercase shadow-[0_12px_30px_rgba(7,63,77,0.35)] border border-[#B8E7E5]/50 flex items-center gap-2 group transition-all"
            aria-label="Open the birthday gift"
          >
            <span>{opening.buttonText}</span>
            <span className="text-xs opacity-60 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Printable QR / NFC Gift Card Modal */}
      <PrintableGiftQR isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </div>
  );
};
