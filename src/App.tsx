import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CountdownGate } from './components/CountdownGate';
import { IlluminatedIntro } from './components/IlluminatedIntro';
import { SecretKey } from './components/SecretKey';
import { GiftOpening } from './components/GiftOpening';
import { BirthdayExperience } from './components/BirthdayExperience';
import { MusicController } from './components/MusicController';
import { DevPreviewBadge } from './components/DevPreviewBadge';
import { calculateCountdown } from './utils/countdownTime';

type AppFlowState = 'intro' | 'key' | 'opening' | 'experience';

const getInitialUnlockState = (): boolean => {
  if (typeof window !== 'undefined') {
    const preview = new URLSearchParams(window.location.search).get('preview');
    if (preview === 'birthday' || preview === 'inside' || preview === 'experience' || preview === 'true' || preview === '1') {
      return true;
    }
    if (preview === 'countdown') return false;
  }
  // Production default relies on the real IST birthday timestamp
  return calculateCountdown().isUnlocked;
};

const getInitialAppState = (): AppFlowState => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const step = params.get('step');
    if (step === 'intro' || step === 'key' || step === 'opening' || step === 'experience') {
      return step;
    }
    const preview = params.get('preview');
    if (preview === 'inside' || preview === 'experience') {
      return 'experience';
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
    if (typeof window !== 'undefined') {
      const preview = new URLSearchParams(window.location.search).get('preview');
      if (preview === 'birthday' || preview === 'inside' || preview === 'experience') return 'birthday';
      if (preview === 'countdown') return 'countdown';
    }
    return 'real';
  })();

  const showPreviewToolbar =
    import.meta.env.DEV ||
    (typeof window !== 'undefined' &&
      (new URLSearchParams(window.location.search).has('preview') ||
        new URLSearchParams(window.location.search).has('dev')));

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-1000 overflow-x-hidden font-sans ${
        isCover
          ? 'bg-[#1C0E15] text-[#FFFDF8]'
          : 'bg-[#FAF7F0] text-[#2D1822]'
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
        PREVIEW TOOLBAR:
        Available in DEV and whenever ?preview or ?dev is present in URL
      */}
      {showPreviewToolbar && (
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
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <CountdownGate
                onUnlock={() => {
                  setIsBirthdayUnlocked(true);
                  setAppState('experience');
                }}
              />
            </motion.div>
          ) : (
            /* PHASE 2: BIRTHDAY WORLD & LOVE LETTER EXPERIENCE */
            <React.Fragment key="birthday-flow">
              {appState === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <IlluminatedIntro onOpen={() => setAppState('key')} />
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
                  <IlluminatedIntro onOpen={() => {}} />
                  <SecretKey
                    onUnlockSuccess={() => setAppState('experience')}
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
