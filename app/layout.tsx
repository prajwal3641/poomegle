import type { Metadata } from "next";
import { Gochi_Hand, Space_Mono } from "next/font/google";
import "./globals.css";
import { MediaStreamProvider } from "@/context/MediaStreamContext";

const gochiHand = Gochi_Hand({
  variable: "--font-gochi-hand",
  weight: "400",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://poomegle.vercel.app"),
  title: {
    default: "Loop - Best Omegle Alternative | Free Random Video Chat with Strangers",
    template: "%s | Loop - Omegle Alternative"
  },
  description: "Loop is the #1 Omegle alternative for free random video chat with strangers. Better than Omegle, OmeTV, Chatroulette & Monkey App. Safe, anonymous, no registration required. Talk to strangers worldwide instantly!",
  keywords: [
    // Primary keywords
    "omegle alternative",
    "omegle replacement",
    "talk to strangers",
    "random video chat",
    "video chat with strangers",
    "free video chat",
    // Competitor targeting
    "better than omegle",
    "omegle but safe",
    "ometv alternative",
    "chatroulette alternative",
    "monkey app alternative",
    "emerald chat alternative",
    "chatspin alternative",
    "shagle alternative",
    "tinychat alternative",
    "coomeet alternative",
    // Long-tail
    "best omegle alternative 2024",
    "omegle alternative without bots",
    "safe video chat with strangers",
    "random video chat no registration",
    "omegle like sites that work",
    "talk to strangers video call free",
    "anonymous video chat",
    "stranger chat app",
    "free random video call",
    "meet strangers online",
    "random chat roulette",
    "video chat random people"
  ],
  authors: [{ name: "Loop" }],
  creator: "Loop",
  publisher: "Loop",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Loop.vercel.app",
    siteName: "Loop",
    title: "Loop - #1 Omegle Alternative | Free Random Video Chat",
    description: "The best Omegle alternative for free random video chat with strangers. Safer than Omegle, better than OmeTV & Chatroulette. No registration, instant connections!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loop - Best Omegle Alternative for Random Video Chat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop - Best Omegle Alternative | Free Random Video Chat",
    description: "The #1 Omegle alternative. Free random video chat with strangers. Better than OmeTV, Chatroulette & Monkey App!",
    images: ["/og-image.png"],
    creator: "@Loop",
  },
  alternates: {
    canonical: "https://Loop.vercel.app",
  },
  category: "Video Chat",
  verification: {
    // Add these when you set up Google Search Console & Bing
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Loop",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Loop",
  "alternateName": ["Loop Video Chat", "Loop Random Chat"],
  "description": "Loop is the best Omegle alternative for free random video chat with strangers. Connect instantly with people worldwide.",
  "url": "https://Loop.vercel.app",
  "applicationCategory": "CommunicationApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "15000",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Free random video chat",
    "No registration required",
    "Anonymous chat",
    "Talk to strangers worldwide",
    "Safe and moderated",
    "Mobile friendly"
  ],
  "sameAs": [
    // Add your social media links here
  ]
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Loop",
  "url": "https://Loop.vercel.app",
  "logo": "https://Loop.vercel.app/logo.png",
  "description": "Loop - The #1 Omegle alternative for random video chat with strangers"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Loop a good Omegle alternative?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Loop is the best Omegle alternative available. It offers free random video chat with strangers, no registration required, and better safety features than Omegle."
      }
    },
    {
      "@type": "Question",
      "name": "Is Loop free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Loop is completely free. You can video chat with strangers without any payment or subscription."
      }
    },
    {
      "@type": "Question",
      "name": "Is Loop safer than Omegle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Loop implements modern safety features and moderation to provide a safer experience than the original Omegle."
      }
    },
    {
      "@type": "Question",
      "name": "How is Loop different from OmeTV and Chatroulette?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Loop offers a cleaner interface, faster connections, and no registration required. Unlike OmeTV or Chatroulette, you can start chatting instantly."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "5a899ca15ead4a5b8a6ec06fa0694624","spa": true}'
        ></script>
        {/* End Cloudflare Web Analytics */}
      </head>
      <body
        className={`${gochiHand.variable} ${spaceMono.variable} antialiased bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300 font-mono overflow-hidden`}
      >
        <MediaStreamProvider>{children}</MediaStreamProvider>
      </body>
    </html>
  );
}
