/**
 * BIRTHDAY COUNTDOWN TIME UTILITIES
 *
 * Target Unlock Moment:
 * 10 October 2026, 12:00:00 AM India Standard Time (IST / UTC+05:30)
 * Exact ISO representation: 2026-10-10T00:00:00+05:30
 */

// Exact target epoch timestamp: 10 Oct 2026 00:00:00 IST (+05:30) is 09 Oct 2026 18:30:00 UTC
// Date.UTC(year, monthIndex, day, hours, minutes, seconds, ms) -> month 9 = October
export const TARGET_BIRTHDAY_IST = Date.UTC(2026, 9, 9, 18, 30, 0, 0);

export interface CountdownState {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

// Global variable for dev-only test overrides (strictly ignored in production)
let devTestTargetMs: number | null = null;

export const setDevTestTargetMs = (targetMs: number | null) => {
  if (import.meta.env.DEV) {
    devTestTargetMs = targetMs;
  }
};

export const getTargetTimestamp = (): number => {
  if (import.meta.env.DEV && devTestTargetMs !== null) {
    return devTestTargetMs;
  }
  return TARGET_BIRTHDAY_IST;
};

export const calculateCountdown = (nowMs: number = Date.now()): CountdownState => {
  const targetMs = getTargetTimestamp();
  const diffMs = targetMs - nowMs;

  if (diffMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUnlocked: true,
    };
  }

  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    totalMs: diffMs,
    days,
    hours,
    minutes,
    seconds,
    isUnlocked: false,
  };
};

export const formatTwoDigits = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};
