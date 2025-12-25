/**
 * SEO Landing Page - Anonymous Chat App
 * Target keywords: "anonymous chat app safety", "anonymous chat app"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Shield, Smartphone, Globe, AlertTriangle } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Anonymous Chat App – ${BRAND.name} Features & Safety`,
  description: `${BRAND.name} is a safe anonymous chat app. Learn about our safety features, privacy protection, and how we keep you secure while chatting with strangers.`,
  keywords: ["anonymous chat app safety", "anonymous chat app", "safe anonymous chat", "anonymous chat privacy", ...SEO_KEYWORDS.primary],
  path: "/anonymous-chat-app",
});

const FAQS = [
  {
    question: "Is Pomegle a safe anonymous chat app?",
    answer: "Yes. Pomegle is designed with safety in mind. We implement moderation, provide reporting tools, and don't require personal information, keeping you anonymous and secure.",
  },
  {
    question: "What safety features does Pomegle have?",
    answer: "Pomegle includes user reporting, content moderation, and privacy-first design. You can block users instantly and report inappropriate behavior at any time.",
  },
  {
    question: "Is my data safe on anonymous chat apps?",
    answer: "On Pomegle, we don't store your conversations or require personal information. Your chats are private and you remain anonymous throughout your session.",
  },
  {
    question: "How do I stay safe while using anonymous chat?",
    answer: "Never share personal information, use the block feature if needed, report inappropriate users, and trust your instincts. If something feels wrong, skip to the next person.",
  },
];

export default function AnonymousChatAppPage() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
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
          <Shield className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Anonymous & Safe</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Anonymous Chat App<br />
          <span className="text-primary">Built for Safety</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          {BRAND.name} combines anonymous chat with modern safety features. Chat freely while staying protected.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try {BRAND.name} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Safety Features */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Safety Features</h2>
          <div className="space-y-4">
            {[
              { icon: Shield, label: "Instant Blocking", desc: "Block any user immediately if you feel uncomfortable" },
              { icon: AlertTriangle, label: "Report System", desc: "Report inappropriate behavior quickly and easily" },
              { icon: Globe, label: "No Personal Data", desc: "We don't collect or store your personal information" },
              { icon: Smartphone, label: "Works Everywhere", desc: "Safe anonymous chat on desktop, mobile, and tablet" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Privacy Matters</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              {BRAND.name} is designed to keep you anonymous. We don't require registration, don't store your conversations, 
              and don't track your activity across sessions. You're in control.
            </p>
            <p>
              When you chat anonymously on {BRAND.name}, you choose how much to share. Use any name, or none at all. 
              Your real identity stays private.
            </p>
            <p className="text-primary">
              Remember: Even on anonymous chat apps, never share personal details like your address, phone number, or financial information.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Safety Tips for Anonymous Chat</h2>
          <div className="space-y-3">
            {[
              "Don't share personal information (address, phone, email)",
              "Never send money or share financial details",
              "Use the block feature if someone makes you uncomfortable",
              "Report users who violate community guidelines",
              "Trust your instincts - if something feels off, skip",
              "Remember that people may not be who they claim to be",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">{tip}</p>
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
        <h2 className="text-2xl font-bold mb-4">Ready to Chat Safely?</h2>
        <p className="text-gray-400 mb-8">Experience anonymous chat with modern safety features.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Chatting <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

