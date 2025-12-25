/**
 * SEO Page - Is Pomegle Free
 * Target keywords: "is Pomegle free"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { ArrowRight, DollarSign, Check } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Is ${BRAND.name} Free? Everything You Need to Know`,
  description: `Yes, ${BRAND.name} is completely free. No hidden costs, no premium tiers, no credit card required. Free random video chat forever.`,
  keywords: ["is Pomegle free", "Pomegle free", "free video chat", ...BRAND.name.toLowerCase().split(" ")],
  path: "/is-pomegle-free",
});

const FAQS = [
  {
    question: "Is Pomegle free?",
    answer: "Yes, Pomegle is 100% free. There are no charges, no hidden fees, no premium tiers, and no credit card required. You can chat with strangers for free forever.",
  },
  {
    question: "Does Pomegle have a premium version?",
    answer: "No, Pomegle doesn't have a premium or paid version. All features are completely free for everyone.",
  },
  {
    question: "Will Pomegle always be free?",
    answer: "Pomegle is designed to stay free. We believe random video chat should be accessible to everyone without payment barriers.",
  },
  {
    question: "Are there any ads on Pomegle?",
    answer: "No, Pomegle has no ads. Enjoy a clean, distraction-free chat experience without any advertisements.",
  },
  {
    question: "Do I need to pay to unlock features?",
    answer: "No payment required. All features on Pomegle are available immediately and completely free. No locked content or premium-only features.",
  },
];

export default function IsPomegleFreePage() {
  const pageUrl = `${BRAND.url}/is-pomegle-free`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Is Pomegle Free", url: pageUrl },
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
          <DollarSign className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">100% Free</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Is {BRAND.name} Free?<br />
          <span className="text-primary">Yes. Completely.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          {BRAND.name} is 100% free. No hidden costs, no premium tiers, no credit card required. Just free random video chat.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Free Chat <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* What's Free */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Everything is Free</h2>
          <div className="space-y-4">
            {[
              "Unlimited video chat sessions",
              "No registration required",
              "No ads or interruptions",
              "All features unlocked",
              "Works on all devices",
              "Fast, reliable connections",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <Check className="w-5 h-5 text-primary shrink-0" />
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Free vs. Other Platforms</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              Many random chat platforms claim to be free but then charge for premium features, show ads, 
              or require registration. {BRAND.name} is different. For more information on free online services, 
              see <a 
                href="https://en.wikipedia.org/wiki/Free_software" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Free Software on Wikipedia</a>.
            </p>
            <p>
              <strong className="text-white">{BRAND.name}:</strong> Completely free, no ads, no registration, all features included.
            </p>
            <p>
              <strong className="text-white">OmeTV:</strong> Free tier but locks features behind payment and shows ads.
            </p>
            <p>
              <strong className="text-white">Chatroulette:</strong> Free but filled with advertisements. 
              Learn about <a 
                href="https://en.wikipedia.org/wiki/Chatroulette" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Chatroulette's history</a>.
            </p>
            <p>
              <strong className="text-white">Emerald Chat:</strong> Requires signup for most features.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
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
        <h2 className="text-2xl font-bold mb-4">Start Chatting Free Today</h2>
        <p className="text-gray-400 mb-8">No payment, no credit card, no commitment. Just free video chat.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Free Chat <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

