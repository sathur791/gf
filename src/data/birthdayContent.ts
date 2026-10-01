import { type SongItem, type LyricLine, mainTeraSong } from './mainTeraLyrics';
export type { SongItem, LyricLine };

export interface MemoryItem {
  id: string;
  image: string;
  number?: string;
  title: string;
  date?: string;
  caption: string;
  story: string;
  hiddenMessage?: string;
  rotation?: number;
  layoutType?: 'portrait' | 'tilted' | 'overlapping' | 'polaroid' | 'full' | 'monogram';
}

export interface QuestionItem {
  id: string;
  label: string;
  question: string;
  options: string[];
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface WishCardItem {
  id: string;
  category: string;
  symbol: string;
  message: string;
}

export interface BouquetItem {
  id: string;
  flowerName: string;
  meaning: string;
  message: string;
}

export const birthdayContent = {
  recipientName: "Kalaivani",
  shortName: "Kalai",
  senderName: "Sathur",

  birthday: {
    date: "2026-10-10",
    displayDate: "10.10.2026"
  },

  passwords: [
    "2210",
    "22 10",
    "sathurkalai",
    "sadurkalai"
  ],

  // Pre-Birthday Countdown Gate (Official Soundtrack: Rathinamo)
  countdown: {
    eyebrow: "KALAIVANI",
    title: "Something quiet is waiting for you.",
    subtitle: "Not yet, Kalai...",
    dateDisplay: "10/10/2026",
    timeDisplay: "00:00:00 IST",
    music: {
      title: "Rathinamo",
      source: "/music/Rathinamo.mp3",
    },
    lyricsData: {
      lines: [
        {
          start: 0,
          end: 42.3,
          text: "♪  •  •  •  ♪",
        },
        {
          start: 42.3,
          end: 46.5,
          text: "உன்னாலே வாழ்கிறேன்",
        },
        {
          start: 46.5,
          end: 50.5,
          text: "தன்னாலே ஆடினேன்",
        },
        {
          start: 50.5,
          end: 53.6,
          text: "உன் கண்ணாலே சாகிறேன்",
        },
        {
          start: 53.6,
          end: 58.2,
          text: "உயிரே, உயிரே",
        },
        {
          start: 58.2,
          end: 65.3,
          text: "வானம் தூறும் பூமழை\nஅதில் ஆடவா என் தேநிறை",
        },
        {
          start: 65.3,
          end: 74.9,
          text: "பாவை பார்க்கும் பார்வையில்\nஇறந்தேன், பிறந்தேன்",
        },
        {
          start: 74.9,
          end: 81.3,
          text: "ரத்தினமோ முத்தினமோ,\nஉன் கண்ணே முந்திவரும்\nமந்திரமோ சங்கீதமோ,\nஉன் சொல்லே பாடி வரும்",
        },
        {
          start: 81.3,
          end: 93.0,
          text: "நீ சந்திரனோ சூரியனோ,\nஎன் நெஞ்சம் திண்டாடும்\nஅந்த ஆதியனின் கட்டளையும்\nஉன் இச்ச வென்றாடும்",
        },
        {
          start: 93.0,
          end: 113.2,
          text: "♪  •  •  •  ♪",
        },
        {
          start: 113.2,
          end: 121.6,
          text: "நாள்தோறும் என் காதோரோம்\nஒன் கொரல் கேட்கணும், இசை பாடணும்",
        },
        {
          start: 121.6,
          end: 129.6,
          text: "இதழோடு நாம் இதழ் ஏற்கணும்\nஇரவோடு நாம் இரவாகணும்",
        },
        {
          start: 129.6,
          end: 148.0,
          text: "என் மோகம் எல்லாம் கொட்டி தீர\nஉன் நச்ச பார்வ என்ன கொல்ல\nதிண்டாடுறேன், கொண்டாடுறேன்\nஉன்னாலத்தான்",
        },
        {
          start: 148.0,
          end: 156.2,
          text: "ரத்தினமோ முத்தினமோ,\nஒன் கண்ணே முந்திவரும்\nமந்திரமோ சங்கீதமோ,\nஒன் சொல்லே பாடி வரும்",
        },
        {
          start: 156.2,
          end: 165.0,
          text: "நீ சந்திரனோ சூரியனோ,\nஎன் நெஞ்சம் திண்டாடும்\nஅந்த ஆதியனின் கட்டளையும்\nஒன் இச்ச வென்றாடும்",
        },
        {
          start: 165.0,
          end: 173.0,
          text: "ரத்தினமோ முத்தினமோ,\nஒன் கண்ணே முந்திவரும்\nமந்திரமோ சங்கீதமோ,\nஒன் சொல்லே பாடி வரும்",
        },
        {
          start: 173.0,
          end: 182.0,
          text: "நீ சந்திரனோ சூரியனோ,\nஎன் நெஞ்சம் திண்டாடும்\nஅந்த ஆதியனின் கட்டளையும்\nஒன் இச்ச வென்றாடும்",
        },
        {
          start: 182.0,
          end: 190.0,
          text: "♪  •  •  •  ♪",
        },
      ],
    },
  },

  // 1. Classic Cinematic Film Opening (Slow anticipation, romantic, delicate)
  opening: {
    firstLine: "for Kalai",
    secondLine: "I kept a little piece of my heart here for you.",
    invitation: "Come closer.",
    title: "Happy Birthday, Kalai.",
    coverImage: "/images/cover.jpg",
    sealHint: "Unseal",
    date: "10.10.2026",
    buttonText: "OPEN"
  },

  // Deep Romantic Reflections (Mixture of long vulnerable passages and short poetic rhythms)
  romanticReflections: {
    long1: "I don't remember the exact moment you became so important to me. Maybe there wasn't one. Maybe it happened quietly, in all those little moments I didn't know I'd end up keeping.",
    long2: "I wish I could show you the way I see you sometimes. Maybe then you'd understand why even the smallest things about you stay with me for so long.",
    long3: "There are days when I don't say much, but somehow you're still the person my mind finds its way back to.",
    long4: "I've kept so many little moments with you in my heart that I sometimes forget they were ordinary moments when they happened. They only became precious later, because they were ours.",
    long5: "I don't love you only in the beautiful moments. I love the quiet ones too — the random conversations, the silly things, the days that don't seem special until I realize I'd miss them if they weren't there.",
    long6: "You became a part of my life so naturally that I can't remember what it felt like before your presence had a place in it.",
    long7: "Maybe that's what loving someone really is — carrying little pieces of them with you, even when they're nowhere near you.",
    long8: "Sometimes I look at you and wonder how someone can feel so familiar and still make my heart feel completely new.",
    short1: "you became my favourite thought.",
    short2: "somehow, it became you.",
    short3: "just you. always you.",
    short4: "I think my favourite memories are the ones I didn't know would become memories.",
    short5: "quietly yours."
  },

  // Couple Quotes for the US section (Intimate, vulnerable, future-facing)
  coupleQuotes: [
    "I don't want only the beautiful photographs of us. I want the sleepy mornings, the stupid arguments, the random evenings, the journeys, the quiet days — all of it. As long as it is ours.",
    "If someone asked me what my favourite chapter has been so far, I'd probably just show them a picture of us.",
    "I want more ordinary days with you. Somehow, those are the ones I treasure most.",
    "I hope we keep collecting little moments that neither of us thinks are important at the time — and years later, realize they were everything.",
    "Maybe the best part of our story isn't what has already happened. Maybe it's everything we haven't lived yet.",
    "Wherever life takes us, I hope there is always a little bit of 'us' in the middle of it.",
    "One day, we'll look back at these photographs and realize we were already living some of the days we were wishing for."
  ],

  // Password Page
  secretKey: {
    eyebrow: "A PRIVATE NOTE",
    title: "olunga password podu",
    subtitle: "What's the key?",
    placeholder: "Enter the key...",
    buttonText: "UNLOCK",
    wrongFeedback: "Not quite... think about us."
  },

  // Post-open Keepsake (Soft personal dedication, no UI labels)
  hero: {
    quote: "For all the little moments that became us.",
    heading: "A little world for you.",
    subtitle: "Made especially for you."
  },

  // Envelope Interior (Poetic, intimate)
  envelope: {
    sealText: "K",
    salutation: "Dear Kalai,",
    paragraphs: [
      "I wanted to build a quiet, timeless place that belongs only to you. A space holding our thoughts, the memories we've gathered, and all the promises I hold quietly in my heart.",
      "From the first time we talked to the gentle comfort we share today, having you in my life has made everything feel warmer, softer, and more honest.",
      "Take your time with every little piece here. It was made with all my love."
    ]
  },

  // Childhood Section (Emotional tenderness, no invented memories)
  childhood: {
    intro: "Before I knew you,",
    secondary: "there was already a little girl growing into the person I'd one day love.",
    interlude1: "I wish I could tell that little girl that one day, she'd become my whole world.",
    interlude2: "Funny how life keeps a few moments for us, just waiting for the right person to look at them.",
    photos: [
      {
        id: "childhood-01",
        image: "/images/childhood-01.jpg",
        number: "01",
        title: "Little Kalai",
        date: "Childhood",
        caption: "kutti karuvachi 😂",
        story: "Looking at this photograph, I see the quiet grace and kind eyes that I would one day fall so deeply in love with.",
        hiddenMessage: "I wish I could tell this little girl that one day she would become my whole world.",
        rotation: -1.2
      },
      {
        id: "childhood-02",
        image: "/images/childhood-02.jpg",
        number: "02",
        title: "Growing Up",
        date: "Early Days",
        caption: "A gentle early chapter.",
        story: "Surrounded by loved ones, every step and smile was shaping the gentle, caring soul you are today.",
        hiddenMessage: "That radiant sparkle in your smile has never changed.",
        rotation: 1.5
      },
      {
        id: "childhood-03",
        image: "/images/childhood-03.jpg",
        number: "03",
        title: "Early Steps",
        date: "The Beginning",
        caption: "little princess",
        story: "A gentle glimpse into the earliest days of your life. Tiny, precious, and pure.",
        hiddenMessage: "Life took so many winding turns just to bring us together.",
        rotation: -1.8
      }
    ] as MemoryItem[]
  },

  // Memories & Moments (Nostalgic, natural)
  questions: [
    {
      id: "q1",
      label: "NOSTALGIA",
      question: "Do you remember the first late-night conversation we had?",
      options: [
        "When we talked for hours without noticing time slip away",
        "When we debated about our favorite songs",
        "When we shared silly jokes that made no sense to anyone else"
      ],
      correctAnswer: "When we talked for hours without noticing time slip away",
      feedbackCorrect: "That was the night I realized talking to you felt like home.",
      feedbackWrong: "Close... think about us."
    },
    {
      id: "q2",
      label: "OUR MOMENTS",
      question: "What is my absolute favorite thing about being with you?",
      options: [
        "The way your eyes light up when you laugh",
        "The peaceful silence where no words are needed",
        "Every single second we get to share together"
      ],
      correctAnswer: "Every single second we get to share together",
      feedbackCorrect: "Always. Because with you, even the quietest ordinary days turn into treasures.",
      feedbackWrong: "Close... think about what matters most to my heart."
    }
  ] as QuestionItem[],

  // Companion Moon ("Muzumathi")
  moon: {
    image: "/images/moon.png",
    crescentImage: "/images/moon-crescent.png",
    title: "Muzumathi"
  },

  // "KALAI" SECTION (Quiet admiration & personal observations)
  kalai: {
    title: "KALAI",
    subtitle: "I wish you could borrow my eyes for a moment.",
    notes: [
      "this smile.",
      "this is one of my favourite views.",
      "you, being you.",
      "somehow, you make simple things look beautiful.",
      "just Kalai."
    ],
    photos: [
      {
        id: "kalai-beach",
        image: "/images/kalai-beach.png",
        title: "Ocean Breeze",
        caption: "ocean breeze, and you.",
        date: "By the Sea",
        story: "Standing by the open sea, the wind in your hair, with that quiet, effortless smile. You make the whole world feel calm and gentle.",
        hiddenMessage: "My favorite view will always be you against the open sky.",
        layoutType: "portrait"
      },
      {
        id: "kalai-blue-saree-traditional",
        image: "/images/kalai-blue-saree-traditional.png",
        title: "Grace & Jasmine",
        caption: "pure grace.",
        date: "Traditional Elegance",
        story: "In royal blue and soft gold, jasmine blossoms in your hair. A radiant, unmistakable presence that lights up every corner of the room.",
        hiddenMessage: "Looking at you, I realize some people simply radiate light.",
        layoutType: "portrait"
      },
      {
        id: "kalai-gown",
        image: "/images/kalai-gown.png",
        title: "Royalty in Bloom",
        caption: "somehow, you make simple things look beautiful.",
        date: "Grace",
        story: "Seated gracefully beneath the floral arch in rich magenta. Unmistakable poise, gentle warmth, and a presence that lights up everything around you.",
        hiddenMessage: "You are the queen of my heart, today and in every tomorrow.",
        layoutType: "portrait"
      },
      {
        id: "kalai-maroon",
        image: "/images/kalai-maroon.png",
        title: "A Quiet Glimpse",
        caption: "this smile.",
        date: "Celebration",
        story: "Looking down with that shy, gentle smile. Sparkling yet subtle, exactly like you.",
        hiddenMessage: "Every little expression of yours is a memory I treasure.",
        layoutType: "portrait"
      },
      {
        id: "kalai-blue-dress",
        image: "/images/kalai-blue-dress.jpg",
        title: "A Quiet Radiance",
        caption: "this smile.",
        date: "Warmth",
        story: "Seated with that gentle, unmistakable smile. The quiet elegance and warmth you carry effortlessly in every frame.",
        hiddenMessage: "You take my breath away every single time.",
        layoutType: "portrait"
      },
      {
        id: "kalai-saree",
        image: "/images/kalai-saree.jpg",
        title: "Grace & Jasmine",
        caption: "this is one of my favourite views.",
        date: "Treasured Days",
        story: "There is an effortless elegance in the way you carry yourself. This portrait will always be one of my favorites.",
        hiddenMessage: "A beauty that is gentle, quiet, and timeless.",
        layoutType: "portrait"
      },
      {
        id: "kalai-full",
        image: "/images/kalai-full.jpg",
        title: "Calm & Radiant",
        caption: "you, being you.",
        date: "Gentle Days",
        story: "Your smile has this quiet power to brighten any room, any day, and any thought.",
        hiddenMessage: "Seeing you happy is all I ever want.",
        layoutType: "tilted"
      },
      {
        id: "kalai-traditional",
        image: "/images/kalai-traditional.jpg",
        title: "Pure Warmth",
        caption: "just Kalai.",
        date: "Forever Treasured",
        story: "Looking at this reminds me of how genuinely beautiful your soul is, inside and out.",
        hiddenMessage: "You are truly one of a kind, Kalai.",
        layoutType: "polaroid"
      },
      {
        id: "kalai-present",
        image: "/images/kalai-present.jpg",
        title: "Look at you now",
        caption: "The same girl. A whole different chapter.",
        date: "Present Day",
        story: "Somewhere along the way, that sweet little girl grew into the most incredible woman.",
        hiddenMessage: "And I get to love you.",
        layoutType: "full"
      }
    ] as MemoryItem[]
  },

  // "US" SECTION (The Emotional Turning Point: You -> Us)
  us: {
    prelude: "All those little moments...",
    preludePause: "somehow led me here.",
    firstCoupleLine: "And then there was us.",
    firstCoupleReflection: "I don't remember the exact moment you became so important to me. Maybe there wasn't one. Maybe it happened quietly, in all those little moments I didn't know I'd end up keeping.",
    secondCoupleLine: "I don't think I'll ever stop being grateful that, out of all the people in this world...",
    secondCoupleReflection: "I got to find you.",
    title: "US",
    subtitle: "Just us.",
    photos: [
      {
        id: "us-videocall-sleep",
        image: "/images/us-videocall-sleep.png",
        title: "Late Night Call",
        caption: "even in your sleep, you are my peace.",
        date: "Our Nights",
        story: "Curled up and sleeping peacefully on call while the world is quiet. Looking over at your face on my screen, I know that no matter where I am, you are my peace.",
        hiddenMessage: "Distance never mattered when you were right there on my screen, holding my peace.",
        layoutType: "polaroid"
      },
      {
        id: "us-stars",
        image: "/images/us-stars.png",
        title: "Written in the Stars",
        caption: "KALAI & SATHUR. Star by star.",
        date: "Our Constellation",
        story: "A delicate note sent from you to me, with our names drawn star by star. Every single little star is a promise.",
        hiddenMessage: "Even if the skies were empty, your name would be written in my stars.",
        layoutType: "portrait"
      },
      {
        id: "us-signature",
        image: "/images/us-signature.jpg",
        title: "Sathur & Kalai",
        caption: "Kalai nestled right inside my heart.",
        date: "Handwritten Forever",
        story: "A hand-drawn pen sketch on paper — the letter S curving softly around Kalai, crowned with a little heart. Simple, handmade, and eternal.",
        hiddenMessage: "Our story isn't just spoken; it's etched into each other's souls.",
        layoutType: "monogram"
      },
      {
        id: "us-temple",
        image: "/images/us-temple.jpg",
        title: "Two Souls, One Quiet Prayer",
        caption: "Standing beside you, my favorite prayer is already answered.",
        date: "Our Temple Walk",
        story: "Walking side by side among ancient stone pillars. In a world full of noise, standing right with you feels like complete and timeless peace.",
        hiddenMessage: "Every temple, every prayer, every wish I ever make leads right back to you.",
        layoutType: "portrait"
      }
    ] as MemoryItem[]
  },

  // Interactive Floating Balloons (Quiet thoughts)
  balloons: [
    {
      id: "balloon-01",
      color: "aqua",
      label: "a quiet thought",
      message: "You make ordinary days feel like poetry."
    },
    {
      id: "balloon-02",
      color: "mint",
      label: "something I keep",
      message: "Your laughter is literally my favorite sound in the universe."
    },
    {
      id: "balloon-03",
      color: "cream",
      label: "just us",
      message: "Thank you for being my safe place, today and every single day."
    }
  ],

  // Interactive Folded Paper Notes
  hiddenNotes: [
    {
      id: "note-01",
      teaser: "wait...",
      title: "a quiet thought",
      message: "I looked over at you and thought: I never want this moment to end."
    },
    {
      id: "note-02",
      teaser: "look closely...",
      title: "written for you",
      message: "Of all the stars in the night sky, you will always be my brightest."
    },
    {
      id: "note-03",
      teaser: "one more...",
      title: "forever promise",
      message: "I never needed perfect moments. I just wanted more moments with you."
    }
  ],

  // Wishes Section (Warm, heartfelt wishes)
  wishes: {
    title: "A few things I hope for you.",
    cards: [
      {
        id: "dreams",
        category: "FOR YOUR DREAMS",
        symbol: "❊",
        message: "May every dream you hold quietly in your heart unfold with grace, courage, and beautiful success."
      },
      {
        id: "peace",
        category: "FOR YOUR PEACE",
        symbol: "✦",
        message: "May your heart always be at ease, surrounded by quiet warmth, reassurance, and steady calm."
      },
      {
        id: "smile",
        category: "FOR YOUR SMILE",
        symbol: "♡",
        message: "May your life always be filled with genuine laughter, bright mornings, and moments that make your eyes light up."
      },
      {
        id: "ahead",
        category: "FOR EVERYTHING AHEAD",
        symbol: "✧",
        message: "May every coming year bring us closer, through every adventure, every sunset, and every quiet tomorrow hand in hand."
      }
    ] as WishCardItem[]
  },

  bouquet: [
    {
      id: "jasmine",
      flowerName: "Jasmine Blossom",
      meaning: "Purity & Grace",
      message: "Like sweet jasmine, your presence fills every space with peace, elegance, and sweetness."
    },
    {
      id: "camellia",
      flowerName: "Pale Camellia",
      meaning: "Adoration & Devotion",
      message: "You are admired for your honesty, warmth, and the tender way you care for the people you love."
    },
    {
      id: "lotus",
      flowerName: "Morning Lotus",
      meaning: "Inner Strength",
      message: "Gentle yet resilient, you bloom gracefully through every season of life."
    },
    {
      id: "rose",
      flowerName: "Wild Rose",
      meaning: "Everlasting Love",
      message: "My love for you grows deeper with every passing day, today and forever."
    }
  ] as BouquetItem[],

  // Love Letter (Handwritten, authentic, vulnerable)
  letter: {
    introLine1: "There are some things I can say easily...",
    introLine2: "and some things I can only write.",
    heading: "for the things I never say enough...",
    salutation: "Kalai,",
    paragraphs: [
      "There are feelings that ordinary words can barely carry, but tonight I want to try. Out of all the people and all the winding paths in this world, having you in my life is the greatest blessing I have ever known.",
      "Thank you for the comfort you bring into my days, for understanding me in ways no one else can, and for your gentle patience. You are my safe harbor, my favorite conversation, and my deepest peace.",
      "There are things I don't always know how to say when you're standing right in front of me, but I hope you feel them in the way I look at you. In the way my days feel empty when we don't talk. In the way you became my home without even trying.",
      "I love you, Kalai. For who you were, for who you are today, and for every version of us that we haven't even met yet."
    ],
    signaturePrefix: "Always yours.",
    signatureName: "Sathur"
  },

  // Classic Cinematic Climax (Final frame of an old romantic movie)
  final: {
    line1: "Maybe this is my favourite picture.",
    line2: "Not because it's perfect.",
    line3: "But because it's us.",
    futureLead: "I don't know what the years ahead will look like.",
    futureChoice: "I only know that if I get to choose...",
    futurePromise: "I'd choose more days with you.",
    rhythm: [
      "More memories.",
      "More laughter.",
      "More ordinary days.",
      "More us."
    ],
    couplePhoto: "/images/couple-final.png",
    couplePhotoBg: "/images/couple-final-bg.png",
    couplePhotoCutout: "/images/couple-final-cutout.png",
    signaturePrefix: "Always yours.",
    signatureName: "Sathur",
    replayText: "Watch again"
  },

  music: {
    title: "Muzumathi",
    source: "/music/Muzumathi-MassTamilan.dev.mp3"
  }
};

export const rathinamoSong: SongItem = {
  id: 'rathinamo',
  title: 'Rathinamo',
  source: '/music/Rathinamo.mp3',
  lyrics: birthdayContent.countdown.lyricsData.lines,
};

export const countdownPlaylist: SongItem[] = [
  rathinamoSong,
  mainTeraSong,
];

