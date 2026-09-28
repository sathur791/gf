import React from 'react';
import { motion } from 'framer-motion';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';

interface KalaiSectionProps {
  onSelectMemory: (memory: MemoryItem) => void;
}

export const KalaiSection: React.FC<KalaiSectionProps> = ({ onSelectMemory }) => {
  const { kalai, romanticReflections } = birthdayContent;

  // Curated reflections to interlace between portraits
  const reflections = [
    romanticReflections.long2,
    romanticReflections.short1,
    romanticReflections.long3,
    romanticReflections.short2,
    romanticReflections.long5,
  ];

  return (
    <section className="w-full py-32 sm:py-48 px-6 flex flex-col items-center relative select-none">
      {/* SECTION HEADER: "KALAI" — Portrait Exhibition Title */}
      <div className="w-full max-w-xl text-center mb-28 sm:mb-40 relative z-10">
        <div className="flex justify-center items-center gap-3 mb-4 overflow-hidden">
          {'KALAI'.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFFDF8] font-light tracking-[0.24em] inline-block drop-shadow-[0_2px_24px_rgba(255,253,248,0.5)]"
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#DDF3E9]"
        >
          &ldquo;{kalai.subtitle}&rdquo;
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8ED4D6] to-transparent mx-auto mt-6 origin-center"
        />
      </div>

      {/* ============================================================ */}
      {/* PORTRAIT EXHIBITION: ONE PHOTOGRAPH DOMINATES AT A TIME      */}
      {/* Generous negative space letting each portrait breathe        */}
      {/* ============================================================ */}
      <div className="w-full max-w-2xl flex flex-col items-center space-y-36 sm:space-y-48 relative z-10">
        {kalai.photos.map((photo, idx) => {
          const isLandscape = photo.id === 'kalai-beach';
          const reflection = reflections[idx % reflections.length];

          return (
            <React.Fragment key={photo.id}>
              {/* Interlaced Poetic Reflection */}
              {idx > 0 && idx % 2 === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.85 }}
                  className="w-full text-center py-6 px-4"
                >
                  <p className="font-serif italic text-base sm:text-lg text-[#DDF3E9] max-w-md mx-auto leading-relaxed font-light drop-shadow-sm">
                    &ldquo;{reflection}&rdquo;
                  </p>
                </motion.div>
              )}

              {/* Individual Hero Portrait Exhibition Frame */}
              <div className="w-full flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onSelectMemory(photo)}
                  className="w-full max-w-xl group cursor-pointer relative"
                >
                  {/* Subtle soft backdrop glow */}
                  <div className="absolute -inset-4 bg-radial from-[#8ED4D6]/20 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" />

                  {/* Clean Film Presentation Frame (Not a generic white dashboard card) */}
                  <div className="w-full p-3 sm:p-4 rounded-3xl bg-[#FFFDF8]/95 border border-[#0B6075]/15 shadow-[0_24px_65px_rgba(3,27,34,0.35)] backdrop-blur-xs">
                    <div
                      className={`w-full overflow-hidden rounded-2xl bg-[#FAF6ED] relative shadow-inner ${
                        isLandscape
                          ? 'aspect-[16/10]'
                          : 'aspect-[3/4] sm:aspect-[4/5] max-h-[640px]'
                      }`}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Minimalist Handwritten Annotation Beneath Photograph */}
                    <div className="pt-3 pb-1 px-2 flex justify-between items-baseline">
                      <p className="font-handwriting text-xl sm:text-2xl text-[#0B6075]">
                        {photo.caption}
                      </p>
                      {photo.date && (
                        <span className="text-[11px] font-serif italic text-[#147C8A]/70">
                          {photo.date}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default KalaiSection;
