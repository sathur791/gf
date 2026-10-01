import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import { StarField } from './StarField';
import { SparkleBurst } from './SparkleBurst';
import { EASE_OUT_EXPO } from '../utils/motionPresets';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';

interface CoupleClimaxProps {
  onReplay: () => void;
}

export const CoupleClimax: React.FC<CoupleClimaxProps> = ({ onReplay }) => {
  const { final, moon } = birthdayContent;
  const [celebrateCount, setCelebrateCount] = useState(0);

  const handleCelebrate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCelebrateCount((c) => c + 1);
  };

  return (
    <section id="climax" className="w-full min-h-screen py-36 sm:py-48 px-6 flex flex-col items-center justify-center relative select-none overflow-hidden bg-gradient-to-b from-[#073642] via-[#042028] to-[#021318]">
      <StarField count={45} className="opacity-80" />

      {/* Atmospheric Moon at Climax */}
      <div className="absolute top-10 right-6 sm:right-16 w-28 h-28 sm:w-40 sm:h-40 pointer-events-none opacity-85 select-none">
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 253, 248, 0.45) 0%, rgba(142, 212, 214, 0.2) 50%, transparent 80%)',
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
      {/* FINAL FRAME: OUR PHOTOGRAPH                                  */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center relative z-20 pt-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          className="w-full max-w-xl sm:max-w-2xl relative mb-12 sm:mb-16 flex flex-col items-center select-none"
        >
          {/* Deep warm gold & starlight halo */}
          <div className="absolute inset-0 bg-radial from-[#8ED4D6]/25 via-[#FFE39E]/15 to-transparent rounded-[2.5rem] blur-3xl -z-10 pointer-events-none" />

          {/* Film Frame Outer Border */}
          <div className="w-full p-3 sm:p-4 rounded-[2rem] sm:rounded-[2.5rem] bg-[#FFFDF8]/25 border border-[#8ED4D6]/40 shadow-[0_36px_90px_rgba(0,0,0,0.65)] backdrop-blur-xs">
            {/* Aspect 16:9 Landscape Frame for horizontal pictures */}
            <div className="w-full aspect-[16/9] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#021318] relative border border-[#8ED4D6]/20 shadow-2xl">
              <img
                src={final.couplePhotoBg || final.couplePhoto}
                alt="Sathur and Kalai"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Celebrate Us Heart Burst */}
        {celebrateCount > 0 && (
          <SparkleBurst key={celebrateCount} count={28} className="z-30" />
        )}

        {/* ============================================================ */}
        {/* SEQUENCED EMOTIONAL CADENCE: FINAL FILM LINES                */}
        {/* ============================================================ */}
        <div className="w-full max-w-lg flex flex-col items-center text-center space-y-5 mb-14 px-4">
          {/* Beat 1: "Maybe this is my favourite picture." */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="font-serif italic text-xl sm:text-2xl text-[#FFFDF8] font-light drop-shadow-sm"
          >
            &ldquo;{final.line1}&rdquo;
          </motion.p>

          {/* Beat 2: "Not because it's perfect." */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 1.2 }}
            className="font-serif italic text-base sm:text-lg text-[#DDF3E9] font-light"
          >
            {final.line2}
          </motion.p>

          {/* Beat 3: "But because it's us." */}
          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.95, delay: 2.2 }}
            className="font-handwriting text-3xl sm:text-5xl text-[#FFFDF8] drop-shadow-[0_2px_16px_rgba(255,253,248,0.5)]"
          >
            &ldquo;{final.line3}&rdquo;
          </motion.p>

          {/* Beat 4: Future Choice */}
          <div className="pt-6 space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 3.2 }}
              className="font-serif italic text-base sm:text-lg text-[#B8E7E5] font-light"
            >
              I don't know what every tomorrow will look like.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.95 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, delay: 4.2 }}
              className="font-serif text-lg sm:text-xl text-[#FFFDF8] font-light"
            >
              I only know who I hope is standing beside me.
            </motion.p>
          </div>

          {/* Beat 5: 4-Line Emotional Rhythm */}
          <div className="pt-6 space-y-1.5">
            {final.rhythm.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 5.2 + idx * 0.35 }}
                className="font-serif text-base sm:text-lg text-[#DDF3E9]/90 font-light"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Celebrate Us Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 6.8 }}
            className="pt-6"
          >
            <button
              onClick={handleCelebrate}
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#B38E2A] text-[#072F3A] font-sans text-xs tracking-[0.2em] uppercase font-bold shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#FFF6D6]/60"
            >
              <Heart className="w-4 h-4 fill-current text-[#A02C48] group-hover:scale-125 transition-transform" />
              <span>Celebrate Kalaivani</span>
              <Sparkles className="w-3.5 h-3.5 text-[#072F3A]" />
            </button>
          </motion.div>

          {/* Final Quiet Signature */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 7.2 }}
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
          whileInView={{ opacity: 0.85 }}
          whileHover={{ opacity: 1, scale: 1.04 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 8.0 }}
          onClick={onReplay}
          className="mt-6 inline-flex items-center gap-2 text-xs font-sans tracking-[0.24em] uppercase text-[#8ED4D6] hover:text-[#FFFDF8] cursor-pointer transition-colors py-2 px-5 rounded-full border border-[#8ED4D6]/40 hover:border-[#8ED4D6]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{final.replayText || 'Watch again'}</span>
        </motion.button>
      </div>
    </section>
  );
};

export default CoupleClimax;
