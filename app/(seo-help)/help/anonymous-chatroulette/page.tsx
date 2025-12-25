/**
 * Help Page - Anonymous Chatroulette
 * Target keywords: "anonymous Chatroulette"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, EyeOff } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Can You Stay Truly Anonymous on Chatroulette?`,
  description: `Learn about anonymity on Chatroulette and random video chat platforms. How anonymous are you really, and what information can others see?`,
  keywords: ["anonymous Chatroulette", "Chatroulette privacy", "anonymous video chat"],
  path: "/help/anonymous-chatroulette",
});

const FAQS = [
  {
    question: "Can you stay truly anonymous on Chatroulette?",
    answer: "Chatroulette doesn't require registration, so you can use it without providing personal information. However, your IP address may be visible to Chatroulette, and video chat reveals your appearance. True anonymity is limited - others can see and potentially record you.",
  },
  {
    question: "How anonymous is random video chat?",
    answer: "Random video chat provides some anonymity - no registration means no personal information shared. However, your appearance, voice, and potentially IP address may be visible. It's more private than social media but not completely anonymous.",
  },
];

export default function AnonymousChatroulettePage() {
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
          <EyeOff className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Privacy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Anonymous Chatroulette
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          How anonymous are you really on random video chat?
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">What Anonymity Means</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Random video chat platforms like Chatroulette and {BRAND.name} provide <strong className="text-white">some</strong> anonymity, but not complete anonymity.
              </p>
              <p>
                <strong className="text-white">What stays private:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your real name (if you don't share it)</li>
                <li>Your email address</li>
                <li>Your phone number</li>
                <li>Your location (generally)</li>
                <li>Your social media accounts (if you don't share them)</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">What's Visible</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                <strong className="text-white">What others can see:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your appearance (face, background)</li>
                <li>Your voice</li>
                <li>Any information you choose to share</li>
                <li>Potentially your IP address (to the platform)</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Important Considerations</h2>
            <p className="text-gray-300">
              While random video chat provides more privacy than social media, it's not completely anonymous. 
              Others can see and potentially record you. Always be mindful of what you share and how you appear on camera. 
              Don't share personal information, and remember that your appearance and voice can be identifying.
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

