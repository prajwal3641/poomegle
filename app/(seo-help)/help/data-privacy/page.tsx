/**
 * Help Page - Data Privacy
 * Target keywords: "Pomegle data privacy"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `Do Chat Apps Like ${BRAND.name} Store Your Data?`,
  description: `Learn how ${BRAND.name} handles your data and privacy. We don't store conversations, collect personal information, or track your activity.`,
  keywords: ["Pomegle data privacy", "chat app data storage", "video chat privacy"],
  path: "/help/data-privacy",
});

const FAQS = [
  {
    question: "Does Pomegle store your data?",
    answer: `${BRAND.name} does not store your conversations, video recordings, or chat logs. We don't collect personal information because we don't require registration. Once you disconnect, your session data is gone.`,
  },
  {
    question: "What data does Pomegle collect?",
    answer: `${BRAND.name} collects minimal data necessary for the service to function - connection logs for technical purposes only. We don't collect personal information, conversations, or identifiable data.`,
  },
  {
    question: "Is my video chat recorded?",
    answer: "No, {BRAND.name} does not record video chats. Your conversations are not stored, saved, or recorded. Video streams directly between users without being stored on our servers.",
  },
];

export default function DataPrivacyPage() {
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
          <Lock className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Privacy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Data Privacy
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          How {BRAND.name} handles your data and protects your privacy.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">What We Don't Store</h2>
            <div className="space-y-3 text-gray-400">
              <p>✓ Video recordings - not stored</p>
              <p>✓ Audio recordings - not stored</p>
              <p>✓ Chat conversations - not stored</p>
              <p>✓ Personal information - not collected</p>
              <p>✓ User profiles - not created</p>
              <p>✓ Chat logs - not saved</p>
            </div>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                Video and audio streams go directly between users using peer-to-peer connections. 
                Our servers only facilitate the initial connection - they don't see or store your conversation.
              </p>
              <p>
                Because we don't require registration, we don't collect email addresses, phone numbers, 
                names, or any other personal information.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Your Privacy Matters</h2>
            <p className="text-gray-300">
              {BRAND.name} is designed to protect your privacy. No registration means no personal data collection. 
              Direct peer-to-peer connections mean your conversations don't pass through our servers. 
              When you disconnect, your session is gone - forever.
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
          Start Chatting Privately <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

