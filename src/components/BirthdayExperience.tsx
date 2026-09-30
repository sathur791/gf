import React, { useState, useRef } from 'react';
import { BirthdayCard } from './BirthdayCard';
import { Envelope } from './Envelope';
import { ChildhoodStory } from './ChildhoodStory';
import { MemoryQuestion } from './MemoryQuestion';
import { KalaiSection } from './KalaiSection';
import { UsSection } from './UsSection';
import { WishCards } from './WishCards';
import { FloatingBalloons } from './FloatingBalloons';
import { BouquetInteraction } from './BouquetInteraction';
import { LoveLetter } from './LoveLetter';
import { CoupleClimax } from './CoupleClimax';
import { MemoryOverlay } from './MemoryOverlay';
import { StationeryDecorations } from './StationeryDecorations';
import { MoonAtmosphere } from './MoonAtmosphere';
import { StarField } from './StarField';
import { WhisperText } from './WhisperText';
import { ScrollProgress } from './ScrollProgress';
import { FoldedNote } from './FoldedNote';
import { FloatingHearts } from './FloatingHearts';
import { birthdayContent, type MemoryItem } from '../data/birthdayContent';

interface BirthdayExperienceProps {
  onReplay: () => void;
}

export const BirthdayExperience: React.FC<BirthdayExperienceProps> = ({ onReplay }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { hiddenNotes } = birthdayContent;

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

      {/* Atmospheric StarField in the ocean sky */}
      <StarField count={45} />

      {/* Subtle floating ambient hearts drifting up occasionally */}
      <FloatingHearts count={8} />

      {/* Cinematic Parallax Moon Atmosphere ("Muzumathi") */}
      <MoonAtmosphere />

      {/* Background drifting stationery botanical watermarks */}
      <StationeryDecorations />

      {/* 01. Centerpiece Dedication */}
      <BirthdayCard />

      {/* 02. Interactive Envelope & Letter Reveal */}
      <Envelope />

      {/* 03. Childhood Memories Film */}
      <ChildhoodStory onSelectMemory={(mem) => setSelectedMemory(mem)} />

      {/* Folded Secret Note 1 */}
      {hiddenNotes[0] && (
        <div className="w-full flex justify-center py-4 relative z-20">
          <FoldedNote
            teaser={hiddenNotes[0].teaser}
            title={hiddenNotes[0].title}
            message={hiddenNotes[0].message}
          />
        </div>
      )}

      {/* Whisper Moment */}
      <WhisperText text="there's more." subtext="a little collection of you" />

      {/* 04. Personal Romantic Questions */}
      <MemoryQuestion />

      {/* 05. "KALAI" Portrait Exhibition (A little collection of you.) */}
      <KalaiSection onSelectMemory={(mem) => setSelectedMemory(mem)} />

      {/* Folded Secret Note 2 */}
      {hiddenNotes[1] && (
        <div className="w-full flex justify-center py-4 relative z-20">
          <FoldedNote
            teaser={hiddenNotes[1].teaser}
            title={hiddenNotes[1].title}
            message={hiddenNotes[1].message}
          />
        </div>
      )}

      {/* Whisper Moment */}
      <WhisperText text="look closely..." subtext="our story begins here" />

      {/* 06. "US" Section (The turning point: And then... there was us.) */}
      <UsSection onSelectMemory={(mem) => setSelectedMemory(mem)} />

      {/* 07. Tactile Wish Cards */}
      <WishCards />

      {/* 08. Interactive Floating Balloon Thoughts */}
      <FloatingBalloons />

      {/* 09. Interactive Botanical Bouquet */}
      <BouquetInteraction />

      {/* Folded Secret Note 3 */}
      {hiddenNotes[2] && (
        <div className="w-full flex justify-center py-4 relative z-20">
          <FoldedNote
            teaser={hiddenNotes[2].teaser}
            title={hiddenNotes[2].title}
            message={hiddenNotes[2].message}
          />
        </div>
      )}

      {/* 10. Unfolding Parchment Love Letter */}
      <LoveLetter />

      {/* 11. Climax Reveal: Final Film Frame & Couple Photograph */}
      <CoupleClimax onReplay={handleSmoothReplay} />

      {/* Fullscreen Photo Lightbox Modal */}
      <MemoryOverlay
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </div>
  );
};

export default BirthdayExperience;
