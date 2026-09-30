import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, countdownPlaylist } from '../data/birthdayContent';
import {
  calculateCountdown,
  formatTwoDigits,
  setDevTestTargetMs,
  type CountdownState,
} from '../utils/countdownTime';
import { Sparkles, Moon, Clock } from 'lucide-react';
import { StarField } from './StarField';
import { useCountdownPlaylist } from '../hooks/useCountdownPlaylist';

interface CountdownGateProps {
  onUnlock: () => void;
}

export const CountdownGate: React.FC<CountdownGateProps> = ({ onUnlock }) => {
  const { countdown, moon } = birthdayContent;
  const [state, setState] = useState<CountdownState>(() => calculateCountdown());
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [secondsPulse, setSecondsPulse] = useState(false);
  const prevSecondsRef = useRef(state.seconds);

  // Two-song countdown playlist with synchronized lyrics & autoplay handling
  const {
    currentSong,
    isPlaying,
    activeLyric,
    previousLyric,
    nextLyric,
    play,
    nextSong,
    fadeOutAudio,
  } = useCountdownPlaylist({
    playlist: countdownPlaylist,
    enabled: !isTransitioning,
  });

  const unlockTimeoutRef = useRef<number | null>(null);

  const triggerMidnightTransition = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    fadeOutAudio();
    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
    // Comfortable 9.5-second pause to read "HAPPY BIRTHDAY KALAI"
    unlockTimeoutRef.current = window.setTimeout(() => {
      onUnlock();
    }, 9500);
  }, [isTransitioning, fadeOutAudio, onUnlock]);

  useEffect(() => {
    return () => {
      if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
    };
  }, []);

  // If already reached target date/time when mounted (e.g. opened at 10-10-26 00:00)
  useEffect(() => {
    if (state.isUnlocked && !isTransitioning) {
      triggerMidnightTransition();
    }
  }, [state.isUnlocked, isTransitioning, triggerMidnightTransition]);

  // Immediate preview trigger for midnight/reveal test URLs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('preview') || params.get('demo') || params.get('test');
      if (p === 'midnight' || p === 'reveal' || p === '0s') {
        triggerMidnightTransition();
      }
    }
  }, [triggerMidnightTransition]);

  // Secret keystroke unlock (typing "2210", "kalai", or "open" instantly unlocks)
  useEffect(() => {
    let typed = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > 10) typed = typed.slice(-10);
      if (
        typed.includes('2210') ||
        typed.includes('kalai') ||
        typed.includes('open') ||
        typed.includes('midnight') ||
        typed.includes('reveal')
      ) {
        triggerMidnightTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerMidnightTransition]);

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
        triggerMidnightTransition();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning, triggerMidnightTransition]);

  const handleGlobalInteraction = useCallback(() => {
    if (!isPlaying) {
      play();
    }
  }, [isPlaying, play]);

  return (
    <div
      onClick={handleGlobalInteraction}
      onTouchStart={handleGlobalInteraction}
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 sm:px-8 py-10 select-none overflow-x-hidden bg-[#073642] text-[#123E45]"
    >
      {/* Mobile-Friendly Floating Music Affordance (Shown when audio is waiting for user tap) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => {
              e.stopPropagation();
              play();
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#123E45]/92 hover:bg-[#123E45] border border-[#8ED4D6]/60 shadow-[0_6px_28px_rgba(142,212,214,0.45)] text-xs font-sans tracking-wide text-[#FFFDF8] backdrop-blur-md cursor-pointer active:scale-95 transition-all"
            aria-label="Tap to play music"
          >
            <span className="text-[#8ED4D6] animate-pulse">♪</span>
            <span className="font-medium">Tap to play music</span>
            <span className="text-[#8ED4D6] text-xs">✦</span>
          </motion.button>
        )}
      </AnimatePresence>

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
          className="w-full h-full object-cover filter blur-[95px] scale-125 transform"
        />
      </div>

      <StarField count={40} />

      {/* Subtle audio-reactive / ambient breathing caustics behind the scene */}
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.05, 1] : 1,
          opacity: isPlaying ? [0.18, 0.26, 0.18] : 0.18,
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[46rem] h-[46rem] rounded-full bg-[#8ED4D6] blur-[140px] pointer-events-none"
      />
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
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 253, 248, 0.35) 0%, rgba(142, 212, 214, 0.2) 38%, rgba(11, 96, 117, 0.08) 65%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />

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


      {/* ============================================================ */}
      {/* 2. SIDE-BY-SIDE: COUNTDOWN TIMER & MUSIC-VIDEO LYRIC SCENE   */}
      {/* ============================================================ */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 z-10 py-6 my-auto">
        {/* ------------------------------------------------------------ */}
        {/* LEFT COLUMN: COUNTDOWN COMPOSITION                           */}
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
          {/* Eyebrow */}
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

          {/* Handwritten Subtitle */}
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
        {/* RIGHT COLUMN: CINEMATIC MUSIC-VIDEO LYRIC SCENE              */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 max-w-md sm:max-w-lg flex flex-col justify-center relative z-10"
        >

          {/* Focal Lyric Stage */}
          <div className="relative min-h-[280px] sm:min-h-[340px] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden rounded-3xl border border-[#8ED4D6]/20 bg-[#073F4D]/40 backdrop-blur-md shadow-[0_20px_60px_rgba(3,28,35,0.4)]">
            {/* Ambient Caustic Light within Lyric Stage */}
            <div className="absolute inset-0 bg-radial from-[#8ED4D6]/15 via-[#0B6075]/10 to-transparent blur-2xl pointer-events-none -z-10" />

            {/* If Song has lyrics (like Rathinamo & Main Tera) */}
            {currentSong.lyrics && currentSong.lyrics.length > 0 ? (
              <div className="w-full flex flex-col items-center justify-center space-y-3">
                {/* 1. PREVIOUS LYRIC (Subtle, slightly higher, dim) */}
                <div className="min-h-[28px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {previousLyric ? (
                      <motion.p
                        key={previousLyric.text}
                        initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
                        animate={{ opacity: 0.45, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="font-serif italic text-xs sm:text-sm text-[#B8E7E5]/70 max-w-sm whitespace-pre-line leading-relaxed font-light"
                      >
                        {previousLyric.text}
                      </motion.p>
                    ) : (
                      <div className="h-4" />
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. ACTIVE LYRIC (Hero in the center: Brightest, elegant serif) */}
                <div className="min-h-[60px] flex items-center justify-center px-2">
                  <AnimatePresence mode="wait">
                    {activeLyric ? (
                      <motion.div
                        key={activeLyric.text}
                        initial={{ opacity: 0, y: 8, scale: 0.98, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(3px)' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                      >
                        <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#FFFDF8] font-normal tracking-wide whitespace-pre-line leading-relaxed drop-shadow-[0_2px_20px_rgba(255,253,248,0.7)]">
                          {activeLyric.text}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ambient-waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-center"
                      >
                        <p className="font-serif text-base sm:text-lg text-[#DDF3E9]/75 font-light italic tracking-widest">
                          ♪ • • • ♪
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. UPCOMING LYRIC (Faint, slightly lower) */}
                <div className="min-h-[28px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {nextLyric ? (
                      <motion.p
                        key={nextLyric.text}
                        initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                        animate={{ opacity: 0.4, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="font-serif italic text-xs sm:text-sm text-[#8ED4D6]/70 max-w-sm whitespace-pre-line leading-relaxed font-light"
                      >
                        {nextLyric.text}
                      </motion.p>
                    ) : (
                      <div className="h-4" />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Atmospheric screen for Main Tera pending lyrics */
              <div className="flex flex-col items-center justify-center space-y-4 px-6">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full bg-[#8ED4D6]/20 border border-[#8ED4D6]/40 flex items-center justify-center text-[#FFFDF8]"
                >
                  ♪
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFDF8] font-light tracking-wide">
                  {currentSong.title}
                </h3>
                <p className="font-serif italic text-sm text-[#DDF3E9]/75 max-w-xs">
                  Playing quietly in the night sky...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. CINEMATIC MIDNIGHT TRANSITION WITH COMFORTABLE PAUSE      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FAF6ED] flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden"
          >
            {/* Ambient warm celestial halo */}
            <div className="absolute inset-0 bg-radial from-[#8ED4D6]/25 via-[#DDF3E9]/35 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-[#FFE39E]/20 blur-[120px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center max-w-xl mx-auto px-4"
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -8 }}
                animate={{ scale: [0.8, 1.06, 1], rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFDF8] text-[#0B6075] flex items-center justify-center mb-5 shadow-xl border border-[#8ED4D6]/40"
              >
                <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0B6075]" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8ED4D6]/20 border border-[#147C8A]/30 text-xs sm:text-sm font-sans tracking-[0.32em] uppercase text-[#147C8A] mb-4 font-semibold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#147C8A] animate-pulse" />
                IT'S TIME
              </motion.span>

              {/* The prominent birthday greeting with Kalai's name */}
              <motion.h2
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#0B6075] font-light tracking-[0.14em] uppercase mb-4 leading-tight drop-shadow-sm text-center"
              >
                HAPPY BIRTHDAY KALAI
              </motion.h2>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 90, opacity: 0.75 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="h-[1.5px] bg-gradient-to-r from-transparent via-[#8ED4D6] to-transparent my-2"
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 1.0, delay: 0.9 }}
                className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#0B6075]/85 mt-2 mb-8"
              >
                Everything here was made for you...
              </motion.p>

              {/* Step Inside affordance: gives full comfort to read or step inside at her own pace */}
              <motion.button
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
                onClick={() => {
                  if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
                  onUnlock();
                }}
                className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#0B6075] hover:bg-[#073642] text-[#FAF6ED] font-sans text-xs sm:text-sm tracking-[0.24em] uppercase font-medium shadow-[0_10px_30px_rgba(11,96,117,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#8ED4D6]/40"
              >
                <span>Step Inside</span>
                <Sparkles className="w-4 h-4 text-[#8ED4D6] group-hover:rotate-12 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 4. DEV-ONLY TEST CONTROLS (Strictly import.meta.env.DEV)      */}
      {/* ============================================================ */}
      {import.meta.env.DEV &&
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('embedded') !== '1' && (
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
              triggerMidnightTransition();
            }}
            className="px-2 py-1 rounded bg-[#DDF3E9]/30 hover:bg-[#DDF3E9]/50 text-[#FFFDF8]"
          >
            Unlock Now
          </button>
          <button
            onClick={() => nextSong()}
            className="px-2 py-1 rounded bg-[#8ED4D6]/20 hover:bg-[#8ED4D6]/40 text-[#DDF3E9]"
          >
            Toggle Song
          </button>
        </div>
      )}
    </div>
  );
};

export default CountdownGate;
