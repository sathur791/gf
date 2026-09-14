import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';

interface MusicControllerProps {
  autoStart?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ autoStart = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Initialize single persistent audio
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(birthdayContent.music.source);
      audio.loop = true;
      audio.preload = 'auto';

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

    window.addEventListener('play-birthday-music', triggerPlay);

    const interactionEvents = ['click', 'touchstart', 'pointerdown', 'keydown'];
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
      window.removeEventListener('play-birthday-music', triggerPlay);
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
        className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md border border-[#0B6075]/20 shadow-[0_8px_24px_rgba(7,63,77,0.2)] hover:shadow-[0_12px_28px_rgba(7,63,77,0.28)] hover:border-[#0B6075]/35 transition-all duration-300 text-[#0B6075]"
      >
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full bg-[#DDF3E9] text-[#0B6075] transition-transform duration-300 ${
            isPlaying ? 'rotate-[360deg]' : ''
          }`}
          style={{ transitionDuration: isPlaying ? '8s' : '0.3s' }}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : hasError ? (
            <VolumeX className="w-3.5 h-3.5 text-[#A64B56]" />
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}
        </span>

        <span className="text-xs font-medium tracking-wider uppercase text-[#0B6075] font-sans">
          {isPlaying ? `♪ ${birthdayContent.music.title.toUpperCase()}` : 'PLAY MUSIC'}
        </span>

        {isPlaying && (
          <span className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
            <span className="w-0.5 h-2.5 bg-[#0B6075] rounded-full animate-pulse" />
            <span className="w-0.5 h-3.5 bg-[#0B6075] rounded-full animate-pulse delay-150" />
            <span className="w-0.5 h-2 bg-[#0B6075] rounded-full animate-pulse delay-300" />
          </span>
        )}
      </button>
    </div>
  );
};
