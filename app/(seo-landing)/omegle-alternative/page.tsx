/**
 * SEO Landing Page - Omegle Alternative
 * Target keywords: "omegle alternative", "sites like omegle"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, omegleAlternativeMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = {
  ...omegleAlternativeMetadata,
  keywords: [...SEO_KEYWORDS.omegleAlternative],
};

const FAQS = [
  {
    question: "What is the best Omegle alternative?",
    answer: `${BRAND.name} is considered the best Omegle alternative. It offers free random video chat with no registration required.`,
  },
  {
    question: "Is there a site like Omegle that still works?",
    answer: `Yes, ${BRAND.name} works just like Omegle did. Start video chatting instantly with strangers.`,
  },
  {
    question: `Is ${BRAND.name} free?`,
    answer: `100% free. No hidden fees, no premium tiers, no BS.`,
  },
  {
    question: "Why did Omegle shut down?",
    answer: "Omegle shut down in November 2023 due to moderation challenges, legal pressures, and safety concerns. The platform operated for 14 years before closing permanently.",
  },
  {
    question: "What happened to Omegle users?",
    answer: "Millions of Omegle users migrated to alternatives like Pomegle, OmeTV, and Chatroulette after Omegle shut down.",
  },
  {
    question: "Is Pomegle better than OmeTV?",
    answer: "Pomegle is completely free with no registration, while OmeTV requires signup and shows ads. Pomegle offers a cleaner, simpler experience.",
  },
  {
    question: "Does Pomegle work on mobile?",
    answer: "Yes, Pomegle works on all devices including smartphones, tablets, and computers. No app download required - it works in your mobile browser.",
  },
  {
    question: "Is Pomegle safe?",
    answer: "Pomegle is designed with safety in mind. We provide moderation tools, user reporting, and encourage following community guidelines. Always exercise caution when talking to strangers online.",
  },
];

export default function OmegleAlternativePage() {
  const pageUrl = `${BRAND.url}/omegle-alternative`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Omegle Alternative", url: pageUrl },
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
        <p className="text-primary text-sm uppercase tracking-widest mb-4">#1 Omegle Alternative</p>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Omegle is gone.<br />
          <span className="text-primary">We&apos;re here.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Free random video chat. No signup. No fees. Just click and talk to strangers from around the world.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* What happened */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What happened to Omegle?</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Omegle shut down in November 2023 after 14 years. The founder cited ongoing challenges with moderation and user safety.
          </p>
          <p className="text-gray-400 leading-relaxed">
            {BRAND.name} was built to fill that void. Same concept, better execution. No registration, no ads, just random video chat with 
            instant matching, worldwide chat capabilities, and improved safety features including NSFW filtering technology.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why {BRAND.name}?</h2>
          <div className="space-y-4">
            {[
              { label: "Free forever", desc: "No premium, no coins, no BS" },
              { label: "No registration", desc: "Just open and start chatting - instant matching" },
              { label: "Actually works", desc: "Unlike half the omegle clones out there" },
              { label: "Modern & clean", desc: "Built in 2024, not 2009" },
              { label: "NSFW filtering", desc: "Advanced content moderation and safety features" },
              { label: "Worldwide chat", desc: "Connect with people from anywhere instantly" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
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
        <h2 className="text-2xl font-bold mb-4">Ready?</h2>
        <p className="text-gray-400 mb-8">Your next random conversation is one click away.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Let&apos;s Go <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
