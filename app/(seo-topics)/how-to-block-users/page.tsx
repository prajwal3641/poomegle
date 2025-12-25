/**
 * SEO Page - How to Block Users
 * Target keywords: "block users chat"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Shield, X } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Block Users on Chatroulette and Omegle Alternatives`,
  description: `Learn how to block users on random video chat platforms. Protect yourself from inappropriate behavior and maintain a safe chat experience.`,
  keywords: ["block users chat", "how to block users video chat", "block on Chatroulette"],
  path: "/how-to-block-users",
});

const FAQS = [
  {
    question: "How do I block users on random video chat?",
    answer: `On ${BRAND.name}, you can skip to the next person at any time, which effectively blocks the current user. Most platforms have a skip/next button or block feature in the interface. If someone is being inappropriate, use it immediately.`,
  },
  {
    question: "Can I permanently block someone on random chat?",
    answer: "Since random chat is anonymous and connections are random, you can't permanently block a specific person. However, skipping moves you to a new person immediately, and the random nature means you're unlikely to connect with the same person again.",
  },
  {
    question: "What should I do if someone is inappropriate?",
    answer: "Skip/block them immediately, report them if the platform has a reporting feature, and trust your instincts. Don't feel obligated to continue any conversation that makes you uncomfortable.",
  },
];

export default function HowToBlockUsersPage() {
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
          <span className="text-sm uppercase tracking-widest">Safety Guide</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Block Users<br />
          <span className="text-primary">On Random Chat</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Learn how to protect yourself and skip inappropriate users.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-primary" />
              How to Block/Skip Users
            </h2>
            <div className="space-y-3 text-gray-400">
              <p>
                On {BRAND.name} and most random video chat platforms, blocking is simple:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Look for the "Skip" or "Next" button</li>
                <li>Click it immediately if you feel uncomfortable</li>
                <li>You'll be connected to a new person right away</li>
                <li>No explanation needed - just skip</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">When to Block/Skip</h2>
            <div className="space-y-3 text-gray-400">
              <p>You should skip immediately if someone:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Shows inappropriate content</li>
                <li>Makes you feel uncomfortable</li>
                <li>Is being rude or offensive</li>
                <li>Asks for personal information</li>
                <li>Requests money or financial details</li>
                <li>Displays suspicious behavior</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Remember</h2>
            <p className="text-gray-300">
              You don't owe anyone a conversation. If something feels off, skip immediately. 
              Your safety and comfort come first. There are millions of people to chat with - 
              don't waste time with someone who makes you uncomfortable.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Reporting Inappropriate Behavior</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Many platforms, including {BRAND.name}, have reporting features. If someone violates 
              community guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Skip/block them first to end the connection</li>
              <li>Use the report feature if available</li>
              <li>Provide details about what happened</li>
              <li>This helps platforms improve moderation</li>
            </ul>
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

