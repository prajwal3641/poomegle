/**
 * Help Page - Bots Protection
 * Target keywords: "Pomegle bots protection"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How ${BRAND.name} Protects Against Bots and Spam`,
  description: `Learn how ${BRAND.name} prevents bots and spam accounts. Security measures and protection features that keep the platform safe.`,
  keywords: ["Pomegle bots protection", "bot detection", "spam prevention video chat"],
  path: "/help/bots-protection",
});

const FAQS = [
  {
    question: "How does Pomegle protect against bots?",
    answer: `${BRAND.name} uses various techniques to detect and prevent bots including behavioral analysis, connection pattern monitoring, and automated detection systems. We continuously work to keep the platform free of bots and spam accounts.`,
  },
  {
    question: "Are there bots on random video chat platforms?",
    answer: "Some random video chat platforms do have bot problems. Reputable platforms use detection systems to identify and remove bots. If you encounter suspicious behavior that seems automated, report it.",
  },
];

export default function BotsProtectionPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Help
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary mb-6">
          <Shield className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Security</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Bot & Spam Protection
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          How {BRAND.name} keeps bots and spam away.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Detection Methods</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                {BRAND.name} uses multiple methods to detect and prevent bots:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Behavioral pattern analysis</li>
                <li>Connection frequency monitoring</li>
                <li>Automated detection systems</li>
                <li>User reporting</li>
                <li>Continuous monitoring and updates</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">How You Can Help</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                If you encounter suspicious behavior that might be a bot:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Skip/block immediately</li>
                <li>Report suspicious accounts</li>
                <li>Look for signs like repetitive messages or no video</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Ongoing Protection</h2>
            <p className="text-gray-300">
              Bot protection is an ongoing battle. {BRAND.name} continuously works to improve detection 
              and keep the platform free of bots and spam. We update our systems regularly to stay ahead of new threats.
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

      <section className="px-6 py-16 border-t border-white/5 text-center">
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

