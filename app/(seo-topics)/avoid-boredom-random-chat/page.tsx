/**
 * SEO Page - Avoid Boredom
 * Target keywords: "avoid boredom random chat"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Lightbulb } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Avoid Getting Bored on Random Chat Sites`,
  description: `Tips to make random video chat more engaging. How to avoid boredom and have better conversations on random chat platforms.`,
  keywords: ["avoid boredom random chat", "fun video chat", "interesting conversations"],
  path: "/avoid-boredom-random-chat",
});

const FAQS = [
  {
    question: "How do I avoid getting bored on random chat?",
    answer: "Come prepared with conversation topics, ask interesting questions, be genuinely curious about people, try different conversation styles, and don't be afraid to skip if a conversation isn't working. Remember that not every connection will be amazing - that's part of the randomness.",
  },
];

const TIPS = [
  {
    title: "Come Prepared",
    description: "Have some conversation starters ready. Interesting questions, topics you want to discuss, or stories you want to share can make conversations more engaging.",
  },
  {
    title: "Be Curious",
    description: "Ask follow-up questions. Show genuine interest in the other person's answers. Curiosity creates engaging conversations.",
  },
  {
    title: "Share Your Interests",
    description: "Don't just ask questions - share your own interests, experiences, and thoughts. Good conversations are a two-way street.",
  },
  {
    title: "Try Different Topics",
    description: "If one topic isn't working, switch to another. Travel, music, movies, hobbies, current events - there's always something new to discuss.",
  },
  {
    title: "Don't Force It",
    description: "If a conversation isn't working, that's okay. Skip and move on. Not every connection will be amazing - that's the nature of random chat.",
  },
  {
    title: "Play Games",
    description: "Some people play simple games like 20 questions, would you rather, or story-building. Games can make conversations more fun and interactive.",
  },
];

export default function AvoidBoredomRandomChatPage() {
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
          <Lightbulb className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Tips & Tricks</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          How to Avoid Boredom<br />
          <span className="text-primary">On Random Chat</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Make your random video chat experience more engaging and fun.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-4">
          {TIPS.map((tip, i) => (
            <div key={i} className="p-6 bg-[#141414] rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-3">{tip.title}</h2>
              <p className="text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Remember</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Boredom is sometimes part of random chat. Not every connection will be amazing, and that's okay. 
              The randomness is part of what makes it exciting - you never know when you'll have an incredible conversation.
            </p>
            <p>
              If you're consistently bored, maybe take a break and come back later. Sometimes a fresh perspective helps. 
              Or try chatting at different times when different people might be online.
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

