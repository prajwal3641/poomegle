/**
 * SEO Page - How to Unban
 * Target keywords: "unban Omegle/Pomegle"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Unban Yourself from ${BRAND.name}/OmeTV`,
  description: `Learn what to do if you're banned from ${BRAND.name} or other random video chat platforms. How bans work and how to get unbanned.`,
  keywords: ["unban Omegle Pomegle", "how to unban video chat", "Pomegle ban"],
  path: "/how-to-unban-pomegle",
});

const FAQS = [
  {
    question: "How do I get unbanned from Pomegle?",
    answer: `If you've been banned from ${BRAND.name}, bans are typically temporary and may be lifted after a period of time. Try accessing the site again after 24-48 hours. If you believe you were banned incorrectly, you may contact support.`,
  },
  {
    question: "Why was I banned from a random chat platform?",
    answer: "Users are typically banned for violating community guidelines, such as inappropriate behavior, spamming, harassment, or sharing inappropriate content. Different platforms have different policies.",
  },
  {
    question: "How long do bans last?",
    answer: "Ban duration varies by platform and violation severity. Some bans are temporary (24 hours to a week), while severe violations may result in permanent bans. Check the platform's guidelines for specific policies.",
  },
];

export default function HowToUnbanPomeglePage() {
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
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Shield className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Account Help</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Unban Yourself<br />
          <span className="text-primary">From Random Chat</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          What to do if you've been banned from a random video chat platform.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Understanding Bans</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Random video chat platforms ban users who violate community guidelines. Common reasons include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Inappropriate behavior or content</li>
                <li>Harassment or bullying</li>
                <li>Spamming or disruptive behavior</li>
                <li>Sharing inappropriate material</li>
                <li>Repeated violations</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">What to Do If Banned</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                <strong className="text-white">1. Wait it out:</strong> Many bans are temporary. Try accessing the site again after 24-48 hours.
              </p>
              <p>
                <strong className="text-white">2. Check the guidelines:</strong> Review the platform's community guidelines to understand what may have caused the ban.
              </p>
              <p>
                <strong className="text-white">3. Contact support:</strong> If you believe you were banned incorrectly, reach out to platform support.
              </p>
              <p>
                <strong className="text-white">4. Learn from it:</strong> Use the experience to understand appropriate behavior on random chat platforms.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Prevention is Best</h2>
            <p className="text-gray-300">
              The best way to avoid being banned is to follow community guidelines: be respectful, don't share inappropriate content, 
              don't harass others, and treat people how you'd want to be treated. When in doubt, skip rather than risk a violation.
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

