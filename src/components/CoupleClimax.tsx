import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { RotateCcw } from 'lucide-react';

interface CoupleClimaxProps {
  onReplay: () => void;
}

export const CoupleClimax: React.FC<CoupleClimaxProps> = ({ onReplay }) => {
  const { final, moon } = birthdayContent;
  const [showReplayHint, setShowReplayHint] = useState(false);

  return (
    <section
      onMouseMove={() => setShowReplayHint(true)}
      onTouchStart={() => setShowReplayHint(true)}
      className="w-full min-h-screen py-36 sm:py-48 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#083B47]/90 via-[#052831] to-[#031B22]"
    >
      {/* ============================================================ */}
      {/* CLASSIC MOONLIGHT & QUIET ATMOSPHERE                         */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.95, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute top-12 sm:top-20 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-60 sm:h-60 pointer-events-none select-none z-0"
      >
        <div className="absolute inset-0 rounded-full bg-[#FFFDF8]/20 blur-3xl scale-125 pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-[#8ED4D6]/15 blur-4xl scale-150 pointer-events-none" />

        <img
          src={moon.image}
          alt="Moon"
          className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(255,253,248,0.5)] opacity-90"
          style={{
            maskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ============================================================ */}
      {/* FINAL COUPLE PHOTOGRAPH: CINEMATIC FOCUS REVEAL              */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center relative z-10 pt-36 sm:pt-48">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg sm:max-w-xl md:max-w-2xl relative mb-14 flex flex-col items-center select-none"
        >
          {/* Gentle Backlight */}
          <div className="absolute inset-0 bg-radial from-[#8ED4D6]/20 via-[#0B6075]/10 to-transparent rounded-3xl blur-3xl scale-110 -z-10 pointer-events-none" />

          {/* Clean Film Frame */}
          <div className="w-full p-2 sm:p-2.5 rounded-3xl bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/20 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#031B22] relative">
              <img
                src={final.couplePhoto}
                alt="Sathur and Kalai"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* FINAL ROMANTIC SEQUENCE: LIKE AN OLD FILM                    */}
        {/* ============================================================ */}
        <div className="w-full max-w-lg flex flex-col items-center text-center space-y-4 sm:space-y-5 mb-14">
          {/* "Maybe this is my favourite picture." */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-xl sm:text-2xl text-[#B8E7E5] font-light"
          >
            "{final.line1}"
          </motion.p>

          {/* "Not because it's perfect." */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic text-lg sm:text-xl text-[#8ED4D6]/85 font-light"
          >
            {final.line2}
          </motion.p>

          {/* "But because it's us." */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#FFFDF8] pt-1 pb-4"
          >
            "{final.line3}"
          </motion.h2>

          {/* "I don't know what the years ahead will look like." */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-serif italic text-base sm:text-lg text-[#DDF3E9]/90 font-light max-w-md pt-2"
          >
            {final.futureLead}
          </motion.p>

          {/* "I only know that if I get to choose..." */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="font-serif italic text-base sm:text-lg text-[#8ED4D6] font-light"
          >
            {final.futureChoice}
          </motion.p>

          {/* "I'd choose more days with you." */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 1.4 }}
            className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8] pb-3"
          >
            "{final.futurePromise}"
          </motion.p>

          {/* Quiet 4 Lines: More memories. More laughter. More ordinary days. More us. */}
          <div className="flex flex-col items-center space-y-1 pt-2 pb-6">
            {final.rhythm.map((item: string, idx: number) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 1.6 + idx * 0.2 }}
                className="font-serif italic text-sm sm:text-base text-[#B8E7E5]/80 font-light"
              >
                {item}
              </motion.p>
            ))}
          </div>

          {/* Always yours. Sathur */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 2.4 }}
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
            onClick={onReplay}
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
