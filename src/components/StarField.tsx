import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface StarFieldProps {
  count?: number;
  className?: string;
}

export const StarField: React.FC<StarFieldProps> = ({ count = 40, className = '' }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.6,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)',
          }}
          animate={{
            opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.3, star.opacity * 0.8, star.opacity * 0.4],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-[#FFFDF8]"
        />
      ))}
    </div>
  );
};

export default StarField;
