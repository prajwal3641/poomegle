/**
 * SEO Page - Next Best Chat App After Omegle
 * Target keywords: "next best chat app"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `What is the Next Best Chat App After Omegle?`,
  description: `Since Omegle shut down, ${BRAND.name} is the next best chat app. Free, no registration, no ads - the perfect Omegle replacement.`,
  keywords: ["next best chat app", "best chat app after Omegle", "Omegle replacement"],
  path: "/next-best-chat-app",
});

const FAQS = [
  {
    question: "What is the next best chat app after Omegle?",
    answer: `${BRAND.name} is considered the next best chat app after Omegle. It offers the same random video chat experience - free, no registration, anonymous - with a modern interface and better features.`,
  },
  {
    question: "Is there a good replacement for Omegle?",
    answer: `Yes, ${BRAND.name} is an excellent Omegle replacement. It provides the same anonymous random video chat experience that made Omegle popular, but with modern design and improved safety features.`,
  },
  {
    question: "What chat app is most like Omegle?",
    answer: `${BRAND.name} is the most similar to Omegle - same concept, same simplicity, no registration required. Other alternatives include Chatroulette and OmeTV, but ${BRAND.name} offers the best balance of features and ease of use.`,
  },
];

export default function NextBestChatAppPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          The Next Best Chat App<br />
          <span className="text-primary">After Omegle</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Since Omegle shut down, {BRAND.name} is the closest thing to the original experience.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why {BRAND.name} is the Next Best Thing</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              When Omegle shut down in November 2023, millions of users were left looking for a replacement. 
              {BRAND.name} was built to fill that void.
            </p>
            <p>
              We kept what made Omegle great - simple, anonymous, random video chat - and improved on what didn't work.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What Makes {BRAND.name} the Best Replacement</h2>
          <div className="space-y-3">
            {[
              "Same simplicity - no registration, just click and chat",
              "Anonymous like Omegle - use any name or none at all",
              "Completely free - no hidden costs or premium tiers",
              "Modern interface - built in 2024, not 2009",
              "Better mobile support - works great on phones and tablets",
              "Improved safety - better moderation and reporting",
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Other Alternatives</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              <strong className="text-white">Chatroulette:</strong> The original random chat platform, but feels outdated and has ads.
            </p>
            <p>
              <strong className="text-white">OmeTV:</strong> Popular but requires registration and locks features behind payment.
            </p>
            <p>
              <strong className="text-white">Monkey App:</strong> Mobile-focused but requires app download and is mobile-only.
            </p>
            <p>
              <strong className="text-white">{BRAND.name}:</strong> Best balance - works everywhere, no signup, no ads, modern design.
            </p>
          </div>
        </div>
      </section>

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

      <section className="px-6 py-20 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Try the Next Best Chat App?</h2>
        <p className="text-gray-400 mb-8">Experience the Omegle replacement that everyone's talking about.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

