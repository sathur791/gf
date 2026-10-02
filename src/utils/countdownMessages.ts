/**
 * DYNAMIC TIME-BASED MESSAGES & DAILY PERSONAL MEMORY QUOTES
 *
 * Requirements:
 * 1. Morning (5:00 AM - 11:59 AM IST): "good morning kalai 💗💋"
 * 2. Afternoon (12:00 PM - 4:59 PM IST): "Saptiya, illa na poi thinnu di"
 * 3. Evening (5:00 PM - 9:59 PM IST): "💗 v2 ku vanthu tu rest yadu muu"
 *    - EXCEPT 6:00 PM - 8:00 PM IST: Displays the daily personal memory quote for that calendar day
 * 4. Night (10:00 PM - 4:59 AM IST): "muditu thungu di kalai 💋"
 *
 * Daily Memory Quotes for the 7-day countdown period leading to 10/10/2026 00:00:00 IST:
 * - Saturday  (Day 1) -> "English drama neyabagam eruka ?? Mu "
 * - Sunday    (Day 2) -> "Borewell 😂"
 * - Monday    (Day 3) -> "Subramaniyar Kovil 🫠"
 * - Tuesday   (Day 4) -> "Evening walks ❤️🩹"
 * - Wednesday (Day 5) -> "First 🫂💋 🫠"
 * - Thursday  (Day 6) -> "09/11 💗"
 * - Friday    (Day 7) -> "Wait pannu di"
 */

export const DAILY_MEMORY_QUOTES: Record<number, string> = {
  6: "English drama neyabagam eruka ?? Mu ", // Saturday (Day 1)
  0: "Borewell 😂",                          // Sunday (Day 2)
  1: "Subramaniyar Kovil 🫠",                 // Monday (Day 3)
  2: "Evening walks ❤️🩹",                    // Tuesday (Day 4)
  3: "First 🫂💋 🫠",                         // Wednesday (Day 5)
  4: "09/11 💗",                             // Thursday (Day 6)
  5: "Wait pannu di",                        // Friday (Day 7)
};

export const DAY_METADATA = [
  { dayNum: 1, name: "Saturday", key: 6, quote: "English drama neyabagam eruka ?? Mu " },
  { dayNum: 2, name: "Sunday", key: 0, quote: "Borewell 😂" },
  { dayNum: 3, name: "Monday", key: 1, quote: "Subramaniyar Kovil 🫠" },
  { dayNum: 4, name: "Tuesday", key: 2, quote: "Evening walks ❤️🩹" },
  { dayNum: 5, name: "Wednesday", key: 3, quote: "First 🫂💋 🫠" },
  { dayNum: 6, name: "Thursday", key: 4, quote: "09/11 💗" },
  { dayNum: 7, name: "Friday", key: 5, quote: "Wait pannu di" },
];

/**
 * Returns current date and time components adjusted to Indian Standard Time (IST / UTC+5:30)
 */
export function getISTDateTime(date: Date = new Date()): {
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
  dayOfWeek: number; // 0=Sunday, 1=Monday, ..., 6=Saturday
  year: number;
  month: number;
  day: number;
} {
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60000;
  const istOffsetMs = 5.5 * 3600000;
  const istDate = new Date(utcMs + istOffsetMs);

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const seconds = istDate.getSeconds();
  const totalMinutes = hours * 60 + minutes;
  const dayOfWeek = istDate.getDay();
  const year = istDate.getFullYear();
  const month = istDate.getMonth() + 1;
  const day = istDate.getDate();

  return { hours, minutes, seconds, totalMinutes, dayOfWeek, year, month, day };
}

/**
 * Computes the dynamic message based on current IST time or URL preview parameter overrides
 */
export function getDynamicCountdownMessage(
  date: Date = new Date(),
  overrideDay?: number | null,
  overrideTime?: string | null
): string {
  // 1. Check for manual/URL parameter overrides for preview testing
  let activeDayOverride = overrideDay;
  let activeTimeOverride = overrideTime;

  if (typeof window !== 'undefined' && (activeDayOverride === undefined || activeTimeOverride === undefined)) {
    const params = new URLSearchParams(window.location.search);
    const dayParam = params.get('day') || params.get('testDay') || params.get('previewDay');
    const timeParam = params.get('time') || params.get('testTime') || params.get('previewTime');

    if (activeDayOverride === undefined && dayParam) {
      const lower = dayParam.toLowerCase();
      if (lower === '1' || lower === 'sat' || lower === 'saturday') activeDayOverride = 6;
      else if (lower === '2' || lower === 'sun' || lower === 'sunday') activeDayOverride = 0;
      else if (lower === '3' || lower === 'mon' || lower === 'monday') activeDayOverride = 1;
      else if (lower === '4' || lower === 'tue' || lower === 'tuesday') activeDayOverride = 2;
      else if (lower === '5' || lower === 'wed' || lower === 'wednesday') activeDayOverride = 3;
      else if (lower === '6' || lower === 'thu' || lower === 'thursday') activeDayOverride = 4;
      else if (lower === '7' || lower === 'fri' || lower === 'friday') activeDayOverride = 5;
    }

    if (activeTimeOverride === undefined && timeParam) {
      activeTimeOverride = timeParam.toLowerCase();
    }
  }

  // Handle explicit time slot preview override
  if (activeTimeOverride) {
    if (activeTimeOverride === 'morning' || activeTimeOverride === 'am') {
      return "good morning kalai 💗💋";
    }
    if (activeTimeOverride === 'afternoon' || activeTimeOverride === 'pm' || activeTimeOverride === 'lunch') {
      return "Saptiya, illa na poi thinnu di";
    }
    if (activeTimeOverride === 'evening' || activeTimeOverride === 'rest') {
      return "💗 v2 ku vanthu tu rest yadu muu";
    }
    if (activeTimeOverride === 'night' || activeTimeOverride === 'sleep') {
      return "muditu thungu di kalai 💋";
    }
    if (activeTimeOverride === 'memory' || activeTimeOverride === 'quote' || activeTimeOverride === 'special') {
      const targetDay = activeDayOverride !== undefined && activeDayOverride !== null ? activeDayOverride : getISTDateTime(date).dayOfWeek;
      return DAILY_MEMORY_QUOTES[targetDay] || "Wait pannu di";
    }
  }

  // If day is overridden alone (e.g. ?day=1), default to showing that day's special memory quote
  if (activeDayOverride !== undefined && activeDayOverride !== null) {
    const memoryQuote = DAILY_MEMORY_QUOTES[activeDayOverride];
    if (memoryQuote) return memoryQuote;
  }

  // Standard live IST dynamic calculation
  const { totalMinutes, dayOfWeek } = getISTDateTime(date);

  // 1. Evening Special Memory Quote Window: 6:00 PM to 8:00 PM IST (18:00 - 19:59:59)
  // 18 * 60 = 1080 min; 20 * 60 = 1200 min
  if (totalMinutes >= 1080 && totalMinutes < 1200) {
    const memoryQuote = DAILY_MEMORY_QUOTES[dayOfWeek];
    if (memoryQuote) {
      return memoryQuote;
    }
  }

  // 2. Morning: 5:00 AM to 11:59 AM IST (05:00 - 11:59:59)
  // 5 * 60 = 300 min; 12 * 60 = 720 min
  if (totalMinutes >= 300 && totalMinutes < 720) {
    return "good morning kalai 💗💋";
  }

  // 3. Afternoon: 12:00 PM to 4:59 PM IST (12:00 - 16:59:59)
  // 12 * 60 = 720 min; 17 * 60 = 1020 min
  if (totalMinutes >= 720 && totalMinutes < 1020) {
    return "Saptiya, illa na poi thinnu di";
  }

  // 4. Evening: 5:00 PM to 9:59 PM IST (outside 6:00 - 8:00 PM memory slot)
  // 5:00 PM - 5:59 PM (1020 - 1079) and 8:00 PM - 9:59 PM (1200 - 1319)
  if (totalMinutes >= 1020 && totalMinutes < 1320) {
    return "💗 v2 ku vanthu tu rest yadu muu";
  }

  // 5. Night: 10:00 PM to 4:59 AM IST (22:00 - 04:59:59)
  // totalMinutes >= 1320 or totalMinutes < 300
  return "muditu thungu di kalai 💋";
}
