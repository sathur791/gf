import { createContext, useContext } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  hasInteracted: boolean;
  markInteracted: () => void;
  audioAvailable: boolean;
}

export const MusicContext = createContext<MusicContextType | null>(null);

export const useGlobalMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useGlobalMusic must be used within a GlobalMusicProvider');
  }
  return context;
};
