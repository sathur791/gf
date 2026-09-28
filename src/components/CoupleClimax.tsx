import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { StarField } from './StarField';
import { EASE_OUT_EXPO } from '../utils/motionPresets';

interface CoupleClimaxProps {
  onReplay: () => void;
}

export const CoupleClimax: React.FC<CoupleClimaxProps> = ({ onReplay }) => {
  const { final, moon } = birthdayContent;
  const [isUniverseMode, setIsUniverseMode] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  // Automatic cinematic transition into celestial realm as the emotional story builds
  useEffect(() => {
    if (hasAutoTriggered) return;
    const timer = setTimeout(() => {
      setIsUniverseMode(true);
      setHasAutoTriggered(true);
    }, 4200);

    return () => clearTimeout(timer);
  }, [hasAutoTriggered]);

  const toggleUniverseMode = () => {
    setIsUniverseMode((prev) => !prev);
  };

  return (
    <section className="w-full min-h-screen py-36 sm:py-48 px-6 flex flex-col items-center justify-center relative select-none overflow-hidden bg-gradient-to-b from-[#073642] via-[#042028] to-[#021318]">
      <StarField count={35} className="opacity-75" />

      {/* Atmospheric Moon at Climax */}
      <div className="absolute top-10 right-6 sm:right-16 w-28 h-28 sm:w-40 sm:h-40 pointer-events-none opacity-85 select-none">
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 253, 248, 0.4) 0%, rgba(142, 212, 214, 0.18) 50%, transparent 80%)',
            filter: 'blur(20px)',
          }}
        />
        <img
          src={moon.image}
          alt="Moon"
          className="w-full h-full object-contain filter brightness-110 contrast-105"
          style={{
            mixBlendMode: 'screen',
            maskImage: 'radial-gradient(circle at center, black 65%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 95%)',
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* FINAL FRAME: THE ULTIMATE COUPLE TRANSITION                  */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center relative z-20 pt-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          onClick={toggleUniverseMode}
          className="w-full max-w-xl sm:max-w-2xl relative mb-12 sm:mb-16 flex flex-col items-center select-none cursor-pointer group"
          title="Tap photo"
        >
          {/* Deep warm gold & starlight halo */}
          <motion.div
            animate={{
              scale: isUniverseMode ? [1.1, 1.18, 1.1] : 1.05,
              opacity: isUniverseMode ? [0.35, 0.55, 0.35] : 0.25,
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-radial from-[#8ED4D6]/30 via-[#FFE39E]/20 to-transparent rounded-[2.5rem] blur-3xl -z-10 pointer-events-none"
          />

          {/* Film Frame Outer Border */}
          <div className="w-full p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFFDF8]/25 border border-[#8ED4D6]/35 shadow-[0_36px_90px_rgba(0,0,0,0.65)] backdrop-blur-xs transition-colors duration-1000">
            {/* Aspect 16:9 Landscape Frame for horizontal pictures */}
            <div className="w-full aspect-[16/9] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#021318] relative border border-[#8ED4D6]/20">
              {/* -------------------------------------------------------- */}
              {/* LAYER 1: BASE REAL MEMORY PHOTO (With Room Background)   */}
              {/* -------------------------------------------------------- */}
              <motion.img
                src={final.couplePhotoBg || final.couplePhoto}
                alt="Sathur and Kalai Memory"
                decoding="async"
                loading="lazy"
                animate={{
                  opacity: isUniverseMode ? 0 : 1,
                  scale: isUniverseMode ? 1.05 : 1.0,
                  filter: isUniverseMode ? 'blur(8px)' : 'blur(0px)',
                }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* -------------------------------------------------------- */}
              {/* LAYER 2: CELESTIAL NIGHT SKY REALM                       */}
              {/* -------------------------------------------------------- */}
              <motion.div
                animate={{
                  opacity: isUniverseMode ? 1 : 0,
                }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#031C23] via-[#073642] to-[#0A4755] pointer-events-none overflow-hidden"
              >
                {/* Embedded Stars */}
                <StarField count={25} />
                {/* Soft moonlit water caustic glow */}
                <div className="absolute inset-0 bg-radial from-[#8ED4D6]/25 via-[#DDF3E9]/10 to-transparent blur-2xl" />
                {/* Distant moon disc inside the universe picture */}
                <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-radial from-white/60 via-[#8ED4D6]/20 to-transparent blur-sm" />
              </motion.div>

              {/* -------------------------------------------------------- */}
              {/* LAYER 3: FOREGROUND COUPLE CUTOUT (Sathur & Kalai)       */}
              {/* -------------------------------------------------------- */}
              <motion.div
                animate={{
                  opacity: isUniverseMode ? 1 : 0,
                  scale: isUniverseMode ? 1.02 : 0.98,
                  y: isUniverseMode ? [0, -4, 0] : 0,
                }}
                transition={{
                  opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
              >
                <img
                  src={final.couplePhotoCutout || final.couplePhoto}
                  alt="Sathur and Kalai Celestial"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_32px_rgba(255,253,248,0.7)]"
                />
              </motion.div>

              {/* -------------------------------------------------------- */}
              {/* OPTICAL LIGHT FLARE SWEEP ON TRANSITION                  */}
              {/* -------------------------------------------------------- */}
              <AnimatePresence>
                {isUniverseMode && (
                  <motion.div
                    key="lens-flare"
                    initial={{ x: '-100%', opacity: 0.8 }}
                    animate={{ x: '200%', opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none z-30"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* SEQUENCED EMOTIONAL CADENCE: FINAL FILM LINES                */}
        {/* ============================================================ */}
        <div className="w-full max-w-lg flex flex-col items-center text-center space-y-5 mb-14 px-4">
          {/* Beat 1: "Maybe this is my favourite picture." */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="font-serif italic text-xl sm:text-2xl text-[#FFFDF8] font-light drop-shadow-sm"
          >
            &ldquo;{final.line1}&rdquo;
          </motion.p>

          {/* Beat 2: "Not because it's perfect." */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 1.6 }}
            className="font-serif italic text-base sm:text-lg text-[#DDF3E9] font-light"
          >
            {final.line2}
          </motion.p>

          {/* Beat 3: "But because it's us." */}
          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.95, delay: 2.8 }}
            className="font-handwriting text-3xl sm:text-4xl text-[#FFFDF8]"
          >
            &ldquo;{final.line3}&rdquo;
          </motion.p>

          {/* Beat 4: Future Choice */}
          <div className="pt-6 space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 4.0 }}
              className="font-serif italic text-base sm:text-lg text-[#B8E7E5] font-light"
            >
              I don't know what every tomorrow will look like.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.95 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 5.2 }}
              className="font-serif text-lg sm:text-xl text-[#FFFDF8] font-light"
            >
              I only know who I hope is standing beside me.
            </motion.p>
          </div>

          {/* Beat 5: 4-Line Emotional Rhythm */}
          <div className="pt-6 space-y-1">
            {final.rhythm.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 6.4 + idx * 0.4 }}
                className="font-serif text-base sm:text-lg text-[#DDF3E9]/90 font-light"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Final Quiet Signature */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 8.2 }}
            className="pt-10 flex flex-col items-center"
          >
            <span className="text-xs font-serif italic text-[#8ED4D6] mb-1 tracking-wider">
              {final.signaturePrefix}
            </span>
            <span className="font-handwriting text-3xl sm:text-5xl text-[#FFFDF8]">
              {final.signatureName}
            </span>
          </motion.div>
        </div>

        {/* Quiet Replay Action */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 9.0 }}
          onClick={onReplay}
          className="mt-6 text-xs font-sans tracking-[0.24em] uppercase text-[#8ED4D6] hover:text-[#FFFDF8] cursor-pointer transition-colors py-2 px-4 rounded-full border border-[#8ED4D6]/30"
        >
          {final.replayText || 'Watch again'}
        </motion.button>
      </div>
    </section>
  );
};

export default CoupleClimax;
