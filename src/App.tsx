import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CountdownGate } from './components/CountdownGate';
import { OpeningScene } from './components/OpeningScene';
import { SecretKey } from './components/SecretKey';
import { GiftOpening } from './components/GiftOpening';
import { BirthdayExperience } from './components/BirthdayExperience';
import { MusicController } from './components/MusicController';
import { DevPreviewBadge } from './components/DevPreviewBadge';
import { calculateCountdown } from './utils/countdownTime';

type AppFlowState = 'intro' | 'key' | 'opening' | 'experience';

const getInitialUnlockState = (): boolean => {
  // DEVELOPMENT PREVIEW MODE:
  // In development only (import.meta.env.DEV), allow ?preview=birthday or ?preview=countdown
  // In production builds, import.meta.env.DEV is replaced with false at compile time by Vite,
  // making this branch unreachable and dead-code eliminated.
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const preview = new URLSearchParams(window.location.search).get('preview');
    if (preview === 'birthday') return true;
    if (preview === 'countdown') return false;
  }
  // Production relies strictly on the real IST birthday timestamp
  return calculateCountdown().isUnlocked;
};

const getInitialAppState = (): AppFlowState => {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const step = new URLSearchParams(window.location.search).get('step');
    if (step === 'intro' || step === 'key' || step === 'opening' || step === 'experience') {
      return step;
    }
  }
  return 'intro';
};

export const App: React.FC = () => {
  // Determine if birthday is unlocked
  const [isBirthdayUnlocked, setIsBirthdayUnlocked] = useState<boolean>(getInitialUnlockState);

  // Scene flow within birthday world
  const [appState, setAppState] = useState<AppFlowState>(getInitialAppState);

  // Safety net: if the tab is left open across the target moment,
  // re-check once a second even before CountdownGate's own timer fires.
  useEffect(() => {
    if (isBirthdayUnlocked) return;
    const intervalId = window.setInterval(() => {
      if (calculateCountdown().isUnlocked) {
        window.clearInterval(intervalId);
        setIsBirthdayUnlocked(true);
        setAppState('intro');
      }
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [isBirthdayUnlocked]);

  const isCover =
    !isBirthdayUnlocked ||
    appState === 'intro' ||
    appState === 'key' ||
    appState === 'opening';

  const devMode: 'birthday' | 'countdown' | 'real' = (() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      const preview = new URLSearchParams(window.location.search).get('preview');
      if (preview === 'birthday') return 'birthday';
      if (preview === 'countdown') return 'countdown';
    }
    return 'real';
  })();

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-1000 overflow-x-hidden font-sans ${
        isCover
          ? 'bg-[#0B6075] text-[#FFFDF8]'
          : 'bg-gradient-to-b from-[#0B6075] via-[#147C8A] via-25% via-[#8ED4D6]/25 via-50% via-[#DDF3E9]/30 via-75% to-[#073F4D] text-[#123E45]'
      }`}
    >
      {/* 
        Muzumathi Soundtrack:
        Only initialized during the birthday world phase.
        Never loaded or played during the countdown phase.
      */}
      {isBirthdayUnlocked && (
        <MusicController autoStart={appState === 'experience'} />
      )}

      {/* 
        DEVELOPMENT PREVIEW BADGE:
        Guarded strictly by import.meta.env.DEV.
        This entire block is stripped and excluded from production builds.
      */}
      {import.meta.env.DEV && (
        <DevPreviewBadge
          currentMode={devMode}
          appState={appState}
          isUnlocked={isBirthdayUnlocked}
          onSelectState={(nextState) => setAppState(nextState)}
        />
      )}

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center">
        <AnimatePresence mode="wait">
          {/* PHASE 1: PRE-BIRTHDAY COUNTDOWN GATE */}
          {!isBirthdayUnlocked ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <CountdownGate
                onUnlock={() => {
                  setIsBirthdayUnlocked(true);
                  setAppState('intro');
                }}
              />
            </motion.div>
          ) : (
            /* PHASE 2: BIRTHDAY WORLD & 14-STEP GIFT EXPERIENCE */
            <React.Fragment key="birthday-flow">
              {appState === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <OpeningScene onOpen={() => setAppState('key')} />
                </motion.div>
              )}

              {appState === 'key' && (
                <motion.div
                  key="key"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <OpeningScene onOpen={() => {}} />
                  <SecretKey
                    onUnlockSuccess={() => setAppState('opening')}
                    onBack={() => setAppState('intro')}
                  />
                </motion.div>
              )}

              {appState === 'opening' && (
                <motion.div
                  key="opening"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <GiftOpening onComplete={() => setAppState('experience')} />
                </motion.div>
              )}

              {appState === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <BirthdayExperience
                    onReplay={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setTimeout(() => setAppState('intro'), 600);
                    }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
