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

interface CountdownGateProps {
  onUnlock: () => void;
}

export const CountdownGate: React.FC<CountdownGateProps> = ({ onUnlock }) => {
  const { countdown, moon } = birthdayContent;
  const [state, setState] = useState<CountdownState>(() => calculateCountdown());
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Countdown Music state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicError, setMusicError] = useState<boolean>(false);

  // Initialize countdown music
  useEffect(() => {
    const audio = new Audio(countdown.music.source);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';

    audio.addEventListener('play', () => {
      setIsPlayingMusic(true);
      setMusicError(false);
    });
    audio.addEventListener('pause', () => setIsPlayingMusic(false));
    audio.addEventListener('error', () => {
      // Graceful fallback if countdown song is not yet uploaded
      setMusicError(true);
      setIsPlayingMusic(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [countdown.music.source]);

  // Audio Toggle
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {
          setMusicError(true);
          setIsPlayingMusic(false);
        });
    }
  }, [isPlayingMusic]);

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

  // Live 1-second countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateCountdown();
      setState(next);

      // Midnight reached!
      if (next.isUnlocked && !isTransitioning) {
        setIsTransitioning(true);
        fadeOutAudio();
        // 2.2 second cinematic illumination transition before unveiling birthday world
        setTimeout(() => {
          onUnlock();
        }, 2200);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning, onUnlock, fadeOutAudio]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 sm:px-6 py-12 select-none overflow-hidden bg-[#0B6075] text-[#123E45]">
      {/* ============================================================ */}
      {/* 1. LAYERED OCEAN ATMOSPHERE & BLENDED MOON                   */}
      {/* ============================================================ */}
      {/* Deep Ocean Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#073F4D] via-[#0B6075] to-[#147C8A] pointer-events-none" />

      {/* Atmospheric Moving Caustics & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[42rem] h-[42rem] rounded-full bg-[#8ED4D6]/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] rounded-full bg-[#B8E7E5]/15 blur-[140px] pointer-events-none" />

      {/* Atmospheric Blended Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{
          opacity: isTransitioning ? [0.85, 1, 0.4] : 0.85,
          scale: isTransitioning ? [1, 1.25, 1.4] : 1,
          y: 0,
        }}
        transition={{ duration: isTransitioning ? 2.2 : 2.5, ease: 'easeOut' }}
        className="absolute top-6 sm:top-10 right-4 sm:right-14 w-32 h-32 sm:w-48 sm:h-48 pointer-events-none select-none z-0"
      >
        <div className="absolute inset-0 rounded-full bg-[#FFFDF8]/20 blur-2xl transform scale-125" />
        <div className="absolute inset-0 rounded-full bg-[#8ED4D6]/25 blur-3xl transform scale-150" />
        <img
          src={moon.image}
          alt="Moon"
          className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(255,253,248,0.45)]"
          style={{
            maskImage:
              'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black 65%, rgba(0,0,0,0.6) 80%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Floating Starlight Particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#FFFDF8]/40 blur-[0.5px]"
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[42%] right-[20%] w-2.5 h-2.5 rounded-full bg-[#B8E7E5]/50 blur-[0.8px]"
          animate={{ y: [0, -22, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[22%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#FFFDF8]/45 blur-[0.5px]"
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN COUNTDOWN CARD CONTAINER                             */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{
          opacity: isTransitioning ? [1, 1, 0] : 1,
          scale: isTransitioning ? [1, 1.04, 0.96] : 1,
          y: isTransitioning ? -15 : 0,
        }}
        transition={{ duration: isTransitioning ? 2.2 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg flex flex-col items-center text-center z-10"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
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
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FFFDF8] font-light tracking-wide mb-3 leading-tight"
        >
          {countdown.title}
        </motion.h1>

        {/* Handwritten subtitle: "Not yet, Kalai..." */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-handwriting text-2xl sm:text-3xl text-[#DDF3E9] mb-8 sm:mb-10"
        >
          {countdown.subtitle}
        </motion.p>

        {/* ========================================================== */}
        {/* LIVE COUNTDOWN TILES (DAYS • HOURS • MINUTES • SECONDS)    */}
        {/* ========================================================== */}
        <div className="w-full max-w-md grid grid-cols-4 gap-2 sm:gap-3.5 mb-8">
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
              className="bg-[#FFFDF8] rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[#0B6075]/15 shadow-[0_16px_36px_rgba(7,63,77,0.18)] flex flex-col items-center justify-center relative overflow-hidden group"
            >
              {/* Soft card sheen */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-radial from-[#8ED4D6]/20 to-transparent rounded-full blur-lg pointer-events-none" />

              {/* Numerical Value */}
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0B6075] font-light tracking-tight tabular-nums mb-0.5 sm:mb-1">
                {item.value}
              </span>

              {/* Label */}
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] uppercase text-[#147C8A]/75 font-semibold">
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
          className="flex items-center justify-center gap-2 text-xs font-sans tracking-[0.24em] uppercase text-[#8ED4D6] font-medium mb-8"
        >
          <Clock className="w-3.5 h-3.5 text-[#8ED4D6]" />
          <span>
            {countdown.dateDisplay} • {countdown.timeDisplay}
          </span>
        </motion.div>

        {/* Subtle Countdown Music Activation Button */}
        <motion.button
          onClick={toggleMusic}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#0B6075] text-xs font-sans font-medium tracking-wider shadow-sm transition-all border border-[#0B6075]/20 backdrop-blur-sm"
          aria-label={isPlayingMusic ? 'Pause music' : 'Play music'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-[#0B6075]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#147C8A]/70" />
          )}
          <span>
            {isPlayingMusic
              ? `♪ ${countdown.music.title.toUpperCase()}`
              : musicError
              ? 'Soundtrack preparing...'
              : '♪ Tap for sound'}
          </span>
          {isPlayingMusic && (
            <span className="flex items-center gap-0.5 ml-1">
              <span className="w-0.5 h-2.5 bg-[#0B6075] rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-[#0B6075] rounded-full animate-pulse delay-150" />
              <span className="w-0.5 h-1.5 bg-[#0B6075] rounded-full animate-pulse delay-300" />
            </span>
          )}
        </motion.button>
      </motion.div>

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
              // Set target to 10 seconds in the future
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
