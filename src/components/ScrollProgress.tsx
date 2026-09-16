import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-gradient-to-r from-[#8ED4D6] via-[#FFFDF8] to-[#B8E7E5] shadow-[0_0_12px_rgba(142,212,214,0.6)]"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
