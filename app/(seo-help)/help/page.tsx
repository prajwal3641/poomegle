/**
 * Help/FAQ Hub Page
 * Central hub for all help and troubleshooting pages
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Wrench, HelpCircle, AlertTriangle } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = generatePageMetadata({
  title: `Help & Support - ${BRAND.name}`,
  description: `Get help with ${BRAND.name}. Troubleshooting guides, FAQs, and support resources for video chat issues.`,
  keywords: ["Pomegle help", "video chat troubleshooting", "Pomegle support"],
  path: "/help",
});

const HELP_CATEGORIES = [
  {
    icon: AlertTriangle,
    title: "Connection Issues",
    pages: [
      { title: "Why Can't I Connect to Pomegle?", slug: "connection-issues" },
      { title: "Pomegle Not Loading", slug: "not-loading" },
    ],
  },
  {
    icon: Wrench,
    title: "Technical Problems",
    pages: [
      { title: "Webcam/Audio Issues", slug: "webcam-fix" },
      { title: "Browser Compatibility", slug: "browser-compatibility" },
    ],
  },
  {
    icon: HelpCircle,
    title: "Safety & Privacy",
    pages: [
      { title: "How to Stay Safe", slug: "stay-safe" },
      { title: "Data Privacy", slug: "data-privacy" },
      { title: "How to Report Users", slug: "report-user" },
      { title: "Anonymous Chatroulette", slug: "anonymous-chatroulette" },
      { title: "Bot Protection", slug: "bots-protection" },
      { title: "Public Wi-Fi Safety", slug: "public-wifi" },
      { title: "Legal & Safety Info", slug: "legal-random-video-chat" },
      { title: "Location Settings", slug: "pomegle-location" },
      { title: "Chatroulette Filters", slug: "chatroulette-filters" },
    ],
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    pages: [
      { title: "Is Pomegle Free?", slug: "/is-pomegle-free" },
      { title: "How to Use Pomegle", slug: "/how-to-use-pomegle" },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Help & Support", url: `${BRAND.url}/help` },
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
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Help & Support
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Find answers to common questions and troubleshooting guides.
        </p>
      </section>

      {/* Categories */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          {HELP_CATEGORIES.map((category) => (
            <div key={category.title} className="bg-[#141414] rounded-xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              <div className="space-y-2">
                {category.pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={page.slug.startsWith("/") ? page.slug : `/help/${page.slug}`}
                    className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 group-hover:text-white">{page.title}</span>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

