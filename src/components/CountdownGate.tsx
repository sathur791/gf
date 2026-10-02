import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayContent, countdownPlaylist } from '../data/birthdayContent';
import {
  calculateCountdown,
  formatTwoDigits,
  setDevTestTargetMs,
  type CountdownState,
} from '../utils/countdownTime';
import { Sparkles, Moon } from 'lucide-react';
import { StarField } from './StarField';
import { SparkleBurst } from './SparkleBurst';
import { useCountdownPlaylist } from '../hooks/useCountdownPlaylist';
import { getDynamicCountdownMessage } from '../utils/countdownMessages';

interface CountdownGateProps {
  onUnlock: () => void;
}

export const CountdownGate: React.FC<CountdownGateProps> = ({ onUnlock }) => {
  const { countdown, moon } = birthdayContent;
  const [state, setState] = useState<CountdownState>(() => calculateCountdown());
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isUnsealing, setIsUnsealing] = useState<boolean>(false);
  const [gateDismissed, setGateDismissed] = useState<boolean>(false);
  const [secondsPulse, setSecondsPulse] = useState(false);
  const prevSecondsRef = useRef(state.seconds);
  const [dynamicMessage, setDynamicMessage] = useState<string>(() => getDynamicCountdownMessage());
  const currentMessageRef = useRef(dynamicMessage);

  // Two-song countdown playlist with synchronized lyrics & autoplay handling
  const {
    currentSong,
    currentSongIndex,
    isPlaying,
    activeLyric,
    previousLyric,
    nextLyric,
    hasAutoplayBlocked,
    play,
    nextSong,
    previousSong,
    selectSong,
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
    const bg =
      typeof document !== 'undefined'
        ? (document.getElementById('countdown-bg-audio') as HTMLAudioElement | null)
        : null;
    if (bg) {
      try {
        bg.pause();
        bg.currentTime = 0;
        bg.src = '';
      } catch {}
    }
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

      // Automatically update time-based message or daily personal memory quote
      const nextMsg = getDynamicCountdownMessage();
      if (nextMsg !== currentMessageRef.current) {
        currentMessageRef.current = nextMsg;
        setDynamicMessage(nextMsg);
      }

      // Midnight reached!
      if (next.isUnlocked && !isTransitioning) {
        triggerMidnightTransition();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning, triggerMidnightTransition]);

  const handleGlobalInteraction = useCallback(() => {
    if (!isPlaying || hasAutoplayBlocked) {
      play();
    }
  }, [isPlaying, hasAutoplayBlocked, play]);

  const handleUnseal = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (isUnsealing) return;
    setIsUnsealing(true);
    play();
    window.setTimeout(() => {
      setGateDismissed(true);
    }, 750);
  }, [isUnsealing, play]);

  return (
    <div
      onClick={handleGlobalInteraction}
      onTouchStart={handleGlobalInteraction}
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 sm:px-8 py-10 select-none overflow-x-hidden bg-[#073642] text-[#123E45]"
    >
      {/* Atmospheric Night & Moon Glow Base */}

      {/* ============================================================ */}
      {/* 1. ATMOSPHERIC NIGHT & MOON GLOW                             */}
      {/* ============================================================ */}
      {/* Deep Ocean Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031C23] via-[#073642] to-[#0A4755] pointer-events-none" />

      {/* Ambient warm glow from cover picture (GPU accelerated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <img
          src="/images/cover.jpg"
          alt=""
          className="w-full h-full object-cover filter sm:blur-[70px] blur-[24px] scale-125 transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
      </div>

      <StarField count={36} />

      {/* Subtle audio-reactive / ambient breathing caustics behind the scene (GPU optimized) */}
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
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform, opacity' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[46rem] h-[46rem] rounded-full bg-[#8ED4D6] sm:blur-[80px] blur-[28px] pointer-events-none"
      />
      <div
        style={{ transform: 'translate3d(0, 0, 0)' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[52rem] h-[28rem] rounded-full bg-[#B8E7E5]/10 sm:blur-[90px] blur-[30px] pointer-events-none"
      />

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

          {/* Dynamic Time-Based & Daily Personal Memory Message Area */}
          <div className="min-h-[56px] sm:min-h-[64px] flex items-center justify-center px-4 max-w-sm sm:max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.p
                key={dynamicMessage}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 0.92, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-base sm:text-lg text-[#DDF3E9] text-center leading-relaxed tracking-wide drop-shadow-[0_2px_14px_rgba(221,243,233,0.3)] select-none"
              >
                "{dynamicMessage}"
              </motion.p>
            </AnimatePresence>
          </div>
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
      {/* 4. MOBILE UNSEAL GATE (When mobile browser blocks cold sound)*/}
      {/* ============================================================ */}
      <AnimatePresence>
        {hasAutoplayBlocked && !isPlaying && !isTransitioning && !gateDismissed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleUnseal}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at center, #0B6075 0%, #073642 55%, #031B22 100%)',
            }}
          >
            {/* Background Starlight */}
            <StarField count={36} />

            {/* Glowing Moon in Distance */}
            <div className="absolute top-6 right-6 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none opacity-80">
              <img
                src={moon.image}
                alt="Moon"
                className="w-full h-full object-contain filter brightness-110"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>

            {/* Radiant golden aura */}
            <motion.div
              animate={{
                scale: isUnsealing ? [1, 1.8, 3] : [1, 1.15, 1],
                opacity: isUnsealing ? [0.4, 0.9, 0] : [0.35, 0.6, 0.35],
              }}
              transition={{
                duration: isUnsealing ? 0.75 : 3.5,
                repeat: isUnsealing ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FFE39E]/25 blur-[90px] pointer-events-none"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative z-10 flex flex-col items-center max-w-sm mx-auto"
            >
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FFFDF8] font-light tracking-wide mb-10 leading-snug text-center drop-shadow-[0_2px_16px_rgba(255,253,248,0.25)]">
                Something's waiting for you...
              </h2>

              {/* Central Seal Container with Sparkles & Unsealing Animation */}
              <div className="relative flex items-center justify-center">
                {/* Sparkle burst and expanding shockwave upon touch */}
                {isUnsealing && (
                  <>
                    <SparkleBurst
                      count={36}
                      colors={['#FFE39E', '#FFFDF8', '#F4CA64', '#8ED4D6', '#D4AF37', '#FFF']}
                    />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 1 }}
                      animate={{ scale: [0.5, 2.8], opacity: [1, 0] }}
                      transition={{ duration: 0.75, ease: 'easeOut' }}
                      className="absolute w-44 h-44 rounded-full border-2 border-[#FFE39E] pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.3, opacity: 0.8 }}
                      animate={{ scale: [0.3, 3.5], opacity: [0.8, 0] }}
                      transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
                      className="absolute w-44 h-44 rounded-full border border-[#8ED4D6] pointer-events-none"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: [0, 0.95, 0], scale: [0.2, 3] }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="absolute w-56 h-56 rounded-full bg-radial from-[#FFFDF8] via-[#FFE39E]/70 to-transparent blur-xl pointer-events-none"
                    />
                  </>
                )}

                {/* Shimmering Wax Seal Touch Button (just 'K', no OPEN text) */}
                <motion.button
                  whileHover={!isUnsealing ? { scale: 1.05 } : {}}
                  whileTap={!isUnsealing ? { scale: 0.95 } : {}}
                  animate={
                    isUnsealing
                      ? {
                          scale: [1, 1.35, 1.6],
                          opacity: [1, 0.9, 0],
                          rotate: [0, -6, 6],
                          filter: ['brightness(1)', 'brightness(1.8)', 'brightness(2.5)'],
                        }
                      : {
                          boxShadow: [
                            '0 0 0 0 rgba(142, 212, 214, 0.45)',
                            '0 0 0 18px rgba(142, 212, 214, 0)',
                          ],
                        }
                  }
                  transition={
                    isUnsealing
                      ? { duration: 0.75, ease: 'easeOut' }
                      : {
                          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' },
                        }
                  }
                  onClick={handleUnseal}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFE39E] via-[#F4CA64] to-[#D4AF37] p-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer border border-[#FFFDF8]/60 transition-transform select-none"
                >
                  <div className="w-full h-full rounded-full border border-[#B38728]/40 flex items-center justify-center text-[#5C4308]">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-[#5C4308] leading-none drop-shadow-xs">
                      K
                    </span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 5. VERIFICATION & PREVIEW CONTROLS (DEV or ?preview=1 / ?test=1) */}
      {/* ============================================================ */}
      {typeof window !== 'undefined' &&
        (import.meta.env.DEV ||
          new URLSearchParams(window.location.search).has('preview') ||
          new URLSearchParams(window.location.search).has('test')) &&
        new URLSearchParams(window.location.search).get('embedded') !== '1' && (
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 sm:left-3 sm:translate-x-0 z-50 bg-[#073F4D]/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-[#8ED4D6]/40 text-xs text-white flex flex-wrap items-center justify-center gap-2 shadow-2xl max-w-[95vw]">
            <span className="font-mono text-[#8ED4D6] uppercase tracking-wider font-semibold text-[11px]">
              Song {currentSongIndex + 1}/{countdownPlaylist.length}:
            </span>
            <select
              value={currentSongIndex}
              onChange={(e) => {
                e.stopPropagation();
                selectSong(Number(e.target.value));
              }}
              className="bg-[#031C23] text-[#FAF6ED] text-[11px] font-sans px-2 py-1 rounded-lg border border-[#8ED4D6]/40 focus:outline-none max-w-[150px] sm:max-w-[200px] truncate"
            >
              {countdownPlaylist.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {idx + 1}. {s.title}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousSong();
                }}
                title="Previous Song (p or Left Arrow)"
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-[#FAF6ED] text-[11px] font-medium"
              >
                ◀ Prev
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSong();
                }}
                title="Next Song (s or Right Arrow)"
                className="px-2.5 py-1 rounded-lg bg-[#8ED4D6]/30 hover:bg-[#8ED4D6]/50 text-[#FFFDF8] text-[11px] font-semibold"
              >
                Next ▶
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-white/20">
              <button
                onClick={() => {
                  setDevTestTargetMs(Date.now() + 10000);
                  setState(calculateCountdown());
                }}
                className="px-2 py-1 rounded-lg bg-[#8ED4D6]/20 hover:bg-[#8ED4D6]/35 text-[#DDF3E9] text-[10px]"
              >
                10s to Midnight
              </button>
              <button
                onClick={() => {
                  setDevTestTargetMs(Date.now() - 1000);
                  setState(calculateCountdown());
                  triggerMidnightTransition();
                }}
                className="px-2 py-1 rounded-lg bg-[#FFE39E]/20 hover:bg-[#FFE39E]/35 text-[#FFE39E] text-[10px]"
              >
                Unlock Now
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default CountdownGate;
