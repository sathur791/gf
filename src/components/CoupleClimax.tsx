import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { RotateCcw } from 'lucide-react';

interface CoupleClimaxProps {
  onReplay: () => void;
}

export const CoupleClimax: React.FC<CoupleClimaxProps> = ({ onReplay }) => {
  const { final } = birthdayContent;
  const [showReplayHint, setShowReplayHint] = useState(false);

  // Fade Muzumathi to 8% volume under the final card so it never abruptly cuts to silence
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('fade-birthday-music', {
        detail: { targetVolume: 0.08, durationMs: 3500 },
      })
    );

    // Optional faint looping ambient harmonic bed (warm soft night chime) to prevent dead air on mobile
    let audioCtx: AudioContext | null = null;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
        // Fade in subtle ambient tone over 4 seconds
        masterGain.gain.linearRampToValueAtTime(0.022, audioCtx.currentTime + 4);

        const osc1 = audioCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(220, audioCtx.currentTime); // Warm A3

        const osc2 = audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        masterGain.connect(audioCtx.destination);

        osc1.start();
        osc2.start();
      }
    } catch {
      // Graceful fallback if Web Audio is blocked
    }

    return () => {
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
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
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl relative mb-12 flex flex-col items-center select-none"
        >
          {/* Gentle Backlight */}
          <div className="absolute inset-0 bg-radial from-[#8ED4D6]/20 via-[#0B6075]/10 to-transparent rounded-3xl blur-3xl scale-110 -z-10 pointer-events-none" />

          {/* Clean Film Frame with Ken Burns slow zoom (1.05 -> 1.0 over 6s) */}
          <div className="w-full p-2 sm:p-2.5 rounded-3xl bg-[#FFFDF8]/15 border border-[#FFFDF8]/25 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#031B22] relative">
              <motion.img
                src={final.couplePhoto}
                alt="Sathur and Kalai"
                decoding="async"
                loading="lazy"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1.0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* STREAMLINED 4-5 LINE CLIMAX: DECELERATING EMOTIONAL CADENCE   */}
        {/* ============================================================ */}
        <div className="w-full max-w-lg flex flex-col items-center text-center space-y-4 sm:space-y-5 mb-12">
          {/* Line 1: "Maybe this is my favourite picture." (0.0s) */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85 }}
            className="font-serif italic text-xl sm:text-2xl text-[#B8E7E5] font-light"
          >
            "{final.line1}"
          </motion.p>

          {/* Line 2: "Not because it's perfect." (1.4s) */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 1.4 }}
            className="font-serif italic text-lg sm:text-xl text-[#8ED4D6]/85 font-light"
          >
            {final.line2}
          </motion.p>

          {/* Line 3: "But because it's us." (2.8s) */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.95, delay: 2.8 }}
            className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#FFFDF8] pt-1 pb-2"
          >
            "{final.line3}"
          </motion.h2>

          {/* Line 4: "I'd choose more days with you." (4.4s, held breath) */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.0, delay: 4.4 }}
            className="font-handwriting text-2xl sm:text-3xl text-[#FFFDF8] pb-2"
          >
            "{final.futurePromise}"
          </motion.p>

          {/* Line 5: Closing signature (6.5s, landing with quiet finality) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.2, delay: 6.5 }}
            className="pt-4 text-center flex flex-col items-center"
          >
            <span className="text-xs font-serif italic text-[#8ED4D6] mb-1">
              {final.signaturePrefix}
            </span>
            <span className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8]">
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
