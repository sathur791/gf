import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { RotateCcw } from 'lucide-react';
import { StarField } from './StarField';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

interface CoupleClimaxProps {
  onReplay: () => void;
}

export const CoupleClimax: React.FC<CoupleClimaxProps> = ({ onReplay }) => {
  const { final } = birthdayContent;
  const [showReplayHint, setShowReplayHint] = useState(false);

  // Maintain rich, clear background music under the climax scene
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('fade-birthday-music', {
        detail: { targetVolume: 0.85, durationMs: 1500 },
      })
    );
  }, []);

  const handleReplay = () => {
    // Restore music volume back to 100% on replay
    window.dispatchEvent(
      new CustomEvent('fade-birthday-music', {
        detail: { targetVolume: 1.0, durationMs: 800 },
      })
    );
    onReplay();
  };

  return (
    <section
      onMouseMove={() => setShowReplayHint(true)}
      onTouchStart={() => setShowReplayHint(true)}
      className="w-full min-h-screen py-36 sm:py-48 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#083B47]/90 via-[#052831] to-[#031B22]"
    >
      <StarField count={45} className="opacity-80" />

      {/* ============================================================ */}
      {/* DYNAMIC VIGNETTE OVERLAY THAT TIGHTENS OVER TIME             */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 4, delay: 2.5, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(3, 27, 34, 0.45) 70%, rgba(2, 16, 21, 0.8) 100%)',
        }}
      />

      {/* ============================================================ */}
      {/* FINAL COUPLE PHOTOGRAPH: KEN BURNS SLOW ZOOM OUT             */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center relative z-20 pt-20 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
          className="w-full max-w-xl sm:max-w-2xl relative mb-12 flex flex-col items-center select-none"
        >
          {/* Deep Radiant Moonlit Halo */}
          <div className="absolute inset-0 bg-radial from-[#8ED4D6]/25 via-[#0B6075]/15 to-transparent rounded-[2.5rem] blur-3xl scale-110 -z-10 pointer-events-none" />

          {/* Luxury Film Frame with subtle warmth and vignette */}
          <div className="w-full p-2.5 sm:p-3.5 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFFDF8]/20 border border-[#FFFDF8]/35 shadow-[0_36px_90px_rgba(0,0,0,0.65)] backdrop-blur-xs">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#031B22] relative border border-white/20">
              <motion.img
                src={final.couplePhoto}
                alt="Sathur and Kalai"
                decoding="async"
                loading="lazy"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1.0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center photo-enhanced"
              />
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* STREAMLINED 4-5 LINE CLIMAX: SEQUENCED EMOTIONAL CADENCE     */}
        {/* ============================================================ */}
        <div className="w-full max-w-lg flex flex-col items-center text-center space-y-4 sm:space-y-5 mb-12 px-4">
          {/* Line 1: "Maybe this is my favourite picture." (0.4s) */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="font-serif italic text-xl sm:text-2xl text-[#DDF3E9] font-light drop-shadow-sm"
          >
            "{final.line1}"
          </motion.p>

          {/* Line 2: "Not because it's perfect." (1.8s) */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 1.8 }}
            className="font-serif italic text-lg sm:text-xl text-[#B8E7E5] font-light"
          >
            {final.line2}
          </motion.p>

          {/* Line 3: "But because it's us." (3.2s) */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.95, delay: 3.2 }}
            className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-[#FFFDF8] pt-1 pb-2 drop-shadow-[0_2px_22px_rgba(255,253,248,0.6)]"
          >
            "{final.line3}"
          </motion.h2>

          {/* Line 4: "I'd choose more days with you." (4.8s, held breath) */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.0, delay: 4.8 }}
            className="font-handwriting text-2xl sm:text-3xl text-[#FFFDF8] pb-2 drop-shadow-sm"
          >
            "{final.futurePromise}"
          </motion.p>

          {/* Line 5: Closing signature (6.4s, landing with quiet finality) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.2, delay: 6.4 }}
            className="pt-4 text-center flex flex-col items-center"
          >
            <span className="text-xs font-serif italic text-[#8ED4D6] mb-1 tracking-wide">
              {final.signaturePrefix}
            </span>
            <span className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8] drop-shadow-sm">
              {final.signatureName}
            </span>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* HOLDING THE FINAL FRAME: NO INTRUSIVE APP BUTTONS            */}
        {/* A very faint, quiet option appears only if user hovers/moves  */}
        {/* ============================================================ */}
        <motion.div
          animate={{ opacity: showReplayHint ? 0.7 : 0 }}
          transition={{ duration: 0.5 }}
          className="pt-10 transition-opacity"
        >
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif italic text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
            aria-label="Experience again"
          >
            <RotateCcw className="w-3 h-3 opacity-60" />
            <span>{final.replayText}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleClimax;
