/**
 * BIRTHDAY COUNTDOWN TIME UTILITIES
 *
 * Target Unlock Moment:
 * 10 October 2026, 12:00:00 AM India Standard Time (IST / UTC+05:30)
 * Exact ISO representation: 2026-10-10T00:00:00+05:30
 */

// Exact target epoch timestamp in milliseconds (independent of user's local timezone)
export const TARGET_BIRTHDAY_IST = new Date('2026-10-10T00:00:00+05:30').getTime();

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
