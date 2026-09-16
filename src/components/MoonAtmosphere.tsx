import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';

interface MoonAtmosphereProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const MoonAtmosphere: React.FC<MoonAtmosphereProps> = () => {
  const { scrollYProgress } = useScroll();

  // Subtle vertical parallax movement across the story
  const moonY = useTransform(scrollYProgress, [0, 1], ['0px', '-140px']);
  // Scale expands gently
  const moonScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.88, 0.95, 1.05, 1.15]);
  // Opacity deepens organically as the experience progresses towards the finale
  const moonOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 0.85, 1], [0.35, 0.45, 0.6, 0.75, 0.9]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Ethereal Ocean Sky Ambient Glow */}
      <div className="absolute top-[6%] right-[5%] w-[40rem] h-[40rem] rounded-full bg-radial from-[#8ED4D6]/18 via-[#B8E7E5]/10 to-transparent blur-[120px]" />
      <div className="absolute top-[40%] left-[-10%] w-[36rem] h-[36rem] rounded-full bg-radial from-[#0B6075]/12 via-[#DDF3E9]/8 to-transparent blur-[100px]" />

      {/* Atmospheric Moon Container with Parallax (no hard edges or defined container borders) */}
      <motion.div
        style={{
          y: moonY,
          scale: moonScale,
          opacity: moonOpacity,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
        }}
        className="fixed top-8 right-2 sm:right-8 md:right-14 w-48 sm:w-64 md:w-80 aspect-square pointer-events-none select-none"
      >
        {/* Oversized (~350%) Radial Glow Layer behind Moon Disc:
            Fades from moon's core moonlight into ambient sky teal/cyan (#8ED4D6 / #147C8A / #0B6075) */}
        <div
          className="absolute -inset-[125%] pointer-events-none rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 253, 248, 0.45) 0%, rgba(255, 245, 225, 0.3) 18%, rgba(142, 212, 214, 0.22) 40%, rgba(20, 124, 138, 0.14) 62%, rgba(11, 96, 117, 0.08) 82%, transparent 100%)',
            mixBlendMode: 'screen',
            filter: 'blur(32px)',
          }}
        />

        {/* The Transparent Natural Moon optically merged into sky gradient */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={birthdayContent.moon.image}
            alt="Muzumathi"
            decoding="async"
            className="w-full h-full object-contain filter drop-shadow-[0_0_45px_rgba(255,253,248,0.55)] brightness-105"
            style={{
              maskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.55) 80%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.55) 80%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Faint Starlight Dust Near Moon */}
        <div className="absolute -inset-8 pointer-events-none">
          <span className="absolute top-1/4 left-0 w-1.5 h-1.5 rounded-full bg-[#FFFDF8] animate-pulse blur-[0.5px] opacity-70" />
          <span className="absolute bottom-1/3 -right-2 w-2 h-2 rounded-full bg-[#8ED4D6] animate-pulse blur-[1px] opacity-60 delay-700" />
          <span className="absolute top-3/4 left-1/3 w-1 h-1 rounded-full bg-[#DDF3E9] animate-pulse opacity-80 delay-1000" />
        </div>
      </motion.div>

      {/* Delicate Ambient Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '15%', left: '12%', delay: 0, duration: 9 },
          { top: '28%', left: '85%', delay: 2, duration: 11 },
          { top: '45%', left: '20%', delay: 1, duration: 10 },
          { top: '62%', left: '78%', delay: 3, duration: 12 },
          { top: '78%', left: '15%', delay: 4, duration: 8 },
          { top: '90%', left: '82%', delay: 2.5, duration: 10 },
        ].map((pt, idx) => (
          <motion.div
            key={idx}
            style={{ top: pt.top, left: pt.left }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: pt.duration,
              repeat: Infinity,
              delay: pt.delay,
              ease: 'easeInOut',
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#FFFDF8]/50 blur-[0.5px]"
          />
        ))}
      </div>
    </div>
  );
};
