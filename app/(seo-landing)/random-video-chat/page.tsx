/**
 * SEO Landing Page - Random Video Chat
 * Target keywords: "random video chat", "video chat with strangers"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, randomVideoChatMetadata, SEO_KEYWORDS } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Footer } from "@/components/Footer";
import { Video, ArrowRight, Globe, Zap, Shield } from "lucide-react";

// Route segment config - ensure static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (ISR)

export const metadata: Metadata = {
  ...randomVideoChatMetadata,
  keywords: [...SEO_KEYWORDS.randomVideoChat],
};

const FAQS = [
  {
    question: "What is random video chat?",
    answer: "Random video chat connects you with strangers via webcam for live video conversations. You never know who you'll meet next. Platforms like Chatroulette pioneered this concept in 2009.",
  },
  {
    question: "Is it free?",
    answer: `Yes, ${BRAND.name} is completely free. No subscriptions, no coins to buy.`,
  },
  {
    question: "Do I need to create an account?",
    answer: "Nope. Just allow camera access and you're in. No signup, no email verification.",
  },
  {
    question: "How does random video chat work?",
    answer: "When you visit a random video chat platform, you allow camera and microphone access and get instantly matched with another online user using a random match algorithm. You can chat via video, skip to find someone else, or end the session. The matching happens in real-time, typically within 2-3 seconds.",
  },
  {
    question: "Is random video chat safe?",
    answer: "Random video chat can be safe if you follow best practices: never share personal information, skip anyone who makes you uncomfortable, and use platforms with moderation. Always exercise caution.",
  },
  {
    question: "What was the first random video chat platform?",
    answer: "Chatroulette, launched in 2009, was the first major random video chat platform. It was created by a 17-year-old Russian student and quickly gained millions of users.",
  },
  {
    question: "Can I use random video chat on my phone?",
    answer: "Yes, most random video chat platforms work on smartphones, tablets, and computers with full mobile web support. No app download required - they work in your mobile browser. Just allow camera and microphone access when prompted.",
  },
  {
    question: "How long do people usually chat?",
    answer: "Average chat sessions last about 8.5 minutes. Some conversations are brief (2-5 minutes), while others can extend to 20+ minutes for engaging connections.",
  },
];

export default function RandomVideoChatPage() {
  const pageUrl = `${BRAND.url}/random-video-chat`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      
      {/* Breadcrumb Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "Random Video Chat", url: pageUrl },
        ]}
      />
      
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
          <Video className="w-5 h-5" />
          <span className="text-sm uppercase tracking-widest">Random Video Chat</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          Meet strangers.<br />
          <span className="text-primary">Face to face.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          One click. Random person. Live video. That&apos;s it. No algorithms deciding who you should talk to.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          <Video className="w-5 h-5" /> Start Video Chat
        </Link>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "1", title: "Allow camera", desc: "Grant webcam access when prompted" },
              { num: "2", title: "Click start", desc: "Hit the button. No signup needed." },
              { num: "3", title: "Chat or skip", desc: "Talk or move to the next person" },
            ].map((step) => (
              <div key={step.num} className="text-center p-6">
                <div className="w-10 h-10 bg-primary text-gray-900 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why people love it</h2>
          <div className="space-y-4">
            {[
              { icon: Globe, label: "Global", desc: "Chat with people from 190+ countries" },
              { icon: Zap, label: "Instant", desc: "No waiting. Connect in seconds." },
              { icon: Shield, label: "Anonymous", desc: "No account = no trace" },
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
        <h2 className="text-2xl font-bold mb-4">Your move.</h2>
        <p className="text-gray-400 mb-8">Someone&apos;s waiting to meet you right now.</p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Go <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
