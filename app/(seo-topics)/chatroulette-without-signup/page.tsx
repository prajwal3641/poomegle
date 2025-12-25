/**
 * SEO Page - Chatroulette Without Signup
 * Target keywords: "Chatroulette no signup"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Check, X } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Chatroulette Without Signup: Is It Possible?`,
  description: `Yes, Chatroulette works without signup. Learn how to use Chatroulette without registration and compare it with ${BRAND.name} which also requires no signup.`,
  keywords: ["Chatroulette no signup", "Chatroulette without signup", "Chatroulette registration"],
  path: "/chatroulette-without-signup",
});

const FAQS = [
  {
    question: "Can you use Chatroulette without signup?",
    answer: "Yes, Chatroulette doesn't require signup or registration. You can visit the website and start chatting immediately without creating an account.",
  },
  {
    question: "Do I need an account for Chatroulette?",
    answer: "No, Chatroulette doesn't require an account. You can use it completely anonymously without any registration.",
  },
  {
    question: "Is there a random chat site like Chatroulette that doesn't require signup?",
    answer: `Yes, ${BRAND.name} also works without signup - just like Chatroulette, but with a modern interface and no ads.`,
  },
];

export default function ChatrouletteWithoutSignupPage() {
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
          Chatroulette Without Signup
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Yes, it's possible. Chatroulette works without registration.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Does Chatroulette Require Signup?</h2>
            <p className="text-gray-400 mb-4">
              <strong className="text-white">No.</strong> Chatroulette is one of the few random video chat platforms that doesn't require 
              any registration or signup. You can visit chatroulette.com and start chatting immediately.
            </p>
            <div className="flex items-center gap-2 text-primary mt-4">
              <Check className="w-5 h-5" />
              <span>No registration required</span>
            </div>
            <div className="flex items-center gap-2 text-primary mt-2">
              <Check className="w-5 h-5" />
              <span>No account needed</span>
            </div>
            <div className="flex items-center gap-2 text-primary mt-2">
              <Check className="w-5 h-5" />
              <span>Start chatting instantly</span>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">How to Use Chatroulette Without Signup</h2>
            <div className="space-y-3 text-gray-400">
              <p>1. Visit chatroulette.com in your web browser</p>
              <p>2. Allow camera and microphone access when prompted</p>
              <p>3. Click "Start" - no signup required</p>
              <p>4. You'll be connected to a random stranger immediately</p>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Looking for a Better Alternative?</h2>
            <p className="text-gray-300 mb-4">
              {BRAND.name} also works without signup - just like Chatroulette - but offers:
            </p>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Modern, clean interface</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>No ads</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Better mobile support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Faster connections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Chatroulette vs {BRAND.name}</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="font-medium mb-2">No Signup Required</p>
              <p className="text-sm text-gray-400">Both platforms: ✓</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="font-medium mb-2">No Ads</p>
              <p className="text-sm text-gray-400">Chatroulette: ✗ | {BRAND.name}: ✓</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="font-medium mb-2">Modern Interface</p>
              <p className="text-sm text-gray-400">Chatroulette: ✗ | {BRAND.name}: ✓</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="font-medium mb-2">Mobile Friendly</p>
              <p className="text-sm text-gray-400">Chatroulette: Limited | {BRAND.name}: ✓</p>
            </div>
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

      <section className="px-6 py-20 border-t border-white/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Try {BRAND.name} - No Signup Required</h2>
        <p className="text-gray-400 mb-8">Like Chatroulette, but better.</p>
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

