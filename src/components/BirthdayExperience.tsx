import React, { useState, useRef } from 'react';
import { BirthdayCard } from './BirthdayCard';
import { Envelope } from './Envelope';
import { ChildhoodStory } from './ChildhoodStory';
import { MemoryQuestion } from './MemoryQuestion';
import { KalaiSection } from './KalaiSection';
import { UsSection } from './UsSection';
import { WishCards } from './WishCards';
import { BouquetInteraction } from './BouquetInteraction';
import { LoveLetter } from './LoveLetter';
import { CoupleClimax } from './CoupleClimax';
import { MemoryOverlay } from './MemoryOverlay';
import { StationeryDecorations } from './StationeryDecorations';
import { MoonAtmosphere } from './MoonAtmosphere';
import { FloatingBalloons } from './FloatingBalloons';
import { WhisperText } from './WhisperText';
import { ScrollProgress } from './ScrollProgress';
import type { MemoryItem } from '../data/birthdayContent';

interface BirthdayExperienceProps {
  onReplay: () => void;
}

export const BirthdayExperience: React.FC<BirthdayExperienceProps> = ({ onReplay }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSmoothReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onReplay();
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center select-none"
    >
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Cinematic Parallax Moon Atmosphere ("Muzumathi") */}
      <MoonAtmosphere />

      {/* Subtle Floating Interactive Balloons */}
      <FloatingBalloons />

      {/* Background drifting stationery botanical decorations */}
      <StationeryDecorations />

      {/* 01. Centerpiece Birthday Card */}
      <BirthdayCard />

      {/* 02. Interactive Envelope & Letter Reveal */}
      <Envelope />

      {/* 03. Childhood Memories Sequence */}
      <ChildhoodStory onSelectMemory={(mem) => setSelectedMemory(mem)} />

      {/* Whisper Moment */}
      <WhisperText text="there's more." subtext="a little collection of you" />

      {/* 04. Personal Romantic Questions */}
      <MemoryQuestion />

      {/* 05. NEW "KALAI" Section (A little collection of you.) */}
      <KalaiSection onSelectMemory={(mem) => setSelectedMemory(mem)} />

      {/* Whisper Moment */}
      <WhisperText text="look closely..." subtext="our story begins here" />

      {/* 06. NEW "US" Section (And then... there was us.) */}
      <UsSection onSelectMemory={(mem) => setSelectedMemory(mem)} />

      {/* 07. Birthday Wish Cards */}
      <WishCards />

      {/* 08. Interactive Botanical Bouquet */}
      <BouquetInteraction />

      {/* 09. Unfolding Love Letter */}
      <LoveLetter />

      {/* 10. Climax Reveal: Couple Photograph & Birthday Greeting */}
      <CoupleClimax onReplay={handleSmoothReplay} />

      {/* Fullscreen Photo Lightbox Modal */}
      <MemoryOverlay
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </div>
  );
};
