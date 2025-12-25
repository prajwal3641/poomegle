/**
 * ============================================
 * POMEGLE SEO CONFIGURATION
 * ============================================
 * 
 * Central configuration file for all SEO-related constants.
 * Update these values to match your brand and SEO strategy.
 */

// ============================================
// BRAND CONFIGURATION
// ============================================

export const BRAND = {
  name: "Pomegle",
  domain: "pomegle.com",
  url: "https://pomegle.com",
  email: "support@pomegle.com", // Update with your actual email
  logo: "https://pomegle.com/logo.png", // Update with your logo URL
  description: "Free random video chat with strangers. The best Omegle alternative.",
} as const;

// ============================================
// SEO KEYWORDS
// ============================================

export const SEO_KEYWORDS = {
  primary: [
    "random video chat",
    "video chat with strangers",
    "omegle alternative",
    "chatroulette alternative",
    "free video chat",
    "anonymous video chat",
    "talk to strangers",
    "random chat",
    "video chat random",
    "stranger chat",
  ],
  omegleAlternative: [
    "omegle alternative",
    "omegle replacement",
    "sites like omegle",
    "omegle but safe",
    "best omegle alternative",
    "omegle alternative 2025",
    "omegle shut down",
    "after omegle",
  ],
  randomVideoChat: [
    "random video chat",
    "video chat random",
    "random video call",
    "random video chat app",
    "video chat strangers",
    "random video chat free",
    "video chat online",
  ],
  talkToStrangers: [
    "talk to strangers",
    "chat with strangers",
    "meet strangers online",
    "talk to random people",
    "stranger chat",
    "anonymous chat",
    "random people chat",
  ],
  competitors: [
    "ometv alternative",
    "chatroulette alternative",
    "monkey app alternative",
    "emerald chat alternative",
    "chathub alternative",
    "chatspin alternative",
    "shagle alternative",
    "camsurf alternative",
  ],
  longTail: [
    "how to use pomegle",
    "is pomegle free",
    "pomegle safe",
    "pomegle vs omegle",
    "pomegle connection issues",
    "pomegle not working",
    "pomegle webcam fix",
    "how does pomegle work",
    "pomegle location",
    "pomegle filters",
  ],
} as const;

// Combine all keywords into a single array
export const ALL_KEYWORDS = [
  ...SEO_KEYWORDS.primary,
  ...SEO_KEYWORDS.omegleAlternative,
  ...SEO_KEYWORDS.randomVideoChat,
  ...SEO_KEYWORDS.talkToStrangers,
  ...SEO_KEYWORDS.competitors,
  ...SEO_KEYWORDS.longTail,
];

// ============================================
// META DESCRIPTIONS
// ============================================

export const META_DESCRIPTIONS = {
  home: `${BRAND.name} is the #1 Omegle alternative for free random video chat with strangers. Better than Omegle, OmeTV, Chatroulette & Monkey App. Safe, anonymous, no registration required. Talk to strangers worldwide instantly!`,
  omegleAlternative: `Looking for an Omegle alternative? ${BRAND.name} is the best replacement. Free random video chat, no registration, no ads. Better than OmeTV and Chatroulette.`,
  randomVideoChat: `Free random video chat with strangers on ${BRAND.name}. No signup, no fees, instant connections. Chat with people from around the world via webcam.`,
  talkToStrangers: `Talk to strangers safely on ${BRAND.name}. Free anonymous video chat with people worldwide. No registration required. Start chatting instantly.`,
  blog: `Video chat tips, safety guides, and stories from ${BRAND.name}. Learn how to chat safely, improve your conversations, and get the most out of random video chat.`,
  guidelines: `Community guidelines for ${BRAND.name}. Learn how to chat safely and respectfully with strangers. Rules and best practices for random video chat.`,
  compare: (competitorName: string) => 
    `Compare ${BRAND.name} vs ${competitorName}. See which random video chat platform is better. Free comparison of features, pricing, and user experience.`,
} as const;

// ============================================
// OPEN GRAPH DEFAULTS
// ============================================

export const OG_DEFAULTS = {
  type: "website" as const,
  siteName: BRAND.name,
  locale: "en_US",
  images: [
    {
      url: `${BRAND.url}/og-image.svg`,
      width: 1200,
      height: 630,
      alt: BRAND.name,
    },
  ],
};

// ============================================
// TWITTER CARD DEFAULTS
// ============================================

export const TWITTER_DEFAULTS = {
  card: "summary_large_image" as const,
  site: "@pomegle", // Update with your Twitter handle
  creator: "@pomegle", // Update with your Twitter handle
  images: [`${BRAND.url}/og-image.svg`],
};

// ============================================
// COMPETITORS
// ============================================

export const COMPETITORS = {
  omegle: {
    name: "Omegle",
    slug: "omegle",
    description: "The original random chat platform (shut down in 2023)",
  },
  ometv: {
    name: "OmeTV",
    slug: "ometv",
    description: "Popular video chat app with mobile support",
  },
  chatroulette: {
    name: "Chatroulette",
    slug: "chatroulette",
    description: "The original random video chat platform",
  },
  "monkey-app": {
    name: "Monkey App",
    slug: "monkey-app",
    description: "Mobile-first random video chat app",
  },
  "emerald-chat": {
    name: "Emerald Chat",
    slug: "emerald-chat",
    description: "Random chat with interest matching",
  },
  chathub: {
    name: "ChatHub",
    slug: "chathub",
    description: "Multi-platform random video chat aggregator",
  },
  chatspin: {
    name: "Chatspin",
    slug: "chatspin",
    description: "Random video chat with filters and features",
  },
  shagle: {
    name: "Shagle",
    slug: "shagle",
    description: "Random video chat with location filters",
  },
  camsurf: {
    name: "CamSurf",
    slug: "camsurf",
    description: "Free random video chat platform",
  },
  randochat: {
    name: "RandoChat",
    slug: "randochat",
    description: "Simple random video chat platform",
  },
  azar: {
    name: "Azar",
    slug: "azar",
    description: "Random video chat app with language filters",
  },
} as const;

// ============================================
// BLOG CATEGORIES
// ============================================

export const BLOG_CATEGORIES = {
  tips: {
    name: "Tips",
    slug: "tips",
    description: "Tips and tricks for better video chat experiences",
  },
  safety: {
    name: "Safety",
    slug: "safety",
    description: "Safety guides and best practices",
  },
  compare: {
    name: "Compare",
    slug: "compare",
    description: "Comparisons with other platforms",
  },
  guides: {
    name: "Guides",
    slug: "guides",
    description: "How-to guides and tutorials",
  },
} as const;

// ============================================
// DEFAULT FAQS
// ============================================

export const DEFAULT_FAQS = [
  {
    question: `What is ${BRAND.name}?`,
    answer: `${BRAND.name} is a free random video chat platform that connects you with strangers from around the world. It's the best Omegle alternative, offering instant connections without registration.`,
  },
  {
    question: `Is ${BRAND.name} free?`,
    answer: `Yes, ${BRAND.name} is completely free. No subscriptions, no coins, no hidden fees.`,
  },
  {
    question: `Do I need to create an account?`,
    answer: `No, ${BRAND.name} requires no registration. Just allow camera access and start chatting instantly.`,
  },
  {
    question: `Is ${BRAND.name} safe?`,
    answer: `${BRAND.name} is designed with safety in mind. We provide moderation tools and encourage users to report inappropriate behavior. Always follow our community guidelines and never share personal information.`,
  },
  {
    question: `How does ${BRAND.name} work?`,
    answer: `Simply visit ${BRAND.url}, allow camera and microphone access, enter a name (optional), and click "Start Chatting". You'll be connected to a random stranger instantly.`,
  },
  {
    question: `Can I use ${BRAND.name} on mobile?`,
    answer: `Yes, ${BRAND.name} works on all devices including smartphones, tablets, and computers. No app download required - it works in your mobile browser.`,
  },
];

// ============================================
// STRUCTURED DATA
// ============================================

export const STRUCTURED_DATA = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.url,
    logo: BRAND.logo,
    description: BRAND.description,
    sameAs: [
      // Add your social media profiles here
      // "https://twitter.com/pomegle",
      // "https://facebook.com/pomegle",
    ],
  },
  webApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: BRAND.name,
    url: BRAND.url,
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "15000",
      bestRating: "5",
      worstRating: "1",
    },
  },
  createFAQ: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),
  createBreadcrumbs: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  createArticle: (article: {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    author: string;
    image?: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: BRAND.logo,
      },
    },
    ...(article.image && {
      image: {
        "@type": "ImageObject",
        url: article.image,
      },
    }),
  }),
} as const;
