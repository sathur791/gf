import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent } from '../data/birthdayContent';
import {
  calculateCountdown,
  formatTwoDigits,
  setDevTestTargetMs,
  type CountdownState,
} from '../utils/countdownTime';
import { Volume2, VolumeX, Sparkles, Moon, Clock } from 'lucide-react';
import { StarField } from './StarField';

interface CountdownGateProps {
  onUnlock: () => void;
}

export const CountdownGate: React.FC<CountdownGateProps> = ({ onUnlock }) => {
  const { countdown, moon } = birthdayContent;
  const [state, setState] = useState<CountdownState>(() => calculateCountdown());
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [secondsPulse, setSecondsPulse] = useState(false);
  const prevSecondsRef = useRef(state.seconds);

  // Audio & Live Lyrics state (Plays seamlessly in the background)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize background soundtrack with immediate unmuted autoplay and invisible zero-effort unlock
  useEffect(() => {
    const audio = new Audio(countdown.music.source);
    audio.loop = true;
    audio.volume = 0.95;
    audio.preload = 'auto';

    const handlePlay = () => setIsPlayingMusic(true);
    const handlePause = () => setIsPlayingMusic(false);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    audioRef.current = audio;

    // Helper: Unlock Web Audio API context for iOS Safari / modern WebKit
    const unlockWebAudio = () => {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
        }
      } catch {
        // ignore
      }
    };

    const tryPlayAudio = () => {
      if (!audioRef.current) return;
      unlockWebAudio();
      audioRef.current.muted = false;
      audioRef.current.volume = 0.95;
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlayingMusic(true);
            removeGestureListeners();
          })
          .catch((err) => {
            console.log('Autoplay waiting for user gesture:', err);
          });
      }
    };

    // 1. Attempt unmuted automatic playback immediately upon mounting
    tryPlayAudio();

    // 2. Attach capture-phase unlock handlers to ANY genuine user interaction anywhere on screen
    const gestureEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];

    const onGesture = () => {
      tryPlayAudio();
    };

    const removeGestureListeners = () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, onGesture, true);
        document.removeEventListener(ev, onGesture, true);
      });
    };

    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, onGesture, { capture: true, passive: true });
      document.addEventListener(ev, onGesture, { capture: true, passive: true });
    });

    const onCustomPlay = () => tryPlayAudio();
    window.addEventListener('play-countdown-music', onCustomPlay);

    return () => {
      removeGestureListeners();
      window.removeEventListener('play-countdown-music', onCustomPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [countdown.music.source]);

  // Secret keystroke unlock (typing "2210", "kalai", or "open" instantly unlocks inside)
  useEffect(() => {
    let typed = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > 10) typed = typed.slice(-10);
      if (typed.includes('2210') || typed.includes('kalai') || typed.includes('open')) {
        onUnlock();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUnlock]);

  // Subtle audio mute/unmute toggle
  const toggleMusic = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlayingMusic && !audioRef.current.muted && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.95;
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  }, [isPlayingMusic]);

  // Global screen touch/click handler to ensure instantaneous sound on any tap
  const handlePageInteraction = useCallback(() => {
    if (audioRef.current && (!isPlayingMusic || audioRef.current.muted || audioRef.current.paused)) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.95;
      if (audioRef.current.currentTime < 4) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  }, [isPlayingMusic]);

  // Active lyric line index based on current playback time (guarded against transition)
  const activeLineIndex = !isTransitioning
    ? countdown.lyricsData.lines.findIndex(
        (line) => currentTime >= line.start && currentTime < line.end
      )
    : -1;

  // Track last scrolled index and debounce to prevent competing smooth-scroll jank
  const lastScrolledIndexRef = useRef<number>(-1);
  const scrollDebounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTransitioning || activeLineIndex < 0 || activeLineIndex === lastScrolledIndexRef.current) {
      return;
    }

    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }

    scrollDebounceRef.current = window.setTimeout(() => {
      if (activeLineRef.current && lyricsContainerRef.current && !isTransitioning) {
        lastScrolledIndexRef.current = activeLineIndex;
        activeLineRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 80);

    return () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, [activeLineIndex, isTransitioning]);

  // Smooth fade-out of countdown audio on unlock
  const fadeOutAudio = useCallback(() => {
    if (!audioRef.current || !isPlayingMusic) return;
    const fadeInterval = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else {
        clearInterval(fadeInterval);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, 100);
  }, [isPlayingMusic]);

  // Pulse seconds tile on each tick
  useEffect(() => {
    if (state.seconds !== prevSecondsRef.current) {
      prevSecondsRef.current = state.seconds;
      setSecondsPulse(true);
      const t = window.setTimeout(() => setSecondsPulse(false), 350);
      return () => window.clearTimeout(t);
    }
  }, [state.seconds]);

  // Live 1-second countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateCountdown();
      setState(next);

      // Midnight reached!
      if (next.isUnlocked && !isTransitioning) {
        setIsTransitioning(true);
        fadeOutAudio();
        setTimeout(() => {
          onUnlock();
        }, 2200);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning, onUnlock, fadeOutAudio]);

  return (
    <div
      onClick={handlePageInteraction}
      onTouchStart={handlePageInteraction}
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 sm:px-8 py-10 select-none overflow-x-hidden bg-[#073642] text-[#123E45]"
    >
      {/* ============================================================ */}
      {/* 1. ATMOSPHERIC NIGHT & MOON GLOW                             */}
      {/* ============================================================ */}
      {/* Deep Ocean Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031C23] via-[#073642] to-[#0A4755] pointer-events-none" />

      {/* Ambient warm glow from cover picture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <img
          src="/images/cover.jpg"
          alt=""
          className="w-full h-full object-cover filter blur-[95px] scale-120 transform"
        />
      </div>

      <StarField count={35} />

      {/* Atmospheric Caustics & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[46rem] h-[46rem] rounded-full bg-[#8ED4D6]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[52rem] h-[28rem] rounded-full bg-[#B8E7E5]/10 blur-[150px] pointer-events-none" />

      {/* Atmospheric Seamless Blended Moon in the distance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{
          opacity: isTransitioning ? [0.9, 1, 0.4] : 0.9,
          scale: isTransitioning ? [1, 1.25, 1.4] : 1,
          y: 0,
        }}
        transition={{ duration: isTransitioning ? 2.2 : 2.5, ease: 'easeOut' }}
        className="absolute top-4 sm:top-8 right-3 sm:right-10 w-24 h-24 sm:w-36 sm:h-36 select-none z-20 pointer-events-none"
      >
        {/* Soft spherical moonlight aura that merges seamlessly into the ocean sky */}
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 253, 248, 0.35) 0%, rgba(142, 212, 214, 0.2) 38%, rgba(11, 96, 117, 0.08) 65%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Optical Screen-blended Moon disc (no dark square borders) */}
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={moon.image}
            alt="Moon"
            className="w-full h-full object-contain filter brightness-110 contrast-105"
            style={{
              mixBlendMode: 'screen',
              maskImage:
                'radial-gradient(circle at center, black 55%, rgba(0,0,0,0.8) 72%, transparent 92%)',
              WebkitMaskImage:
                'radial-gradient(circle at center, black 55%, rgba(0,0,0,0.8) 72%, transparent 92%)',
            }}
          />
        </div>
      </motion.div>

      {/* Discreet Sound Indicator & Toggle */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className={`w-9 h-9 rounded-full transition-all border shadow-md flex items-center justify-center cursor-pointer backdrop-blur-md ${
            isPlayingMusic
              ? 'bg-[#123E45]/80 hover:bg-[#123E45] text-[#FFE8B2] border-[#8ED4D6]/40 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
              : 'bg-white/10 hover:bg-white/20 text-[#B8E7E5]/70 border-white/20 animate-pulse'
          }`}
          aria-label={isPlayingMusic ? 'Mute background song' : 'Play background song'}
          title={isPlayingMusic ? 'Mute soundtrack' : 'Play soundtrack'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-[#FFE8B2] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#B8E7E5]/70" />
          )}
        </button>

        {!isPlayingMusic && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95, x: -4 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleMusic}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123E45]/85 hover:bg-[#123E45] border border-[#8ED4D6]/40 text-[11px] font-sans tracking-wide text-[#FFFDF8] shadow-md cursor-pointer backdrop-blur-md transition-all"
          >
            <span className="text-[#8ED4D6] animate-pulse">♪</span>
            <span>Tap to play song</span>
          </motion.button>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. SIDE-BY-SIDE ATMOSPHERIC COUNTDOWN & FLOATING LYRICS      */}
      {/* ============================================================ */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 z-10 py-6 my-auto">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: COUNTDOWN GATE CARD                             */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{
            opacity: isTransitioning ? [1, 1, 0] : 1,
            scale: isTransitioning ? [1, 1.04, 0.96] : 1,
            y: isTransitioning ? -15 : 0,
          }}
          transition={{ duration: isTransitioning ? 2.2 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 max-w-md sm:max-w-lg flex flex-col items-center text-center"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/10 border border-[#B8E7E5]/30 text-xs font-sans tracking-[0.28em] uppercase text-[#B8E7E5] font-medium backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8ED4D6]" />
              {countdown.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FFFDF8] font-light tracking-wide mb-2 leading-tight"
          >
            {countdown.title}
          </motion.h1>

          {/* Handwritten subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="font-handwriting text-2xl sm:text-3xl text-[#DDF3E9] mb-6"
          >
            {countdown.subtitle}
          </motion.p>

          {/* LIVE COUNTDOWN TILES */}
          <div className="w-full grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-6">
            {[
              { label: 'DAYS', value: formatTwoDigits(state.days) },
              { label: 'HOURS', value: formatTwoDigits(state.hours) },
              { label: 'MINUTES', value: formatTwoDigits(state.minutes) },
              { label: 'SECONDS', value: formatTwoDigits(state.seconds) },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + idx * 0.1 }}
                className={`bg-[#FFFDF8] rounded-2xl p-3 sm:p-4 border border-[#0B6075]/15 shadow-[0_16px_36px_rgba(3,28,35,0.35)] flex flex-col items-center justify-center relative overflow-hidden group ${
                  item.label === 'SECONDS' && secondsPulse ? 'animate-seconds-pulse' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-10 h-10 bg-radial from-[#8ED4D6]/20 to-transparent rounded-full blur-lg pointer-events-none" />
                <motion.span
                  key={item.label === 'SECONDS' ? item.value : item.label}
                  initial={item.label === 'SECONDS' ? { y: -8, opacity: 0 } : false}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-2xl sm:text-3xl text-[#073642] font-light tracking-tight tabular-nums mb-0.5"
                >
                  {item.value}
                </motion.span>
                <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] uppercase text-[#147C8A]/80 font-semibold">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Target Date Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-2 text-xs font-sans tracking-[0.24em] uppercase text-[#8ED4D6] font-medium mb-3"
          >
            <Clock className="w-3.5 h-3.5 text-[#8ED4D6]" />
            <span>
              {countdown.dateDisplay} • {countdown.timeDisplay}
            </span>
          </motion.div>

          <p className="font-serif italic text-sm text-[#B8E7E5]/75 max-w-sm">
            "The moon is waiting. The stars are waiting. And I am waiting for you."
          </p>
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT COLUMN: CINEMATIC ATMOSPHERIC LYRICS MUSIC SCENE       */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 max-w-md sm:max-w-lg flex flex-col justify-center relative z-10"
        >

          {/* Atmospheric Layered Glow behind Lyrics */}
          <div className="absolute inset-0 -inset-x-6 bg-radial from-[#8ED4D6]/15 via-[#0B6075]/10 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Floating Starlit Lyrics Container (Masked gradient fade on top/bottom) */}
          <div
            ref={lyricsContainerRef}
            className="relative h-[380px] sm:h-[440px] overflow-y-auto px-6 sm:px-10 pl-8 sm:pl-12 space-y-7 scroll-smooth select-none py-16 text-center lg:text-left"
            style={{
              scrollbarWidth: 'none',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            }}
          >
            {countdown.lyricsData.lines.map((line, idx) => {
              const isActive = idx === activeLineIndex;
              const isPrevious = idx === activeLineIndex - 1;
              const isNext = idx === activeLineIndex + 1;
              const isPast = idx < activeLineIndex;

              return (
                <div
                  key={idx}
                  ref={isActive ? activeLineRef : null}
                  className={`transition-all duration-600 ease-out ${
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : isPrevious
                      ? '-translate-y-1 opacity-75'
                      : isNext
                      ? 'translate-y-1 opacity-65'
                      : 'opacity-35'
                  }`}
                >
                  <p
                    className={`font-serif leading-relaxed whitespace-pre-line tracking-wide pl-3 sm:pl-4 pr-2 inline-block lg:block transition-all duration-600 ${
                      isActive
                        ? 'text-[#FFFDF8] text-2xl sm:text-3xl md:text-4xl font-normal drop-shadow-[0_2px_24px_rgba(255,253,248,0.75)]'
                        : isPrevious || isNext
                        ? 'text-[#DDF3E9] text-base sm:text-xl italic font-light drop-shadow-xs'
                        : isPast
                        ? 'text-[#B8E7E5] text-base sm:text-lg font-light'
                        : 'text-[#8ED4D6] text-base sm:text-lg font-light'
                    }`}
                  >
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. CINEMATIC MIDNIGHT TRANSITION FLASH LIGHT                 */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 1, 0.9] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, times: [0, 0.4, 0.8, 1] }}
            className="fixed inset-0 z-50 bg-[#FFFDF8] pointer-events-none flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#DDF3E9] text-[#0B6075] flex items-center justify-center mb-4 shadow-md">
                <Moon className="w-7 h-7 text-[#0B6075]" />
              </div>
              <p className="text-xs font-sans tracking-[0.3em] uppercase text-[#147C8A] mb-2 font-semibold">
                IT'S TIME
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0B6075] font-light">
                Happy Birthday, Kalai
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 4. DEV-ONLY TEST CONTROLS (Strictly import.meta.env.DEV)      */}
      {/* ============================================================ */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-3 left-3 z-50 bg-[#073F4D]/90 backdrop-blur-md p-2 rounded-xl border border-[#8ED4D6]/30 text-[10px] text-white flex items-center gap-1.5 shadow-lg">
          <span className="font-mono text-[#8ED4D6] uppercase tracking-wider font-semibold">
            DEV:
          </span>
          <button
            onClick={() => {
              setDevTestTargetMs(null);
              setState(calculateCountdown());
            }}
            className="px-2 py-1 rounded bg-white/15 hover:bg-white/25"
          >
            Real Time
          </button>
          <button
            onClick={() => {
              setDevTestTargetMs(Date.now() + 10000);
              setState(calculateCountdown());
            }}
            className="px-2 py-1 rounded bg-[#8ED4D6]/30 hover:bg-[#8ED4D6]/50 text-[#FFFDF8]"
          >
            10s to Midnight
          </button>
          <button
            onClick={() => {
              setDevTestTargetMs(Date.now() - 1000);
              setState(calculateCountdown());
              setIsTransitioning(true);
              setTimeout(() => onUnlock(), 1200);
            }}
            className="px-2 py-1 rounded bg-[#DDF3E9]/30 hover:bg-[#DDF3E9]/50 text-[#FFFDF8]"
          >
            Unlock Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CountdownGate;
