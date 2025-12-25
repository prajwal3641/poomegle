/**
 * SEO Page - Non-Adult Chat Rooms
 * Target keywords: "non adult chat rooms"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Find Non-Adult Chat Rooms Online`,
  description: `Tips for finding safe, non-adult chat rooms online. Learn how to use random video chat safely and avoid inappropriate content.`,
  keywords: ["non adult chat rooms", "safe chat rooms", "family friendly video chat"],
  path: "/non-adult-chat-rooms",
});

const FAQS = [
  {
    question: "Are there non-adult chat rooms online?",
    answer: "Random video chat platforms can have inappropriate content due to their anonymous nature. Look for platforms with active moderation, content filters, and reporting systems. However, completely filtered experiences are difficult on anonymous platforms.",
  },
  {
    question: "How can I avoid adult content on random chat?",
    answer: "Use platforms with active moderation, enable content filters if available, skip immediately if you encounter inappropriate content, and report users who violate guidelines. Remember that anonymous platforms may have unpredictable content.",
  },
];

export default function NonAdultChatRoomsPage() {
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
          <span className="text-sm uppercase tracking-widest">Safe Chat</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Non-Adult Chat Rooms
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          How to find safer chat experiences online.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">The Challenge</h2>
            <p className="text-gray-400">
              Random video chat platforms, by their anonymous nature, can contain inappropriate content. 
              Finding completely filtered "non-adult" experiences is challenging because these platforms match you randomly with strangers.
            </p>
          </div>

          <div className="p-6 bg-[#141414] rounded-xl border border-white/5">
            <h2 className="text-xl font-bold mb-4">Tips for Safer Experiences</h2>
            <div className="space-y-3 text-gray-400">
              <p>
                <strong className="text-white">Choose platforms with moderation:</strong> Look for sites with active content moderation and reporting systems.
              </p>
              <p>
                <strong className="text-white">Use skip immediately:</strong> If you encounter inappropriate content, skip to the next person right away.
              </p>
              <p>
                <strong className="text-white">Report violations:</strong> Help keep platforms clean by reporting users who share inappropriate content.
              </p>
              <p>
                <strong className="text-white">Set boundaries:</strong> Be clear about what you're looking for and skip if conversations go in unwanted directions.
              </p>
              <p>
                <strong className="text-white">Consider supervised options:</strong> For younger users, consider platforms designed specifically for safe, moderated chat experiences.
              </p>
            </div>
          </div>

          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Important Note</h2>
            <p className="text-gray-300">
              Due to the random and anonymous nature of these platforms, it's difficult to guarantee a completely filtered experience. 
              If you're looking for a strictly non-adult environment, consider moderated platforms or interest-based chat rooms rather than random video chat.
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

