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
  previousSong: () => void;
  selectSong: (index: number) => void;
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

// Fisher-Yates shuffle helper
const createShuffledIndices = (count: number, prioritizeFirst?: number): number[] => {
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  if (prioritizeFirst !== undefined && prioritizeFirst >= 0 && prioritizeFirst < count) {
    const idx = indices.indexOf(prioritizeFirst);
    if (idx !== -1) {
      indices.splice(idx, 1);
      indices.unshift(prioritizeFirst);
    }
  }
  return indices;
};

const getInitialSongIndex = (playlist: SongItem[]): number => {
  if (typeof window === 'undefined' || playlist.length <= 1) return 0;
  try {
    const params = new URLSearchParams(window.location.search);
    const songParam = params.get('song');
    if (songParam) {
      const lower = songParam.toLowerCase().trim();
      const num = parseInt(lower, 10);
      if (!isNaN(num)) {
        if (num >= 1 && num <= playlist.length) return num - 1;
        if (num >= 0 && num < playlist.length) return num;
      }
      const foundIdx = playlist.findIndex(
        (s) =>
          s.id.toLowerCase() === lower ||
          s.id.toLowerCase().includes(lower) ||
          s.title.toLowerCase().includes(lower)
      );
      if (foundIdx !== -1) return foundIdx;
    }

    // Random song selection on open, avoiding repeating the song from the immediately previous visit
    const LAST_SONG_KEY = 'kalai_countdown_last_song';
    const lastSongId = localStorage.getItem(LAST_SONG_KEY);

    const candidates = playlist
      .map((s, idx) => ({ id: s.id, idx }))
      .filter((item) => !lastSongId || item.id !== lastSongId)
      .map((item) => item.idx);

    const pool = candidates.length > 0 ? candidates : playlist.map((_, i) => i);
    const chosenIndex = pool[Math.floor(Math.random() * pool.length)];

    const chosenSong = playlist[chosenIndex];
    if (chosenSong) {
      localStorage.setItem(LAST_SONG_KEY, chosenSong.id);
    }

    return chosenIndex;
  } catch {
    return Math.floor(Math.random() * playlist.length);
  }
};

export const useCountdownPlaylist = ({
  playlist,
  enabled = true,
}: UseCountdownPlaylistProps): UseCountdownPlaylistReturn => {
  const [initialIndex] = useState<number>(() => getInitialSongIndex(playlist));
  
  // Shuffled queue management: continuous non-repeating shuffle deck
  const shuffleDeckRef = useRef<number[]>([]);
  const deckPositionRef = useRef<number>(0);

  if (shuffleDeckRef.current.length === 0 && playlist.length > 0) {
    shuffleDeckRef.current = createShuffledIndices(playlist.length, initialIndex);
    deckPositionRef.current = 0;
  }

  const [currentSongIndex, setCurrentSongIndex] = useState<number>(() => {
    return shuffleDeckRef.current[0] ?? initialIndex;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hasAutoplayBlocked, setHasAutoplayBlocked] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef<SongItem[]>(playlist);
  playlistRef.current = playlist;

  const isSwitchingRef = useRef<boolean>(false);
  const currentSong = playlist[currentSongIndex] || playlist[0];
  const currentSongRef = useRef<SongItem>(currentSong);
  currentSongRef.current = currentSong;

  const getOrCreateAudio = useCallback(() => {
    let audio = audioRef.current;
    if (!audio) {
      const existing =
        typeof document !== 'undefined'
          ? (document.getElementById('countdown-bg-audio') as HTMLAudioElement | null)
          : null;
      if (existing) {
        audio = existing;
      } else {
        const song = playlistRef.current[currentSongIndex] || playlistRef.current[0];
        audio = new Audio(song.source);
        audio.id = 'countdown-bg-audio';
        audio.preload = 'auto';
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');
        if (typeof document !== 'undefined' && !document.getElementById('countdown-bg-audio')) {
          audio.style.display = 'none';
          document.body.appendChild(audio);
        }
      }
      try {
        audio.volume = 0.95;
      } catch {}
      audioRef.current = audio;
    }
    return audio;
  }, [currentSongIndex]);

  // Safely play audio with mobile audio unlock
  const safePlay = useCallback(() => {
    const audio = getOrCreateAudio();
    unlockAudioContext();
    audio.muted = false;
    audio.volume = 0.95;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasAutoplayBlocked(false);
        })
        .catch(() => {
          // If browser policy blocks auto-play before user gesture,
          // don't abort audio source; wait for the first click/touch.
          setIsPlaying(false);
          setHasAutoplayBlocked(true);
        });
    }
  }, [getOrCreateAudio]);

  // Core continuous shuffle function: advances to next random song without stopping
  const advanceToNextSong = useCallback(() => {
    if (playlistRef.current.length === 0) return;
    const count = playlistRef.current.length;

    deckPositionRef.current += 1;
    // When the current shuffle deck finishes, generate a new shuffled deck
    if (deckPositionRef.current >= shuffleDeckRef.current.length) {
      const lastIndex = shuffleDeckRef.current[shuffleDeckRef.current.length - 1];
      const newDeck = createShuffledIndices(count);
      // Ensure the first song of the new deck doesn't repeat the last song
      if (count > 1 && newDeck[0] === lastIndex) {
        [newDeck[0], newDeck[1]] = [newDeck[1], newDeck[0]];
      }
      shuffleDeckRef.current = newDeck;
      deckPositionRef.current = 0;
    }

    const nextIndex = shuffleDeckRef.current[deckPositionRef.current];
    const nextSongItem = playlistRef.current[nextIndex];
    if (!nextSongItem) return;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kalai_countdown_last_song', nextSongItem.id);
      } catch {}
    }

    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);

    const audio = audioRef.current || getOrCreateAudio();
    audio.src = nextSongItem.source;
    audio.currentTime = 0;

    // Immediately play the next song continuously
    unlockAudioContext();
    audio.muted = false;
    audio.volume = 0.95;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
        setHasAutoplayBlocked(false);
      })
      .catch((err) => {
        console.warn('Playback continuation notice:', err);
      })
      .finally(() => {
        isSwitchingRef.current = false;
      });
    } else {
      isSwitchingRef.current = false;
    }
  }, [getOrCreateAudio]);

  // Go to previous song in the shuffle history
  const goToPreviousSong = useCallback(() => {
    if (playlistRef.current.length === 0) return;
    if (deckPositionRef.current > 0) {
      deckPositionRef.current -= 1;
    } else {
      deckPositionRef.current = Math.max(0, shuffleDeckRef.current.length - 1);
    }

    const prevIndex = shuffleDeckRef.current[deckPositionRef.current];
    const prevSongItem = playlistRef.current[prevIndex];
    if (!prevSongItem) return;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kalai_countdown_last_song', prevSongItem.id);
      } catch {}
    }

    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);

    const audio = audioRef.current || getOrCreateAudio();
    audio.src = prevSongItem.source;
    audio.currentTime = 0;

    unlockAudioContext();
    audio.muted = false;
    audio.volume = 0.95;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
        setHasAutoplayBlocked(false);
      })
      .catch(() => {})
      .finally(() => {
        isSwitchingRef.current = false;
      });
    } else {
      isSwitchingRef.current = false;
    }
  }, [getOrCreateAudio]);

  // Direct song selection (e.g. testing toolbar or selector)
  const selectSong = useCallback((index: number) => {
    if (index >= 0 && index < playlistRef.current.length) {
      const songItem = playlistRef.current[index];
      if (!songItem) return;

      // Find or insert into current deck position
      const foundDeckPos = shuffleDeckRef.current.indexOf(index);
      if (foundDeckPos !== -1) {
        deckPositionRef.current = foundDeckPos;
      } else {
        shuffleDeckRef.current.splice(deckPositionRef.current + 1, 0, index);
        deckPositionRef.current += 1;
      }

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('kalai_countdown_last_song', songItem.id);
        } catch {}
      }

      setCurrentSongIndex(index);
      setCurrentTime(0);

      const audio = audioRef.current || getOrCreateAudio();
      audio.src = songItem.source;
      audio.currentTime = 0;

      unlockAudioContext();
      audio.muted = false;
      audio.volume = 0.95;
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setHasAutoplayBlocked(false);
        })
        .catch(() => {})
        .finally(() => {
          isSwitchingRef.current = false;
        });
      } else {
        isSwitchingRef.current = false;
      }
    }
  }, [getOrCreateAudio]);

  const stopAudio = useCallback(() => {
    const audio =
      audioRef.current ||
      (typeof document !== 'undefined'
        ? (document.getElementById('countdown-bg-audio') as HTMLAudioElement | null)
        : null);
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {}
    }
    setIsPlaying(false);
  }, []);

  // Setup single persistent Audio event listeners (only on mount / enabled toggle)
  useEffect(() => {
    if (!enabled) {
      stopAudio();
      return;
    }

    const audio = getOrCreateAudio();
    isSwitchingRef.current = false;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const time = audioRef.current.currentTime;
        const dur = audioRef.current.duration;
        setCurrentTime(time);

        // Automatic seamless continuous advance to next song 0.5s before track ends
        if (dur > 0 && time >= dur - 0.5 && !isSwitchingRef.current) {
          isSwitchingRef.current = true;
          advanceToNextSong();
        }
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setHasAutoplayBlocked(false);
    };

    const handlePause = () => {
      // Only set paused if not in the middle of track switching
      if (!isSwitchingRef.current) {
        setIsPlaying(false);
      }
    };

    const handleEnded = () => {
      if (!isSwitchingRef.current) {
        isSwitchingRef.current = true;
        advanceToNextSong();
      }
    };

    const handleError = (e: Event) => {
      console.warn(`Audio track error on ${currentSongRef.current?.title}, advancing to next:`, e);
      if (!isSwitchingRef.current) {
        isSwitchingRef.current = true;
        advanceToNextSong();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Initial source check
    const expectedSrc = currentSongRef.current.source;
    if (!audio.src || !audio.src.endsWith(expectedSrc)) {
      audio.src = expectedSrc;
      safePlay();
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      // NOTE: Do NOT call stopAudio here! That would kill audio when advancing songs.
    };
  }, [enabled, advanceToNextSong, getOrCreateAudio, safePlay, stopAudio]);

  // Global user interaction listener to unlock audio immediately on first interaction (mobile iOS/Android)
  useEffect(() => {
    if (!enabled) return;

    // Try initial auto-play
    safePlay();

    let isUnlocking = false;
    const gestureEvents = ['touchstart', 'touchend', 'touchmove', 'click', 'scroll', 'pointerdown'];

    const cleanupListeners = () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, handleUserGesture, true);
        document.removeEventListener(ev, handleUserGesture, true);
      });
    };

    const handleUserGesture = () => {
      if (isUnlocking) return;
      isUnlocking = true;
      unlockAudioContext();
      const audio = getOrCreateAudio();
      audio.muted = false;
      audio.volume = 0.95;

      const p = audio.paused ? audio.play() : Promise.resolve();
      p.then(() => {
        setIsPlaying(true);
        setHasAutoplayBlocked(false);
      })
        .catch(() => {})
        .finally(() => {
          isUnlocking = false;
        });

      cleanupListeners();
    };

    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, handleUserGesture, { capture: true, passive: true });
      document.addEventListener(ev, handleUserGesture, { capture: true, passive: true });
    });

    return () => {
      cleanupListeners();
    };
  }, [enabled, getOrCreateAudio, safePlay]);

  // Keyboard shortcut: Press 's', 'n', or right arrow for next song, 'p' or left arrow for previous song
  useEffect(() => {
    if (!enabled) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 's' || key === 'n' || e.key === 'ArrowRight') {
        advanceToNextSong();
      } else if (key === 'p' || e.key === 'ArrowLeft') {
        goToPreviousSong();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [enabled, advanceToNextSong, goToPreviousSong]);

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

  // Smooth fade-out and complete pause on unlock (midnight reveal transition)
  const fadeOutAudio = useCallback(() => {
    const audio =
      audioRef.current ||
      (typeof document !== 'undefined'
        ? (document.getElementById('countdown-bg-audio') as HTMLAudioElement | null)
        : null);
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {}
    setIsPlaying(false);
  }, []);

  // Synchronized lyric calculation
  const lyrics = currentSong.lyrics || [];
  let activeLyricIndex = -1;

  for (let i = 0; i < lyrics.length; i++) {
    const line = lyrics[i];
    const nextLine = lyrics[i + 1];
    if (currentTime >= line.start) {
      if (currentTime < line.end) {
        activeLyricIndex = i;
        break;
      }
      // In brief pause between lines, keep current line active
      if (nextLine && currentTime < nextLine.start) {
        activeLyricIndex = i;
        break;
      }
      if (!nextLine) {
        activeLyricIndex = i;
        break;
      }
    }
  }

  // Active lyric: If current time hasn't reached the first lyric line yet, show music symbol ♪ • • • ♪
  const defaultLeadLyric: LyricLine = { start: 0, end: (lyrics[0]?.start ?? 10), text: "♪  •  •  •  ♪" };
  const activeLyric =
    activeLyricIndex >= 0
      ? lyrics[activeLyricIndex]
      : (lyrics.length > 0 && currentTime < lyrics[0].start
          ? (lyrics[0].text.includes('♪') ? lyrics[0] : defaultLeadLyric)
          : null);

  const previousLyric =
    activeLyricIndex > 0 ? lyrics[activeLyricIndex - 1] : null;

  const nextLyric =
    activeLyricIndex >= 0 && activeLyricIndex < lyrics.length - 1
      ? lyrics[activeLyricIndex + 1]
      : (activeLyricIndex === -1 && lyrics.length > 0 ? lyrics[0] : null);

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
    previousSong: goToPreviousSong,
    selectSong,
    fadeOutAudio,
  };
};

export default useCountdownPlaylist;
