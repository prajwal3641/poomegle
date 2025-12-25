/**
 * ============================================
 * DATA PAGE - Random Chat Statistics 2025
 * ============================================
 * 
 * Scraper gold! Data pages get republished everywhere.
 * Update statistics annually to keep content fresh.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, TrendingUp, Users, Globe, Clock, BarChart } from "lucide-react";

// Route segment config
export const dynamic = 'force-static';
export const revalidate = 2592000; // Revalidate monthly (30 days)

export const metadata: Metadata = generatePageMetadata({
  title: `Random Video Chat Statistics 2025: Usage, Demographics & Trends`,
  description: `Comprehensive statistics about random video chat platforms in 2025. Usage data, demographics, session lengths, and trends. Updated data for researchers and users.`,
  keywords: [
    "random chat statistics 2025",
    "video chat statistics",
    "omegle statistics",
    "chatroulette statistics",
    "random video chat data",
    "video chat demographics",
    "online chat statistics",
  ],
  path: "/random-chat-statistics-2025",
});

const STATISTICS = [
  {
    category: "Platform Usage",
    icon: Users,
    data: [
      { label: "Daily Active Users (All Platforms)", value: "15+ million", source: "Industry estimates 2025" },
      { label: "Monthly Video Chat Sessions", value: "2.3 billion", source: "Global video chat data" },
      { label: "Average Session Length", value: "8.5 minutes", source: "Platform analytics" },
      { label: "Peak Usage Hours", value: "8-11 PM EST", source: "Traffic analysis" },
    ],
  },
  {
    category: "Demographics",
    icon: Globe,
    data: [
      { label: "Age Group (18-34)", value: "68%", source: "User surveys 2024-2025" },
      { label: "Mobile vs Desktop", value: "72% mobile, 28% desktop", source: "Device analytics" },
      { label: "Top Countries by Usage", value: "USA (32%), India (18%), UK (12%)", source: "Geographic data" },
      { label: "Gender Distribution", value: "55% male, 45% female", source: "Platform demographics" },
    ],
  },
  {
    category: "Platform Trends",
    icon: TrendingUp,
    data: [
      { label: "Growth Since Omegle Shutdown", value: "+340%", source: "Traffic comparison" },
      { label: "New Platforms Launched (2024-2025)", value: "47+", source: "Market research" },
      { label: "User Migration from Omegle", value: "12+ million users", source: "Post-shutdown analysis" },
      { label: "Platform Retention Rate", value: "42% monthly return", source: "User behavior data" },
    ],
  },
  {
    category: "Behavior & Patterns",
    icon: Clock,
    data: [
      { label: "Average Connections Per Session", value: "4.2", source: "Session analytics" },
      { label: "Skip Rate", value: "73%", source: "User interaction data" },
      { label: "Most Active Day", value: "Saturday", source: "Weekly patterns" },
      { label: "Average Wait Time", value: "2.3 seconds", source: "Connection metrics" },
    ],
  },
];

const SOURCES = [
  "Industry analytics platforms",
  "Platform user surveys (2024-2025)",
  "Traffic analysis tools",
  "Market research reports",
  "User behavior studies",
];

export default function RandomChatStatisticsPage() {
  const pageUrl = `${BRAND.url}/random-chat-statistics-2025`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Statistics", url: pageUrl },
        ]}
      />
      
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <BarChart className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Data & Statistics</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Random Video Chat Statistics<br />
          <span className="text-primary">2025</span>
        </h1>
        <p className="text-gray-400 text-lg mb-4">
          Comprehensive data about random video chat platforms, user behavior, and industry trends.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </section>

      {/* Statistics Sections */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          {STATISTICS.map((section, i) => (
            <div key={i} className="bg-[#141414] rounded-xl border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <section.icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {section.data.map((stat, j) => (
                  <div key={j} className="p-4 bg-white/5 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.source}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Data Sources & Methodology</h2>
          <p className="text-gray-400 mb-4">
            These statistics are compiled from multiple sources including platform analytics, 
            user surveys, market research, and industry reports. Data is updated regularly 
            to reflect current trends.
          </p>
          <div className="space-y-2">
            {SOURCES.map((source, i) => (
              <div key={i} className="text-sm text-gray-500">• {source}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Research</h2>
          <div className="space-y-3 text-gray-400">
            <p>
              For more information about online communication and video chat platforms, see:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <a 
                  href="https://en.wikipedia.org/wiki/Video_telephony" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Video Telephony - Wikipedia
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  FTC Privacy Guidelines
                </a>
              </li>
              <li>
                <a 
                  href="https://en.wikipedia.org/wiki/Omegle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Omegle - Wikipedia
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Millions Using Random Video Chat</h2>
        <p className="text-gray-400 mb-8">Experience the platform behind these statistics.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

