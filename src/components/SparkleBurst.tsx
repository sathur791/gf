import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SparkleBurstProps {
  /** Number of particles (default 18) */
  count?: number;
  /** Color palette for particles */
  colors?: string[];
  className?: string;
}

const DEFAULT_COLORS = ['#8ED4D6', '#FFFDF8', '#FFE39E', '#B8E7E5', '#DDF3E9'];

export const SparkleBurst: React.FC<SparkleBurstProps> = ({
  count = 18,
  colors = DEFAULT_COLORS,
  className = '',
}) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (360 / count) * i + Math.random() * 20,
        distance: 40 + Math.random() * 80,
        size: 3 + Math.random() * 5,
        color: colors[i % colors.length],
        delay: Math.random() * 0.15,
        duration: 0.6 + Math.random() * 0.4,
      })),
    [count, colors]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center ${className}`} aria-hidden="true">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: [1, 0.8, 0],
              scale: [0.5, 1.2, 0.3],
              x: tx,
              y: ty,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

export default SparkleBurst;
