/**
 * Help Page - Stay Safe
 * Target keywords: "stay safe chat apps"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Stay Safe on Anonymous Chat Apps`,
  description: `Safety guide for anonymous video chat. Learn how to protect yourself, recognize dangers, and use random chat apps safely.`,
  keywords: ["stay safe chat apps", "safe video chat", "chat app safety"],
  path: "/help/stay-safe",
});

const FAQS = [
  {
    question: "How do I stay safe on anonymous chat apps?",
    answer: "Never share personal information, use block/report features if uncomfortable, trust your instincts, don't share financial information, and remember that you don't know who you're talking to. Skip immediately if something feels wrong.",
  },
  {
    question: "What information should I never share on random chat?",
    answer: "Never share your real name, address, phone number, email, school/work location, social media accounts, financial information, or any other identifying details. Keep conversations anonymous.",
  },
];

const SAFETY_TIPS = [
  "Never share personal information (name, address, phone, email)",
  "Never send money or share financial details",
  "Don't meet up with people from random chat",
  "Use block/skip immediately if uncomfortable",
  "Report inappropriate behavior",
  "Trust your instincts - if something feels off, skip",
  "Don't share social media accounts",
  "Keep conversations anonymous",
  "Remember: people may not be who they claim",
  "Don't click links or download files",
];

export default function StaySafePage() {
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
          <span className="text-sm uppercase tracking-widest">Safety Guide</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Stay Safe<br />
          <span className="text-primary">On Chat Apps</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Essential safety tips for anonymous video chat.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Safety Tips</h2>
          <div className="space-y-3">
            {SAFETY_TIPS.map((tip, i) => (
              <div key={i} className="p-4 bg-[#141414] rounded-xl border border-white/5">
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Red Flags</h2>
          <div className="space-y-4 text-gray-400">
            <p>Watch out for people who:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ask for personal information immediately</li>
              <li>Request to move the conversation off-platform</li>
              <li>Ask for money or financial help</li>
              <li>Pressure you to share photos or videos</li>
              <li>Make you feel uncomfortable or unsafe</li>
              <li>Try to manipulate or guilt you</li>
              <li>Claim to be someone they're probably not</li>
            </ul>
            <p className="mt-4 text-primary">
              If you see any red flags, skip immediately. Don't explain, don't apologize - just skip.
            </p>
          </div>
        </div>
      </section>

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

      <section className="px-6 py-16 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting Safely <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

