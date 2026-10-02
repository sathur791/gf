/**
 * DYNAMIC TIME-BASED MESSAGES & DAILY PERSONAL MEMORY QUOTES
 *
 * Rules:
 * - For Today (Oct 2, 2026 or before Oct 3, 2026): Display "💋"
 * - From Tomorrow (Oct 3, 2026 onwards): Strictly follow the schedule:
 *   1. Morning (5:00 AM - 11:59 AM IST): "good morning kalai 💗💋"
 *   2. Afternoon (12:00 PM - 4:59 PM IST): "Saptiya, illa na poi thinnu di"
 *   3. Evening (5:00 PM - 5:59 PM IST): "💗 v2 ku vanthu tu rest yadu muu"
 *   4. Evening Memory Quote Window (6:00 PM - 8:00 PM IST):
 *      - Oct 3 (Saturday, Day 1): "English drama neyabagam eruka ?? Mu "
 *      - Oct 4 (Sunday, Day 2): "Borewell 😂"
 *      - Oct 5 (Monday, Day 3): "Subramaniyar Kovil 🫠"
 *      - Oct 6 (Tuesday, Day 4): "Evening walks ❤️🩹"
 *      - Oct 7 (Wednesday, Day 5): "First 🫂💋 🫠"
 *      - Oct 8 (Thursday, Day 6): "09/11 💗"
 *      - Oct 9 (Friday, Day 7): "Wait pannu di"
 *   5. Evening (8:00 PM - 9:59 PM IST): "💗 v2 ku vanthu tu rest yadu muu"
 *   6. Night (10:00 PM - 4:59 AM IST): "muditu thungu di kalai 💋"
 */

// Memory quotes mapped by exact calendar date in October 2026
export const MEMORY_QUOTES_BY_DATE: Record<number, string> = {
  3: "English drama neyabagam eruka ?? Mu ", // Oct 3 - Saturday (Day 1)
  4: "Borewell 😂",                          // Oct 4 - Sunday (Day 2)
  5: "Subramaniyar Kovil 🫠",                 // Oct 5 - Monday (Day 3)
  6: "Evening walks ❤️🩹",                    // Oct 6 - Tuesday (Day 4)
  7: "First 🫂💋 🫠",                         // Oct 7 - Wednesday (Day 5)
  8: "09/11 💗",                             // Oct 8 - Thursday (Day 6)
  9: "Wait pannu di",                        // Oct 9 - Friday (Day 7)
};

// Memory quotes mapped by day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
export const MEMORY_QUOTES_BY_DAY_OF_WEEK: Record<number, string> = {
  6: "English drama neyabagam eruka ?? Mu ", // Saturday
  0: "Borewell 😂",                          // Sunday
  1: "Subramaniyar Kovil 🫠",                 // Monday
  2: "Evening walks ❤️🩹",                    // Tuesday
  3: "First 🫂💋 🫠",                         // Wednesday
  4: "09/11 💗",                             // Thursday
  5: "Wait pannu di",                        // Friday
};

/**
 * Returns current date and time components adjusted to Indian Standard Time (IST / Asia/Kolkata)
 * Uses Intl.DateTimeFormat to guarantee 100% timezone accuracy on all devices.
 */
export function getISTDateTime(date: Date = new Date()): {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
  dayOfWeek: number;
  weekdayStr: string;
} {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const findPart = (type: string) => parts.find((pt) => pt.type === type)?.value || '';

  const year = parseInt(findPart('year'), 10);
  const month = parseInt(findPart('month'), 10);
  const day = parseInt(findPart('day'), 10);
  let hours = parseInt(findPart('hour'), 10);
  if (hours === 24) hours = 0;
  const minutes = parseInt(findPart('minute'), 10);
  const seconds = parseInt(findPart('second'), 10);
  const totalMinutes = hours * 60 + minutes;

  const weekdayStr = findPart('weekday');
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dayOfWeek = dayMap[weekdayStr] ?? 0;

  return { year, month, day, hours, minutes, seconds, totalMinutes, dayOfWeek, weekdayStr };
}

/**
 * Computes the dynamic message based on the user's IST time and countdown schedule
 */
export function getDynamicCountdownMessage(date: Date = new Date()): string {
  // Support preview parameter if explicitly supplied via URL (e.g. ?previewDay=3 or ?previewTime=morning)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const pDay = params.get('previewDay') || params.get('day');
    const pTime = params.get('previewTime') || params.get('time');

    if (pTime === 'morning') return "good morning kalai 💗💋";
    if (pTime === 'afternoon') return "Saptiya, illa na poi thinnu di";
    if (pTime === 'evening') return "💗 v2 ku vanthu tu rest yadu muu";
    if (pTime === 'night') return "muditu thungu di kalai 💋";

    if (pDay) {
      const lower = pDay.toLowerCase();
      if (lower === '1' || lower === 'sat' || lower === 'saturday') return MEMORY_QUOTES_BY_DATE[3];
      if (lower === '2' || lower === 'sun' || lower === 'sunday') return MEMORY_QUOTES_BY_DATE[4];
      if (lower === '3' || lower === 'mon' || lower === 'monday') return MEMORY_QUOTES_BY_DATE[5];
      if (lower === '4' || lower === 'tue' || lower === 'tuesday') return MEMORY_QUOTES_BY_DATE[6];
      if (lower === '5' || lower === 'wed' || lower === 'wednesday') return MEMORY_QUOTES_BY_DATE[7];
      if (lower === '6' || lower === 'thu' || lower === 'thursday') return MEMORY_QUOTES_BY_DATE[8];
      if (lower === '7' || lower === 'fri' || lower === 'friday') return MEMORY_QUOTES_BY_DATE[9];
    }
  }

  const { year, month, day, totalMinutes, dayOfWeek } = getISTDateTime(date);

  // 1. FOR TODAY (Oct 2, 2026 or before Oct 3, 2026 IST):
  // User explicitly instructed: "and for today . just use 💋, from tommorrow do as scheduled ."
  if (year === 2026 && month === 10 && day <= 2) {
    return "💋";
  }

  // 2. FROM TOMORROW (Oct 3, 2026 onwards):

  // Evening Special Memory Quote Window: 6:00 PM to 8:00 PM IST (18:00 - 19:59:59)
  // 18 * 60 = 1080 min; 20 * 60 = 1200 min
  if (totalMinutes >= 1080 && totalMinutes < 1200) {
    const memoryQuote =
      (month === 10 ? MEMORY_QUOTES_BY_DATE[day] : null) || MEMORY_QUOTES_BY_DAY_OF_WEEK[dayOfWeek];
    if (memoryQuote) {
      return memoryQuote;
    }
  }

  // Morning: 5:00 AM to 11:59 AM IST (05:00 - 11:59:59)
  // 5 * 60 = 300 min; 12 * 60 = 720 min
  if (totalMinutes >= 300 && totalMinutes < 720) {
    return "good morning kalai 💗💋";
  }

  // Afternoon: 12:00 PM to 4:59 PM IST (12:00 - 16:59:59)
  // 12 * 60 = 720 min; 17 * 60 = 1020 min
  if (totalMinutes >= 720 && totalMinutes < 1020) {
    return "Saptiya, illa na poi thinnu di";
  }

  // Evening: 5:00 PM to 9:59 PM IST (outside 6:00 - 8:00 PM memory slot)
  // 5:00 PM - 5:59 PM (1020 - 1079) and 8:00 PM - 9:59 PM (1200 - 1319)
  if (totalMinutes >= 1020 && totalMinutes < 1320) {
    return "💗 v2 ku vanthu tu rest yadu muu";
  }

  // Night: 10:00 PM to 4:59 AM IST (22:00 - 04:59:59)
  // totalMinutes >= 1320 or totalMinutes < 300
  return "muditu thungu di kalai 💋";
}
