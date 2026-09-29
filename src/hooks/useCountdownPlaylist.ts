import { useState, useEffect, useRef, useCallback } from 'react';
import type { SongItem, LyricLine } from '../data/birthdayContent';

interface UseCountdownPlaylistProps {
  playlist: SongItem[];
  enabled?: boolean;
}

export interface UseCountdownPlaylistReturn {
  currentSong: SongItem;
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  activeLyricIndex: number;
  previousLyric: LyricLine | null;
  activeLyric: LyricLine | null;
  nextLyric: LyricLine | null;
  hasAutoplayBlocked: boolean;
  togglePlay: (e?: React.MouseEvent) => void;
  play: () => void;
  pause: () => void;
  nextSong: () => void;
  fadeOutAudio: () => void;
}

// Global reference for Web Audio context to unlock iOS Safari
declare global {
  interface Window {
    __kalaiAudioCtx?: AudioContext;
  }
}

const unlockAudioContext = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      if (!window.__kalaiAudioCtx) {
        window.__kalaiAudioCtx = new AudioCtx();
      }
      const ctx = window.__kalaiAudioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      // Play 1-sample silent buffer to unlock iOS AVPlayer / WebKit audio pipeline
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    }
  } catch {
    // ignore
  }
};

const getInitialSongIndex = (playlist: SongItem[]): number => {
  if (typeof window === 'undefined' || playlist.length <= 1) return 0;
  try {
    const params = new URLSearchParams(window.location.search);
    const songParam = params.get('song');
    if (songParam) {
      const lower = songParam.toLowerCase();
      if (lower.includes('tera') || lower === '2' || lower.includes('mein') || lower.includes('main')) {
        const found = playlist.findIndex((s) => s.id === 'main-tera');
        if (found !== -1) return found;
      }
      if (lower.includes('rathinamo') || lower === '1') {
        const found = playlist.findIndex((s) => s.id === 'rathinamo');
        if (found !== -1) return found;
      }
    }

    const saved = localStorage.getItem('kalai_countdown_song_idx');
    if (saved === null) {
      // 1st time opened: play Rathinamo (index 0)
      localStorage.setItem('kalai_countdown_song_idx', '1');
      return 0;
    }
    const currentIdx = parseInt(saved, 10);
    const validIdx = isNaN(currentIdx) ? 0 : currentIdx % playlist.length;
    // Prepare next visit to alternate to the other song
    localStorage.setItem('kalai_countdown_song_idx', String((validIdx + 1) % playlist.length));
    return validIdx;
  } catch {
    return 0;
  }
};

export const useCountdownPlaylist = ({
  playlist,
  enabled = true,
}: UseCountdownPlaylistProps): UseCountdownPlaylistReturn => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(() =>
    getInitialSongIndex(playlist)
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hasAutoplayBlocked, setHasAutoplayBlocked] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef<SongItem[]>(playlist);
  playlistRef.current = playlist;

  const currentSong = playlist[currentSongIndex] || playlist[0];

  const getOrCreateAudio = useCallback(() => {
    let audio = audioRef.current;
    const song = playlistRef.current[currentSongIndex] || playlistRef.current[0];
    if (!audio) {
      audio = new Audio(song.source);
      audio.preload = 'auto';
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
      try { audio.volume = 0.95; } catch {}
      audioRef.current = audio;
    }
    if (!audio.src || !audio.src.endsWith(song.source)) {
      audio.src = song.source;
    }
    return audio;
  }, [currentSongIndex]);

  // Play audio safely with mobile compatibility
  const safePlay = useCallback(() => {
    const audio = getOrCreateAudio();
    unlockAudioContext();
    try { audio.muted = false; } catch {}
    try { audio.volume = 0.95; } catch {}

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasAutoplayBlocked(false);
        })
        .catch((err) => {
          console.log('Mobile autoplay waiting for user gesture:', err);
          setHasAutoplayBlocked(true);
        });
    }
  }, [getOrCreateAudio]);

  // Advance to next song in playlist
  const advanceToNextSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % playlistRef.current.length;
      return nextIndex;
    });
  }, []);

  // Setup single persistent Audio instance
  useEffect(() => {
    if (!enabled) return;

    const audio = getOrCreateAudio();

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasAutoplayBlocked(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      advanceToNextSong();
    };

    const handleError = (e: Event) => {
      console.warn(`Audio source load error for ${currentSong.title}:`, e);
      if (currentSongIndex !== 0) {
        setCurrentSongIndex(0);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Update source when currentSong changes
    const expectedSrc = currentSong.source;
    if (!audio.src.endsWith(expectedSrc)) {
      audio.src = expectedSrc;
      audio.load();
      safePlay();
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSong.source, currentSong.title, currentSongIndex, advanceToNextSong, enabled, getOrCreateAudio, safePlay]);

  // Global mobile touch/click listeners to unlock audio immediately on first interaction
  useEffect(() => {
    if (!enabled) return;

    // Try initial play
    safePlay();

    const handleUserGesture = () => {
      unlockAudioContext();
      const audio = getOrCreateAudio();
      try { audio.muted = false; } catch {}
      try { audio.volume = 0.95; } catch {}
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasAutoplayBlocked(false);
        }).catch(() => {});
      }
    };

    const gestureEvents = ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'];
    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, handleUserGesture, { capture: true, passive: true });
      document.addEventListener(ev, handleUserGesture, { capture: true, passive: true });
    });

    return () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, handleUserGesture, true);
        document.removeEventListener(ev, handleUserGesture, true);
      });
    };
  }, [enabled, getOrCreateAudio, safePlay]);

  // Keyboard shortcut: Press 's' to cycle songs easily
  useEffect(() => {
    if (!enabled) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === 's') {
        advanceToNextSong();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [enabled, advanceToNextSong]);

  // Toggle play/pause
  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      } else {
        safePlay();
      }
    },
    [isPlaying, safePlay]
  );

  const play = useCallback(() => {
    safePlay();
  }, [safePlay]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  // Smooth fade-out on unlock
  const fadeOutAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;
    const fadeInterval = setInterval(() => {
      try {
        if (audio.volume > 0.08) {
          audio.volume = Math.max(0, audio.volume - 0.08);
        } else {
          clearInterval(fadeInterval);
          audio.pause();
          setIsPlaying(false);
        }
      } catch {
        clearInterval(fadeInterval);
        audio.pause();
        setIsPlaying(false);
      }
    }, 100);
  }, [isPlaying]);

  // Synchronized lyric calculation
  const lyrics = currentSong.lyrics || [];
  const activeLyricIndex = lyrics.findIndex(
    (line) => currentTime >= line.start && currentTime < line.end
  );

  const activeLyric = activeLyricIndex >= 0 ? lyrics[activeLyricIndex] : null;
  const previousLyric =
    activeLyricIndex > 0 ? lyrics[activeLyricIndex - 1] : null;
  const nextLyric =
    activeLyricIndex >= 0 && activeLyricIndex < lyrics.length - 1
      ? lyrics[activeLyricIndex + 1]
      : null;

  return {
    currentSong,
    currentSongIndex,
    isPlaying,
    currentTime,
    activeLyricIndex,
    previousLyric,
    activeLyric,
    nextLyric,
    hasAutoplayBlocked,
    togglePlay,
    play,
    pause,
    nextSong: advanceToNextSong,
    fadeOutAudio,
  };
};

export default useCountdownPlaylist;
