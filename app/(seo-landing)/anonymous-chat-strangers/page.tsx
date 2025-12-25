/**
 * SEO Landing Page - Anonymous Chat with Strangers
 * Target keywords: "anonymous chat strangers", "chat anonymously with strangers"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Shield, EyeOff, Lock } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `${BRAND.name}: Chat Anonymously with Strangers (No Login Required)`,
  description: `Chat anonymously with strangers on ${BRAND.name}. No login, no registration, completely anonymous random video chat with people worldwide.`,
  keywords: ["anonymous chat strangers", "chat anonymously", "anonymous video chat", "anonymous chat no login", ...SEO_KEYWORDS.primary],
  path: "/anonymous-chat-strangers",
});

const FAQS = [
  {
    question: "Can I chat anonymously on Pomegle?",
    answer: "Yes! Pomegle allows you to chat completely anonymously. No registration, no login, no personal information required. Just open the site and start chatting.",
  },
  {
    question: "Do I need to create an account to chat with strangers?",
    answer: "No account required. Pomegle is designed for anonymous chat - just visit the site, allow camera access, and start talking to strangers instantly.",
  },
  {
    question: "Is my identity protected on Pomegle?",
    answer: "Yes. We don't require any personal information. You can use any name you want and your conversations are not stored. You remain completely anonymous.",
  },
  {
    question: "How is anonymous chat different from regular chat?",
    answer: "Anonymous chat means you don't need to register, provide personal details, or reveal your identity. You can chat with strangers without them knowing who you are.",
  },
];

export default function AnonymousChatStrangersPage() {
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
          <EyeOff className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Anonymous Chat</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Chat Anonymously<br />
          <span className="text-primary">With Strangers</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          No login. No registration. No personal info. Just anonymous video chat with strangers from around the world.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Start Anonymous Chat <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">What Anonymous Means</h2>
          <div className="space-y-4">
            {[
              { icon: Lock, label: "No Registration", desc: "Start chatting immediately without creating an account" },
              { icon: EyeOff, label: "No Identity Required", desc: "Use any name you want, keep your real identity private" },
              { icon: Shield, label: "Private by Design", desc: "We don't store your conversations or personal data" },
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

      {/* How it works */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How Anonymous Chat Works</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              <strong className="text-white">Step 1:</strong> Visit {BRAND.name} - no signup needed
            </p>
            <p>
              <strong className="text-white">Step 2:</strong> Allow camera access when prompted
            </p>
            <p>
              <strong className="text-white">Step 3:</strong> Enter any name you want (or none at all)
            </p>
            <p>
              <strong className="text-white">Step 4:</strong> Start chatting with strangers anonymously
            </p>
          </div>
          <p className="mt-6 text-gray-400">
            That's it. No email, no phone number, no social media accounts. Just pure anonymous conversation.
          </p>
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
        <h2 className="text-2xl font-bold mb-4">Ready for Anonymous Chat?</h2>
        <p className="text-gray-400 mb-8">Start chatting with strangers anonymously right now.</p>
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

