/**
 * SITE CONFIGURATION & QR/NFC DIGITAL ACCESS
 *
 * The entire birthday experience is accessible from ONE single permanent URL.
 * When you deploy to production (Vercel, Netlify, custom domain, etc.),
 * update `PRODUCTION_URL` below with your live URL.
 *
 * The dedicated QR generator and NFC tags will point to this exact URL.
 */

export const siteConfig = {
  // Permanent Production URL placeholder (replace with your deployed domain)
  // e.g., "https://kalai-birthday.vercel.app" or "https://for-kalai.com"
  productionUrl: "https://kalaikahbirthday.vercel.app",

  recipientName: "Kalaivani",
  recipientShortName: "Kalai",
  birthdayDate: "10/10/2026",

  // QR Code Aesthetic Settings matching the Birthday Experience
  qr: {
    // Primary module color (Deep Ocean Blue)
    darkColor: "#0B6075",
    // Clean, high-contrast quiet zone and background (Warm Cream)
    lightColor: "#FFFDF8",
    // Accent border / card color (Soft Aqua / Mint)
    accentColor: "#8ED4D6",
    mintAccent: "#DDF3E9",
    // Center emblem letter
    centerLetter: "K",
    // Error correction level: 'H' (High - up to 30% damage/overlay recovery)
    // Guarantees rock-solid scanning even with center emblem
    errorCorrectionLevel: "H" as const,
    // Clear quiet zone margin (modules)
    margin: 3,
    // Default export resolution for print (pixels)
    printableWidth: 1200,
  },

  // NFC Guidelines
  nfcInstructions: {
    title: "NFC Tag Setup",
    description:
      "Write the exact production URL to any standard NTAG213/215/216 NFC chip using NFC Tools (iOS/Android). No app or special reader required for Kalai — simply tapping her phone opens the birthday gift.",
  },
};
