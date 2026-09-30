import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CountdownGate } from './components/CountdownGate';
import { IlluminatedIntro } from './components/IlluminatedIntro';
import { SecretKey } from './components/SecretKey';
import { GiftOpening } from './components/GiftOpening';
import { BirthdayExperience } from './components/BirthdayExperience';
import { MusicController } from './components/MusicController';
import { MobilePreview } from './components/MobilePreview';

type AppFlowState = 'intro' | 'key' | 'opening' | 'experience';

const isMobilePreviewMode = (): boolean => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    return (
      path === '/mobile' ||
      path.startsWith('/mobile/') ||
      path === '/preview' ||
      path.startsWith('/preview/') ||
      params.get('preview') === 'mobile' ||
      params.get('preview') === 'all' ||
      params.get('preview') === 'studio' ||
      params.get('view') === 'mobile' ||
      params.has('mobile')
    );
  }
  return false;
};

const getInitialUnlockState = (): boolean => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get('preview');
    const demo = params.get('demo');
    if (
      preview === 'birthday' ||
      preview === 'inside' ||
      preview === 'experience' ||
      preview === 'true' ||
      preview === '1' ||
      preview === 'demo' ||
      demo === 'true' ||
      demo === '1' ||
      demo === 'experience' ||
      demo === 'birthday' ||
      params.has('demo')
    ) {
      return true;
    }
    if (preview === 'countdown' || demo === 'countdown') return false;

    try {
      if (sessionStorage.getItem('kalai_entered') === 'true') {
        return true;
      }
    } catch {}
  }
  // Let CountdownGate handle the countdown and the celebratory "HAPPY BIRTHDAY KALAI" midnight reveal
  return false;
};

const getInitialAppState = (): AppFlowState => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const step = params.get('step');
    if (step === 'intro' || step === 'key' || step === 'opening' || step === 'experience') {
      return step;
    }
    const preview = params.get('preview');
    const demo = params.get('demo');
    if (demo === 'intro') return 'intro';
    if (demo === 'key') return 'key';
    if (demo === 'opening') return 'opening';
    if (
      preview === 'inside' ||
      preview === 'experience' ||
      preview === 'demo' ||
      demo === 'experience' ||
      demo === 'true' ||
      demo === '1' ||
      params.has('demo')
    ) {
      return 'experience';
    }
  }
  return 'intro';
};

export const App: React.FC = () => {
  if (isMobilePreviewMode()) {
    return <MobilePreview />;
  }

  // Determine if birthday is unlocked
  const [isBirthdayUnlocked, setIsBirthdayUnlocked] = useState<boolean>(getInitialUnlockState);

  // Scene flow within birthday world
  const [appState, setAppState] = useState<AppFlowState>(getInitialAppState);



  const isCover =
    !isBirthdayUnlocked ||
    appState === 'intro' ||
    appState === 'key' ||
    appState === 'opening';


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
                  try {
                    sessionStorage.setItem('kalai_entered', 'true');
                  } catch {}
                  setIsBirthdayUnlocked(true);
                  setAppState('intro');
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
