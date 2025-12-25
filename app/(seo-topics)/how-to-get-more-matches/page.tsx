/**
 * SEO Page - How to Get More Matches
 * Target keywords: "get more matches random chat"
 */

import Link from "next/link";
import type { Metadata } from "next";
import { BRAND, generatePageMetadata } from "@/lib/seo";
import { FAQJsonLd } from "@/lib/seo/structured-data";
import { ArrowRight, Lightbulb, Camera } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: `How to Get More Matches on Random Chat Apps`,
  description: `Tips to get more matches and better conversations on random video chat apps. Improve your experience and connect with more people.`,
  keywords: ["get more matches random chat", "how to get matches video chat", "video chat tips"],
  path: "/how-to-get-more-matches",
});

const FAQS = [
  {
    question: "How can I get more matches on random chat apps?",
    answer: "Improve your lighting, ensure good internet connection, be friendly and engaging in conversations, and keep your camera angle flattering. Most importantly, be yourself and show genuine interest in the conversation.",
  },
  {
    question: "Why do people skip me on random chat?",
    answer: "People skip for many reasons - technical issues (poor video quality, no audio), looking for specific types of conversations, or just browsing. It's not personal - focus on having good conversations with those who stay.",
  },
];

const TIPS = [
  {
    title: "Good Lighting",
    description: "Make sure your face is well-lit. Natural light from a window works best, but any bright, even lighting will help.",
  },
  {
    title: "Stable Connection",
    description: "A good internet connection means better video quality and less lag, which makes people more likely to stay.",
  },
  {
    title: "Camera Angle",
    description: "Position your camera at eye level or slightly above. Avoid unflattering angles from below.",
  },
  {
    title: "Be Engaging",
    description: "Smile, make eye contact (with the camera), and show enthusiasm. People respond to positive energy.",
  },
  {
    title: "Good Audio",
    description: "Make sure your microphone works well and you're in a quiet environment. Clear audio is crucial for good conversations.",
  },
  {
    title: "Interesting Background",
    description: "A clean, interesting background (but not distracting) can make you more memorable and engaging.",
  },
  {
    title: "Be Yourself",
    description: "Authenticity attracts people. Don't try to be someone you're not - genuine connections are more valuable.",
  },
  {
    title: "Start Strong",
    description: "The first few seconds matter. Have a friendly greeting ready and show interest in the other person.",
  },
];

export default function HowToGetMoreMatchesPage() {
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
          How to Get More Matches<br />
          <span className="text-primary">On Random Chat</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Tips to improve your experience and connect with more people.
        </p>
      </section>

      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-4">
          {TIPS.map((tip, i) => (
            <div key={i} className="p-6 bg-[#141414] rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                {tip.title}
              </h2>
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
              Getting "matches" on random chat isn't about looks or perfection. It's about having good conversations. 
              Focus on being friendly, interesting, and genuine rather than worrying about who skips.
            </p>
            <p>
              Not everyone will want to talk - and that's okay. Some people are browsing, some are looking for specific 
              types of conversations, and some just have different preferences. Don't take skips personally.
            </p>
            <p className="text-primary">
              The goal isn't to get everyone to stay - it's to have meaningful conversations with the people who do.
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

