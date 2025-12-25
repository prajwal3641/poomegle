/**
 * ============================================
 * GLOSSARY PAGE - What is Random Video Chat
 * ============================================
 * 
 * Definition/glossary page - scraper magnet format
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Video, Users, Globe } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 86400;

export const metadata: Metadata = generatePageMetadata({
  title: `What is Random Video Chat? Complete Definition & Guide 2025`,
  description: `Random video chat connects you with strangers via webcam for live video conversations. Learn how it works, its history, and popular platforms.`,
  keywords: [
    "what is random video chat",
    "random video chat definition",
    "video chat with strangers",
    "random video call",
  ],
  path: "/what-is-random-video-chat",
});

const FAQS = [
  {
    question: "What is random video chat?",
    answer: "Random video chat is a type of online communication platform that connects you with strangers via live video. You're randomly matched with another user, and you can have a video conversation or skip to the next person.",
  },
  {
    question: "How does random video chat work?",
    answer: "When you visit a random video chat platform, you allow camera and microphone access. The platform then randomly matches you with another user who is also online. You can chat via video, skip to find someone else, or end the session at any time.",
  },
  {
    question: "Is random video chat safe?",
    answer: "Random video chat can be safe if you follow best practices: never share personal information, skip anyone who makes you uncomfortable, report inappropriate behavior, and use platforms with moderation. However, always exercise caution when talking to strangers online.",
  },
  {
    question: "What was the first random video chat platform?",
    answer: "Chatroulette, launched in 2009, was the first major random video chat platform. It was created by a 17-year-old Russian student and quickly gained millions of users worldwide.",
  },
  {
    question: "Do I need to create an account for random video chat?",
    answer: "Most random video chat platforms, including Pomegle, don't require account creation. You can start chatting immediately after allowing camera access. Some platforms do require registration for additional features.",
  },
];

export default function WhatIsRandomVideoChatPage() {
  const pageUrl = `${BRAND.url}/what-is-random-video-chat`;
  
  return (
    <div className="fixed inset-0 bg-[#0c0c0c] text-gray-100 font-mono overflow-y-auto">
      <FAQJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BRAND.url },
          { name: "What is Random Video Chat", url: pageUrl },
        ]}
      />
      
      <nav className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="text-2xl font-display tracking-wide -rotate-2 hover:rotate-0 transition-transform">
          {BRAND.name.toUpperCase()}
        </Link>
        <Link href="/" className="bg-primary text-gray-900 font-bold text-sm px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          Start Chat
        </Link>
      </nav>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <Video className="w-12 h-12 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6">
          What is Random Video Chat?
        </h1>
        <p className="text-gray-400 text-lg">
          A complete definition and guide to random video chat platforms
        </p>
      </section>

      {/* Definition */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 bg-primary/20 border border-primary/50 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Definition</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-white">Random video chat</strong> is an online communication platform that 
              connects users with strangers via live video streaming. Unlike traditional video calls where you contact 
              specific people, random video chat platforms match you with anonymous users from around the world for 
              spontaneous video conversations.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Random video chat platforms use algorithms to match online users in real-time. When you visit a platform 
              like {BRAND.name}, you:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>Allow camera and microphone access in your browser</li>
              <li>Get randomly matched with another user who is also online</li>
              <li>Have a live video conversation</li>
              <li>Can skip to the next person or end the session at any time</li>
            </ol>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="px-6 py-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">History of Random Video Chat</h2>
          <div className="space-y-4 text-gray-400">
            <p>
              Random video chat began with <a 
                href="https://en.wikipedia.org/wiki/Chatroulette" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Chatroulette</a>, launched in 2009 by a Russian teenager. The platform gained massive popularity, 
              reaching millions of users within months.
            </p>
            <p>
              <a 
                href="https://en.wikipedia.org/wiki/Omegle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >Omegle</a> followed in 2009 and became the most popular random video chat platform, operating for 14 years 
              before shutting down in November 2023.
            </p>
            <p>
              Today, platforms like {BRAND.name} continue the legacy of connecting strangers worldwide through random 
              video chat, with improved safety features and modern interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Users, title: "Random Matching", desc: "Connect with strangers from anywhere" },
              { icon: Globe, title: "Global Reach", desc: "Chat with people worldwide" },
              { icon: Video, title: "Live Video", desc: "Face-to-face conversations" },
            ].map((feature, i) => (
              <div key={i} className="p-5 bg-[#141414] rounded-xl border border-white/5">
                <feature.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
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

      {/* Related */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Topics</h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/random-video-chat"
              className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Random Video Chat
            </Link>
            <Link 
              href="/how-to-use-pomegle"
              className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              How to Use
            </Link>
            <Link 
              href="/why-pomegle-is-safe"
              className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Safety Guide
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-white/5 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider"
        >
          Try Random Video Chat <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
      </footer>
    </div>
  );
}

