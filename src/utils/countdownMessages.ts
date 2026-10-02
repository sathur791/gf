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
  6: "English drama neyabagam eruka ?? Mu ", // Saturday
  0: "Borewell 😂",                          // Sunday
  1: "Subramaniyar Kovil 🫠",                 // Monday
  2: "Evening walks ❤️🩹",                    // Tuesday
  3: "First 🫂💋 🫠",                         // Wednesday
  4: "09/11 💗",                             // Thursday
  5: "Wait pannu di",                        // Friday
};

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
  // Convert UTC timestamp to IST by applying the +5.5 hour offset
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
 * Computes the dynamic message based on the current IST time and countdown day
 */
export function getDynamicCountdownMessage(date: Date = new Date()): string {
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
