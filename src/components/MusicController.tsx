import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { setupAudioClarity, type EnhancedAudioNodeGraph } from '../utils/audioClarity';

interface MusicControllerProps {
  autoStart?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ autoStart = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clarityRef = useRef<EnhancedAudioNodeGraph | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Initialize single persistent audio
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(birthdayContent.music.source);
      audio.loop = true;
      audio.preload = autoStart ? 'auto' : 'none';
      audio.muted = true; // Primed for iOS Safari

      // Connect Web Audio Clarity enhancement pipeline (anti-rumble, vocal air & presence, mastering compressor)
      clarityRef.current = setupAudioClarity(audio, 1.0);

      audio.addEventListener('play', () => {
        setIsPlaying(true);
        setHasError(false);
      });

      audio.addEventListener('pause', () => {
        setIsPlaying(false);
      });

      audio.addEventListener('ended', () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      });

      audio.volume = 1.0;
      audioRef.current = audio;
    }

    const triggerPlay = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((err) => {
            console.log('Autoplay deferred until user interaction:', err);
          });
      }
    };

    let fadeInterval: number | null = null;
    const handleFadeMusic = (e: CustomEvent<{ targetVolume?: number; durationMs?: number }>) => {
      if (!audioRef.current) return;
      const targetVol = e.detail?.targetVolume !== undefined ? Math.max(0, Math.min(1, e.detail.targetVolume)) : 0.08;
      const duration = e.detail?.durationMs || 2500;
      const steps = 25;
      const stepTime = duration / steps;
      const startVol = audioRef.current.volume;
      const volDelta = (targetVol - startVol) / steps;
      let currentStep = 0;

      if (fadeInterval) clearInterval(fadeInterval);
      fadeInterval = window.setInterval(() => {
        currentStep++;
        if (audioRef.current) {
          const nextVol = Math.max(0, Math.min(1, startVol + volDelta * currentStep));
          audioRef.current.volume = nextVol;
          clarityRef.current?.setVolume(nextVol);
        }
        if (currentStep >= steps) {
          if (fadeInterval) clearInterval(fadeInterval);
          if (audioRef.current) {
            audioRef.current.volume = targetVol;
            clarityRef.current?.setVolume(targetVol);
          }
        }
      }, stepTime);
    };

    window.addEventListener('play-birthday-music', triggerPlay);
    window.addEventListener('fade-birthday-music', handleFadeMusic as EventListener);

    const interactionEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];
    const handleFirstInteraction = () => {
      triggerPlay();
      interactionEvents.forEach((ev) => {
        window.removeEventListener(ev, handleFirstInteraction);
      });
    };

    interactionEvents.forEach((ev) => {
      window.addEventListener(ev, handleFirstInteraction, { once: true });
    });

    if (autoStart) {
      triggerPlay();
    }

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
      window.removeEventListener('play-birthday-music', triggerPlay);
      window.removeEventListener('fade-birthday-music', handleFadeMusic as EventListener);
      interactionEvents.forEach((ev) => {
        window.removeEventListener(ev, handleFirstInteraction);
      });
    };
  }, [autoStart]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.error('Play failed:', err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-5 right-5 z-50 print:hidden">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="w-10 h-10 rounded-full bg-[#FFFDF8] border border-[#0B6075]/25 shadow-[0_6px_20px_rgba(7,63,77,0.18)] hover:shadow-[0_8px_24px_rgba(7,63,77,0.25)] hover:border-[#0B6075]/40 transition-all duration-300 text-[#0B6075] flex items-center justify-center cursor-pointer"
        title={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-[#DDF3E9] text-[#0B6075] transition-transform duration-300 ${
            isPlaying ? 'rotate-[360deg]' : ''
          }`}
          style={{ transitionDuration: isPlaying ? '8s' : '0.3s' }}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#0B6075]" />
          ) : hasError ? (
            <VolumeX className="w-4 h-4 text-[#A64B56]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#0B6075]/70" />
          )}
        </span>
      </button>
    </div>
  );
};
