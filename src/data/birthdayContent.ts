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
  layoutType?: 'portrait' | 'tilted' | 'overlapping' | 'polaroid' | 'full';
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

  // Pre-Birthday Countdown Gate
  countdown: {
    eyebrow: "FOR KALAIVANI",
    title: "Something special is waiting for you.",
    subtitle: "Not yet, Kalai...",
    dateDisplay: "10.10.2026",
    timeDisplay: "12:00:00 AM IST",
    music: {
      title: "Something Waiting",
      source: "/music/countdown.mp3",
    }
  },

  // Ocean Blue Cover Copy
  opening: {
    eyebrow: "FOR KALAI",
    title: "Something I wanted you to keep.",
    date: "10.10.2026",
    subtitle: "Open when you're ready.",
    buttonText: "OPEN"
  },

  // Password Page
  secretKey: {
    eyebrow: "A PRIVATE NOTE",
    title: "olunga password podu",
    subtitle: "What's the key?",
    placeholder: "Enter the secret key...",
    buttonText: "UNLOCK",
    wrongFeedback: "Not quite... think about us."
  },

  // Post-open Hero Quote
  hero: {
    quote: "For all the little moments that became us.",
    heading: "Happy Birthday, Kalai.",
    subtitle: "Made especially for you."
  },

  envelope: {
    sealText: "K",
    hint: "Tap the seal to open your letter",
    heading: "Happy Birthday, Kalai.",
    salutation: "Dear Kalai,",
    paragraphs: [
      "I wanted to make something unique that belongs just to you on your birthday. A quiet, soft space holding our thoughts, memories, and promises.",
      "From the first time we talked to the gentle comfort we share today, having you in my life is a gift I cherish every moment.",
      "Take your time and discover each piece inside this little gift."
    ]
  },

  // Childhood Section
  childhood: {
    intro: "Before there was us.",
    secondary: "There was you.",
    afterPhotoNote: "Funny how life keeps a few moments for us.",
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
        caption: "One of the earliest chapters.",
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

  questions: [
    {
      id: "q1",
      label: "A LITTLE MEMORY",
      question: "Do you remember the first late-night conversation we had?",
      options: [
        "When we talked for hours without noticing time slip away",
        "When we debated about our favorite songs",
        "When we shared silly jokes that made no sense to anyone else"
      ],
      correctAnswer: "When we talked for hours without noticing time slip away",
      feedbackCorrect: "You remembered. That was the night I realized talking to you felt like home.",
      feedbackWrong: "Close... but think about us."
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
      feedbackCorrect: "Always. Because with you, even the simplest ordinary moments turn into treasures.",
      feedbackWrong: "Close... think about what matters most to my heart."
    }
  ] as QuestionItem[],

  // MOON CONFIGURATION ("Muzumathi" - The Full Moon motif)
  moon: {
    image: "/images/moon.png",
    crescentImage: "/images/moon-crescent.png",
    title: "Muzumathi"
  },

  // "KALAI" SECTION
  kalai: {
    title: "KALAI",
    subtitle: "A little collection of you.",
    hint: "Tap any photograph to open full view",
    photos: [
      {
        id: "kalai-gown",
        image: "/images/kalai-gown.png",
        title: "Royalty in Bloom",
        caption: "Queen of every room you enter.",
        date: "Celebration",
        story: "Seated gracefully beneath the floral arch in rich magenta. Unmistakable poise, gentle warmth, and a presence that lights up everything around you.",
        hiddenMessage: "You are the queen of my heart, today and in every tomorrow.",
        layoutType: "portrait"
      },
      {
        id: "kalai-blue-dress",
        image: "/images/kalai-blue-dress.jpg",
        title: "A Quiet Radiance",
        caption: "My favorite smile in the whole world.",
        date: "Special Moments",
        story: "Seated with that gentle, unmistakable smile. The quiet elegance and warmth you carry effortlessly in every frame.",
        hiddenMessage: "You take my breath away every single time.",
        layoutType: "portrait"
      },
      {
        id: "kalai-saree",
        image: "/images/kalai-saree.jpg",
        title: "Grace & Jasmine",
        caption: "Grace in every detail.",
        date: "Treasured Days",
        story: "There is an effortless elegance in the way you carry yourself. This portrait will always be one of my favorites.",
        hiddenMessage: "A beauty that is gentle, quiet, and timeless.",
        layoutType: "portrait"
      },
      {
        id: "kalai-full",
        image: "/images/kalai-full.jpg",
        title: "Calm & Radiant",
        caption: "In your element.",
        date: "Gentle Days",
        story: "Your smile has this quiet power to brighten any room, any day, and any thought.",
        hiddenMessage: "Seeing you happy is all I ever want.",
        layoutType: "tilted"
      },
      {
        id: "kalai-traditional",
        image: "/images/kalai-traditional.jpg",
        title: "Pure Warmth",
        caption: "A smile that stays with me.",
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

  // "US" SECTION (Progression: Photo 1 -> Photo 2 -> Photo 3 -> Photo 4)
  us: {
    transitionIntro: "And then...",
    transitionSecondary: "there was us.",
    title: "US",
    subtitle: "Just us.",
    hint: "Tap to open our story",
    photos: [
      {
        id: "us-real-couple",
        image: "/images/us-real-couple.png",
        title: "Just You and Me",
        caption: "Cheek to cheek. Where everything feels right.",
        date: "Our Forever",
        story: "Held close, smiling together. No filters, no distance, just the gentle, honest truth of being right where we belong.",
        hiddenMessage: "My favorite place in the entire world is right beside you.",
        layoutType: "portrait"
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
        id: "us-01",
        image: "/images/us-01.jpg",
        title: "Side by Side",
        caption: "Where everything feels right.",
        date: "Our Journey",
        story: "From ordinary afternoons to unforgettable moments, having you beside me makes life complete.",
        hiddenMessage: "I looked over at you and knew with certainty: here is where I belong.",
        layoutType: "polaroid"
      }
    ] as MemoryItem[]
  },

  // Interactive Floating Balloons
  balloons: [
    {
      id: "balloon-01",
      color: "aqua",
      label: "A tiny secret",
      message: "You make ordinary days feel like poetry."
    },
    {
      id: "balloon-02",
      color: "mint",
      label: "One more thing...",
      message: "Your laughter is literally my favorite sound in the universe."
    },
    {
      id: "balloon-03",
      color: "cream",
      label: "Just between us",
      message: "Thank you for being my safe place, today and every single day."
    }
  ],

  // Interactive Folded Paper Notes
  hiddenNotes: [
    {
      id: "note-01",
      teaser: "wait...",
      title: "A quiet thought",
      message: "I looked over at you and thought: I never want this moment to end."
    },
    {
      id: "note-02",
      teaser: "look closely...",
      title: "Written for you",
      message: "Of all the stars in the night sky, you will always be my brightest."
    },
    {
      id: "note-03",
      teaser: "one more...",
      title: "Forever promise",
      message: "No matter how many birthdays come, I'll be right beside you celebrating every single one."
    }
  ],

  // Wishes Section
  wishes: {
    title: "A few things I hope for you.",
    subtitle: "Tap each card to open its wish",
    cards: [
      {
        id: "dreams",
        category: "FOR YOUR DREAMS",
        symbol: "❊",
        message: "May every wish and dream you hold quietly in your heart unfold with grace, courage, and beautiful success."
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

  // Love Letter Section
  letter: {
    title: "One last thing.",
    subtitle: "Something I wanted to say properly.",
    salutation: "Kalai,",
    paragraphs: [
      "There are feelings that words can barely carry, but today I want to try. Out of all the people and all the paths in this world, having you in my life is the greatest blessing I have ever known.",
      "Thank you for the comfort you bring into my days, for understanding me in ways no one else can, and for your gentle patience. You are my safe harbor, my favorite conversation, and my deepest peace.",
      "As you celebrate another year of life, I want you to know how deeply you are loved, how proud I am of the woman you are, and how excited I am for all our years to come."
    ],
    signaturePrefix: "Always yours.",
    signatureName: "Sathur"
  },

  // Final Climax Section
  final: {
    prelude: "And that's not even the best part.",
    pauseText: "Because this...",
    couplePhoto: "/images/couple-final.png",
    date: "10.10.2026",
    birthdayTitle: "HAPPY BIRTHDAY",
    name: "KALAIVANI",
    message: "To the person who holds my whole heart — today and in every memory yet to come.",
    signature: "Always yours. Sathur",
    closing: "Until our next memory.",
    replayText: "Open it again"
  },

  music: {
    title: "Muzumathi",
    source: "/music/Muzumathi-MassTamilan.dev.mp3"
  }
};
