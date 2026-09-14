# 🌊 For Kalaivani — Digital Handmade Birthday Gift

> **A bespoke digital birthday gift crafted with love for Kalaivani (10.10.2026).**  
> Designed to feel like a physical, handmade stationery gift floating over clear ocean-blue waters, gradually unwrapped and explored.

---

## ✨ Design Philosophy & Visual Language

This project is an intimate, handmade **digital stationery gift** set within a serene ocean-water atmosphere:

- **Ocean Blue Atmosphere**: 
  - Deep Ocean Blue (`#0B5F73`)
  - Ocean Teal (`#147D8A`)
  - Soft Aqua (`#75C9D0`)
  - Light Sea Blue (`#BFE8EA`)
  - Ocean Mist (`#E6F6F5`)
  - Deep Ocean Blue text (`#083B4A`)
- **Warm Cream Paper Contrast**: The central birthday cards, envelope, scrapbook photos, and love letter are rendered on warm cream stationery (`#FFF9F0`, `#FAF6EE`) with delicate deckle edges, physical wax seals, and soft ambient shadows that contrast against the ocean blue.
- **Subtle Water Movement**: Layered, slow-moving translucent wave SVG curves and floating light particles evoking soft morning sunlight filtering through calm ocean water.
- **Pristine Real Photography**:
  - Displays real personal photographs without artificial filters, blue tints, or AI reconstructions.
  - Features high-resolution interpolation (`image-rendering: auto`), asynchronous decoding (`decoding="async"`), and warm cream photo framing.
- **Typography**: Refined Google Fonts pairing: *Cormorant Garamond* (editorial serif for titles & emotional headings), *Inter* (modern clean sans for labels & dates), and *Caveat* (handwritten accents).
- **Mobile-First**: Engineered primarily for vertical viewing on mobile devices (360px–430px), scaling smoothly to desktop screens without horizontal overflow.

---

## 📖 The Unfolding Experience Journey

The website guides Kalaivani through a continuous, 14-step emotional story:

```
[ SCENE 01: Ocean Cover — "FOR KALAI" ]
  Layered ocean blue atmosphere with subtle wave movement, warm cream folded card, 
  "Something I wanted you to keep.", "10.10.2026", "Open when you're ready.", and physical "OPEN" button.
       │
       ▼
[ SCENE 02: "olunga password podu" ]
  Playful stationery note with subtle glow on focus and gentle feedback.
       │
       ▼
[ SCENE 03: Tactile Unlock Transition ]
  Aqua light expands, wax seal breaks, envelope opens, paper rises (~1.8s).
       │
       ▼
[ SCENE 04: Centerpiece Birthday Card ]
  "For all the little moments that became us." — "Happy Birthday, Kalai." — "Made especially for you."
       │
       ▼
[ SCENE 05: Interactive Envelope & Letter ]
  Interactive envelope with "K" wax seal; tapping opens the flap and reveals her personal letter.
       │
       ▼
[ SCENE 06: Childhood Story ]
  "kutti karuvachi 😂" → childhood-02 → "little princess" with delicate botanical accents.
       │
       ▼
[ SCENE 07: "Do you remember this?" (Personal Questions) ]
  Interactive questions about shared memories with gentle, encouraging affirmations.
       │
       ▼
[ SCENE 08: "KALAI" (A little collection of you.) ]
  Editorial scrapbook photo collection with letter-by-letter reveal (saree portrait, full-length, traditional, present-day).
       │
       ▼
[ SCENE 09: "US" (And then... there was us.) ]
  Cinematic two-photo overlapping composition ("Just us.") with fullscreen memory overlays.
       │
       ▼
[ SCENE 10: "A few things I hope for you." (Wish Cards) ]
  Interactive stationery cards ("For your dreams", "For your peace", "For your smile", "For everything ahead") 
  that physically expand on tap.
       │
       ▼
[ SCENE 11: "Pick One" (Digital Bouquet) ]
  Delicate SVG botanical tokens (Jasmine, Camellia, Lotus, Wild Rose) in soft blue, green, and cream that bloom when chosen.
       │
       ▼
[ SCENE 12: "One last thing." — "Something I wanted to say properly." (Love Letter) ]
  Unfolding cream paper sheet with paragraph-level scroll reveals and handwritten signature.
       │
       ▼
[ SCENE 13: Emotional Climax (Couple Photograph) ]
  Ocean blue fades into deep teal and warm cream light, revealing couple-final.png against the atmosphere.
       │
       ▼
[ SCENE 14: Final Birthday Greeting & Replay ]
  "10.10.2026", "HAPPY BIRTHDAY KALAIVANI", "Always yours. Sathur", "Until our next memory."
  "Open it again" button smoothly returns to the beginning.
```

---

## 🔐 Secret Keys

Access to the gift is unlocked with any of the following keys (case-insensitive & whitespace trimmed):

- `2210`
- `22 10`
- `sathurkalai`
- `sadurkalai`

---

## 🎶 Persistent Background Audio

- **Track**: *Muzumathi* (`/public/music/Muzumathi-MassTamilan.dev.mp3`)
- **Single Persistent Instance**: The song is managed through a single audio controller. It continues seamlessly across all scrolling, modal interactions, and component re-renders without restarting.
- **Ocean-Pill Controller**: A floating control (`♪ Muzumathi` in ocean-blue & cream with rotating disc and soundwave indicator) positioned at the bottom right allows easy play/pause and graceful fallback if browser autoplay is restricted.

---

## 📂 Project Structure & Content Customization

```
kalai-kah-bday/
├── public/
│   ├── images/
│   │   ├── childhood-01.jpg       # Young Kalaivani in maroon dress & jasmine
│   │   ├── childhood-02.jpg       # Childhood memory with loved one
│   │   ├── childhood-03.jpg       # Baby Kalaivani in pink dress
│   │   ├── kalai-present.jpg      # Present-day portrait in soft blue
│   │   ├── couple-final.png       # Climax couple photograph (transparent background)
│   │   ├── memory1.jpg            # Scrapbook album photo 1
│   │   ├── memory2.jpg            # Scrapbook album photo 2
│   │   ├── memory3.jpg            # Scrapbook album photo 3
│   │   └── memory4.jpg            # Scrapbook album photo 4
│   └── music/
│       └── Muzumathi-MassTamilan.dev.mp3
├── src/
│   ├── components/
│   │   ├── BirthdayExperience.tsx     # Master experience orchestrator
│   │   ├── OpeningScene.tsx           # Layered Ocean Blue cover
│   │   ├── SecretKey.tsx              # Secret key stationery modal
│   │   ├── GiftOpening.tsx            # Tactile opening animation with aqua light
│   │   ├── BirthdayCard.tsx           # Centerpiece "Happy Birthday, Kalai." card
│   │   ├── Envelope.tsx               # Interactive CSS/SVG envelope & letter
│   │   ├── ChildhoodStory.tsx         # Childhood photo scrapbook with short captions
│   │   ├── MemoryQuestion.tsx         # Romantic interactive questions
│   │   ├── PresentDayKalai.tsx        # Present portrait reveal ("Somewhere along the way...")
│   │   ├── MemoryAlbum.tsx            # "Our Little Album" numbered photo cards
│   │   ├── MemoryOverlay.tsx          # Deep ocean blue lightbox with hidden notes
│   │   ├── WishCards.tsx              # "A few things I hope for you." wish cards
│   │   ├── BouquetInteraction.tsx     # Botanical SVG flower tokens
│   │   ├── LoveLetter.tsx             # Unfolding cream paper letter ("One last thing.")
│   │   ├── CoupleClimax.tsx           # Climactic couple photo & closing notes
│   │   ├── MusicController.tsx        # Persistent floating audio pill in ocean-cream
│   │   └── StationeryDecorations.tsx  # Ambient drifting botanical SVG elements
│   ├── data/
│   │   └── birthdayContent.ts         # Central configuration for all text & memories
│   ├── styles/
│   │   └── global.css                 # Ocean Blue design system & color tokens
│   ├── App.tsx                        # High-level state flow orchestrator
│   └── main.tsx                       # React application entry
└── index.html                         # Google Fonts & light theme configuration
```

### Editing Words & Messages
To customize any personal message, date, question, or wish, edit [`src/data/birthdayContent.ts`](src/data/birthdayContent.ts). All copy is centralized in this file so you never need to edit React components directly.

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm`

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 📱 Browser & Device Support

- **Mobile Viewports**: Tested for 360px, 390px, 412px, and 430px screens (iPhone & Android).
- **Tablet & Desktop**: Fluid responsive scaling up to 1440px+.
- **Keyboard & Accessibility**:
  - `Escape` key automatically closes open photo lightboxes.
  - All interactive cards, buttons, and inputs feature minimum 44px touch targets and full keyboard focus support (`Enter` / `Space`).

---

*Made with love for Kalaivani — 10.10.2026*
