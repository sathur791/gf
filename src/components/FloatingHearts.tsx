import React, { useMemo } from 'react';

interface HeartParticle {
  id: number;
  left: number; // percentage (0 - 100)
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  color: string;
  rotation: number;
}

const HEART_COLORS = [
  'rgba(240, 196, 184, 0.55)', // Blush soft rose
  'rgba(212, 175, 55, 0.42)',  // Warm champagne gold
  'rgba(248, 220, 212, 0.65)', // Pale petal blush
  'rgba(255, 253, 248, 0.5)',  // Ivory starlight
  'rgba(226, 158, 146, 0.48)', // Vintage rose
];

export const FloatingHearts: React.FC<{ count?: number }> = ({ count = 12 }) => {
  // Memoize heart definitions so they don't recompute on component rerenders
  const hearts = useMemo<HeartParticle[]>(() => {
    return Array.from({ length: count }, (_, idx) => {
      // Deterministic spread to ensure balanced distribution without clustering
      const left = ((idx * 8.3) + 3.5) % 96;
      const size = 12 + ((idx * 7) % 16); // 12px to 28px
      const duration = 12 + ((idx * 3) % 9); // 12s to 20s
      const delay = (idx * 1.3) % 8; // staggered initial launch
      const color = HEART_COLORS[idx % HEART_COLORS.length];
      const rotation = ((idx * 17) % 40) - 20;

      return {
        id: idx,
        left,
        size,
        duration,
        delay,
        color,
        rotation,
      };
    });
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-40px] animate-float-heart"
          style={
            {
              left: `${h.left}%`,
              '--heart-duration': `${h.duration}s`,
              '--heart-delay': `${h.delay}s`,
              transform: `rotate(${h.rotation}deg)`,
            } as React.CSSProperties
          }
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.2))',
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
