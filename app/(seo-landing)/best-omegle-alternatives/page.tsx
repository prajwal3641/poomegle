/**
 * SEO Landing Page - Best Omegle Alternatives
 * Target keywords: "best Omegle alternatives"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = generatePageMetadata({
  title: `Top Omegle Alternatives 2025: ${BRAND.name}, Emerald, Chatroulette`,
  description: `The best Omegle alternatives in 2025. Compare ${BRAND.name}, Emerald Chat, Chatroulette, OmeTV, and more random video chat platforms.`,
  keywords: ["best Omegle alternatives", "top Omegle alternatives 2025", "omegle alternatives", ...SEO_KEYWORDS.omegleAlternative],
  path: "/best-omegle-alternatives",
});

const ALTERNATIVES = [
  {
    name: BRAND.name,
    rank: 1,
    pros: ["Completely free", "No registration", "No ads", "Modern interface"],
    description: "The best Omegle alternative with a clean, free experience.",
  },
  {
    name: "Emerald Chat",
    rank: 2,
    pros: ["Interest matching", "Moderated"],
    description: "Good for finding people with similar interests, but requires signup.",
  },
  {
    name: "Chatroulette",
    rank: 3,
    pros: ["Free", "No registration", "Original platform"],
    description: "The original random chat site, but feels outdated.",
  },
  {
    name: "OmeTV",
    rank: 4,
    pros: ["Mobile apps", "Large user base"],
    description: "Popular but requires registration and has ads.",
  },
  {
    name: "Monkey App",
    rank: 5,
    pros: ["Fun filters", "Mobile-focused"],
    description: "Great for mobile, but app-only (no web version).",
  },
  {
    name: "RandoChat",
    rank: 6,
    pros: ["Simple interface", "Free"],
    description: "Basic random video chat platform with minimal features.",
  },
  {
    name: "Azar",
    rank: 7,
    pros: ["Language filters", "Mobile app"],
    description: "Random video chat with language matching features, but requires app download.",
  },
];

const FAQS = [
  {
    question: "What is the best Omegle alternative in 2025?",
    answer: `${BRAND.name} is considered the best Omegle alternative. It's completely free, requires no registration, has no ads, and offers a modern interface with fast connections.`,
  },
  {
    question: "Are there any free Omegle alternatives?",
    answer: "Yes, several free alternatives exist including Pomegle, Chatroulette, and Emerald Chat. However, some like OmeTV have premium features locked behind payment.",
  },
  {
    question: "Which Omegle alternative doesn't require registration?",
    answer: `${BRAND.name} and Chatroulette don't require registration. OmeTV and Emerald Chat require signup to access all features. RandoChat also works without registration.`,
  },
  {
    question: "What about RandoChat and Azar?",
    answer: "RandoChat is a simple free alternative but has limited features. Azar offers language filters but requires downloading a mobile app and registration. Both are viable options but {BRAND.name} offers a better web-based experience.",
  },
];

export default function BestOmegleAlternativesPage() {
  const pageUrl = `${BRAND.url}/best-omegle-alternatives`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Best Omegle Alternatives", url: pageUrl },
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
          Best Omegle Alternatives<br />
          <span className="text-primary">2025</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Since Omegle shut down, here are the best random video chat platforms to replace it.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Alternatives List */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          {ALTERNATIVES.map((alt) => (
            <div key={alt.name} className="p-6 bg-[#141414] rounded-xl border border-white/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-bold text-xl">#{alt.rank}</span>
                    <h2 className="text-xl font-bold">{alt.name}</h2>
                  </div>
                  <p className="text-gray-400 text-sm">{alt.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {alt.pros.map((pro, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1 rounded">
                    <Check className="w-3 h-3 text-primary" />
                    {pro}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Pomegle */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why {BRAND.name} is #1</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              {BRAND.name} combines the best aspects of all Omegle alternatives: the simplicity of Chatroulette, 
              the modern design users expect, and a completely free experience without hidden costs.
            </p>
            <p>
              Unlike competitors, {BRAND.name} requires no registration, shows no ads, and works perfectly 
              on both desktop and mobile. It's the closest thing to the original Omegle experience, but better.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Try the Best?</h2>
        <p className="text-gray-400 mb-8">Join thousands using {BRAND.name} as their Omegle replacement.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

