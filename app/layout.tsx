import type { Metadata } from "next";
import { Gochi_Hand, Space_Mono } from "next/font/google";
import "./globals.css";
import { MediaStreamProvider } from "@/context/MediaStreamContext";
import { BRAND, ALL_KEYWORDS, OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";
import { BaseStructuredData } from "@/lib/seo/structured-data";

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

// ============================================
// ROOT METADATA - POMEGLE SEO
// ============================================

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} - Best Omegle Alternative | Free Random Video Chat with Strangers`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name} is the #1 Omegle alternative for free random video chat with strangers. Better than Omegle, OmeTV, Chatroulette & Monkey App. Safe, anonymous, no registration required. Talk to strangers worldwide instantly!`,
  keywords: ALL_KEYWORDS,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  applicationName: BRAND.name,
  manifest: "/manifest.json", // Add manifest.json for PWA support
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
    ...OG_DEFAULTS,
    url: BRAND.url,
    title: `${BRAND.name} - #1 Omegle Alternative | Free Random Video Chat`,
    description: `The best Omegle alternative for free random video chat with strangers. Safer than Omegle, better than OmeTV & Chatroulette. No registration, instant connections!`,
    siteName: BRAND.name,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: `${BRAND.name} - Best Omegle Alternative | Free Random Video Chat`,
    description: `The #1 Omegle alternative. Free random video chat with strangers. Better than OmeTV, Chatroulette & Monkey App!`,
  },
  alternates: {
    canonical: BRAND.url,
  },
  category: "Video Chat",
  verification: {
    // Add these in .env.local file
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    }),
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND.name,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": BRAND.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" crossOrigin="anonymous" />
        
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for SEO */}
        <BaseStructuredData />
        
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "5a899ca15ead4a5b8a6ec06fa0694624","spa": true}'
        ></script>
      </head>
      <body
        className={`${gochiHand.variable} ${spaceMono.variable} antialiased bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300 font-mono overflow-hidden`}
      >
        <MediaStreamProvider>{children}</MediaStreamProvider>
      </body>
    </html>
  );
}
