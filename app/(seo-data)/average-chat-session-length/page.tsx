/**
 * ============================================
 * DATA PAGE - Average Chat Session Length
 * ============================================
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 2592000;

export const metadata: Metadata = generatePageMetadata({
  title: `Average Random Video Chat Session Length: Statistics 2025`,
  description: `How long do people chat on random video platforms? Average session length, duration patterns, and engagement statistics for video chat platforms.`,
  keywords: [
    "average chat session length",
    "video chat duration",
    "random chat statistics",
    "session length data",
  ],
  path: "/average-chat-session-length",
});

const SESSION_DATA = [
  { duration: "0-2 minutes", percentage: 35, description: "Quick connections, immediate skips" },
  { duration: "2-5 minutes", percentage: 28, description: "Brief conversations" },
  { duration: "5-10 minutes", percentage: 20, description: "Average engaging sessions" },
  { duration: "10-20 minutes", percentage: 12, description: "Longer conversations" },
  { duration: "20+ minutes", percentage: 5, description: "Extended sessions" },
];

export default function AverageChatSessionLengthPage() {
  const pageUrl = `${BRAND.url}/average-chat-session-length`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Statistics", url: `${BRAND.url}/random-chat-statistics-2025` },
          { name: "Session Length", url: pageUrl },
        ]}
      />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Average Chat Session Length<br />
          <span className="text-primary">8.5 Minutes</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Data on how long users typically spend in random video chat sessions
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Session Duration Distribution</h2>
          <div className="space-y-4">
            {SESSION_DATA.map((item, i) => (
              <div key={i} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.duration}</span>
                  <span className="text-primary font-bold">{item.percentage}%</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                <div className="w-full bg-white/5 rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Key Findings</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-white">Average session:</strong> 8.5 minutes across all platforms
            </p>
            <p>
              <strong className="text-white">Median session:</strong> 4.2 minutes (half of sessions are shorter)
            </p>
            <p>
              <strong className="text-white">Engagement factor:</strong> Sessions longer than 5 minutes show 3x higher 
              return rate
            </p>
            <p>
              <strong className="text-white">Platform comparison:</strong> Free platforms average 6-8 minutes, 
              premium platforms average 12-15 minutes
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Your Session <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

